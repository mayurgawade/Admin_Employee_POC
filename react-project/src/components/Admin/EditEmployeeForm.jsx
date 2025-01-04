import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import Header from "../Shared/Header";

const EditEmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id = "", name = "", email = "", address = "", mobile = "" } = location.state || {};
  
  const [formData, setFormData] = useState({
    _id: _id,
    name: name,
    email: email,
    mobile: mobile,
    address: address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/employees/${formData._id}`,
        formData,
        {
          headers: { Authorization: token },
        }
      );
      if (response.status === 200) {
        // You can navigate back to the manage employees page or update the list via context or global state
        navigate("/manage-employees"); // Navigate back after saving
      }
    } catch (error) {
      console.error("Failed to save changes: ", error.message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Edit Employee
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              color="gray"
              onClick={() => navigate("/manage-employees")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditEmployee}
            >
              Save
            </Button>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default EditEmployeeForm;
