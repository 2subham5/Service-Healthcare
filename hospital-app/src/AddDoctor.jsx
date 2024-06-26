import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
import Appbar from "./Appbar";
function AddDoctor({ userType, userName, setUserName }) {
    const [name, setName] = useState("");
    const [degree, setDegree] = useState("");
    const [reg, setReg] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage]= useState("");
    // const[price,setPrice]= useState(0);
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
                        setDegree(e.target.value)
                    }}
                    fullWidth={true}
                    label="Degree"
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image"
                    variant="outlined"
                />
                 <TextField
                    onChange={(e) => {
                        setReg(e.target.value)
                    }}
                    fullWidth={true}
                    label="Registration No."
                    variant="outlined"
                />
                <TextField
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                    fullWidth={true}
                    label="Specialization"
                    variant="outlined"
                />  
                <Button size={"large "} variant="contained"
                    onClick={async() => {
                       
                        await axios.post("http://localhost:3000/admin/doctor",{
                            //left is backend var : frontvar
                            doctorName:name,
                            degree:degree,
                            imgLink:image,
                            reg:reg,
                            category:category,
                            published: true,
                            
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Doctor added!");
                    }}

                >Add Doctor</Button>
            </Card>
        </div>
        </div>
    )
}

export default AddDoctor;