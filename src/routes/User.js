import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import MobileSideNav from "../components/MobileSideNav";
import WebSideNav from "../components/WebSideNav";
import "../styles/user.css";

const User = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const authenticated = useSelector((state) => state.authReducer.value);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (!authenticated) navigate("/");
  });

  return (
    <div className="user-container">
      {windowWidth > 700 ? <WebSideNav /> : <MobileSideNav />}
      <Outlet context={windowWidth} />
    </div>
  );
};

export default User;
