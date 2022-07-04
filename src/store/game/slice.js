import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createNewGame: (state, action) => {},
  },
});

export const { createNewGame } = gameSlice.actions;

export default gameSlice.reducer;
