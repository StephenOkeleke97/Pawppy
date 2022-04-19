import axios from "axios";
const host = "http://localhost:5100/";
const timeout = 10000;

export function registerUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  success,
  failure
) {
  const api = host + "user/register";
  const body = {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
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
      console.log(response);
      success(response.data);
    })
    .catch((error) => {
      if (error.response) failure(error.response.data);
      else failure();
    });
}

export function logout(success, failure) {
  const api = host + "user/logout";
  axios
    .post(api, null, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success();
    })
    .catch((error) => {
      failure();
      console.log(error);
    });
}

export function changeName(firstName, lastName, success, failure) {
  const api = host + "user/update/name";
  const body = {
    firstName: firstName,
    lastName: lastName,
  };
  axios
    .put(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failure();
      console.log(error);
    });
}

export function changePhoneNumber(phoneNumber, success, failure) {
  const api = host + "user/update/phonenumber";
  const body = {
    phoneNumber: phoneNumber,
  };
  axios
    .put(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failure();
      console.log(error);
    });
}

export function changePassword(oldpassword, newPassword, success, failure) {
  const api = host + "user/update/password";
  const body = {
    password: oldpassword,
    newPassword: newPassword,
  };
  axios
    .put(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success();
    })
    .catch((error) => {
      if (error.response && error.response.status === 401)
        failure("Invalid Password");
      else failure();
      console.log(error);
    });
}

export function addToFavorite(animal, success, failure) {
  const api = host + "api/v1/favorites";
  const body = {
    animal: animal,
  };
  axios
    .post(api, body, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      console.log(response.data);
      success(response.data.favorites, "Added to Favorites.");
    })
    .catch((error) => {
      if (error.response && error.response.status === 400)
        failure(error.response.data.message);
      else failure();
      console.log(error);
    });
}

export function deleteFromFavorite(animalId, success, failure) {
  const api = host + "api/v1/favorites";
  const params = {
    animal: animalId,
  };
  axios
    .delete(api, {
      withCredentials: true,
      timeout: timeout,
      params: params,
    })
    .then((response) => {
      success(response.data.favorites, "Removed from Favorites.");
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        failure(error.response.data.message);
      }
      failure();
      console.log(error);
    });
}

export function getFavorites(success, failure) {
  const api = host + "api/v1/favorites";
  axios
    .get(api, {
      withCredentials: true,
      timeout: timeout,
    })
    .then((response) => {
      success(response.data.favorites);
    })
    .catch((error) => {
      console.log(error);
    });
}
