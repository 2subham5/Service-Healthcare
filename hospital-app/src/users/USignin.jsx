import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// import Appbar from './Appbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function USignin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div>
    {/* <Appbar></Appbar> */}
        <center>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
               
            }}>
            <Typography variant={"h4"}>
            Welcome user back to my-course. Signin below
            </Typography>
                
            </div>
        </center>

        <center>
    
            <Card variant="outlined"
            style={{
                width: 400,
                padding: 20,
                marginTop: 150
            }}>
                {/* <div style={{
                border: "2px solid black",
                width: 400,
                marginTop: 150,
                padding: 20
            }}> */}
                <div>
                    <TextField
                    onChange={e => setEmail(e.target.value)}
                        fullWidth={true}
                        id={"username"}
                        label="Email"
                        variant="outlined"
                    />
                </div>
                <br />
                <div>
                    <TextField
                    onChange={e => setPassword(e.target.value)}
                        fullWidth={true}
                        id={"password"}
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                </div>

                <br />
                <Button size={"large "} variant="contained"
                onClick={async()=>{
                    const response = await axios.post("http://localhost:3000/user/login",{
                        username: email,
                        password: password
                    })
                    let data = response.data;
                    localStorage.setItem("token", data.token);
                    window.location="/upets"
                    // navigate("/upets");
                }}
                >Submit</Button>
            </Card>
        </center>


    </div>
}

export default USignin; 