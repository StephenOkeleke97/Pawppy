import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../styles/nav.css";
import WebNav from "./WebNav";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const textColor = useSelector((state) => state.globalReducer.value).navText;
  const backgroundColor = useSelector((state) => state.globalReducer.value).navBackground;
  const user = useSelector((state) => state.userReducer.value.user);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [windowWidth]);
  
  const style = {
    backgroundColor: backgroundColor
  }
  return (
    <div style={style} className='nav-container'>
      {windowWidth > 700 ?
        <WebNav textColor={textColor} user={user}/> :
        <MobileNav user={user}/>}
    </div>
  )
}

export default Navigation