import React from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../redux/reducers/authReducer";
import { logout } from "../services/UserService";
import useAuth from "./useAuth";

const Auth = () => {
  const authenticated = useAuth();
  const dispatch = useDispatch();
  if (!authenticated)
    logout(
      () => {
        dispatch(setAuthState(authenticated));
        dispatch({
          type: "LOGOUT",
        });
      },
      () => {}
    );
  else dispatch(setAuthState(authenticated));

  return <></>;
};

export default Auth;
