import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import Header from "../Shared/Header";

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    role: "employee", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post("http://localhost:3000/api/register", formData);
      navigate("/manage-employees"); // Redirect back to Admin Dashboard
    } catch (error) {
      alert("Failed to add employee: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <div>
          <Typography variant="h4" gutterBottom>
            Add Employee
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
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                color="gray"
                onClick={() => navigate("/manage-employees")}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddEmployee}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </div>
      </Container>
    </>
  );
};

export default AddEmployeeForm;
