
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Doctor() {
  const [doctor, setDoctor] = useState(null);
  
  const { docId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/doctor/${docId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setDoctor(res.data.doctor);
      })
      .catch((error) => {
        console.error("Error fetching doctor:", error);
      });
  }, [docId]);

  if (!doctor) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
        <Typography variant="h4">Doctor Details</Typography>
        <img style={{width:300, height:200}} src = {doctor.imgLink}></img>
        <Typography variant="h6">Name: {doctor.doctorName}</Typography>
        <Typography variant="h6">Degree: {doctor.degree}</Typography>
        <Typography variant="h6">Registration Number: {doctor.reg}</Typography>
        <Typography variant="h6">Category: {doctor.category}</Typography>
        <Typography variant="h6">Patients: {doctor.purchased}</Typography>
      </Card>
      <div>
      <UpdateCard doctor={doctor}/>
      </div>
    </div>

  );
}




// update card

function UpdateCard({ doctor, onUpdate }) {
    const { docId } = useParams();
  
    const [updatedDoc, setUpdatedDoc] = useState({
      doctorName: doctor.doctorName,
      degree: doctor.degree,
      reg: doctor.reg,
      category: doctor.category,
      imgLink: doctor.imgLink
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedDoc((prevDoc) => ({
        ...prevDoc,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      axios.put(`http://localhost:3000/admin/doctor/${docId}`, updatedDoc, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      
        .then((res) => {
          onUpdate(res.data.doctor);
          alert("Doctor updated successfully!");
        })
       
        .catch((error) => {
          console.error("Error updating doctor:", error);
        });
    };
  
    return (
      <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
      }}>
        <TextField
          name="doctorName"
          label="Doctor Name"
          value={updatedDoc.doctorName}
          onChange={handleChange}
        />
        <TextField
          name="degree"
          label="Degree"
          value={updatedDoc.degree}
          onChange={handleChange}
        />
        <TextField
          name="reg"
          label="Registration Number"
          value={updatedDoc.reg}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="Category"
          value={updatedDoc.category}
          onChange={handleChange}
        />
         <TextField
          name="img"
          label="Image Link"
          value={updatedDoc.imgLink}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Update</Button>
      </Card>
    );
  }




export default Doctor;
