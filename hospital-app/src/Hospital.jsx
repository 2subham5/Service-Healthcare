// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from '@mui/material/Card';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useParams } from "react-router-dom";
// import { Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// function Hospital() {
//   const navigate = useNavigate();
//   const [hospital, setHospital] = useState(null);
  
//   const { hospitalId } = useParams(); // Make sure this matches the route parameter name in your backend, i.e., petId

//   useEffect(() => {
//     // console.log("Fetching hospital with ID:", hospitalId);
//     axios.get(`http://localhost:3000/admin/hospital/${hospitalId}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((res) => {
        
//         setHospital(res.data.hospital); //  pet data is returned as res.data.pet
//       })
//       .catch((error) => {
//         console.error("Error fetching hospitals:", error);
//       });
//   }, [hospitalId]);

//   if (!hospital) {
//     return <Typography variant="h4">Loading...</Typography>;
//   }

//   return (
//     <div style={{display:"flex"}}>
//     HOSPITAL
//      {/* courses is an object so need to stringify */}
//      {/* {JSON.stringify(pet)}  */}
//      {/* {pet.map((petItem)=>{
//          return <Course course={petItem} />
//      })} */}
//      <Card style={{
//         border: "2px solid black",
//         margin: 10,
//         width: 300
//     }}>
//     {/* title description all these from backend */}
//  <Typography textAlign={"centre"} variant="h4">{hospital.name}</Typography>
//  <Typography textAlign={"centre"} variant="h4">{hospital.address}</Typography>

                
// <div>
// <UpdateCard hospital={hospital}/>
// </div>

//     </Card>
//      </div>
   
//   );
// }

// // update card

// function UpdateCard({ hospital, onUpdate }) {
//   const { hospitalId } = useParams();

//   const [updatedHospital, setUpdatedHospital] = useState({
//     name: hospital.name,
//     address: hospital.address
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedHospital((prevHospital) => ({
//       ...prevHospital,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     axios.put(`http://localhost:3000/admin/hospital/${hospitalId}`, updatedHospital, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
    
//       .then((res) => {
//         onUpdate(res.data.hospital);
//         alert("Hospital updated successfully!");
//       })
     
//       .catch((error) => {
//         console.error("Error updating hospital:", error);
//       });
//   };

//   return (
//     <Card style={{
//       border: "2px solid black",
//       margin: 10,
//       width: 300
//     }}>
//       <TextField
//         name="name"
//         label="Hospital Name"
//         value={updatedHospital.name}
//         onChange={handleChange}
//       />
//       <TextField
//         name="address"
//         label="Address"
//         value={updatedHospital.address}
//         onChange={handleChange}
//       />
    
//       <Button onClick={handleSubmit}>Update</Button>
//     </Card>
//   );
// }




// export default Hospital;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Appbar from "./Appbar";
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Hospital.css";

function Hospital({ userType, userName, setUserName }) {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const { hospitalId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/hospital/${hospitalId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setHospital(res.data.hospital);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  }, [hospitalId]);

  const handleUpdate = (updatedHospital) => {
    setHospital(updatedHospital);
  };

  if (!hospital) {
    return <Typography variant="h4" className="loading">Loading...</Typography>;
  }

  return (
    <div className="hospital-page">
    {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <Typography variant="h3" className="page-title">HOSPITAL</Typography>
      <div className="hospital-content">
        <Card className="hospital-card">
          <Typography variant="h4" className="hospital-name">{hospital.name}</Typography>
          <Typography variant="h5" className="hospital-address">{hospital.address}</Typography>
        </Card>
        <UpdateCard hospital={hospital} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}

function UpdateCard({ hospital, onUpdate }) {
  const { hospitalId } = useParams();
  const [updatedHospital, setUpdatedHospital] = useState({
    name: hospital.name,
    address: hospital.address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHospital((prevHospital) => ({
      ...prevHospital,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:3000/admin/hospital/${hospitalId}`, updatedHospital, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        onUpdate(res.data.hospital);
        alert("Hospital updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating hospital:", error);
      });
  };

  return (
    <Card className="update-card">
      <Typography variant="h5" className="update-title">Update Hospital</Typography>
      <TextField
        name="name"
        label="Hospital Name"
        value={updatedHospital.name}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="address"
        label="Address"
        value={updatedHospital.address}
        onChange={handleChange}
        className="input-field"
      />
      <Button onClick={handleSubmit} variant="contained" className="update-button">Update</Button>
    </Card>
  );
}

export default Hospital;