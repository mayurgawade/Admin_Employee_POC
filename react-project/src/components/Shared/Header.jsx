import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

  const role = localStorage.getItem("role"); // Get user role from localStorage
  const dashboardTitle = role === "admin" ? "Admin Dashboard" : "Employee Dashboard";

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" sx={{ marginBottom: 2 }}>
      <Toolbar>
        {dashboardTitle && (
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {dashboardTitle}
        </Typography>
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Conditionally render the "Manage Employees" button for admin role */}
          {role === "admin" && (
            <>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>
              Edit Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/manage-employees")}>
              Manage Employees
            </Button>
            </>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
