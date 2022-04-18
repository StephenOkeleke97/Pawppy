import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Name = () => {
  const user = useSelector((state) => state.userReducer.value.user);

  const navigate = useNavigate();
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameIsError, setFirstNameIsError] = useState(false);
  const [lastNameIsError, setLastNameIsError] = useState(false);

  const iconSize = 16;

  const goBack = () => {
    navigate(-1);
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validatePhoneNumber = (phonenumber) => {
    return phonenumber.trim().length >= 8;
  };

  const handleSave = () => {};

  return (
    <div className="user-tabs-container edit-container">
      <div className="edit-header">
        <BiArrowBack className="back-arrow" size={25} onClick={goBack} />
        <h1>Name</h1>
      </div>

      <div className="edit-content-container">
        <div className="edit-content">
          <h2>CHANGE NAME</h2>

          <div className="edit-input">
            <div
              className={`input-container ${firstNameFocus && "input-focused"}`}
            >
              <label htmlFor="first-name" className="placeholder">
                * First Name
              </label>
              <input
                type={"text"}
                id="first-name"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                value={firstName}
                onChange={(e) => {
                  if (firstNameIsError) setFirstNameIsError(false);
                  setFirstName(e.target.value);
                }}
              />
              {validateName(firstName) && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {firstNameIsError && (
              <p className="error-text">First name is required.</p>
            )}
          </div>

          <div className="edit-input">
            <div
              className={`input-container ${lastNameFocus && "input-focused"}`}
            >
              <label htmlFor="last-name" className="placeholder">
                * Last Name
              </label>
              <input
                type={"text"}
                id="last-name"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
                value={lastName}
                onChange={(e) => {
                  if (lastNameIsError) setLastNameIsError(false);
                  setLastName(e.target.value);
                }}
              />
              {validateName(lastName) && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {lastNameIsError && (
              <p className="error-text">Last name is required.</p>
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

export default Name;
