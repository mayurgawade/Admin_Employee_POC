import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Header from "./Header";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({});

  const data = useSelector((state) => state.auth);
  console.log('@@@@@', data)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/employee/me", {
        headers: { Authorization: token },
      });
      setEditedEmployee(response.data);
      setEmployee(response.data);
    };
    fetchEmployee();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/employee/me`,
        editedEmployee,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        alert('Updated employee Successfully ')
        setEmployee({ ...editedEmployee });
      }
    } catch (error) {
      console.error("Failed to save changes: ", error.message);
    }
  };

  const handleCancel = async () => {
    const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/employee/me", {
        headers: { Authorization: token },
      });
      setEditedEmployee(response.data);
  };

  if (!data.isAuthenticated) {
    return (
      <Typography variant="h6" textAlign="center">
        You must be logged in to view this page.
      </Typography>
    );
  }

  return (
    <>
    <Header />
            <Stack spacing={2} marginTop={10}>
              {employee ? (
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={editedEmployee.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={editedEmployee.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Mobile"
                    name="mobile"
                    variant="outlined"
                    fullWidth
                    value={editedEmployee.mobile}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    value={editedEmployee.address}
                    onChange={handleInputChange}
                  />
                  <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                  </Stack>
                </Stack>
              ) : (
                <Typography variant="body1" textAlign="center">
                  Loading...
                </Typography>
              )}
            </Stack>
    </>
  );
};

export default Dashboard;
