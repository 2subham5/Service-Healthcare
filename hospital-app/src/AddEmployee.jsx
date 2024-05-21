import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
import Appbar from "./Appbar";
function AddEmployee({ userType, userName, setUserName }) {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");

    return (
        <div>
        <div>
        {/* Conditionally render Appbar based on userType */}
        {userType === "admin" || userType === "user" ? (
            <Appbar userName={userName} setUserName={setUserName} />
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
                        setDesignation(e.target.value)
                    }}
                    fullWidth={true}
                    label="Designation"
                    variant="outlined"
                />
                
                <Button size={"large "} variant="contained"
                    onClick={async() => {
                       
                        await axios.post("http://localhost:3000/admin/employee",{
                            //left is backend var : frontvar
                            name:name,
                            designation:designation,
                            published: true,
                            
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Employee added!");
                    }}

                >Add Employee</Button>
            </Card>
        </div>
        </div>
    )
}

export default AddEmployee;