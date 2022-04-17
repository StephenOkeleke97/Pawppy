import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";

const WebSideNav = () => {
  const activeStyle = {
    textDecoration: "none",
    color: "white",
    border: "2px solid #fff",
    width: "150px",
    padding: "8px",
    borderRadius: "8px",
  };

  const inActiveStyle = {
    textDecoration: "none",
    color: "white",
    width: "150px",
    padding: "8px",
  };

  return (
    <div className="user-nav">
      <NavLink
        to={"profile"}
        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        className="sidebar-nav"
      >
        <AiOutlineUser />
        <p>Profile</p>
      </NavLink>
      <NavLink
        to={"favorites"}
        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        className="sidebar-nav"
      >
        <BsSuitHeart />
        <p>Favorites</p>
      </NavLink>
    </div>
  );
};

export default WebSideNav;
