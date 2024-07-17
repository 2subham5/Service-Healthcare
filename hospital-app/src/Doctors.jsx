

import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, CardActions, Button, Typography, 
  Container, Grid, CardHeader, Avatar
} from "@mui/material";
import { Person, School } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Appbar from "./Appbar";
import "./Doctors.css";

function Doctors({ userType, userName, setUserName }) {
  const [doctors, setDoctors] = useState([]);
  const { hospitalId } = useParams();

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

  const addToHospital = async (doctorId) => {
    try {
      const response = await axios.put(`http://localhost:3000/admin/hospital/${hospitalId}/adddoctor`, { doctorId }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      console.log(response.data);
      console.log("success");
    } catch (error) {
      console.error("Error adding doctor to hospital:", error);
    }
  };

  return (
    <div>
      {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <Container className="doctors-container">
        <Typography variant="h3" className="doctors-title">
          Our Doctors
        </Typography>
        <Grid container spacing={3} className="doctors-grid">
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Doctor doctor={doctor} addToHospital={addToHospital} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function Doctor({ doctor, addToHospital }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/doctor/" + doctor._id);
  };

  return (
    <Card className="doctor-card">
      <CardHeader
        avatar={
            <Avatar 
            sx={{ width: 56, height: 56 }}
            // alt={doctor.doctorName}
            src={doctor.imgLink}
          >
            {/* Fallback to first letter of doctor's name if image fails to load */}
            {doctor.doctorName.charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant="h6" className="doctor-name">
            {doctor.doctorName}
          </Typography>
        }
        subheader={
          <Typography variant="body2" className="doctor-degree">
            <School fontSize="small" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            {doctor.degree}
          </Typography>
        }
      />
      <CardContent className="doctor-card-content">
        {/* Add more doctor details here if needed */}
      </CardContent>
      <CardActions className="doctor-card-actions">
        <Button 
          size="small" 
          variant="outlined" 
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          onClick={() => addToHospital(doctor._id)}
          color="primary"
        >
          Add to Hospital
        </Button>
      </CardActions>
    </Card>
  );
}

export default Doctors;