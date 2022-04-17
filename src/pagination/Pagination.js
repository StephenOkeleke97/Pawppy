import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import "../styles/pagination.css";
// import HandlePaginationError from "../error/HandlePaginationError";

const Pagination = ({
  children,
  reset,
  numOfPages,
  activePage,
  numberOfPagesBeforeEllipses = 5,
  numberOfPagesAfterEllipses = 3,
  numberOfItemsToShowOptions = [1, 5, 10, 15, 20, 50],
  defaultNumberOfItemsToShow = numberOfItemsToShowOptions[
    numberOfItemsToShowOptions.length - 1
  ],
  changePage,
}) => {
  //   HandlePaginationError(
  //     children,
  //     numberOfPagesBeforeEllipses,
  //     numberOfPagesAfterEllipses,
  //     numberOfItemsToShowOptions,
  //     defaultNumberOfItemsToShow
  //   );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(
    defaultNumberOfItemsToShow
  );
  const numberOfPages = numOfPages;
  const paginationCutOff = Math.floor(numberOfPagesBeforeEllipses);
  const paginationNumberOfDigitsAfterEllipses = Math.floor(
    numberOfPagesAfterEllipses
  );
  //   const [activePage, setActivePage] = useState(1);
  const selectElement = useRef(null);
  const storage = window.sessionStorage;

  //   function optionsIsNotSortedOrContainsDuplicates() {
  //     if (numberOfItemsToShowOptions.length > 1) {
  //       for (let i = 1; i < numberOfItemsToShowOptions.length; i++) {
  //         if (
  //           numberOfItemsToShowOptions[i] <= numberOfItemsToShowOptions[i - 1]
  //         ) {
  //           return true;
  //         }
  //       }
  //     }
  //     return false;
  //   }

  //   useEffect(() => {
  //     if (optionsIsNotSortedOrContainsDuplicates()) {
  //       console.warn(
  //         "Your options array is not sorted or contains duplicates. This may cause unexpected behavior."
  //       );
  //     }
  //   }, []);

  //   useEffect(() => {
  //     setCurrentIndex(0);
  //     setActivePage(1);
  //   }, [activePage]);

  //   useEffect(() => {
  //     if (storage.getItem("numberOfItemsToShow")) {
  //       const number = parseInt(storage.getItem("numberOfItemsToShow"));
  //       setNumberOfItemsToShow(number);
  //       selectElement.current.value = number;
  //     }
  //   }, []);

  const createPagesArray = () => {
    let array = [];
    for (let i = 0; i < numberOfPages; i++) {
      array[i] = i + 1;
    }
    return array;
  };

  const nextPage = () => {
    if (activePage < numberOfPages) {
      changePage(activePage + 1);
    }
  };

  const previousPage = () => {
    if (activePage > 1) {
      changePage(activePage - 1);
    }
  };

  const jumpToStart = () => {
    if (activePage > 1) {
      changePage(1);
    }
  };

  const jumpToEnd = () => {
    if (activePage < numberOfPages) {
      changePage(numOfPages);
    }
  };

  const goToPage = (page) => {
    if (activePage !== page) {
      changePage(page);
    }
  };

  //   const handleNumberOfItemsToShow = (event) => {
  //     const number = parseInt(event.target.value);
  //     if (numberOfItemsToShow !== number) {
  //       setCurrentIndex(0);
  //       setActivePage(1);
  //       setNumberOfItemsToShow(parseInt(event.target.value));
  //       storage.setItem("numberOfItemsToShow", number);
  //     }
  //   };

  return (
    <div>
      {children}

      <div className="pagination-container">
        <div className="pagination-item" onClick={jumpToStart}>
          <AiOutlineDoubleLeft
            className={`${activePage <= 1 && "pagination-end-page"}`}
          />
        </div>

        <div className="pagination-item" onClick={previousPage}>
          <AiOutlineLeft
            className={`${activePage <= 1 && "pagination-end-page"}`}
          />
        </div>

        {createPagesArray()
          .filter(
            (page) =>
              (page < activePage + paginationCutOff ||
                page > numberOfPages - paginationNumberOfDigitsAfterEllipses) &&
              (page >= activePage ||
                numberOfPages - page <=
                  paginationCutOff + paginationNumberOfDigitsAfterEllipses)
          )
          .map((page, index) => {
            return (
              <div style={{ display: "flex" }} key={index}>
                <div
                  className={`pagination-item ${
                    page === activePage && "pagination-item-active"
                  }`}
                  onClick={() => {
                    goToPage(page);
                  }}
                >
                  <p>{page}</p>
                </div>
                {page === activePage + paginationCutOff - 1 &&
                  page + paginationNumberOfDigitsAfterEllipses <
                    numberOfPages && (
                    <div className="pagination-item pagination-ellipses">
                      <p>...</p>
                    </div>
                  )}
              </div>
            );
          })}

        <div className="pagination-item" onClick={nextPage}>
          <AiOutlineRight
            className={`${
              activePage >= numberOfPages && "pagination-end-page"
            }`}
          />
        </div>

        <div className="pagination-item" onClick={jumpToEnd}>
          <AiOutlineDoubleRight
            className={`${
              activePage >= numberOfPages && "pagination-end-page"
            }`}
          />
        </div>

        {/* <select
          defaultValue={defaultNumberOfItemsToShow}
          name="Showing"
          className="pagination-item selectItems"
          onChange={handleNumberOfItemsToShow}
          ref={selectElement}
        >
          <option disabled>Showing {numberOfItemsToShow} Orders</option>
          {numberOfItemsToShowOptions.map((number, index) => {
            return (
              <option key={index} value={number}>
                {number}
              </option>
            );
          })}
        </select> */}
      </div>
    </div>
  );
};

export default Pagination;
