import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(ShopContext);

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
