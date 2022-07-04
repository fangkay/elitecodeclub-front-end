import io from "socket.io-client";
import { useState } from "react";
import { Link } from "react-router-dom";
const socket = io.connect("http://localhost:3001");

export const LobbyPage = () => {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const joinRoom = () => {
    if (!room || !username) {
      console.log("Please enter a room ID/username");
    } else {
      console.log("test");
      socket.emit("join_room", room);
    }
  };

  return (
    <div>
      <input
        placeholder="Room number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />

      {room && username && (
        <Link to="/game">
          <button onClick={joinRoom}>Join room</button>
        </Link>
      )}

      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
    </div>
  );
};
