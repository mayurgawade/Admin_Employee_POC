import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidPhone = /^[0-9]{10}$/;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    role: "employee",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
  });

  const handleRegister = async () => {
    let valid = true;
    let validationErrors = {};

    if (!isValidEmail.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!isValidPhone.test(formData.mobile)) {
      validationErrors.mobile = "Please enter a valid 10-digit phone number";
      valid = false;
    }

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/register", formData);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card variant="outlined" sx={{ width: '100%', padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Register
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Mobile No"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <TextField
                label="Role"
                select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </TextField>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleRegister}>
                  Register
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
                  Back
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
