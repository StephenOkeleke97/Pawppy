import React from "react";
import "../styles/button.css";

const Button = ({ text, onClick, className = "" }) => {
  return (
    <button className={"button " + className} onClick={onClick}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
