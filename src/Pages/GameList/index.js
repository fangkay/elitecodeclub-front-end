import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LobbyGameCard } from "../../Components/LobbyGameCard";
import { createGame, getAllGames } from "../../store/game/actions";
import { selectAllGames } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";
import { socket } from "../../config/socket";

export const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const username = useSelector(selectUsername);
  const [room, setRoom] = useState("");
  const [gameList, setGameList] = useState(games);

  useEffect(() => {
    dispatch(getAllGames);
    socket.on("new-game", (newGame) => {
      setGameList(...gameList, newGame);
    });
  }, [dispatch, room, games, gameList]);

  if (!games) return <h3>Loading...</h3>;

  // console.log("what is games", games);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGame(room));
    setRoom("");
  };

  // const sortedGames = games.sort((g1, g2) => g1.createdAt - g2.createdAt);

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="room">Create new game</label>
          </div>
          <input
            className="form-item form-input"
            name="room"
            type="text"
            value={room}
            placeholder="Enter Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button className="form-button" type="submit">
            Create game
          </button>
        </form>
      </div>
      <h1>Current games</h1>
      <div className="lobby-list">
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
