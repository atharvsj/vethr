import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");

    if (!token || role !== requiredRole) {
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [location]);

  if (isAllowed === null) return null;

  return isAllowed ? <Outlet /> : <Navigate to="/hrms" replace />;
};

export default ProtectedRoute;