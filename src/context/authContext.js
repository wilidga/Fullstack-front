import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthReducer from "./AuthReducer";
import types from "./types";

export const AuthContext = createContext({});

export const ContextAuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const init = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return { user };
  };

  // const initialState ={
  //   user:null
  // }

  const [userState, dispatch] = useReducer(AuthReducer, {}, init);

  const authUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.auth, payload: user });
    navigate("/");
  };
  const logoutUser = () => {
    const user = {};
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.auth });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ userState, authUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
