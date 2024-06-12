
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Appbar from "../Appbar";
function Edit({ userType, userName, setUserName }) {
  const [content, setContent] = useState(null);

  const { blogId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/blog/post/${blogId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setContent(res.data.post);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
      });
  }, [blogId]);

  if (!content) {
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
          <Typography variant="h4">Blog</Typography>
          
          <Typography variant="h6"> {content.title}</Typography>
          <Typography variant="p"> {content.content}</Typography>

        </Card>
        <div>
          {/* inside the bracket it's the state */}
          <UpdateCard content={content} />
        </div>
      </div>
      </div>

      );
}




      // update card

      function UpdateCard({content, onUpdate}) {
  const {blogId} = useParams();

      const [updatedBlog, setUpdatedBlog] = useState({
       title:content.title,
       content: content.content
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUpdatedBlog((prevBlog) => ({
        ...prevBlog,
        [name]: value,
    }));
  };

  const handleSubmit = () => {
        axios.put(`http://localhost:3000/blog/edit/${blogId}`, updatedBlog, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })

          .then((res) => {
            onUpdate(res.data.post);
            alert("Blog updated successfully!");
          })

          .catch((error) => {
            console.error("Error updating doctor:", error);
          });
  };

      return (
      <Card style={{
        border: "2px solid black",
        margin: 10,
        width: 300
      }}>
        <TextField
          name="title"
          label="Title"
          value={updatedBlog.title}
          onChange={handleChange}
        />
        <TextField
          name="degree"
          label="Degree"
          value={updatedBlog.content}
          onChange={handleChange}
        />
       
        <Button onClick={handleSubmit}>Update</Button>
      </Card>
      );
}




      export default Edit;
