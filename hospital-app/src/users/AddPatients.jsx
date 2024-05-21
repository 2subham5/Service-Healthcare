import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
import UAppbar from "./UAppbar";
import { useParams } from "react-router-dom";
function AddPatients({ userType, userName, setUserName }) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [bloodGroup, setBloodGrp] = useState("");
    const [guardian, setGuardian] = useState("");
    const [gender, setGender] = useState("");
    const [patientCurrentCondition, setpatientCurrentCondition] = useState("");
    const [patientPastHistory, setpatientPastHistory] = useState("");
    const { userId } = useParams();
    return (
        <div>
<div>
                {/* Conditionally render Appbar based on userType */}
                {userType === "admin" || userType === "user" ? (
                    <UAppbar userName={userName} setUserName={setUserName} />
                ) : null}
            </div>
        <div style={{ display: "flex", justifyContent: "centre" }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                <TextField
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    fullWidth={true}
                    label="Name"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setLocation(e.target.value)
                    }}
                    fullWidth={true}
                    label="Address"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setAge(e.target.value)
                    }}
                    fullWidth={true}
                    label="Age"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setBloodGrp(e.target.value)
                    }}
                    fullWidth={true}
                    label="Blood Group"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setGuardian(e.target.value)
                    }}
                    fullWidth={true}
                    label="Guardian"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setGender(e.target.value)
                    }}
                    fullWidth={true}
                    label="Gender"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setpatientCurrentCondition(e.target.value)
                    }}
                    fullWidth={true}
                    label="Condition"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setpatientPastHistory(e.target.value)
                    }}
                    fullWidth={true}
                    label="Past History"
                    variant="outlined"
                />
                <Button size={"large "} variant="contained"
                    onClick={async() => {
                   
                        await axios.post(`http://localhost:3000/user/${userId}/patient`,{
                            //left is backend var : frontvar
                            patientName:name,
                            age:age,
                            location:location,
                            bloodGroup:bloodGroup,
                            guardian: guardian,
                            gender:gender,
                            patientCurrentCondition:patientCurrentCondition,
                            patientPastHistory:patientPastHistory,
                            published: true,
                            
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Patient added!");
                    }}

                >Add Patient</Button>
            </Card>
        </div>
        </div>
    )
}

export default AddPatients;