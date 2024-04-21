import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Signup from './Signup'
import Login from './Login';

import Appbar from './Appbar';
import Hospitals from './Hosptials';
import Doctors from './Doctors';
import Patients from './Patients';
import AddDoctor from './AddDoctor';
import AddHospital from './AddHospital';
import AddPatients from './AddPatients';
import Hospital from './Hospital';
import Doctor from './Doctor';

// users
import USignup from './users/USignup';
import USignin from './users/USignin';
import UDoctors from './users/UDoctors'
import UHospital from './users/UHospital';
import UAppbar from './users/UAppbar';
import './App.css'



function App() {

  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState("");
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Check if the user is logged in as an admin
  //     fetch('http://localhost:3000/admin/me', {
  //         method: "GET",
  //         headers: {
  //             "Authorization": "Bearer " + token
  //         }
  //     })
  //     .then(res => res.json())
  //     .then((data) => {
  //         if (data.name) {
  //             setUserName(data.name);
  //             setUserType("admin");
  //         }
  //     })
  //     .catch(error => {
  //         // Handle error
  //         console.error("Error fetching admin data:", error);
  //     });

  //     // If not admin, check if the user is logged in as a regular user
  //     if (userType !== "admin") {
  //       fetch('http://localhost:3000/user/me', {
  //           method: "GET",
  //           headers: {
  //               "Authorization": "Bearer " + token
  //           }
  //       })
  //       .then(res => res.json())
  //       .then((data) => {
  //           if (data.name) {
  //               setUserName(data.name);
  //               setUserType("user");
  //           }
  //       })
  //       .catch(error => {
  //           // Handle error
  //           console.error("Error fetching user data:", error);
  //       });
  //     }
  //   }
  // }, [userType]); // useEffect will re-run if userType changes

  return (
    <div style={{
      width: "100vw",
      height: "100vw",
      backgroundColor: "#eeeeee"
    }} >
      <Router>
        {userType === "admin" ?
          <Appbar userName={userName} setUserName={setUserName}></Appbar> :
          <UAppbar userName={userName} setUserName={setUserName}></UAppbar>
        }
        <Routes>

        <Route path="/hospitals" element={<Hospitals />} /> 
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospital/:hospitalId/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
         <Route path="/doctor/:docId" element={<Doctor />} />  
         <Route path="/hospital/:hospitalId" element={<Hospital />} />
          <Route path="/addHospital" element={<AddHospital />} /> 
        <Route path="/addDoctor" element={<AddDoctor />} /> 
        <Route path="/addPatient" element={<AddPatients />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Users */}
           <Route path="/userlogin" element={<USignin />} />
          <Route path="/usersignup" element={<USignup />} />
          <Route path="/uDoctors" element={<UDoctors />} /> 
          <Route path="/uHospitals" element={<UHospital />} /> 


        </Routes>
      </Router>

    </div>
  )
}

export default App;
