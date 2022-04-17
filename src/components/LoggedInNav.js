import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const LoggedInNav = () => {
  const [showOptions, setShowOptions] = useState(false);
  const openButton = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (openButton && !openButton.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  const handleShowOptions = () => {
    setShowOptions(true);
  }
  return (
    <div className="loggedin-nav-container"
    onClick={handleShowOptions} ref={openButton}>
      <div className="user-icon">
        <img
          className="user-icon-image"
          src="/images/loginusericon.png"
          alt="user icon"
        />
      </div>
      <div className={`loggedin-options-container 
      ${showOptions && "loggedin-options-container-open"}`}>
        <div className="loggedin-options">
          <NavLink to={"/user/profile"}>Profile</NavLink>
        </div>
        <div className="loggedin-options">
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default LoggedInNav;
