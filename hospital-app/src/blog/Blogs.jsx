import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
const Blogs = ()=>{
   
    const [contents, setContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/blog/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setContent(res.data);
        }).catch(error => {
            console.error("Error fetching doctors:", error);
        });
    }, []);

    return (
        <div>
               {contents.map((content) => {
                    return (
                        <Content key={content._id} content={content} />
                    );
                })}
        </div>
    )
}
function Content({content}) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/blog/edit/" + content._id);
    };

    return (
        <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
            <Typography textAlign="center" variant="h4">{content.title}</Typography>
            <Typography textAlign="center" variant="">{content.content}</Typography>
            <div>
                <Button onClick={handleEdit}>Edit</Button>
            </div>
           
        </Card>
    );
}
export default Blogs;