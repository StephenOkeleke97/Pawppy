import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import globalReducer from "./global";
import authReducer from "./authReducer";

export default combineReducers({
  userReducer,
  globalReducer,
  authReducer
});
