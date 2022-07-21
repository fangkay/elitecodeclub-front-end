import { useEffect } from "react";
import { socket } from "../../config/socket";

export const ScoreScreen = () => {
  useEffect(() => {
    socket.on("game-results", (data) => {});
  });

  return (
    <div>
      <h1>The game has ended!</h1>
    </div>
  );
};
