import React, { useState } from "react";
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { changePassword } from "../services/UserService";

const Name = () => {
  const user = useSelector((state) => state.userReducer.value.user);

  const navigate = useNavigate();
  const [oldPassFocus, setOldPassFocus] = useState(false);
  const [newPassFocus, setNewPassFocus] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassIsError, setOldPassIsError] = useState(false);
  const [newPassIsError, setNewPassIsError] = useState(false);
  const [confirmPassIsError, setConfirmPassIsError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState("");

  const iconSize = 16;

  const getPasswordType = (isVisible) => {
    if (isVisible) return "text";
    return "password";
  };

  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(password);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    if (!oldPassword || !validatePassword(newPassword) || (newPassword !== confirmPassword)) {
      setOldPassIsError(!oldPassword);
      setNewPassIsError(!validatePassword(newPassword));
      setConfirmPassIsError(newPassword !== confirmPassword);
      return;
    }

    setLoading("Changing password...");
    changePassword(oldPassword, newPassword, success, failure);
  };

  const success = () => {
    setLoading("");
    navigate(-1);
  };

  const failure = (message = "Something went wrong. Please try again later.") => {
    setLoading("");
    console.log(message);
  };

  return (
    <div className="user-tabs-container edit-container">
      <div className="edit-header">
        <BiArrowBack className="back-arrow" size={25} onClick={goBack} />
        <h1>Password</h1>
      </div>

      <div className="edit-content-container">
        <div className="edit-content">
          <h2>CHANGE PASSWORD</h2>

          <div className="edit-input">
            <div
              className={`input-container ${oldPassFocus && "input-focused"}`}
            >
              <label htmlFor="oldpassword" className="placeholder">
                * Old Password
              </label>
              <input
                type={getPasswordType(passwordVisible)}
                id="oldpassword"
                onFocus={() => setOldPassFocus(true)}
                onBlur={() => setOldPassFocus(false)}
                value={oldPassword}
                onChange={(e) => {
                  if (oldPassIsError) setOldPassIsError(false);
                  setOldPassword(e.target.value);
                }}
              />

              {passwordVisible ? (
                <AiFillEye
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              ) : (
                <AiFillEyeInvisible
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              )}

              {oldPassword && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {oldPassIsError && (
              <p className="error-text">Old password is required.</p>
            )}
          </div>

          <div className="edit-input">
            <div
              className={`input-container ${newPassFocus && "input-focused"}`}
            >
              <label htmlFor="newpassword" className="placeholder">
                * New Password
              </label>
              <input
                type={getPasswordType(passwordVisible)}
                id="newpassword"
                onFocus={() => setNewPassFocus(true)}
                onBlur={() => setNewPassFocus(false)}
                value={newPassword}
                onChange={(e) => {
                  if (newPassIsError) setNewPassIsError(false);
                  setNewPassword(e.target.value);
                }}
              />
              {passwordVisible ? (
                <AiFillEye
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              ) : (
                <AiFillEyeInvisible
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              )}

              {validatePassword(newPassword) && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {newPassIsError && (
              <p className="error-text">
                Please enter a valid password. Passwords must have at least
                eight characters and contain at least one of each of the
                following: Uppercase letter, Lowercase letter, Number, Special
                Character.
              </p>
            )}
          </div>

          <div className="edit-input">
            <div
              className={`input-container ${
                confirmPassFocus && "input-focused"
              }`}
            >
              <label htmlFor="confirmpassword" className="placeholder">
                * Confirm Password
              </label>
              <input
                type={getPasswordType(passwordVisible)}
                id="confirmpassword"
                onFocus={() => setConfirmPassFocus(true)}
                onBlur={() => setConfirmPassFocus(false)}
                value={confirmPassword}
                onChange={(e) => {
                  if (confirmPassIsError) setConfirmPassIsError(false);
                  setConfirmPassword(e.target.value);
                }}
              />
              {passwordVisible ? (
                <AiFillEye
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              ) : (
                <AiFillEyeInvisible
                  size={iconSize}
                  onClick={showPassword}
                  className={"password-visibility-icon"}
                />
              )}

              {newPassword && newPassword === confirmPassword && (
                <AiFillCheckCircle
                  size={iconSize}
                  color="#00DC7D"
                  className="input-valid-icon"
                />
              )}
            </div>
            {confirmPassIsError && (
              <p className="error-text">The passwords do not match.</p>
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
