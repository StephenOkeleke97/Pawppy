import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../reducers/global";

export default configureStore({
    reducer: {
        global: globalReducer
    }
});