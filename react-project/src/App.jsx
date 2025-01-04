import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const LazyAdmin = React.lazy(() => import("./components/Admin/AdminDashboard"));
const LazyDashboard = React.lazy(() => import("./components/Shared/Dashboard"));
const LazyAddEmployeeForm = React.lazy(() => import("./components/Admin/AddEmployeeForm"));
const LazyEditEmployeeForm = React.lazy(() => import("./components/Admin/EditEmployeeForm"));

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" />;
  }

  if (allowedRole && role !== allowedRole) {
    // If role does not match the allowedRole, redirect to dashboard
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("User is logged in");
    }
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LazyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-employees"
          element={
            <PrivateRoute allowedRole="admin">
              <LazyAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute allowedRole="admin">
              <LazyAddEmployeeForm />
            </PrivateRoute>
          }
        />
         <Route
          path="/edit-employee"
          element={
            <PrivateRoute allowedRole="admin">
              <LazyEditEmployeeForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
};

export default App;
