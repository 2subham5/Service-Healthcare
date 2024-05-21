
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Appbar from "./Appbar";
function Doctors({ userType, userName, setUserName }) { // Accept hospitalId as a prop
    const [doctors, setDoctors] = useState([]);

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


    const { hospitalId } = useParams();
    const addToHospital = async (doctorId) => {

        try {
            const response = await axios.put(`http://localhost:3000/admin/hospital/${hospitalId}/adddoctor`, { doctorId }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            console.log(response.data);
            console.log("success"); // Log success message or handle as needed
        } catch (error) {
            console.error("Error adding doctor to hospital:", error);
        }
    };

    return (
        <div>
            <div>
                {/* Conditionally render Appbar based on userType */}
                {userType === "admin" || userType === "user" ? (
                    <Appbar userName={userName} setUserName={setUserName} />
                ) : null}
            </div>
            {/* Doctor component UI */}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4">Doctors</Typography>
                {doctors.map((doctor) => {
                    return (
                        <Doctor key={doctor._id} doctor={doctor} addToHospital={addToHospital} />
                    );
                })}
            </div>
        </div>

    );
}

function Doctor({ doctor, addToHospital }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/doctor/" + doctor._id);
    };

    return (
        <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
            <Typography textAlign="center" variant="h4">{doctor.doctorName}</Typography>
            <Typography textAlign="center" variant="h4">{doctor.degree}</Typography>
            <div>
                <Button onClick={handleEdit}>Edit</Button>
            </div>
            <div>
                <Button onClick={() => addToHospital(doctor._id)}>Add to the hospital</Button>
            </div>
        </Card>
    );
}

export default Doctors;

