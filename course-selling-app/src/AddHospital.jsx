import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useState } from "react";
import axios from "axios";
function AddHospital() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    // const [image, setImage]= useState("");
    // const[price,setPrice]= useState(0);
    return (
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
                        setAddress(e.target.value)
                    }}
                    fullWidth={true}
                    label="Address"
                    variant="outlined"
                />
                {/* <TextField
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image"
                    variant="outlined"
                /> */}
              
                <Button size={"large "} variant="contained"
                    onClick={async() => {
                   
                        await axios.post("http://localhost:3000/admin/hospital",{
                            //left is backend var : frontvar
                            name:name,
                            address:address,
                            published: true,
                            
                        },
                        {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Doctor added!");
                    }}

                >Add Hospital</Button>
            </Card>
        </div>
    )
}

export default AddHospital;