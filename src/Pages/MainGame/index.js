import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleGame } from "../../store/game/actions";
import { selectSingleGame } from "../../store/game/selectors";
import { socket } from "../../config/socket";

export const MainGame = () => {
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(getSingleGame(id));
    socket.on("gamestate", (data) => {
      console.log("we got it!", data);
    });
  }, [dispatch, id]);

  const currentGame = useSelector(selectSingleGame);
  if (!currentGame) return <h3>Loading...</h3>;

  const { players } = currentGame;

  const startGame = () => {
    // post request to start game => triggers backend to create game inital state and send to room.
  };

  return (
    <div>
      <h4>Lobby code {currentGame.id}</h4>
      <p>Players {players.length} / 5</p>
      {players.map((player, index) => {
        return (
          <div key={player.id}>
            <p>
              {index + 1}.{player.username}
            </p>
          </div>
        );
      })}
      <button onClick={startGame}>Start game</button>
    </div>
  );
};
