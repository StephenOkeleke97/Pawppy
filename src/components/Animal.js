import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { addToFavorite, deleteFromFavorite } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "../redux/reducers/user";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Animal = ({ animal }) => {
  const navigation = useNavigate();
  const imageSrc = animal.photos;
  const [image, setImage] = useState("");
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

  useEffect(() => {
    if (imageSrc.length > 0) {
      setImage(imageSrc[0].full);
    } else {
      setImage("/images/dog-placeholder.png");
    }
  }, []);

  const goToDetails = () => {
    navigation(`/details/${animal.id}`, {
      state: {
        animal: animal,
      },
    });
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

  return (
    <div className="animal-card">
      <div onClick={goToDetails}>
        <div className="animal-card-image-container">
          <img className="animal-card-image" src={image} alt={animal.name} />
        </div>
        <div className="animal-card-title">
          <h1>{animal.name}</h1>
          <div className="animal-card-description">
            <p>{animal.age} &#8226;</p>
            <p>{animal.breeds.primary}</p>
          </div>
        </div>
      </div>
      <div className="favorite-icon" onClick={handleFavorite}>
        {isFavorite ? <BsSuitHeartFill size={25} /> : <BsSuitHeart size={25} />}
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
  );
};

export default Animal;
