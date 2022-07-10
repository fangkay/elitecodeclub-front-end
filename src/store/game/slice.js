import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fetchGames: (state, action) => {
      state.game = action.payload;
    },
    createNewGame: (state, action) => {
      state.game = [...state.game, action.payload];
    },
    fetchSingleGame: (state, action) => {
      state.currentGame = action.payload;
    },
  },
});

export const { createNewGame, fetchGames, fetchSingleGame } = gameSlice.actions;

export default gameSlice.reducer;
