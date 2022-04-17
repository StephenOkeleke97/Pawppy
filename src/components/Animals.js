import React, { useEffect, useState } from "react";
import Animal from "./Animal";
import Pagination from "../pagination/Pagination";

const Animals = ({ animalsObject, changePage }) => {
  const [animals, setAnimals] = useState([]);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    if (animalsObject) {
      setAnimals(animalsObject.animals);
      setPagination(animalsObject.pagination);
    }
  }, [animalsObject]);
  return (
    <>
      {animals && animals.length > 0 ? (
        <Pagination
          numOfPages={pagination.total_pages}
          activePage={pagination.current_page}
          changePage={changePage}
        >
          <div className="animal-container">
            {animals.map((animal) => {
              return <Animal animal={animal} key={animal.id} />;
            })}
          </div>
        </Pagination>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Animals;
