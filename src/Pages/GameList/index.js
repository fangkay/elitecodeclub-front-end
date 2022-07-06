import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LobbyGameCard } from "../../Components/LobbyGameCard";
import { createGame, getAllGames } from "../../store/game/actions";
import { selectAllGames } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";

export const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const username = useSelector(selectUsername);
  const [room, setRoom] = useState("");

  useEffect(() => {
    dispatch(getAllGames);
  }, [dispatch]);

  if (!games) return <h3>Loading...</h3>;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGame(room));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="room">Room ID</label>
          <input
            name="room"
            type="number"
            placeholder="Enter Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />

          <button type="submit">Create game</button>
        </form>
      </div>
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
                  username={username}
                />
              );
            })}
      </div>
    </div>
  );
};
