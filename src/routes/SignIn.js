import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGlobal } from "../reducers/global";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineArrowRight,
  AiFillCheckCircle,
} from "react-icons/ai";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsError, setEmailIsError] = useState(false);
  const [passwordIsError, setPasswordIsError] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const iconSize = 14;
  const validInputIconSize = 13;

  useEffect(() => {
    dispatch(updateGlobal({ navText: "#6D6E71", navBackground: "#fff" }));
  }, []);

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

  const handleSignIn = () => {
    if (validateInput()) {
      console.log("Sign In");
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const validateInput = () => {
    let isValid = true;
    if (!validateEmail(email.trim())) {
      setEmailIsError(true);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="login-container">
      <div className="login-left-pane signin-left-pane" />
      <div className="login-right-pane signin-right-pane">
        <div className="login">
          <div className="login-header">
            <h1>Sign in to your Pawppy account</h1>
            <p>Welcome back pet lover !</p>
          </div>

          <div className="login-input-wrapper-container">
            <div className="login-input-wrapper">
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
                  <p className="login-error-text">Please enter a valid email</p>
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
                </div>
              </div>

              <div>
                <Button text={"Login"} onClick={handleSignIn} />
              </div>
            </div>

            <div className="sign-in-prompt">
              <p>Don't have an account? &nbsp;</p>
              <span className="sign-in-button" onClick={goToSignUp}>
                <p>Create Account</p>
                <AiOutlineArrowRight size={iconSize} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
