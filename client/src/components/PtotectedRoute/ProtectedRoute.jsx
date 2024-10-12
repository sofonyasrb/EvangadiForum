// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../../App"; // Your context that stores the authentication state
const token = localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppState); 
// console.log(" user ", user)
  // If user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, allow them to access the route
  return children;
};

export default ProtectedRoute;
