import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "../routes/Home";
import SignUp from "../routes/SignUp";
import SignIn from "../routes/SignIn";
import Profile from "../routes/Profile";
import Favorites from "../routes/Favorites";
import Search from "../routes/Search";
import Name from "../routes/Name";
import Phonenumber from "../routes/Phonenumber";
import Password from "../routes/Password";
import store from "../redux/store/store";
import { BrowserRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

/** HOME TEST **/
test("test home page renders view all button", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  const viewAllButton = screen.getByText(/view all/i);
  expect(viewAllButton).toBeInTheDocument();
});

/** SEARCH TEST **/
test("test search page contains search button", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );
  const searchButton = screen.getByText(/search/i);
  expect(searchButton).toBeInTheDocument();
});

/** REGISTER TEST **/
test("register page contains input for first name", () => {
  render(
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
  const firstNameInput = screen.getByPlaceholderText(/first name/i);
  expect(firstNameInput).toBeInTheDocument();
});

/** LOGIN TEST **/
test("login page contains input for email", () => {
  render(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
  const emailInput = screen.getByPlaceholderText(/email/i);
  expect(emailInput).toBeInTheDocument();
});

/** PROFILE TEST **/
test("profile page contains contact info heading", () => {
  render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );
  const contactHeading = screen.getByText(/contact info/i);
  expect(contactHeading).toBeInTheDocument();
});

/** FAVORITES TEST **/
test("favorites page contains favorites heading", () => {
  render(
    <Provider store={store}>
      <Favorites />
    </Provider>
  );
  const favoritesHeading = screen.getByText(/favorites/i);
  expect(favoritesHeading).toBeInTheDocument();
});

/** EDIT NAME TEST **/
test("name page contains first name label", () => {
  render(
    <Provider store={store}>
      <Name />
    </Provider>
  );
  const firstNameLabel = screen.getByLabelText(/first name/i);
  expect(firstNameLabel).toBeInTheDocument();
});

/** EDIT PHONE NUMBER TEST **/
test("phone number page contains phone number label", () => {
  render(
    <Provider store={store}>
      <Phonenumber />
    </Provider>
  );
  const phoneNumberLabel = screen.getByLabelText(/phone number/i);
  expect(phoneNumberLabel).toBeInTheDocument();
});

/** EDIT PASSWORD TEST **/
test("password page contains confirm password label", () => {
  render(
    <Provider store={store}>
      <Password />
    </Provider>
  );
  const passwordLabel = screen.getByLabelText(/confirm password/i);
  expect(passwordLabel).toBeInTheDocument();
});
