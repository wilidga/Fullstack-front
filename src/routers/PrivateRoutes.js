import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { userState } = useContext(AuthContext);
  // const { pathname, search } = useLocation();

  // localStorage.setItem("lastPath", pathname + search);

  return userState.user?.token ? children : <Navigate to="/login" />;
};
