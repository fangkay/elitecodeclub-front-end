import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeName: (state, action) => {
      console.log(action.payload);
      state.name = action.payload;
    },
  },
});

export const { storeName } = userSlice.actions;

export default userSlice.reducer;
