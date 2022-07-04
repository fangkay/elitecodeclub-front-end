import io from "socket.io-client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createGame } from "../../store/game/actions";

// const socket = io.connect("http://localhost:3001");

export const LobbyPage = () => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  // const joinRoom = () => {
  //   if (!room || !username) {
  //     console.log("Please enter a room ID/username");
  //   } else {
  //     console.log("test");
  //     socket.emit("join_room", room);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGame(room));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <button type="submit">Join room</button>
      </form>
    </div>
  );
};
