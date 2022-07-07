import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleGame, startNewGame } from "../../store/game/actions";
import { selectSingleGame } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";
import { socket } from "../../config/socket";
import { LobbyList } from "../../Components/LobbyList";

export const MainGame = () => {
  const dispatch = useDispatch();
  const [playerState, setPlayerState] = useState(null);
  const [fullGame, setFullGame] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const mainPlayerName = useSelector(selectUsername);
  const gamePlayers = useSelector(selectSingleGame);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // this is to fetch the current player list before starting
    dispatch(getSingleGame(id));

    // here we get the actual gameState after starting
    socket.on("gamestate", (data) => {
      console.log("we got it!", data);
      setFullGame(data);
    });
  }, [dispatch, id]);

  const startGame = () => {
    setGameStarted(!gameStarted);
    // post request to start game => triggers backend to create game inital state and send to room.
    dispatch(startNewGame(id));
  };

  if (!gamePlayers) return <div>Loading...</div>;

  if (gamePlayers && !gameStarted) {
    return (
      <div>
        <LobbyList players={gamePlayers.players} id={gamePlayers.id} />
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  if (!fullGame) return <div>Loading...</div>;

  // Getting all the player names currently in-game
  const { players } = fullGame;

  // console.log("what is players", players);
  const myPlayer = players[mainPlayerName];

  const playerNames = Object.keys(players);

  // Getting all the money from the main player
  const { money } = myPlayer;
  const allMoney = Object.keys(money);
  const onlyMoney = allMoney.slice(0, 11);

  // const playerScore = Object.keys(players);

  if (gameStarted)
    return (
      <div>
        <h3>Current highest bid: {}</h3>
        <div>Show card</div>
        <h3>
          {playerNames.map((name) => {
            const player = players[name];
            return (
              <div key={player.id}>
                {player.username} bids: {}
              </div>
            );
          })}
        </h3>

        <button>Pass</button>
        <button>Confirm bid</button>

        <div>
          {onlyMoney.map((m, index) => {
            return <div key={index}>{m}</div>;
          })}
        </div>

        <div></div>
      </div>
    );
};

// const playerNames = Object.keys(players); // [marta, matias, fang];

// playerNames.map(name => {
//   const theguy = players[name];

//   return <div>{theguy.username}</div>

// })
