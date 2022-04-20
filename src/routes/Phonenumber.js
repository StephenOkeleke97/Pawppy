import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { updatePhoneNumber } from "../redux/reducers/user";
import { changePhoneNumber } from "../services/UserService";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Phonenumber = () => {
  const user = useSelector((state) => state.userReducer.value.user);

  const navigate = useNavigate();
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberIsError, setPhoneNumberIsError] = useState(false);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const [feedBackOpen, setFeedBackOpen] = useState(false);
  const [feedBackMessage, setFeedBackMessage] = useState("");
  const [feedBackSeverity, setFeedBackSeverity] = useState("");

  const iconSize = 16;

  const goBack = () => {
    navigate(-1);
  };

  const validatePhoneNumber = (phonenumber) => {
    return phonenumber.toString().length >= 8;
  };

  const handleSave = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberIsError(true);
      return;
    }
    setLoading("Changing phone number...");
    changePhoneNumber(phoneNumber, success, failure);
  };

  const success = (data) => {
    setLoading("");
    dispatch(updatePhoneNumber(data.phoneNumber));
    navigate(-1);
  };

  const failure = (
    message = "Something went wrong. Please try again later."
  ) => {
    setLoading("");
    setPhoneNumber(user.phoneNumber);
    setFeedBackMessage(message);
    setFeedBackSeverity("error");
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
    <div className="user-tabs-container edit-container">
      <div className="edit-header">
        <BiArrowBack className="back-arrow" size={25} onClick={goBack} />
        <h1>Phone Number</h1>
      </div>

      <div className="edit-content-container">
        <div className="edit-content">
          <h2>CHANGE PHONE NUMBER</h2>

          <div className="edit-input">
            <div
              className={`input-container ${
                phoneNumberFocus && "input-focused"
              }`}
            >
              <label htmlFor="phonenumber" className="placeholder">
                * Phone Number
              </label>
              <input
                type={"number"}
                id="phonenumber"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
                value={phoneNumber}
                onChange={(e) => {
                  if (phoneNumberIsError) setPhoneNumberIsError(false);
                  setPhoneNumber(e.target.value);
                }}
              />
              {validatePhoneNumber(phoneNumber) && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {phoneNumberIsError && (
              <p className="error-text">
                Phone number must be greater than 8 digits.
              </p>
            )}
          </div>

          <div className="edit-button-container">
            <button onClick={goBack}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

      <Loading loading={loading} text={loading} />
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

export default Phonenumber;
