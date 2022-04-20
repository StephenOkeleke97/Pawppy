import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    value: false,
  },
  reducers: {
    setAuthState: function (state, action) {
      state.value = action.payload;
    },
  },
});

export const { setAuthState } = authenticated.actions;
export default authenticated.reducer;
