// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../../App"; // Your context that stores the authentication state
const token = localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppState); 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
