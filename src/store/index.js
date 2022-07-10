import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game/slice";
import userReducer from "./user/slice";

export default configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});
