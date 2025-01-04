import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Shared/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const EmployeeList = ({ onSelectionChange }) => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/employees", {
          headers: { Authorization: token },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error.message);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    onSelectionChange(selectedEmployees);
  }, [selectedEmployees, onSelectionChange]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (employee) => {
    navigate("/edit-employee", { state: employee });
  };

  const handleDeleteClick = (id) => {
    setDeleteEmployeeId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/employees/${deleteEmployeeId}`,
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        setEmployees((prev) =>
          prev.filter((emp) => emp._id !== deleteEmployeeId)
        );
      }
    } catch (error) {
      console.error("Failed to delete employee:", error.message);
    }
    setShowDeletePopup(false);
  };

  const handleSelectAllChange = () => {
    if (selectedEmployees.length === paginatedEmployees.length) {
      setSelectedEmployees([]); // Deselect all
    } else {
      setSelectedEmployees(paginatedEmployees.map((emp) => emp._id)); // Select all
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  const paginatedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>
                <Checkbox
                  checked={selectedEmployees.length === paginatedEmployees.length}
                  onChange={handleSelectAllChange}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedEmployees.includes(emp._id)}
                    onChange={() => handleCheckboxChange(emp._id)}
                  />
                </TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.address}</TableCell>
                <TableCell>{emp.mobile}</TableCell>
                <TableCell>
                  <Button className="actionButtons" onClick={() => handleEdit(emp)}>
                    <FontAwesomeIcon icon={faPencilAlt}  color="orange"/>
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(emp._id)}
                    color="error"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        total={employees.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <Dialog open={showDeletePopup} onClose={() => setShowDeletePopup(false)}>
        <DialogTitle color="gray">Delete Employee</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="gray">
            Are you sure you want to delete this employee?
          </Typography>
          <Typography variant="body2" color="orange">
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
    </div>
  );
};

export default EmployeeList;
