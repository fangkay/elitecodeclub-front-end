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
      setCurrentBid([]);
    });

    // fires at the end of every players turn => updates currentBids and turns (to see who passed and who's turn it is now)
    socket.on("new-bid", (updatedBidData) => {
      console.log("what is updatedBidData?", updatedBidData);
      // update allBids
      setAllBids(updatedBidData.bids);

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
        <LobbyList
          players={gamePlayers.players}
          id={gamePlayers.id}
          gameName={gamePlayers.name}
        />
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  if (!fullGame) return <div>Loading...</div>;

  // Getting all the player names currently in-game
  const { players } = fullGame;
  const myPlayer = players[mainPlayerName];
  const playerNames = Object.keys(players);

  // Getting all money card from the main player ---- TODO: Add a check where each card is false
  const { money } = myPlayer;
  console.log("what is money?", money);

  // Getting all the scores of all players
  // const getScores = playerNames.map((p) => {
  //   const player = players[p];
  //   const score = player.score;
  //   return Object.keys(score);
  // });

  const submitPlayerBid = (passed, pId) => {
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
      playerId: pId,
    };
    dispatch(submitBid(bidState));
  };

  const playerTurn = turns[0].username;

  // Adds selected cards into the currentBid array [25000,20000]
  const selectMoney = (card) => {
    if (currentBid.includes(card)) return;
    if (playerTurn === myPlayer.username) setCurrentBid([...currentBid, card]);
  };

  const specialCards = () => {
    const isMultiplyCard = auctionCard.includes("multiply");
    const isDivideCard = auctionCard.includes("divide");
    const isMinusCard = auctionCard.includes("minusFive");
    const isDiscardCard = auctionCard.includes("discardPoints");
    if (isMultiplyCard) {
      return "x2";
    } else if (isDivideCard) {
      return "½";
    } else if (isMinusCard) {
      return "-5";
    } else if (isDiscardCard) {
      return "Discard";
    } else {
      return auctionCard;
    }
  };

  // Check if current player has passed
  const currentPlayerPassed = turns.find(
    (t) => t.username === myPlayer.username
  ).passed;

  const totalPlayerBid = currentBid.reduce(
    (partialSum, a) => parseInt(partialSum) + parseInt(a),
    0
  );

  if (gameStarted)
    return (
      <div>
        <div className="highest-bid">
          <p>Highest bid</p>
          <h3>Display the highest bid</h3>
        </div>
        <div className="main-game">
          <div className="point-card">{specialCards()}</div>
          <div className="other-player-bids">
            {playerNames.map((name) => {
              const player = players[name];
              return (
                <div className="other-player-bid" key={player.id}>
                  {player.username} bids{" "}
                  <h3>
                    {allBids[player.username].reduce(
                      (acc, m) => acc + parseInt(m),
                      0
                    )}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <ScoreboardModal players={players} />
        {playerTurn === myPlayer.username && currentPlayerPassed === false ? (
          <div className="action-buttons">
            <h3>It's your turn</h3>
            <button
              id="pass"
              onClick={() => submitPlayerBid(true, myPlayer.id)}
            >
              Pass
            </button>
            <button onClick={() => submitPlayerBid(false, myPlayer.id)}>
              Confirm bid
            </button>
          </div>
        ) : (
          <h3>{playerTurn}'s turn</h3>
        )}
        {/* <p>Username: {myPlayer.username}</p> */}
        <div className="player-info">
          <div className="player-info-bid">
            <p>Your bid</p>
            <h3>{totalPlayerBid}</h3>
          </div>
          <div className="player-info-cards">
            {currentBid.map((c) => {
              return <div className="card player-info-card">{c}</div>;
            })}
          </div>
        </div>
        <div className="player-money">
          {money.map((m, index) => {
            return (
              <div
                onClick={() => selectMoney(m)}
                className={
                  playerTurn === myPlayer.username ? "card" : "card-disabled"
                }
                style={
                  currentBid.includes(m)
                    ? {
                        backgroundColor: "#3e885b",
                        color: "white",
                        top: "-10px",
                      }
                    : {}
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
