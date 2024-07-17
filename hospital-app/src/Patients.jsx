// import { useEffect, useState } from "react";
// import Card from '@mui/material/Card';
// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Appbar from "./Appbar";
// function Patients({ userType, userName, setUserName }) {
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
//      axios.get("http://localhost:3000/admin/patients",{
//             headers:{
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(res=>{
//             setCourses(res.data);
//         })
//     }, []);
//     return (
//         <div>
//         <div>
//         {/* Conditionally render Appbar based on userType */}
//         {userType === "admin" || userType === "user" ? (
//             <Appbar userName={userName} setUserName={setUserName} />
//         ) : null}
//     </div>
//     <div style={{display:"flex"}}>
//        Patients
//         {/* courses is an object so need to stringify */}
        
//         {courses.map((course)=>{
//             return <Course course={course} />
//         })}
//         </div>
//         </div>
//     )
// }

// export function Course (props){
//     const navigate = useNavigate();
//     return <Card style={{
//         border: "2px solid black",
//         margin: 10,
//         width: 300
//     }}>
//     {/* title description all these from backend */}
//  <Typography textAlign={"centre"} variant="h4">{props.course.patientName}</Typography>
//  <Typography textAlign={"centre"} variant="h4">{props.course.patientCurrentCondition}</Typography>
//   <Typography textAlign={"centre"} variant="h4">{props.course.age}</Typography>
//  {/* <img style={{width:300, height:200}} src = {props.course.imageLink}></img>  */}
//  {/* <div><Button onClick={()=>{
//     // _id is the convention used for id's
//     navigate("/pet/" + props.course._id);
//  }}>
//     Edit
//  </Button></div> */}
//     </Card>
//     }

// export default Patients;

import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, CardActions, Button, Typography, 
  Container, Grid, CardHeader, Avatar
} from "@mui/material";
import { Person, Healing, Cake } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";
import "./Patients.css";

function Patients({ userType, userName, setUserName }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/patients", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      setPatients(res.data);
    }).catch(error => {
      console.error("Error fetching patients:", error);
    });
  }, []);

  return (
    <div>
      {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <Container className="patients-container">
        <Typography variant="h3" className="patients-title">
          Our Patients
        </Typography>
        <Grid container spacing={3} className="patients-grid">
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient._id}>
              <Patient patient={patient} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function Patient({ patient }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/patient/" + patient._id);
  };

  return (
    <Card className="patient-card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#3498db' }}>
            <Person />
          </Avatar>
        }
        title={
          <Typography variant="h6" className="patient-name">
            {patient.patientName}
          </Typography>
        }
      />
      <CardContent className="patient-card-content">
        <Typography variant="body1" className="patient-condition">
          <Healing fontSize="small" style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Current Condition: {patient.patientCurrentCondition}
        </Typography>
        <Typography variant="body2" className="patient-age">
          <Cake fontSize="small" style={{ marginRight: 8, verticalAlign: 'middle' }} />
          Age: {patient.age}
        </Typography>
      </CardContent>
      <CardActions className="patient-card-actions">
        <Button 
          size="small" 
          variant="outlined" 
          onClick={handleEdit}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

export default Patients;