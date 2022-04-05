import React, { useState } from "react";

const MobileNav = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="mobile-nav">
      <div className="hamburger-menu"
      onClick={() => setNavOpen(!navOpen)}>
        <img
          src="/images/remove.png"
          width={35}
          className={`hamburger-icon ${navOpen && "ham-top-open"}`}
        />
        <img
          src="/images/remove.png"
          width={35}
          className={`hamburger-icon ${navOpen && "ham-middle-open"}`}
        />
        <img
          src="/images/remove.png"
          width={35}
          className={`hamburger-icon ${navOpen && "ham-bottom-open"}`}
        />
      </div>
    </div>
  );
};

export default MobileNav;
