
import React, { useState } from "react";
import { Button, Typography, Menu, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Appbar({ userName, setUserName }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Typography variant={"h6"}>Admin</Typography>
      </div>
      {userName ? (
        <div>
          <div>{userName}</div>
          <Button variant="contained" onClick={() => {
            localStorage.setItem("token", null);
            setUserName(null);
            navigate("/login");
          }}>
            Logout
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button variant="contained" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      )}
      <div>
        <Button variant="contained" onClick={handleClick}>
          Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate("/doctors")}>Doctors</MenuItem>
          <MenuItem onClick={() => navigate("/patients")}>Patients</MenuItem>
          <MenuItem onClick={() => navigate("/hospitals")}>Hospitals</MenuItem>
          <MenuItem onClick={() => navigate("/addHospital")}>Add Hospital</MenuItem>
          <MenuItem onClick={() => navigate("/addDoctor")}>Add Doctor</MenuItem>
          <MenuItem onClick={() => navigate("/addEmployee")}>Add Employee</MenuItem>
          <MenuItem onClick={() => navigate("/employees")}>Employees</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Appbar;
