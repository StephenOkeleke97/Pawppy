import React from "react";
import { NavLink } from "react-router-dom";
import LoggedInNav from "./LoggedInNav";

const WebNav = ({ authenticated }) => {
  const activeStyle = {
    textDecoration: "none",
    color: "#000",
    borderBottom: "2px solid " + "#000",
    paddingBottom: "10px"
  };

  const inActiveStyle = {
    textDecoration: "none",
    color: "#000"
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
            to={"search"}
            style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
          >
            Search
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
