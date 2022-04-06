import { useState, useContext } from "react";
import { NavBar } from "./NavBar";
import { NavBarAuth } from "./NavBarAuth";
import { AuthContext } from "../context/authContext";

export const Layout = ({ children }) => {
  const { userState } = useContext(AuthContext);

  return (
    <>
      {userState.user?.token ? <NavBarAuth /> : <NavBar />}
      <div className="container">
        <div>{children}</div>
      </div>
    </>
  );
};
