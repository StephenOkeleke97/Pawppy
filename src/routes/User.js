import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MobileSideNav from "../components/MobileSideNav";
import WebSideNav from "../components/WebSideNav";
import "../styles/user.css";

const User = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <div className="user-container">
      {windowWidth > 700 ? <WebSideNav /> : <MobileSideNav />}
      <Outlet context={windowWidth}/>
    </div>
  );
};

export default User;
