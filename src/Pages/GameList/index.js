import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LobbyGameCard } from "../../Components/LobbyGameCard";
import { getAllGames } from "../../store/game/actions";
import { selectAllGames } from "../../store/game/selectors";

export const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);

  console.log(games);

  useEffect(() => {
    dispatch(getAllGames);
  }, [dispatch]);

  if (!games) return <h3>Loading...</h3>;

  return (
    <div>
      <h1>Current games</h1>
      {!games
        ? "Loading"
        : games.map((game) => {
            return (
              <LobbyGameCard
                key={game.id}
                name={game.name}
                players={game.players.length}
                id={game.id}
              />
            );
          })}
    </div>
  );
};
