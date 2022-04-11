import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    value: {
      user: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
  },
});

export const { setUser } = user.actions;
export default user.reducer;
