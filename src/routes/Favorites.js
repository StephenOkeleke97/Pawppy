import React, { useEffect, useState } from "react";
import { getFavorites } from "../services/UserService";
import Skeleton from "@mui/material/Skeleton";
import FavoritesComp from "../components/FavoritesComp";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletons = [1, 2, 3];
  useEffect(() => {
    getFavorites((favorites) => {
      setFavorites(favorites);
      setLoading(false);
    });
  }, []);

  return (
    <div className="user-tabs-container favorites-container">
      <div>
        <h1>Favorites</h1>
      </div>
      {loading ? (
        <div className="animal-loading-ext">
          {skeletons.map((skeleton, index) => {
            return (
              <div key={index} className="animal-loading-container">
                <Skeleton
                  sx={{ height: 180 }}
                  animation="wave"
                  variant="rectangular"
                  className={"animal-loading"}
                />
                <div className="animal-text-skeleton-container">
                  <Skeleton
                    animation="wave"
                    variant="text"
                    className="animal-text-skeleton"
                  />
                  <Skeleton
                    animation="wave"
                    variant="text"
                    className="animal-text-skeleton"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="favorites-content">
          {favorites.length <= 0 ? (
            <p className="favorites-empty">You do not have any favorites.</p>
          ) : (
            <FavoritesComp animalsProp={favorites} />
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
