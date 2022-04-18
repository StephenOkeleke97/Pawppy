import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGlobal } from "../redux/reducers/global";
import { setUser } from "../redux/reducers/user";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineArrowRight,
  AiFillCheckCircle,
} from "react-icons/ai";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import Loading from "../components/Loading";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailIsError, setEmailIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [confirmPasswordIsError, setConfirmPasswordIsError] = useState(false);
  const [firstNameIsError, setFirstNameIsError] = useState(false);
  const [lastNameIsError, setLastNameIsError] = useState(false);
  const [phoneNumberIsError, setPhoneNumberIsError] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [loading, setLoading] = useState("");

  const iconSize = 14;
  const validInputIconSize = 13;

  useEffect(() => {
    dispatch(updateGlobal({ navText: "#6D6E71", navBackground: "#fff" }));
  }, []);

  useEffect(() => {
    const authenticated = document.cookie.indexOf("auth=") !== -1;

    if (authenticated) navigate("/");
  });

  const getPasswordType = (passwordIsVisible) => {
    if (passwordIsVisible) return "text";
    return "password";
  };

  const togglePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validatePhoneNumber = (number) => {
    return number.trim().length >= 8;
  };

  const signUpSuccess = (data) => {
    setLoading("");
    dispatch(setUser(data.user));
    navigate("/");
    window.location.reload();
  };

  const signUpFailure = (
    data = {
      message: "Something went wrong. Please try again later",
    }
  ) => {
    setLoading("");
    console.log(data);
  };

  const handleSignUp = () => {
    if (validateInput()) {
      setLoading("Signing In...");
      registerUser(
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        signUpSuccess,
        signUpFailure
      );
    }
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  const validateInput = () => {
    let isValid = true;
    if (!validateEmail(email.trim())) {
      setEmailIsError(true);
      isValid = false;
    }

    if (!validateName(firstName)) {
      setFirstNameIsError(true);
      isValid = false;
    }

    if (!validateName(lastName)) {
      setLastNameIsError(true);
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberIsError(true);
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordIsError(true);
      isValid = false;
    }

    if (!(password === confirmPassword)) {
      setConfirmPasswordIsError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="login-container container">
      <div className="login-left-pane" />
      <div className="login-right-pane">
        <div className="login">
          <div className="login-header">
            <h1>Set up your Pawppy account</h1>
            <p>Create an account to find the pet of your dreams. </p>
          </div>

          <div className="login-input-wrapper-container">
            <div className="login-input-wrapper">
              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (firstNameIsError) setFirstNameIsError(false);
                    }}
                  />
                  {validateName(firstName) && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {firstNameIsError && (
                  <p className="error-text">* Must have 3 or more characters</p>
                )}
              </div>

              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (lastNameIsError) setLastNameIsError(false);
                    }}
                  />
                  {validateName(lastName) && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {lastNameIsError && (
                  <p className="error-text">* Must have 3 or more characters</p>
                )}
              </div>

              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailIsError) setEmailIsError(false);
                    }}
                  />
                  {validateEmail(email.trim()) && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {emailIsError && (
                  <p className="error-text">Please enter a valid email</p>
                )}
              </div>

              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type={getPasswordType(passwordIsVisible)}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordIsError) setPasswordIsError(false);
                    }}
                  />
                  {passwordIsVisible ? (
                    <AiFillEye
                      size={iconSize}
                      onClick={togglePasswordVisibility}
                      className={"password-visibility-icon"}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={iconSize}
                      onClick={togglePasswordVisibility}
                      className={"password-visibility-icon"}
                    />
                  )}
                  {validatePassword(password) && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {passwordIsError && (
                  <p className="error-text">
                    Please enter a valid password. Passwords must have at least
                    eight characters and contain at least one of each of the
                    following: Uppercase letter, Lowercase letter, Number,
                    Special Character
                  </p>
                )}
              </div>

              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type={getPasswordType(passwordIsVisible)}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordIsError)
                        setConfirmPasswordIsError(false);
                    }}
                  />
                  {passwordIsVisible ? (
                    <AiFillEye
                      size={iconSize}
                      onClick={togglePasswordVisibility}
                      className={"password-visibility-icon"}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={iconSize}
                      onClick={togglePasswordVisibility}
                      className={"password-visibility-icon"}
                    />
                  )}
                  {password && password === confirmPassword && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {confirmPasswordIsError && (
                  <p className="error-text">Passwords do not match</p>
                )}
              </div>

              <div className="login-input-container">
                <div className="login-input">
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (phoneNumberIsError) setPhoneNumberIsError(false);
                    }}
                  />
                  {phoneNumber.trim().length >= 8 && (
                    <AiFillCheckCircle
                      size={validInputIconSize}
                      color="#00DC7D"
                      className="input-valid-icon"
                    />
                  )}
                </div>
                {phoneNumberIsError && (
                  <p className="error-text">
                    Please enter a valid phone number
                  </p>
                )}
              </div>

              <div>
                <Button
                  text={"Sign Up"}
                  onClick={handleSignUp}
                  className="sign-in-button-component"
                />
              </div>
            </div>

            <div className="sign-in-prompt">
              <p>Already have an account? &nbsp;</p>
              <span className="sign-in-button" onClick={goToSignIn}>
                <p>Sign In</p>
                <AiOutlineArrowRight size={iconSize} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <Loading loading={loading} text={loading} />
    </div>
  );
};

export default SignUp;
