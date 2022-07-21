import { useSelector } from "react-redux";
import { selectResults } from "../../store/game/selectors";
import logo from "../../Logo-green.svg";

export const ResultsScreen = () => {
  const endState = useSelector(selectResults);

  console.log("end state on results screen", endState);

  const { username, results } = endState;

  return (
    <div className="lobby-content">
      <div className="lobby-header results">
        <img src={logo} alt="bidbybid-logo" className="lobby-logo"></img>

        {username === results.winner ? (
          <h1>You won!</h1>
        ) : (
          <h2>Player {results.winner} won!</h2>
        )}
        <div>
          <div className="result-headers">
            <h4>Player</h4>
            <h4>Money</h4>
            <h4>Score</h4>
          </div>
          {results.playerScores.map((r) => (
            <div className="player-result">
              <h3>{r.name}</h3>
              <h4>{r.totalMoney}</h4>
              <h4>{r.endScore}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
