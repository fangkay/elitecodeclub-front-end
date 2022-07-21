export const selectGame = (reduxState) => reduxState.game;

export const selectAllGames = (reduxState) => reduxState.game.game;

export const selectSingleGame = (reduxState) => reduxState.game.currentGame;

export const selectResults = (reduxState) => {
  return {
    username: reduxState.user.name,
    results: reduxState.game.results,
  };
};
