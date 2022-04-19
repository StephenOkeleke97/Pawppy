import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../styles/nav.css";
import WebNav from "./WebNav";
import MobileNav from "./MobileNav";

const Navigation = () => {
  const backgroundColor = useSelector((state) => state.globalReducer.value).navBackground;
  const authenticated = document.cookie.indexOf("auth=") !== -1;
  console.log(backgroundColor);
 
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
    backgroundColor: "#fff"
  }
  return (
    <div style={style} className='nav-container'>
      {windowWidth > 700 ?
        <WebNav authenticated={authenticated}/> :
        <MobileNav authenticated={authenticated}/>}
    </div>
  )
}

export default Navigation