import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");
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
    console.log(room);
  };

  return (
    <div className="lobby-game" key={props.id}>
      <h4>Game name</h4>
      <h2>{props.name}</h2>
      <p>Players: {props.players} / 5</p>
      {props.players >= 5 ? (
        "Game is full"
      ) : (
        <button onClick={joinRoom}>Join game</button>
      )}
    </div>
  );
};
