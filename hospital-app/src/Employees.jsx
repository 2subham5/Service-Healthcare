
// import React, { useEffect, useState } from "react";
// import Card from '@mui/material/Card';
// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Appbar from "./Appbar";
// function Employees({ userType, userName, setUserName }) { // Accept hospitalId as a prop
//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:3000/admin/employees", {
//             headers: {
//                 "Authorization": "Bearer " + localStorage.getItem("token")
//             }
//         }).then(res => {
//             setEmployees(res.data);
//         }).catch(error => {
//             console.error("Error fetching doctors:", error);
//         });
//     }, []);


//     // const { hospitalId } = useParams();
//     // const addToHospital = async (doctorId) => {

//     //     try {
//     //         const response = await axios.put(`http://localhost:3000/admin/hospital/${hospitalId}/adddoctor`, { doctorId }, {
//     //             headers: {
//     //                 "Authorization": "Bearer " + localStorage.getItem("token")
//     //             }
//     //         });

//     //         console.log(response.data);
//     //         console.log("success"); // Log success message or handle as needed
//     //     } catch (error) {
//     //         console.error("Error adding doctor to hospital:", error);
//     //     }
//     // };

//     return (
//         <div>
//             <div>
//                 {/* Conditionally render Appbar based on userType */}
//                 {userType === "admin" || userType === "user" ? (
//                     <Appbar userName={userName} setUserName={setUserName} />
//                 ) : null}
//             </div>
//             {/* Doctor component UI */}

//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <Typography variant="h4">Employees</Typography>
//                 {employees.map((employee) => {
//                     return (
//                         <Employee key={employee._id} employee={employee}  />
//                     );
//                 })}
//             </div>
//         </div>

//     );
// }

// function Employee({ employee }) {
//     const navigate = useNavigate();

//     const handleEdit = () => {
//         navigate("/employee/" + employee._id);
//     };

//     return (
//         <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
//             <Typography textAlign="center" variant="h4">{employee.name}</Typography>
//             <Typography textAlign="center" variant="h4">{employee.designation}</Typography>
//             <div>
//                 <Button onClick={handleEdit}>Edit</Button>
//             </div>
         
//         </Card>
//     );
// }

// export default Employees;

import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";
import "./Employees.css";

function Employees({ userType, userName, setUserName }) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/employees", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setEmployees(res.data);
        }).catch(error => {
            console.error("Error fetching employees:", error);
        });
    }, []);

    return (
        <div className="employees-container">
            <div>
                {userType === "admin" || userType === "user" ? (
                    <Appbar userName={userName} setUserName={setUserName} />
                ) : null}
            </div>
            <div className="employees-list">
                <Typography variant="h4" className="employees-title">Employees</Typography>
                <div className="employees-grid">
                    {employees.map((employee) => (
                        <Employee key={employee._id} employee={employee} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Employee({ employee }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/employee/" + employee._id);
    };

    return (
        <Card className="employee-card">
            <Typography variant="h5" className="employee-name">{employee.name}</Typography>
            <Typography variant="subtitle1" className="employee-designation">{employee.designation}</Typography>
            <Button onClick={handleEdit} variant="contained" className="edit-button">Edit</Button>
        </Card>
    );
}

export default Employees;