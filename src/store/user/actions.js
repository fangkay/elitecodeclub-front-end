import axios from "axios";
import { apiUrl } from "../../config/constants";
import { storeName } from "./slice";

export const storeUsername = (username) => {
  return async (dispatch, getState) => {
    dispatch(storeName(username));
  };
};

export const createNewPlayer = (username, gameId) => {
  return async (dispatch, getState) => {
    const response = await axios.post(`${apiUrl}/user/create`, {
      username,
      gameId,
    });
  };
};
