import axios from "axios";
const host = "http://localhost:5100/";
const timeout = 10000;

export function registerUser(email, password, success, failure) {
  const api = host + "user/register";
  const body = {
    email: email,
    password: password,
  };
  axios
    .post(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      if (error.response) failure(error.response.data);
      else failure();
    });
}

export function login(email, password, success, failure) {
  const api = host + "user/login";
  const body = {
    email: email,
    password: password,
  };
  axios
    .post(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      if (error.response) failure(error.response.data);
      else failure();
    });
}
