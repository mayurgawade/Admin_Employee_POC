const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: "Failed to authenticate token" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};


// Edit admin profile (Admin only)
router.put("/admin/profile", authenticate, async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Access denied" });

  try {
    console.log('update admin profile');
    const admin = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: "Error updating admin profile" });
  }
});

// Get all employees (Admin only)
router.get("/employees", authenticate, async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Access denied" });

  try {
    console.log('get employees');
    let employees = await User.find({ role: "employee" });
    // employees = {role: req.userRole, ...employees}
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// Update employee (Admin only)
router.put("/employees/:id", authenticate, async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Access denied" });

  try {
    console.log('update employee from admin');
    const employee = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error updating employee" });
  }
});

// Delete employee (Admin only)
router.delete("/employees/:id", authenticate, async (req, res) => {
  console.log('delete employee from admin');
  if (req.userRole !== "admin") return res.status(403).json({ error: "Access denied" });

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee" });
  }
});

// Delete Many Employees (Admin only)
router.delete("/employees", authenticate, async (req, res) => {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Access denied" });

  const { employeeIds } = req.body; // Array of employee IDs to delete
  if (!employeeIds || !Array.isArray(employeeIds)) {
    return res.status(400).json({ error: "Invalid or missing employeeIds array" });
  }

  try {
    await User.deleteMany({ _id: { $in: employeeIds } });
    res.json({ message: "Employees deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employees" });
  }
});

// Get employee details (Employee)
router.get("/employee/me", authenticate, async (req, res) => {
  console.log('get employee for employee');
  try {
    const employee = await User.findById(req.userId);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee details" });
  }
});

// Update employee details for employee
router.put("/employee/me", authenticate, async (req, res) => {
  console.log('update employee for employee');
  try {
    const employee = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error updating employee details" });
  }
});

module.exports = router;
