import React, { useEffect, useState } from "react";
import Animal from "./Animal";

const FavoritesComp = ({ animalsProp, showing }) => {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    if (animalsProp) {
      setAnimals(animalsProp);
    }
  }, [animalsProp]);
  return (
    <div className="fav-animal-container">
      {animals.map((animal, index) => {
        if (showing && index > showing - 1) return;
        return <Animal animal={animal} key={animal.id} />;
      })}
    </div>
  );
};

export default FavoritesComp;
