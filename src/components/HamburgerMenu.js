import React from "react";

const HamburgerMenu = ({
  navOpen,
  onClick,
  color = "black",
  iconWidth = 35,
}) => {
  const image = `remove-${color}.png`;
  return (
    <div className="hamburger-menu" onClick={onClick}>
      <img
        src={"/images/" + image}
        width={iconWidth}
        className={`hamburger-icon ham-top ${navOpen && "ham-top-open"}`}
        alt="hamburger icon 1"
      />
      <img
        src={"/images/" + image}
        width={iconWidth}
        className={`hamburger-icon ham-middle ${navOpen && "ham-middle-open"}`}
        alt="hamburger icon 2"
      />
      <img
        src={"/images/" + image}
        width={iconWidth}
        className={`hamburger-icon ham-bottom ${navOpen && "ham-bottom-open"}`}
        alt="hamburger icon 3"
      />
    </div>
  );
};

export default HamburgerMenu;
