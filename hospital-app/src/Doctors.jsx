// import { useEffect, useState } from "react";
// import Card from '@mui/material/Card';
// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Doctors() {
//     const [courses, setCourses] = useState([]);
//     useEffect(() => {
//     //     fetch("http://localhost:3000/admin/courses", {
//     //         method: "GET",
//     //         headers: {
//     //             "Authorization": "Bearer " + localStorage.getItem("token")
//     //         }  
//     //     }).then((res) => {
//     //         res.json().then((data) => {
//     //             setCourses(data);
//     //         })
//     //     })
//      axios.get("http://localhost:3000/admin/doctors",{
//             headers:{
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(res=>{
//             setCourses(res.data);
//         })
//     }, []);
//     return <div style={{display:"flex"}}>
//        Doctors
//         {/* courses is an object so need to stringify */}
        
//         {courses.map((course)=>{
//             return <Course course={course} />
//         })}
//         </div>
// }

// export function Course (props){
//     const navigate = useNavigate();
//     return <Card style={{
//         border: "2px solid black",
//         margin: 10,
//         width: 300
//     }}>
//     {/* title description all these from backend */}
//  <Typography textAlign={"centre"} variant="h4">{props.course.doctorName}</Typography>
//  <Typography textAlign={"centre"} variant="h4">{props.course.degree}</Typography>
//  {/* <Typography textAlign={"centre"} variant="h4">{props.course.price}</Typography>
//  <img style={{width:300, height:200}} src = {props.course.imageLink}></img> */}
//  <div>
//  <Button onClick={()=>{
//     // _id is the convention used for id's
//     navigate("/doctor/" + props.course._id);
//  }}>
//     Edit
//  </Button>
//  </div>
//  <div>
//  <Button onClick={async()=>{
//    axios.post
//  }}>
//     Add to the hospital
//  </Button>
//  </div>
//     </Card>
//     }
 

// export default Doctors;
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Doctors() { // Accept hospitalId as a prop
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/doctors", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setDoctors(res.data);
        }).catch(error => {
            console.error("Error fetching doctors:", error);
        });
    }, []);

   
    const { hospitalId } = useParams();
    const addToHospital = async (doctorId) => {
        
        try {
            const response = await axios.put(`http://localhost:3000/admin/hospital/${hospitalId}/adddoctor`, { doctorId }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            
            console.log(response.data);
            console.log("success"); // Log success message or handle as needed
        } catch (error) {
            console.error("Error adding doctor to hospital:", error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4">Doctors</Typography>
            {doctors.map((doctor) => {
                return (
                    <Doctor key={doctor._id} doctor={doctor} addToHospital={addToHospital} />
                );
            })}
        </div>
    );
}

function Doctor({ doctor, addToHospital }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/doctor/" + doctor._id);
    };

    return (
        <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
            <Typography textAlign="center" variant="h4">{doctor.doctorName}</Typography>
            <Typography textAlign="center" variant="h4">{doctor.degree}</Typography>
            <div>
                <Button onClick={handleEdit}>Edit</Button>
            </div>
            <div>
                <Button onClick={() => addToHospital(doctor._id)}>Add to the hospital</Button>
            </div>
        </Card>
    );
}

export default Doctors;

