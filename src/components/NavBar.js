import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
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
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/">
          Blog
        </NavLink>
      </nav>
    </div>
  );
};
