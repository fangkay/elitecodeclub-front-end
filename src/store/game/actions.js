import axios from "axios";
import { apiUrl } from "../../config/constants";
import { createNewGame, fetchGames, fetchSingleGame } from "./slice";

export const createGame = (name) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/game`, {
        name,
      });
      console.log(response.data);
      dispatch(createNewGame(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getAllGames = async (dispatch, getState) => {
  try {
    const response = await axios.get(`${apiUrl}/game`);
    dispatch(fetchGames(response.data));
  } catch (e) {
    console.log(e.message);
  }
};

export const getSingleGame = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/game/${id}`);
      dispatch(fetchSingleGame(response.data));
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const startNewGame = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/game/start`, {
        gameId: id,
      });
      return response.data;
    } catch (e) {
      console.log(e.message);
    }
  };
};
