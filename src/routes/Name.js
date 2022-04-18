import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { setUser, updateName } from "../redux/reducers/user";
import { changeName } from "../services/UserService";

const Name = () => {
  const user = useSelector((state) => state.userReducer.value.user);

  const navigate = useNavigate();
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [firstNameIsError, setFirstNameIsError] = useState(false);
  const [lastNameIsError, setLastNameIsError] = useState(false);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const iconSize = 16;

  const goBack = () => {
    navigate(-1);
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const handleSave = () => {
    if (!validateName(firstName) || !validateName(lastName)) {
      setFirstNameIsError(!validateName(firstName));
      setLastNameIsError(!validateName(lastName));
      return;
    }

    if (
      firstName.trim() === user.firstName &&
      lastName.trim() === user.lastName
    ) {
      return;
    }

    setLoading("Changing name...");
    changeName(firstName, lastName, success, failure);
  };

  const success = (data) => {
    setLoading("");
    dispatch(updateName({
      firstName: data.firstName,
      lastName: data.lastName
    }));
    navigate(-1);
  };

  const failure = (message = "Something went wrong. Please try again later.") => {
    setLoading("");
    setFirstName(user.firstName);
    setLastName(user.lastName);
    console.log(message);
  };

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
              <p className="error-text">Must have at least 3 digits.</p>
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
              <p className="error-text">Must have at least 3 digits.</p>
            )}
          </div>

          <div className="edit-button-container">
            <button onClick={goBack}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

      <Loading loading={loading} text={loading} />
    </div>
  );
};

export default Name;
