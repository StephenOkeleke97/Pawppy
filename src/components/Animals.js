import React from "react";
import Animal from "./Animal";

const Animals = ({ animals }) => {
  return (
    <div className="animal-container">
      {animals && animals.length > 0 ? 
      animals.map(animal => {
          return <Animal animal={animal} key={animal.id} />
      })
      : <p>Loading...</p>}
    </div>
  );
};

export default Animals;
