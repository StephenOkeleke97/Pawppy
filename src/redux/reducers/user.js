import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    value: {
      user: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        favorites: [],
      },
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      const phoneNumber = action.payload;
      state.value.user = { ...state.value.user, phoneNumber };
    },
    updateName: (state, action) => {
      const firstName = action.payload.firstName;
      const lastName = action.payload.lastName;
      state.value.user = { ...state.value.user, firstName, lastName };
    },
    updateFavorites: (state, action) => {
      const favorites = action.payload.favorites;
      state.value.user = { ...state.value.user, favorites };
    },
  },
});

export const { setUser, updatePhoneNumber, updateName, updateFavorites } =
  user.actions;
export default user.reducer;
