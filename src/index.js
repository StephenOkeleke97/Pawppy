import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.css";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store/store";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import Search from "./routes/Search";
import User from "./routes/User";
import Profile from "./routes/Profile";
import Favorites from "./routes/Favorites";
import Name from "./routes/Name";
import Phonenumber from "./routes/Phonenumber";
import Password from "./routes/Password";
import Details from "./routes/Details";
import Auth from "./auth/Auth";

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Auth />
          <Navigation />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="search" element={<Search />} />
            <Route path={`details/:id`} element={<Details />} />
            <Route path="register" element={<SignUp />} />
            <Route path="login" element={<SignIn />} />
            <Route path="user" element={<User />}>
              <Route path="profile" element={<Profile />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="name" element={<Name />} />
              <Route path="phonenumber" element={<Phonenumber />} />
              <Route path="changepassword" element={<Password />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
