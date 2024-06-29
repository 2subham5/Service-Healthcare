

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import Appbar from "../Appbar";
const Blogs = ({ userType, userName, setUserName }) => {
    const [contents, setContent] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/blog/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setContent(res.data);
        }).catch(error => {
            console.error("Error fetching blogs:", error);
        });
    }, []);

    return (
        <div>
        <div>
        {/* Conditionally render Appbar based on userType */}
        {userType === "admin" || userType === "user" ? (
            <Appbar userName={userName} setUserName={setUserName} />
        ) : null}
    </div>
        <div className="blog-container">
            <h1 className="blog-title">Blog Posts</h1>
            <div className="blog-grid">
                {contents.map((content) => (
                    <Content key={content._id} content={content} />
                ))}
            </div>
        </div>
        </div>
    )
}

function Content({ content }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/blog/edit/" + content._id);
    };

    return (
        <div className="blog-card">
            <h2 className="blog-card-title">{content.title}</h2>
            <p className="blog-card-content">
                { content.content}
            </p>
            <div className="blog-card-actions">
                <button onClick={handleEdit} className="blog-card-button">Edit</button>
                {/* <button onClick={() => navigate(`/blog/${content._id}`)} className="blog-card-button">Read More</button> */}
            </div>
        </div>
    );
}

export default Blogs;