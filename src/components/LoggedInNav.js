import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../services/UserService";
import Loading from "./Loading";

const LoggedInNav = () => {
  const [showOptions, setShowOptions] = useState(false);
  const openButton = useRef(null);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (openButton && !openButton.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setLoading("Signing Out. Do not close this window.");

    logout(success, failure);
  };

  const failure = (
    data = {
      message: "Something went wrong. Please try again later",
    }
  ) => {
    setLoading("");
  };

  const success = () => {
    setLoading("");
    dispatch({
      type: "LOGOUT",
    });
    window.location.reload();
  };

  const handleShowOptions = () => {
    setShowOptions(true);
  };

  return (
    <div
      className="loggedin-nav-container"
      onClick={handleShowOptions}
      ref={openButton}
    >
      <div className="user-icon">
        <img
          className="user-icon-image"
          src="/images/loginusericon.png"
          alt="user icon"
        />
      </div>
      <div
        className={`loggedin-options-container 
      ${showOptions && "loggedin-options-container-open"}`}
      >
        <div className="loggedin-options">
          <NavLink to={"/user/profile"}>Profile</NavLink>
        </div>
        <div className="loggedin-options" onClick={handleSignOut}>
          <p>Sign Out</p>
        </div>
      </div>
      <Loading loading={loading} text={loading} />
    </div>
  );
};

export default LoggedInNav;
