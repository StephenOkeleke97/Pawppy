import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Phonenumber = () => {
  const user = useSelector((state) => state.userReducer.value.user);

  const navigate = useNavigate();
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberIsError, setPhoneNumberIsError] = useState(false);

  const iconSize = 16;

  const goBack = () => {
    navigate(-1);
  };

  const validatePhoneNumber = (phonenumber) => {
    return phonenumber.trim().length >= 8;
  };

  const handleSave = () => {};

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
              <p className="error-text">Phone number is required.</p>
            )}
          </div>

          <div className="edit-button-container">
            <button onClick={goBack}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phonenumber;
