import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import {
  addToFavorite,
  addToRecents,
  deleteFromFavorite,
} from "../services/UserService";
import { getAnimal } from "../api/PetFinderService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "../redux/reducers/user";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Details = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [animal, setAnimal] = useState({});
  const [statusText, setStatusText] = useState("Loading...");
  const { id } = useParams();

  const authenticated = document.cookie.indexOf("auth=") !== -1;
  const [feedBackOpen, setFeedBackOpen] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [feedBackSeverity, setFeedBackSeverity] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.userReducer.value.user.favorites
  );
  const isFavorite = favorites
    ? favorites.some((id) => id === animal.id)
    : false;

  const goodWith = [];

  if (animal.environment && animal.environment.children) {
    goodWith.push("Children");
  }

  if (animal.environment && animal.environment.dogs) {
    goodWith.push("Dogs");
  }
  if (animal.environment && animal.environment.cats) {
    goodWith.push("Cats");
  }

  useEffect(() => {
    console.log(animal);
    if (animal.id) addToRecents(animal);
  }, [animal]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (location.state) {
        setAnimal(location.state.animal);
      } else {
        const result = getAnimal(id);
        result
          .then((res) => {
            setAnimal(res.data.data.animal);
          })
          .catch((error) => {
            console.log(error);
            setStatusText("Failed to load details");
          });
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const goBack = () => {
    navigation(-1);
  };

  const handleFavorite = () => {
    if (!authenticated) {
      setFeedBackSeverity("info");
      setFeedBackMessage("You must be logged in to do this");
      setFeedBackOpen(true);
      return;
    }

    if (isFavorite) {
      deleteFromFavorite(animal.id, success, failure);
    } else {
      addToFavorite(animal, success, failure);
    }
  };

  const success = (data, message) => {
    dispatch(
      updateFavorites({
        favorites: data,
      })
    );
    setFeedBackSeverity("success");
    setFeedBackMessage(message);
    setFeedBackOpen(true);
  };

  const failure = (
    message = "Something went wrong. Please try again later."
  ) => {
    setFeedBackSeverity("error");
    setFeedBackMessage(message);
    setFeedBackOpen(true);
  };

  const closeFeedback = () => {
    setFeedBackOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeFeedback}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {animal.id ? (
        <div className="container details-container">
          <div className="details-back">
            <BiArrowBack className="back-arrow" size={25} onClick={goBack} />
          </div>
          <div className="carousel-container">
            <Carousel
              navButtonsAlwaysVisible={
                animal.photos && animal.photos.length > 0
              }
              autoPlay={false}
              className={"carousel-comp"}
            >
              {animal.photos.map((photo, index) => {
                return (
                  <div className="carousel" key={index}>
                    <img src={photo.full} alt={animal.name} />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div className="details-content-container">
            <div className="details-content">
              <div className="details-header">
                <h1>{animal.name}</h1>
                {isFavorite && <BsSuitHeartFill className="heart" />}
              </div>

              <div className="animal-breed">
                {animal.secondary ? (
                  <p>
                    <span className="breed-item">{animal.breeds.primary}</span>{" "}
                    &{" "}
                    <span className="breed-item">
                      {animal.breeds.secondary}
                    </span>{" "}
                    Mix
                  </p>
                ) : (
                  <p>
                    <span className="breed-item">{animal.breeds.primary}</span>
                  </p>
                )}
              </div>

              <div className="animal-description">
                <p>
                  <span>{" " + animal.age} •</span>
                  <span>{" " + animal.gender} •</span>
                  <span>{" " + animal.size} •</span>
                  {animal.colors.primary && (
                    <span>{" " + animal.colors.primary}</span>
                  )}
                  {animal.colors.secondary && (
                    <span>, {animal.colors.secondary}</span>
                  )}
                  {animal.colors.tertiary && (
                    <span>, {animal.colors.tertiary}</span>
                  )}
                </p>
              </div>

              <div className="details-about-container">
                <h2>About</h2>

                <div className="details-about">
                  <div className="details-about-content">
                    <h3>AVAILABLE SINCE</h3>
                    <p>
                      {animal.published_at
                        ? new Date(
                            Date.parse(animal.published_at)
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div className="details-about-content">
                    <h3>STATUS</h3>
                    <p>{animal.status}</p>
                  </div>

                  <div className="details-about-content">
                    <h3>STATUS CHANGED</h3>
                    <p>
                      {animal.status_changed_at
                        ? new Date(
                            Date.parse(animal.status_changed_at)
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  {animal.coat && (
                    <div className="details-about-content">
                      <h3>COAT LENGTH</h3>
                      <p>{animal.coat}</p>
                    </div>
                  )}

                  <div className="details-about-content">
                    <h3>GOOD IN A HOME WITH</h3>
                    <p>{goodWith.length > 0 ? goodWith.join() : "None"}</p>
                  </div>

                  <div className="details-about-content">
                    <h3>HOUSE TRAINED</h3>
                    <p>{animal.attributes.house_trained ? "Yes" : "No"}.</p>
                  </div>

                  <div className="details-about-content">
                    <h3>DECLAWED</h3>
                    <p>{animal.attributes.declawed ? "Yes" : "No"}.</p>
                  </div>

                  <div className="details-about-content">
                    <h3>SPECIAL NEEDS</h3>
                    <p>{animal.attributes.special_needs ? "Yes" : "No"}.</p>
                  </div>

                  <div className="details-about-content">
                    <h3>HEALTH</h3>
                    <p>
                      <span>{`Vaccinations ${
                        !animal.attributes.shots_current ? "not" : ""
                      } up to date. `}</span>
                      {animal.attributes.spayed_neutered && (
                        <span>Spayed/ Neutered</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-contact">
              <h2>Contact</h2>
              <div className="details-contact-button">
                <button onClick={handleFavorite}>
                  <BsSuitHeart />
                  <p>Favorite</p>
                </button>
              </div>

              <div className="details-contact-info">
                <div className="details-about-content">
                  <h3>EMAIL</h3>
                  <p>{animal.contact.email ? animal.contact.email : "-"}</p>
                </div>

                <div className="details-about-content">
                  <h3>ADDRESS</h3>
                  <p>
                    {`${
                      animal.contact.address.address1
                        ? animal.contact.address.address1 + ","
                        : ""
                    } 
              ${
                animal.contact.address.postcode
                  ? animal.contact.address.postcode + ","
                  : ""
              } 
              ${
                animal.contact.address.city
                  ? animal.contact.address.city + ","
                  : ""
              }
              ${
                animal.contact.address.state
                  ? animal.contact.address.state + ","
                  : ""
              } 
              ${
                animal.contact.address.country
                  ? animal.contact.address.country
                  : ""
              }.`}
                  </p>
                </div>

                <div className="details-about-content">
                  <h3>PHONE</h3>
                  <p>{animal.contact.phone ? animal.contact.phone : "-"}</p>
                </div>
              </div>
            </div>
          </div>

          <Snackbar
            open={feedBackOpen}
            autoHideDuration={3000}
            onClose={closeFeedback}
            action={action}
          >
            <Alert
              onClose={closeFeedback}
              severity={feedBackSeverity}
              sx={{ width: "100%" }}
            >
              {feedBackMessage}
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <div className="container not-loaded">
          <p>{statusText}</p>
        </div>
      )}
    </>
  );
};

export default Details;
