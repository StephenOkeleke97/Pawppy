import { createSlice } from "@reduxjs/toolkit";

export const global = createSlice({
    name: "global",
    initialState: {
        value: {
            navBackground: "none",
            navText: "#fff"
        }
    },
    reducers: {
        updateGlobal: (state, action) => {
            Object.assign(state.value, action.payload);
        }
    }
});

export const { updateGlobal } = global.actions;
export default global.reducer;