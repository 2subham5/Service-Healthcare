import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './landing.css'; // Importing CSS file for styling

const Landing = () => {
    const navigate = useNavigate();
    const handleAdminButtonClick = () => {
        navigate('/admin', { state: { userType: 'admin' } });
      };
    
      // Function to handle user button click
      const handleUserButtonClick = () => {
        navigate('/user', { state: { userType: 'user' } });
      };
    
      return (
        <div className="landing-container">
          <h1>Welcome to Our Platform</h1>
          <Button variant="contained" onClick={handleAdminButtonClick}>Admin</Button>
          <Button variant="contained" onClick={handleUserButtonClick}>User</Button>
        </div>
      );
}

export default Landing;
