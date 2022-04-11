import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import globalReducer from "./global";

export default combineReducers({
  userReducer,
  globalReducer,
});
