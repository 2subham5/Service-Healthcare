
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from '@mui/material/Card';
// import { useParams } from "react-router-dom";
// import { Typography } from "@mui/material";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Appbar from "./Appbar";
// function Doctor({ userType, userName, setUserName }) {
//   const [doctor, setDoctor] = useState(null);

//   const { docId } = useParams();

//   useEffect(() => {
//     axios.get(`http://localhost:3000/admin/doctor/${docId}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => {
//         setDoctor(res.data.doctor);
//       })
//       .catch((error) => {
//         console.error("Error fetching doctor:", error);
//       });
//   }, [docId]);

//   if (!doctor) {
//     return <Typography variant="h4">Loading...</Typography>;
//   }

//   return (
//     <div>
//       <div>
//         {/* Conditionally render Appbar based on userType */}
//         {userType === "admin" || userType === "user" ? (
//           <Appbar userName={userName} setUserName={setUserName} />
//         ) : null}
//       </div>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
//           <Typography variant="h4">Doctor Details</Typography>
//           <img style={{ width: 300, height: 200 }} src={doctor.imgLink}></img>
//           <Typography variant="h6">Name: {doctor.doctorName}</Typography>
//           <Typography variant="h6">Degree: {doctor.degree}</Typography>
//           <Typography variant="h6">Registration Number: {doctor.reg}</Typography>
//           <Typography variant="h6">Category: {doctor.category}</Typography>
//           <Typography variant="h6">Patients: {doctor.purchased}</Typography>
//         </Card>
//         <div>
//           {/* inside the bracket it's the state */}
//           <UpdateCard doctor={doctor} />
//         </div>
//       </div>
//       </div>

//       );
// }




//       // update card

//       function UpdateCard({doctor, onUpdate}) {
//   const {docId} = useParams();

//       const [updatedDoc, setUpdatedDoc] = useState({
//         doctorName: doctor.doctorName,
//       degree: doctor.degree,
//       reg: doctor.reg,
//       category: doctor.category,
//       imgLink: doctor.imgLink
//   });

//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     setUpdatedDoc((prevDoc) => ({
//         ...prevDoc,
//         [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//         axios.put(`http://localhost:3000/admin/doctor/${docId}`, updatedDoc, {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         })

//           .then((res) => {
//             onUpdate(res.data.doctor);
//             alert("Doctor updated successfully!");
//           })

//           .catch((error) => {
//             console.error("Error updating doctor:", error);
//           });
//   };

//       return (
//       <Card style={{
//         border: "2px solid black",
//         margin: 10,
//         width: 300
//       }}>
//         <TextField
//           name="doctorName"
//           label="Doctor Name"
//           value={updatedDoc.doctorName}
//           onChange={handleChange}
//         />
//         <TextField
//           name="degree"
//           label="Degree"
//           value={updatedDoc.degree}
//           onChange={handleChange}
//         />
//         <TextField
//           name="reg"
//           label="Registration Number"
//           value={updatedDoc.reg}
//           onChange={handleChange}
//         />
//         <TextField
//           name="category"
//           label="Category"
//           value={updatedDoc.category}
//           onChange={handleChange}
//         />
//         <TextField
//           name="img"
//           label="Image Link"
//           value={updatedDoc.imgLink}
//           onChange={handleChange}
//         />
//         <Button onClick={handleSubmit}>Update</Button>
//       </Card>
//       );
// }




//       export default Doctor;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Appbar from "./Appbar";
import "./Doctor.css";

function Doctor({ userType, userName, setUserName }) {
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

  const handleUpdate = (updatedDoctor) => {
    setDoctor(updatedDoctor);
  };

  if (!doctor) {
    return <Typography variant="h4" className="loading">Loading...</Typography>;
  }

  return (
    <div className="doctor-page">
      {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <div className="doctor-content">
        <Card className="doctor-card">
          <Typography variant="h4" className="card-title">Doctor Details</Typography>
          <img className="doctor-image" src={doctor.imgLink} alt={doctor.doctorName} />
          <Typography variant="h6">Name: {doctor.doctorName}</Typography>
          <Typography variant="h6">Degree: {doctor.degree}</Typography>
          <Typography variant="h6">Registration Number: {doctor.reg}</Typography>
          <Typography variant="h6">Category: {doctor.category}</Typography>
          <Typography variant="h6">Patients: {doctor.purchased}</Typography>
        </Card>
        <UpdateCard doctor={doctor} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}

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
    <Card className="update-card">
      <Typography variant="h5" className="card-title">Update Doctor</Typography>
      <TextField
        name="doctorName"
        label="Doctor Name"
        value={updatedDoc.doctorName}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="degree"
        label="Degree"
        value={updatedDoc.degree}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="reg"
        label="Registration Number"
        value={updatedDoc.reg}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="category"
        label="Category"
        value={updatedDoc.category}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="imgLink"
        label="Image Link"
        value={updatedDoc.imgLink}
        onChange={handleChange}
        className="input-field"
      />
      <Button onClick={handleSubmit} variant="contained" className="update-button">Update</Button>
    </Card>
  );
}

export default Doctor;