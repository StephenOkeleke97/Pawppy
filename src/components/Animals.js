import React, { useEffect, useState } from "react";
import Animal from "./Animal";
import Pagination from "../pagination/Pagination";

const Animals = ({ animalsObject, changePage, statusText }) => {
  const [animals, setAnimals] = useState([]);
  const [pagination, setPagination] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

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
          numberOfPagesBeforeEllipses={windowWidth > 700 ? 5 : 2}
        >
          <div className="animal-container">
            {animals.map((animal) => {
              return <Animal animal={animal} key={animal.id} />;
            })}
          </div>
        </Pagination>
      ) : (
        <div className="animals-not-loaded">
          <p>{statusText}</p>
        </div>
      )}
    </>
  );
};

export default Animals;
