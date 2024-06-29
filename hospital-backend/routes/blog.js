const express = require('express');
const { Post  } = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminSecret } = require("../middleware/auth");
const { authenticateAdminJwt } = require("../middleware/auth"); // Importing authenticateJwt middleware

const router = express.Router();

router.get("/",authenticateAdminJwt,async(req,res)=>{
    try {
        // At this point, if the request has reached here, it means authentication was successful
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/:blogId", authenticateAdminJwt, async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const blog = await Post.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        
        res.json(blog);
    } catch (error) {
        console.error("Error fetching blog post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/compose",authenticateAdminJwt, async(req,res)=>{

    try{
        const post = new Post(req.body);
        await post.save();
        
        res.json({ message: "Post added successfully", postId: post.id });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/post/:postId",authenticateAdminJwt, async(req,res)=>{
    try{
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        // console.log(employee);
        res.json({post})
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"failed"})
        }
})
// update
router.put('/edit/:blogId', authenticateAdminJwt, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.blogId, req.body, { new: true });
        if (post) {
            res.status(200).json({ message: "Updated", blog });
        } else {
            res.status(404).json({ message: "Blog doesn't exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update Blog" });
    }
});
router.delete('/:blogId', authenticateAdminJwt, async (req,res)=>{
    try{
        const blogId = req.params.blogId;
        const deleteBlog = await Post.findByIdAndDelete(blogId);
        if (!deleteBlog) {
            return res.status(404).json({ message: 'Blog not found' });
          }
          res.status(200).json({ message: 'Blog not found'});
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
      }
    
})
module.exports = router;