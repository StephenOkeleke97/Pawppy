import React, { useEffect, useState } from "react";
import "../styles/nav.css";
import WebNav from "./WebNav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";

const Navigation = () => {
  const authenticated = useSelector((state) => state.authReducer.value);

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

  const style = {
    backgroundColor: "#fff",
  };
  return (
    <div style={style} className="nav-container">
      {windowWidth > 700 ? (
        <WebNav authenticated={authenticated} />
      ) : (
        <MobileNav authenticated={authenticated} />
      )}
    </div>
  );
};

export default Navigation;
