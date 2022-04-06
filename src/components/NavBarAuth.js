import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const NavBarAuth = () => {
  const { logoutUser } = useContext(AuthContext);
  console.log(`navbar`);
  return (
    <div className="header flex">
      <div>
        <img
          src="https://itjuana.com/wp-content/themes/itjuana/assets/images/svg-grid/itijuana-logo-color.svg"
          alt="logo"
          width="100"
          height="50"
        />
      </div>
      <nav className="nav-bar">
        <button className="my-btn" onClick={logoutUser}>
          Logout
        </button>
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/"
        >
          Blog
        </NavLink>
      </nav>
    </div>
  );
};
