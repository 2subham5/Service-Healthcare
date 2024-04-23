import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UDoctors() {
    const [doctors, setDoctor] = useState([]);
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
     axios.get("http://localhost:3000/user/doctors",{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res=>{
            setDoctor(res.data);
        })
    }, []);
    return <div style={{display:"flex"}}>
       Doctors
        {/* courses is an object so need to stringify */}
        
        {doctors.map((doctor)=>{
            return <Course doctor={doctor} />
        })}
        </div>
}

export function Course (props){
    const navigate = useNavigate();
    return <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
    }}>
    {/* title description all these from backend */}
 <Typography textAlign={"centre"} variant="h4">{props.doctor.doctorName}</Typography>
 <Typography textAlign={"centre"} variant="h4">{props.doctor.degree}</Typography>
 {/* <Typography textAlign={"centre"} variant="h4">{props.course.price}</Typography>
 <img style={{width:300, height:200}} src = {props.course.imageLink}></img> */}
 <div><Button onClick={()=>{
    // _id is the convention used for id's
    navigate("/udoctor/" + props.doctor._id);
 }}>
   View
 </Button></div>
    </Card>
    }

export default UDoctors;