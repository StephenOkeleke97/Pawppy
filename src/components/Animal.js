import React, { useEffect, useState } from "react";
import { BsSuitHeart } from "react-icons/bs";

const Animal = ({ animal }) => {
  const imageSrc = animal.photos;
  const [image, setImage] = useState("");
  useEffect(() => {
    if (imageSrc.length > 0) {
      setImage(imageSrc[0].full);
    } else {
        setImage("/images/dog-placeholder.png");
    }
  }, []);
  return (
    <div className="animal-card">
      <div className="animal-card-image-container">
        <img className="animal-card-image" src={image} alt={animal.name} />
      </div>
      <div className="animal-card-title">
        <h1>{animal.name}</h1>
        <div className="animal-card-description">
          <p>{animal.age} &#8226;</p>
          <p>{animal.breeds.primary}</p>
        </div>
      </div>
      <div className="favorite-icon">
        <BsSuitHeart size={25}/>
      </div>
    </div>
  );
};

export default Animal;
