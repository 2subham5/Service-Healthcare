import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import Appbar from './Appbar';
import { useState } from 'react';
function USignup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div>
     
        <center>

            <div style={{
                paddingTop: 150,
                marginBottom: 10,

            }}>
                <Typography variant={"h4"}>
                    Welcome user to my-course. Signup for fun
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
                        onChange={e => setName(e.target.value)}
                        id={"name"}
                        fullWidth={true}
                        // id="outlined-basic"
                        label="Username"
                        variant="outlined"
                    />
                </div>
                <br />
                <div>
                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        id={"username"}
                        fullWidth={true}
                        // id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                </div>
                <br />
                <div>
                    <TextField
                        onChange={e => setPassword(e.target.value)}
                        id={"password"}
                        fullWidth={true}
                        // id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                </div>

                <br />
                <Button size={"large "} variant="contained"
                    onClick={async() => {

                        // fetch("http://localhost:3000/admin/signup", {
                        //     method: "POST",
                        //     body: JSON.stringify({
                        //         username: email,
                        //         password: password
                        //     }),
                        //     headers: {
                        //         "Content-type": "application/json"
                        //     }
                        // })
                        //     .then(res => res.json())
                        //     .then((data) =>{ localStorage.setItem("token", data.token)
                        //            });
                      const response = await  axios.post("http://localhost:3000/user/signup",{
                            // username is the key of server side and email is what we have used in frontend
                            name: name,
                            username: email,
                            password: password
                        })
                            let data = response.data;
                            localStorage.setItem("token", data.token);
                           navigate("/upets")

                        
                         
                    }}>Submit</Button>
            </Card>
        </center>


    </div>
}

export default USignup; 