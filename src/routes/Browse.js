import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateGlobal } from "../redux/reducers/global";
import Button from "../components/Button";
import { CATEGORY } from "../filters/categories";
import QuickCategory from "../components/QuickCategory";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import Search from "./Search";

const Browse = () => {
  const dispatch = useDispatch();
  const quickCategoryContainer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateGlobal({ navBackground: "#fff", navText: "#6D6E71" }));
  }, []);

  const goToSearch = (species) => {
    navigate("/browse/search", {state: {species: species}});
  }

  const handleScroll = (direction) => {
    const operator = {
      right: function (x, y) {
        return x + y;
      },
      left: function (x, y) {
        return x - y;
      },
    };
    const offset = 400;
    const scrollInterval = 7;
    let scrolled = 0;
    const interval = setInterval(() => {
      quickCategoryContainer.current.scrollLeft = operator[direction](
        quickCategoryContainer.current.scrollLeft,
        scrollInterval
      );
      scrolled += scrollInterval;
      if (scrolled >= offset) clearInterval(interval);
    }, 1);
  };

  return (
    <div className="browse-container">
      <div className="browse-banner">
        <div className="browse-banner-overlay"/>
        <h1>Adopt a dog or cat that fits your lifestyle</h1>
      </div>

      <div className="browse-search-options">
        <div className="browse-search-options-text">
          <p>
            Pawppy brings you thousands of pets at available shelters all over
            North America. We also help to facilitate the process of putting a
            pet up for adoption.
          </p>

          <div className="browse-search-options-buttons">
            <Button className="browse-search-buttons" text={"View All"} 
            onClick={() => {
              goToSearch("Pet");
            }}/>
            <Button className="browse-search-buttons" text={"View Dogs"} 
             onClick={() => {
              goToSearch("Dog");
            }}/>
            <Button className="browse-search-buttons" text={"View Cats"} 
             onClick={() => {
              goToSearch("Cat");
            }}/>
          </div>
        </div>
      </div>

      <div className="browse-quick-category-container">
        <div className="browse-quick-category-header">
          <h2>Explore one of these categories</h2>
        </div>
        <div className="browse-quick-category" ref={quickCategoryContainer}>
          {CATEGORY.map((category, index) => {
            return (
              <QuickCategory
                name={category.name}
                key={index}
                image={category.image}
              />
            );
          })}
          <AiOutlineLeft
            className="browse-quick-arrow-left"
            onClick={() => handleScroll("left")}
          />
          <AiOutlineRight
            className="browse-quick-arrow-right"
            onClick={() => handleScroll("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default Browse;
