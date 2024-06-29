import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Appbar from "../Appbar";
import './edit.css';
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
        {userType === "admin" || userType === "user" ? (
          <Appbar userName={userName} setUserName={setUserName} />
        ) : null}
      </div>
      <div className="edit-container">
        <Card className="blog-card">
          <Typography variant="h4">Current Blog Post</Typography>
          <Typography variant="h6" className="blog-title">{content.title}</Typography>
          <Typography variant="body1" className="blog-content">{content.content}</Typography>
        </Card>
        <UpdateCard content={content} />
      </div>
    </div>
  );
}

function UpdateCard({ content }) {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [updatedBlog, setUpdatedBlog] = useState({
    title: content.title,
    content: content.content
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      .then(() => {
        alert("Blog updated successfully!");
        navigate('/blogs');  // Redirect to blog list after update
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        alert("Failed to update blog. Please try again.");
      });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`http://localhost:3000/blog/${blogId}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });
        alert('Post deleted successfully');
        navigate('/blogs');  // Redirect to blog list after deletion
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  return (
    <Card className="edit-form">
      <Typography variant="h4">Edit Blog Post</Typography>
      <TextField
        name="title"
        label="Title"
        value={updatedBlog.title}
        onChange={handleChange}
        className="form-field"
      />
      <TextField
        name="content"
        label="Content"
        value={updatedBlog.content}
        onChange={handleChange}
        multiline
        rows={4}
        className="form-field"
      />
      <div className="button-group">
        <Button onClick={handleSubmit} className="update-button">Update</Button>
        <Button onClick={handleDelete} className="delete-button">Delete Blog</Button>
      </div>
    </Card>
  );
}

export default Edit;