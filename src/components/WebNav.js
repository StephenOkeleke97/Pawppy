import React from "react";
import { NavLink } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";

const WebNav = ({ textColor = "#fff", authenticated }) => {
  const activeStyle = {
    textDecoration: "none",
    color: textColor,
    borderBottom: "2px solid " + textColor,
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
        {!authenticated && <li>
          <NavLink
            to={"signup"}
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            Sign Up
          </NavLink>
        </li>}
        {authenticated && <li>
          <LoggedInNav/>
        </li>}
      </ul>
    </div>
  );
};

export default WebNav;
