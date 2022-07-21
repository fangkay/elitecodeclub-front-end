import { useNavigate } from "react-router-dom";
import { socket } from "../../config/socket";
import { useDispatch } from "react-redux";
import { createNewPlayer } from "../../store/user/actions";

export const LobbyGameCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const joinRoom = () => {
    dispatch(createNewPlayer(props.username, props.id));
    const room = props.id;
    socket.emit("join_room", props.id);
    navigate(`/game/${room}`, { replace: true });
  };

  return (
    <div className="lobby-game" key={props.id}>
      <p>Game name</p>
      <h2>{props.name}</h2>
      <p>Players: {props.players} / 5</p>
      {props.players >= 5 ? (
        "Game is full"
      ) : (
        <button className="lobby-button" onClick={joinRoom}>
          Join game
        </button>
      )}
    </div>
  );
};
