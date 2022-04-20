import storage from "redux-persist/lib/storage";
import appReducer from "./appReducer";

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
