import React, { useEffect, useState } from "react";
import Animal from "./Animal";

const FavoritesComp = ({ animalsProp }) => {
  const [animals, setAnimals] = useState([]);
  console.log(animals);
  useEffect(() => {
    if (animalsProp) {
      setAnimals(animalsProp);
    }
  }, [animalsProp]);
  return (
    <div className="fav-animal-container">
      {animals.map((animal) => {
        return <Animal animal={animal} key={animal.id} />;
      })}
    </div>
  );
};

export default FavoritesComp;
