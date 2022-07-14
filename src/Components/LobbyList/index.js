import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../config/socket";
import { selectSingleGame } from "../../store/game/selectors";

export const LobbyList = (props) => {
  const getGame = useSelector(selectSingleGame);
  const getPlayers = getGame.players;
  const [allPlayers, setAllPlayers] = useState([getPlayers]);

  useEffect(() => {
    setAllPlayers(getPlayers);
    socket.on("new-player", (newPlayer) => {
      console.log("got message from new-player emit");
      setAllPlayers(...allPlayers, newPlayer);
    });
  }, [allPlayers, getPlayers]);

  return (
    <div className="lobby-details">
      <p>Lobby</p>
      <h2>{props.gameName}</h2>
      <p>Players: {props.players.length} / 5</p>
      <div className="player-list">
        {props.players.map((props, index) => {
          return (
            <div key={props.id}>
              <p>
                {index + 1}. {props.username}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
