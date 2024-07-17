// import { TextField } from "@mui/material";
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import { useState } from "react";
// import axios from "axios";
// import Appbar from "./Appbar";
// function AddHospital({ userType, userName, setUserName }) {
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("");
//     // const [image, setImage]= useState("");
//     // const[price,setPrice]= useState(0);
//     return (
//         <div>
//         <div>
//         {/* Conditionally render Appbar based on userType */}
//         {userType === "admin" || userType === "user" ? (
//           <Appbar userName={userName} setUserName={setUserName} />
//         ) : null}
//       </div>
//         <div style={{ display: "flex", justifyContent: "centre" }}>
//             <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
//                 <TextField
//                     onChange={(e) => {
//                         setName(e.target.value)
//                     }}
//                     fullWidth={true}
//                     label="Name"
//                     variant="outlined"
//                 />
//                 <TextField
//                     onChange={(e) => {
//                         setAddress(e.target.value)
//                     }}
//                     fullWidth={true}
//                     label="Address"
//                     variant="outlined"
//                 />
//                 {/* <TextField
//                     onChange={(e) => {
//                         setImage(e.target.value)
//                     }}
//                     fullWidth={true}
//                     label="Image"
//                     variant="outlined"
//                 /> */}
              
//                 <Button size={"large "} variant="contained"
//                     onClick={async() => {
                   
//                         await axios.post("http://localhost:3000/admin/hospital",{
//                             //left is backend var : frontvar
//                             name:name,
//                             address:address,
//                             published: true,
                            
//                         },
//                         {
//                             headers:{
//                                 "Authorization": "Bearer " + localStorage.getItem("token")
//                             }
//                         });
//                         alert("Doctor added!");
//                     }}

//                 >Add Hospital</Button>
//             </Card>
//         </div>
//         </div>
//     )
// }

// export default AddHospital;

import React, { useState } from "react";
import { 
  TextField, Button, Card, Typography, Container, 
  CircularProgress, Snackbar
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import axios from "axios";
import Appbar from "./Appbar";
import "./AddHospital.css";

function AddHospital({ userType, userName, setUserName }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/admin/hospital", {
        name: name,
        address: address,
        published: true,
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      setSnackbar({ open: true, message: "Hospital added successfully!" });
      setName("");
      setAddress("");
    } catch (error) {
      setSnackbar({ open: true, message: "Error adding hospital. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {userType === "admin" || userType === "user" ? (
        <Appbar userName={userName} setUserName={setUserName} />
      ) : null}
      <Container className="add-hospital-container">
        <Card className="add-hospital-card">
          <Typography variant="h4" className="add-hospital-title">
            <LocalHospital fontSize="large" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
            Add New Hospital
          </Typography>
          <form onSubmit={handleSubmit} className="add-hospital-form">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label="Hospital Name"
              variant="outlined"
              required
            />
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              label="Hospital Address"
              variant="outlined"
              required
            />
            <Button 
              className="add-hospital-button"
              type="submit"
              size="large" 
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Hospital"}
            </Button>
          </form>
        </Card>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
}

export default AddHospital;