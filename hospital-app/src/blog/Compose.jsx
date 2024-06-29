
import React, { useState } from "react";
import axios from "axios";
import './compose.css';
import Appbar from "../Appbar";
const Compose = ({ userType, userName, setUserName }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/blog/compose", {
                title: postTitle,
                content: postBody
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Post added!");
            setPostTitle('');
            setPostBody('');
        } catch (error) {
            alert("Error adding post. Please try again.");
        }
    };

    return (
        <div>
        <div>
        {/* Conditionally render Appbar based on userType */}
        {userType === "admin" || userType === "user" ? (
            <Appbar userName={userName} setUserName={setUserName} />
        ) : null}
    </div>
        <div className="compose-container">
            <h1 className="compose-title">Compose  Blog </h1>
            <form className="compose-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="postTitle">Title</label>
                    <input
                        id="postTitle"
                        className="form-control"
                        type="text"
                        name="postTitle"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Enter your post title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postBody">Content</label>
                    <textarea
                        id="postBody"
                        className="form-control"
                        name="postBody"
                        rows="10"
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                        placeholder="Write your blog post here"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Publish Post
                </button>
            </form>
        </div>
        </div>
    );
}

export default Compose;