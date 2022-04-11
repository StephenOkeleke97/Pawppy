import React from "react";

const HamburgerMenu = ({ navOpen, onClick }) => {
  const iconWidth = 35;

  return (
    <div className="hamburger-menu" onClick={onClick}>
      <img
        src="/images/remove.png"
        width={iconWidth}
        className={`hamburger-icon ${navOpen && "ham-top-open"}`}
      />
      <img
        src="/images/remove.png"
        width={iconWidth}
        className={`hamburger-icon ${navOpen && "ham-middle-open"}`}
      />
      <img
        src="/images/remove.png"
        width={iconWidth}
        className={`hamburger-icon ham-bottom ${navOpen && "ham-bottom-open"}`}
      />
    </div>
  );
};

export default HamburgerMenu;
