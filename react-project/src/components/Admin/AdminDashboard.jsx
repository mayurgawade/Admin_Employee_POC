import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import Header from "../Shared/Header";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

const AdminDashboard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/add-employee"); // Navigate to add employee form
  };

  const handleDeleteSelected = () => {
    if (!selectedEmployees.length) {
      window.alert("Please select records to delete...");
      return;
    }
    setShowDeletePopup(true); // Show delete confirmation popup
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete("http://localhost:3000/api/employees", {
        headers: { Authorization: token },
        data: { employeeIds: selectedEmployees },
      });
      if (response.status === 200) {
        setSelectedEmployees([]); // Clear selection
        setRefreshKey((prevKey) => prevKey + 1); // Trigger refresh
      }
    } catch (error) {
      console.error("Failed to delete employees: ", error.message);
    }
    setShowDeletePopup(false);
  };

  return (
    <>
    <Header />
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="h4">Manage Employees</Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
            >
            <RemoveCircleRoundedIcon color="white"/>
            Delete
            </Button>
            <Button
            variant="contained"
            color="success"
            onClick={handleAddEmployee}
            > 
            <AddCircleRoundedIcon color="white"/>
            Add New Employee
            </Button>
        </Stack>
        </Stack>

          <EmployeeList key={refreshKey} onSelectionChange={setSelectedEmployees} />
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeletePopup} onClose={() => setShowDeletePopup(false)}>
          <DialogTitle color="gray">Delete Employee</DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="gray">
              Are you sure you want to delete these records?
            </Typography>
            <Typography variant="body2" color="orange" sx={{ marginTop: 2 }}>
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeletePopup(false)} color="gray">
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default AdminDashboard;
