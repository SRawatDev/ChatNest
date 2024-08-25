// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userId = location.state?.UserId;

  if (!userId) {  
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
