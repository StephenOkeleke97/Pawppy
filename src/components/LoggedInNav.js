import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/UserService";
import Loading from "./Loading";

const LoggedInNav = () => {
  const [showOptions, setShowOptions] = useState(false);
  const openButton = useRef(null);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

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

  const goToProfile = () => {
    setShowOptions(false);
    navigation("/user/profile");
  };

  const handleSignOut = () => {
    setLoading("Signing Out. Do not close this window.");

    logout(success);
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
    <div className="loggedin-nav-container" ref={openButton}>
      <div className="user-icon" onClick={handleShowOptions}>
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
        <button onClick={goToProfile} className="loggedin-options">
          <p>Profile</p>
        </button>
        <button className="loggedin-options" onClick={handleSignOut}>
          <p>Sign Out</p>
        </button>
      </div>
      <Loading loading={loading} text={loading} />
    </div>
  );
};

export default LoggedInNav;
