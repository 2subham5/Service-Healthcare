import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Appbar({ userName, setUserName }) {
    const navigate = useNavigate();
    // const [userName, setUserName] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:3000/admin/me', {
    //         method: "GET",
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //     .then(res => res.json())
    //     .then((data) => {
    //         if (data.name) {
    //             setUserName(data.name);
    //         }
    //     });
    // }, []);

    if (userName) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <Typography variant={"h6"}>Nucleus</Typography>
                </div>
                <div>{userName}</div>
                <div>
                    <Button variant={"contained"} onClick={() => {
                        localStorage.setItem("token", null);

                        setUserName(null)
                        window.location = "/login"
                    }}>
                        Logout
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <Typography variant={"h6"}>Nucleus</Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"contained"} onClick={() => navigate("/signup")}>
                            Signup
                        </Button>
                    </div>
                    <div>
                        <Button variant={"contained"} onClick={() => navigate("/login")}>
                            Login
                        </Button>

                    </div>

                </div>
            </div>
        );
    }
}

export default Appbar;

