import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";
import HamburgerMenu from "./HamburgerMenu";

const MobileSideNav = () => {
  const activeStyle = {
    textDecoration: "none",
    color: "white",
    borderLeft: "1px solid #fff",
    padding: "8px",
  };

  const inActiveStyle = {
    textDecoration: "none",
    color: "white",
    padding: "8px",
  };

  const [navOpen, setNavOpen] = useState(false);

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className={`mobile-sidenav ${navOpen && "mobile-sidenav-open"}`}>
      <div className="sidebar-nav sidebar-close">
        <HamburgerMenu
          color="white"
          iconWidth={25}
          navOpen={navOpen}
          onClick={handleNavOpen}
        />
      </div>
      <NavLink
        to={"profile"}
        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        className="sidebar-nav"
      >
        <AiOutlineUser size={20} />
        {navOpen && <p>Profile</p>}
      </NavLink>
      <NavLink
        to={"favorites"}
        style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
        className="sidebar-nav"
      >
        <BsSuitHeart size={20} />
        {navOpen && <p>Favorites</p>}
      </NavLink>
    </div>
  );
};

export default MobileSideNav;
