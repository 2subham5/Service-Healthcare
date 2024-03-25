import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Hospitals() {
 
 
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
     axios.get("http://localhost:3000/admin/hospitals",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>{
            setCourses(res.data);
        })
    }, []);
   
    return <div style={{display:"flex"}}>
       HOSPITALS
        {/* courses is an object so need to stringify */}
        
        {courses.map((course)=>{
            return <Course course={course} />
        })}
        </div>
}

export function Course (props){
    const navigate = useNavigate();
    const { hospitalId } = useParams();
    const handleViewDoctors = () => {
        navigate("/hospital/" + props.course._id + "/doctors"); // Navigate to Doctors component with hospital ID
      };
    return <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{props.course.name}</Typography>
 <Typography textAlign={"centre"} variant="h4">{props.course.address}</Typography>

 <div>
 <Button onClick={()=>{
    // _id is the convention used for id's
    navigate("/hospital/" + props.course._id);
 }}>
    Edit
 </Button>
 </div>
 <div>
 <Button onClick={handleViewDoctors}>View Doctors</Button> {/* Button to view doctors */}

 </div>
    </Card>
    }

export default Hospitals;