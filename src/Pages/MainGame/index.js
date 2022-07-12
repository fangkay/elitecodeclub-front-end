import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleGame,
  startNewGame,
  submitBid,
} from "../../store/game/actions";
import { selectSingleGame } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";
import { socket } from "../../config/socket";
import { LobbyList } from "../../Components/LobbyList";
import { ScoreboardModal } from "../../Components/ScoreboardModal";

export const MainGame = () => {
  const dispatch = useDispatch();

  const [fullGame, setFullGame] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentBid, setCurrentBid] = useState([]);
  const [turns, setTurns] = useState([]); // set when game starts + set everytime there is a new bid (new turn)
  const [allBids, setAllBids] = useState(null); // holds all current bids from all players. Gets updated on every turn.
  const [auctionCard, setAuctionCard] = useState("");

  const mainPlayerName = useSelector(selectUsername);
  const gamePlayers = useSelector(selectSingleGame);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    // this is to fetch the current player list before starting
    dispatch(getSingleGame(id));

    // here we get the actual gameState after starting or when a NEW round starts
    socket.on("gamestate", (data) => {
      console.log("this is the gamestate data", data);
      setFullGame(data);

      // To-Do //
      // split away from Full game => allBids + turns to place in their own local state for ease of access and update.
      setGameStarted(true);

      // Set allBids data to local state
      const { bids, turns, currentCard } = data;
      setAllBids(bids);
      setTurns(turns);
      setAuctionCard(currentCard);
    });

    // fires at the end of every players turn => updates currentBids and turns (to see who passed and who's turn it is now)
    socket.on("new-bid", (updatedBidData) => {
      console.log("what is the new bid data?", updatedBidData);
      // update allBids
      setAllBids(updatedBidData.bids);
      console.log("what is updatedBidData?", updatedBidData.bids);

      // update turns (local state)
      setTurns(updatedBidData.turns);
    });
    // socket.on("new-turn", (data) => {});
  }, [dispatch, id]);

  // post request to start game => triggers backend to create game inital state and send to room.
  const startGame = () => {
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

  // Getting all money card from the main player
  const { money } = myPlayer;
  const allMoney = Object.keys(money);
  const onlyMoney = allMoney.slice(0, 11);

  // Getting all the scores of all players
  const getScores = playerNames.map((p) => {
    const player = players[p];
    const score = player.score;
    return Object.keys(score);
  });

  const submitPlayerBid = (passed) => {
    // bid is in localstate === currentBid;
    const bidState = {
      bids: {
        ...allBids,
        [mainPlayerName]: currentBid,
      },
      currentCard: fullGame.currentCard,
      turns: turns,
      activeTurn: {
        username: mainPlayerName,
        passed,
      },
      gameId: fullGame.gameId,
    };

    console.log("what is bidState before sending?", bidState);
    dispatch(submitBid(bidState));
  };

  const playerTurn = turns[0].username;
  console.log("what is playerTurn?", playerTurn);

  // Adds selected cards into the currentBid array [25000,20000]
  const selectMoney = (card) => {
    if (playerTurn === myPlayer.username) setCurrentBid([...currentBid, card]);
  };

  // Check if current player has passed
  const currentPlayerPassed = turns.find(
    (t) => t.username === myPlayer.username
  ).passed;

  // Convert bid into an integer to display

  if (gameStarted)
    return (
      <div>
        <div className="highest-bid">
          <p>Highest bid</p>
          <h2>Display the highest bid</h2>
        </div>
        <div className="point-card">{auctionCard}</div>
        <div className="other-player-bids">
          {playerNames.map((name) => {
            const player = players[name];
            return (
              <div className="other-player-bid" key={player.id}>
                {player.username} bids <h3>0</h3>
              </div>
            );
          })}
        </div>
        {playerTurn === myPlayer.username && currentPlayerPassed === false ? (
          <div className="action-buttons">
            <h2>It's your turn</h2>
            <button id="pass" onClick={() => submitPlayerBid(true)}>
              Pass
            </button>
            <button onClick={() => submitPlayerBid(false)}>Confirm bid</button>
          </div>
        ) : (
          <h3>{playerTurn}'s turn</h3>
        )}
        <ScoreboardModal scores={getScores} players={players} />
        <div className="player-info">
          <p>Username: {myPlayer.username}</p>
          <p>Your current bid</p>
          <h3>{currentBid}</h3>
        </div>
        <div className="player-money">
          {onlyMoney.map((m, index) => {
            return (
              <div
                onClick={() => selectMoney(m)}
                className={
                  playerTurn === myPlayer.username ? "card" : "card-disabled"
                }
                key={index}
              >
                {m}
              </div>
            );
          })}
        </div>
      </div>
    );
};
