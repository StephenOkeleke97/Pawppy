import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGlobal } from "../redux/reducers/global";
import Button from "../components/Button";
import { getTrait } from "../filters/categories";
import QuickCategory from "../components/QuickCategory";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { createSearchParams, Outlet, useNavigate } from "react-router-dom";
import Search from "./Search";
import { getAnimals } from "../api/PetFinderService";
import FavoritesComp from "../components/FavoritesComp";
import { getRecents } from "../services/UserService";

const Browse = () => {
  const recentlyShowingCollapsedNum = 4;

  const dispatch = useDispatch();
  const quickCategoryContainer = useRef(null);
  const navigate = useNavigate();
  const category = getTrait();
  const [recentAnimals, setRecentAnimals] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recentNum, setRecentNum] = useState(recentlyShowingCollapsedNum);

  const authenticated = document.cookie.indexOf("auth=") !== -1;

  useEffect(() => {
    getAnimals({
      limit: 5,
      sort: "recent"
    }).then((response) => {
      setRecentAnimals(response.data.data.animals);
      console.log(response);
    })
  }, []);

  useEffect(() => {
    if (authenticated)
      getRecents((data) => {
        console.log(data);
        setRecentlyViewed(data.recent);
      });
  }, []);

  useEffect(() => {
    dispatch(updateGlobal({ navBackground: "#fff", navText: "#6D6E71" }));
  }, []);

  const handleClickType = (species) => {
    if (species) {
      navigate({
        pathname: "/search",
        search: createSearchParams({
          type: species,
        }).toString(),
      });
    } else {
      navigate({
        pathname: "/search",
      });
    }
  };

  const handleClickCategory = (category) => {
    const searchParams = {};
    searchParams[category] = true;
    navigate({
      pathname: "/search",
      search: createSearchParams(searchParams).toString(),
    });
  };

  const handleGoToRecent = () => {
    const searchParams = {};
    searchParams["sort"] = "recent";
    navigate({
      pathname: "/search",
      search: createSearchParams(searchParams).toString(),
    });
  };


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

  const handleShowAllRecents = () => {
    console.log(recentlyViewed.length);
    console.log(recentNum);
    if (recentlyViewed.length > recentNum) setRecentNum(recentlyViewed.length);
    else setRecentNum(recentlyShowingCollapsedNum);
  };

  return (
    <div className="browse-container container">
      <div className="browse-banner">
        <div className="browse-banner-overlay" />
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
            <Button
              className="browse-search-buttons"
              text={"View All"}
              onClick={() => {
                handleClickType("");
              }}
            />
            <Button
              className="browse-search-buttons"
              text={"View Dogs"}
              onClick={() => {
                handleClickType("Dog");
              }}
            />
            <Button
              className="browse-search-buttons"
              text={"View Cats"}
              onClick={() => {
                handleClickType("Cat");
              }}
            />
          </div>
        </div>
      </div>

      <div className="browse-quick-category-container">
        <div className="browse-quick-category-header">
          <h2>Explore one of these categories</h2>
        </div>
        <div className="browse-quick-category" ref={quickCategoryContainer}>
          {category.map((category, index) => {
            return (
              <QuickCategory
                name={category.name}
                key={index}
                image={category.image}
                onClick={handleClickCategory}
                code={category.code}
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

      <div className="browse-latest-pets">
        <div className="browse-quick-category-header header-with-arrow">
          <h2>Find the latest pets</h2>
          <AiOutlineRight
            className="header-arrow"
            onClick={handleGoToRecent}
          />
        </div>
        <div className="browse-recent">
          {recentAnimals.length > 0 ? (
            <FavoritesComp animalsProp={recentAnimals} />
          ) : (
            <p>Nothing to show</p>
          )}
        </div>
      </div>

      {authenticated && (
        <div className="browse-latest-pets">
          <div className="browse-quick-category-header header-with-text">
            <h2>Recently Viewed</h2>
            {recentNum < recentlyViewed.length ? (
              <p onClick={handleShowAllRecents}>Show All</p>
            ) : (
              <p onClick={handleShowAllRecents}>Collapse</p>
            )}
          </div>
          <div className="browse-recent">
            {recentlyViewed.length > 0 ? (
              <FavoritesComp animalsProp={recentlyViewed} showing={recentNum} />
            ) : (
              <p>Nothing to show</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Browse;
