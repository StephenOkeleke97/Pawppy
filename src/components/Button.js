import React from "react";
import "../styles/button.css";

const Button = ({ text, onClick, className = "" }) => {
  return (
    <div className={"button" + className} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default Button;
