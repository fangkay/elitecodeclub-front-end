import axios from "axios";
import { apiUrl } from "../../config/constants";
import { createNewGame, fetchGames } from "./slice";

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
