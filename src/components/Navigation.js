import React from 'react';
import { useSelector } from 'react-redux';
import "../styles/nav.css";
import WebNav from "./WebNav";

const Navigation = () => {
  const textColor = useSelector((state) => state.global.value).navText;
  const backgroundColor = useSelector((state) => state.global.value).navBackground;
  
  const style = {
    backgroundColor: backgroundColor
  }
  return (
    <div style={style} className='nav-container'>
      <WebNav textColor={textColor}/>
    </div>
  )
}

export default Navigation