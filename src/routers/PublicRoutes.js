import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PublicRoutes = ({ children }) => {
  const { userState } = useContext(AuthContext);
  return !userState.user?.token ? children : <Navigate to="/" />;
};
