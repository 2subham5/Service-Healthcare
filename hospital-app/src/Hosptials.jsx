

import React, { useEffect, useState } from "react";
import { 
  Card, CardContent, CardActions, Button, Typography, 
  Container, Grid, List, ListItem, ListItemText, Divider,
  CardHeader, Avatar
} from "@mui/material";
import { LocalHospital, School } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";
import "./Hospitals.css";

function Hospitals({ userType, userName, setUserName }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/hospitals", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      setHospitals(res.data);
    });
  }, []);

  return (
    <div>
      {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <Container className="hospitals-container">
        <Typography variant="h3" className="hospitals-title">
          Our Hospitals
        </Typography>
        <Grid container spacing={3} className="hospitals-grid">
          {hospitals.map((hospital) => (
            <Grid item xs={12} sm={6} md={4} key={hospital._id}>
              <Hospital hospital={hospital} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function Hospital({ hospital }) {
  const navigate = useNavigate();

  const handleViewDoctors = () => {
    navigate("/hospital/" + hospital._id + "/doctors");
  };

  return (
    <Card className="hospital-card">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#008080' }}>
            <LocalHospital />
          </Avatar>
        }
        title={
          <Typography variant="h6" className="hospital-name">
            {hospital.name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" className="hospital-address">
            {hospital.address}
          </Typography>
        }
      />
      <CardContent className="hospital-card-content">
        <Typography variant="subtitle1" gutterBottom>
          Our Doctors:
        </Typography>
        <List className="doctor-list">
          {hospital.purchased.map((doctorId) => (
            <DoctorDetails key={doctorId} doctorId={doctorId} />
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className="hospital-card-actions">
        <Button 
          size="small" 
          variant="outlined" 
          style={{color:'#008080'}}
          onClick={() => navigate("/hospital/" + hospital._id)}
        >
          Edit
        </Button>
        <Button className="hospital-buttons"
          size="small" 
          variant="contained" 
          onClick={handleViewDoctors}
          // color="primary"
          style={{ backgroundColor: '#008080', color: '#ffffff' }}
        >
          View All Doctors
        </Button>
      </CardActions>
    </Card>
  );
}

function DoctorDetails({ doctorId }) {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/doctor/${doctorId}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      setDoctor(res.data.doctor);
    }).catch(error => {
      console.error(`Error fetching doctor ${doctorId} details:`, error);
    });
  }, [doctorId]);

  if (!doctor) {
    return null;
  }

  return (
    <ListItem className="doctor-item">
      <ListItemText 
        primary={
          <Typography variant="body1" className="doctor-name">
            {doctor.doctorName}
          </Typography>
        }
        secondary={
          <Typography variant="body2" className="doctor-degree">
            <School fontSize="small" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            {doctor.degree}
          </Typography>
        }
      />
    </ListItem>
  );
}

export default Hospitals;