import React from "react";
import { Navigate } from "react-router-dom";

const TokenProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('UserTokken'); // Assuming token is stored in localStorage

  if (!token) {
    return <Navigate to="/register" />;
  }

  return children;
};

export default TokenProtectedRoute;