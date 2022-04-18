import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    value: {
      user: {},
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    updatePhoneNumber: (state, action) => {
      const phoneNumber = action.payload;
      state.value.user = {...state.value.user, phoneNumber}
    },
    updateName: (state, action) => {
      const firstName = action.payload.firstName;
      const lastName = action.payload.lastName;
      state.value.user = {...state.value.user, firstName, lastName}
    }
  },
});

export const { setUser, updatePhoneNumber, updateName } = user.actions;
export default user.reducer;
