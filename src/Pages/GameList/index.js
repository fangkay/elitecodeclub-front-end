import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LobbyGameCard } from "../../Components/LobbyGameCard";
import { apiUrl } from "../../config/constants";
import { createGame, getAllGames } from "../../store/game/actions";
import { selectAllGames } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";

export const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(selectAllGames);
  const username = useSelector(selectUsername);
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGames);
  }, [dispatch, room]);

  if (!games) return <h3>Loading...</h3>;

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGame(room));
    setRoom("");
  };

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="room">Room ID</label>
          </div>
          <input
            className="form-item form-input"
            name="room"
            type="number"
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
