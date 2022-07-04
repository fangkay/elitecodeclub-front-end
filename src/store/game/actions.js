import axios from "axios";
import { apiUrl } from "../../config/constants";
import { createNewGame } from "./slice";

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
