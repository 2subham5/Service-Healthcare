
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Appbar from "../Appbar";
function FullBlog({ userType, userName, setUserName }) {
  const [doctor, setDoctor] = useState(null);

  const { docId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/blog/${docId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setDoctor(res.data.blog);
      })
      .catch((error) => {
        console.error("Error fetching doctor:", error);
      });
  }, [docId]);

  if (!doctor) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <div>
        {/* Conditionally render Appbar based on userType */}
        {userType === "admin" || userType === "user" ? (
          <Appbar userName={userName} setUserName={setUserName} />
        ) : null}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ border: "2px solid black", margin: 10, width: 300 }}>
          <Typography variant="h4">Doctor Details</Typography>
  
          <Typography variant="h6">Name: {blog.title}</Typography>
          <Typography variant="h6">Degree: {blog.content}</Typography>
         
        </Card>
       
      </div>
      </div>

      );
}




 




      export default FullBlog;
