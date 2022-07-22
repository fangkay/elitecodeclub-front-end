import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleGame,
  startNewGame,
  submitBid,
} from "../../store/game/actions";
import { storeResults } from "../../store/game/slice";
import { selectSingleGame } from "../../store/game/selectors";
import { selectUsername } from "../../store/user/selectors";
import { socket } from "../../config/socket";
import { LobbyList } from "../../Components/LobbyList";
import { ScoreboardModal } from "../../Components/ScoreboardModal";

export const MainGame = () => {
  const navigate = useNavigate();
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
      console.log("updatedTurn", updatedBidData);
      // update allBids
      setAllBids(updatedBidData.bids);

      // update turns (local state)
      setTurns(updatedBidData.turns);
    });

    socket.on("finish-game", (results) => {
      console.log("what are the end-game results?", results);
      dispatch(storeResults(results));
      // navigate to results page
      navigate("/results");
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
    if (currentBid.includes(card) && playerTurn === myPlayer.username) {
      const filteredBid = currentBid.filter((c) => c !== card);
      console.log("IM HERE", card, currentBid, filteredBid);
      setCurrentBid(filteredBid);
    } else if (playerTurn === myPlayer.username) {
      setCurrentBid([...currentBid, card]);
    }
  };

  // Converting specialCards to proper values in the front-end
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

  const getAllPlayerBids = playerNames.map((name) => {
    const player = players[name];
    return allBids[player.username].reduce((acc, m) => acc + parseInt(m), 0);
  });

  console.log("what is getPlayerNames?", getAllPlayerBids);

  // const max = arr.reduce(function(a, b) {
  //   return Math.max(a, b);

  const highestBid = getAllPlayerBids.reduce((a, b) => {
    return Math.max(a, b);
  });
  console.log("what is the highestBid", highestBid);

  console.log("what is currentBid?", currentBid);

  if (gameStarted)
    return (
      <div>
        <div className="highest-bid">
          <p>Highest bid</p>
          <h2>{highestBid}</h2>
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
            <button
              id={totalPlayerBid <= highestBid ? "button-disabled" : ""}
              onClick={() => submitPlayerBid(false, myPlayer.id)}
            >
              Confirm bid
            </button>
          </div>
        ) : (
          <h3>{playerTurn}'s turn</h3>
        )}
        <p>Username: {myPlayer.username}</p>
        <div className="player-info">
          <div className="player-info-bid">
            <p>Your bid</p>
            <h3>{totalPlayerBid}</h3>
          </div>
          <div className="player-info-cards">
            {currentBid.map((c) => {
              return (
                <div key={c.id} className="card player-info-card">
                  {c}
                </div>
              );
            })}
          </div>
        </div>
        <div className="player-money">
          {money.map((m, index) => {
            return (
              <div
                id={m.id}
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
                    : {
                        backgroundColor: "#fff",
                        color: "#3e885b",
                        border: "2px solid #3e885b",
                        top: 0,
                      }
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
