import React from "react";

const QuickCategory = ({ name, code, image, onClick }) => {
  const handleClick = () => {
    onClick(code);
  };
  return (
    <div className="quick-category-container" onClick={handleClick}>
      <div className="quick-category-image-container">
        <img src={image} alt="description" className="quick-category-image" />
      </div>
      <div className="quick-category-name">{name}</div>
    </div>
  );
};

export default QuickCategory;
