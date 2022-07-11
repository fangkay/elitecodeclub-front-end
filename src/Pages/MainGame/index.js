import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleGame,
  startNewGame,
  passTurn,
  submitBid,
} from "../../store/game/actions";
import { selectSingleGame } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";
import { socket } from "../../config/socket";
import { LobbyList } from "../../Components/LobbyList";

export const MainGame = () => {
  const dispatch = useDispatch();
  const [fullGame, setFullGame] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [highestBid, setHighestBid] = useState(0);
  const [currentBid, setCurrentBid] = useState([]);
  const [hasPassed, setHasPassed] = useState(false);
  const mainPlayerName = useSelector(selectUsername);
  const gamePlayers = useSelector(selectSingleGame);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // this is to fetch the current player list before starting
    dispatch(getSingleGame(id));

    // here we get the actual gameState after starting
    socket.on("gamestate", (data) => {
      console.log("this is the gamestate data", data);
      setFullGame(data);
      setGameStarted(true);
    });

    socket.on("new-turn", (data) => {});
  }, [dispatch, id]);

  const startGame = () => {
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
  const myPlayer = players[mainPlayerName];
  const playerNames = Object.keys(players);

  // Getting all the money from the main player
  const { money } = myPlayer;
  const allMoney = Object.keys(money);
  const onlyMoney = allMoney.slice(0, 11);

  // Getting all the scores of all players
  const getScores = playerNames.map((p) => {
    const player = players[p];
    const score = player.score;
    return Object.keys(score);
  });

  const playerTurn = fullGame.turn[0].username;

  // Checks if player can select money or not
  const selectMoney = (card) => {
    if (playerTurn === myPlayer.username) setCurrentBid([...currentBid, card]);
    const totalBid = currentBid.reduce(
      (val1, val2) => parseInt(val1) + parseInt(val2)
    );
    // dispatch(submitBid(setCurrentBid, fullGame.turn, id));

    setHighestBid(totalBid);
  };

  // Sets passing turn to the next player
  const passBid = () => {
    dispatch(passTurn(fullGame.turn, id));
    setHasPassed(!hasPassed);
  };

  console.log("what is updated fullGame", fullGame);

  const currentPlayerPassed = fullGame.turn.find(
    (t) => t.username === myPlayer.username
  ).passed;

  console.log("did i bid??", currentBid);

  if (gameStarted)
    return (
      <div>
        <div className="highest-bid">
          <p>Current highest bid</p>
          <h2>0</h2>
        </div>
        <div className="point-card">7</div>
        <div className="other-player-bids">
          {playerNames.map((name) => {
            const player = players[name];
            return (
              <div className="other-player-bid" key={player.id}>
                {player.username} bids <h3>20000</h3>
              </div>
            );
          })}
        </div>
        {playerTurn === myPlayer.username && currentPlayerPassed === false ? (
          <div className="action-buttons">
            <button onClick={passBid}>Pass</button>
            <button>Confirm bid</button>
            <h3>It's your turn</h3>
          </div>
        ) : (
          <h3>{playerTurn}'s turn</h3>
        )}
        <button>View scores</button>
        <div className="player-info">
          <p>Username: {myPlayer.username}</p>
          <p>Your current bid</p>
          <h3>{highestBid}</h3>
        </div>
        <div className="player-money">
          {onlyMoney.map((m, index) => {
            return (
              <div
                onClick={() => selectMoney(m)}
                className={
                  !hasPassed && playerTurn === myPlayer.username
                    ? "card"
                    : "card-disabled"
                }
                key={index}
              >
                {m}
              </div>
            );
          })}
        </div>

        {/* <div>
          {getScores.map((s, index) => {
            console.log("what is s?", s);
            return (
              <div key={index}>
                <div>{s}</div>
              </div>
            );
          })}
        </div> */}
      </div>
    );
};

// const playerNames = Object.keys(players); // [marta, matias, fang];

// playerNames.map(name => {
//   const theguy = players[name];

//   return <div>{theguy.username}</div>

// })
