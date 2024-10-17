import { Navigate } from "react-router-dom";

const PrivateRoute = ({ token, children }) => {
  const isTokenValid = token && token !== "login";
  return isTokenValid ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
