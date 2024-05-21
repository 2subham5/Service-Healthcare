import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UAppbar from "./UAppbar";
// import Doctor from "./Doctor";
function UHospital({ userType, userName, setUserName }) {
 
 
    const [courses, setCourses] = useState([]);
    useEffect(() => {
    //     fetch("http://localhost:3000/admin/courses", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }  
    //     }).then((res) => {
    //         res.json().then((data) => {
    //             setCourses(data);
    //         })
    //     })
     axios.get("http://localhost:3000/user/hospitals",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>{
            setCourses(res.data.hospitals);
        })
    }, []);
   
    return (
        <div>
        <div>
                        {/* Conditionally render Appbar based on userType */}
                        {userType === "admin" || userType === "user" ? (
                            <UAppbar userName={userName} setUserName={setUserName} />
                        ) : null}
                    </div>
    <div style={{display:"flex"}}>
       HOSPITALS
        {/* courses is an object so need to stringify */}
        
        {courses.map((course)=>{
            // passing course state in variable course
            return <Course course={course} />
        })}
        </div>
        </div>
    )
}

export function Course (props){
    const navigate = useNavigate();
    const { hospitalId } = useParams();
    const handleViewDoctors = () => {
        navigate("/uhospital/" + props.course._id + "/doctors"); // Navigate to Doctors component with hospital ID
      
      };
    return <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{props.course.name}</Typography>
 <Typography textAlign={"centre"} variant="h4">{props.course.address}</Typography>
 {/* <Typography textAlign={"centre"} variant="h4">{props.course.purchased[0]}</Typography> */}

{/* shows list of doctors under a particular hospital */}
{props.course.purchased.map((doctorId) => (
                <DoctorDetails key={doctorId} doctorId={doctorId} />
            ))}
 <div>

 </div>
 <div>
 <Button onClick={handleViewDoctors}>View Doctors</Button> {/* Button to view doctors */}

 </div>
    </Card>
    }
    function DoctorDetails({ doctorId }) {
        const [doctor, setDoctor] = useState(null);
        console.log("doctorDetails")
        useEffect(() => {
            axios.get(`http://localhost:3000/user/doctor/${doctorId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(res => {
                console.log("Doctor details received:", res.data);
                setDoctor(res.data.doctor);
            }).catch(error => {
                console.error(`Error fetching doctor ${doctorId} details:`, error);
            });
        }, [doctorId]);
    
        if (!doctor) {
            return null; // Render nothing until doctor details are fetched
        }
    
        return (
            // JSON.stringify(doctor.doctorName)
            <div>
            
            <div>
                <Typography>{doctor.doctorName}</Typography>
                <Typography>{doctor.degree}</Typography>
                 {/* Render other details of the doctor */}
            </div>
            </div>
           
        );
    }

export default UHospital;