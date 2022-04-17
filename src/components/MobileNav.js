import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import LoggedInNav from "./LoggedInNav";

const MobileNav = ({ textColor = "#000", user }) => {
  const [navOpen, setNavOpen] = useState(false);

  const openMenu = () => {
    document.body.style.overflow = "hidden";
    setNavOpen(true);
  };

  const closeMenu = () => {
    document.body.style.overflow = "visible";
    setNavOpen(false);
  };

  const handleMenuClick = () => {
    if (!navOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const activeStyle = {
    textDecoration: "none",
    color: textColor,
    paddingBottom: "10px",
  };

  const inActiveStyle = {
    textDecoration: "none",
    color: textColor,
  };

  return (
    <div className="mobile-nav">
      <HamburgerMenu navOpen={navOpen} onClick={handleMenuClick} />
      {user && <LoggedInNav />}
      <div
        className={`mobile-nav-overlay ${navOpen && "mobile-nav-overlay-open"}`}
      />
      <div
        className={`mobile-nav-container ${
          navOpen && "mobile-nav-container-open"
        }`}
      >
        <div className="mobile-nav-items">
          <ul>
            <li>
              <NavLink
                to={"/"}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"browse"}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                onClick={closeMenu}
              >
                Browse
              </NavLink>
            </li>
            {!user && <li>
              <NavLink
                to={"signup"}
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
