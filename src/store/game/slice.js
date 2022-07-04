import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createNewGame: (state, action) => {
      state.game = action.payload;
      console.log(action.payload);
    },
  },
});

export const { createNewGame } = gameSlice.actions;

export default gameSlice.reducer;
