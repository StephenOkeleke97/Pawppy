import React from "react";
import { NavLink } from "react-router-dom";

const WebNav = ({ textColor = "#fff" }) => {
  const activeStyle = {
    textDecoration: "none",
    color: textColor,
    borderBottom: "2px solid #fff",
    paddingBottom: "10px"
  };

  const inActiveStyle = {
    textDecoration: "none",
    color: textColor
  };

  return (
    <div className="web-nav">
      <ul>
        <li>
          <NavLink
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"browse"}
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"login"}
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            Sign Up
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default WebNav;
