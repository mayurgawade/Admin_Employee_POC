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
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", credentials);
      const { token, role } = response.data;


      // Dispatch login action

      dispatch(login({ token, role }));

      // Save token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      

      if (role === "admin" || role === "employee") navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card variant="outlined" sx={{ width: '100%', padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Login
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
              <TextField
                label="Password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
