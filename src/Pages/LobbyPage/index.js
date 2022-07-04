import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../../store/game/actions";
import { SelectGame } from "../../store/game/selectors";

// const socket = io.connect("http://localhost:3001");

export const LobbyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const game = useSelector(SelectGame);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  console.log(game);

  useEffect(() => {
    if (game) {
      navigate("/game");
    }
  }, [navigate, game]);

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
        <label htmlFor="room">Room ID</label>
        <input
          name="room"
          type="text"
          placeholder="Enter Room ID"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <button type="submit">Join room</button>
      </form>
    </div>
  );
};
