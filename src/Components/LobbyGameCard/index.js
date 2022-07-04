import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export const LobbyGameCard = (props) => {
  const joinRoom = () => {
    const room = props.id;
    socket.emit("join_room", props.id);
    console.log(room);
  };

  return (
    <div key={props.id}>
      <h4>Game name: {props.name}</h4>
      <p>Players: {props.players} / 5</p>
      {props.players >= 5 ? (
        "Game is full"
      ) : (
        <button onClick={joinRoom}>Join game</button>
      )}
    </div>
  );
};
