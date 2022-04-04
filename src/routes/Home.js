import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGlobal } from "../reducers/global";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    const landingText = document.getElementById("landing-text");
    const landingTitle = document.getElementById("landing-title");
    landingText.style.width = landingTitle.offsetWidth * 0.6 + "px";

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    dispatch(updateGlobal({ navBackground: "rgba(0,0,0,0)", navText: "#fff" }));
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-dog">
        <img
          src="/images/landingbg1.png"
          alt="smiling pitbull"
          className="landing-dog-image"
        />
      </div>
      <div className="landing-title-container">
        <p className="landing-title-text" id="landing-text">
          Save animals, save mankind, save world
        </p>
        <div className="landing-title" id="landing-title">
          <div className="landing-title-main">
            <span className="landing-title-half">PAW</span>PPY
          </div>
        </div>
        <div className="explore-button">
          <p className="landing-explore">Explore &#8212;</p>
        </div>
      </div>
      <div className="landing-footer">
        <p>&copy; 2022 Pawppy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
