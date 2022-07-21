import { useSelector } from "react-redux";
import { selectResults } from "../../store/game/selectors";
import logo from "../../Logo-green.svg";

export const ResultsScreen = () => {
  const endState = useSelector(selectResults);

  console.log("end state on results screen", endState);

  const { username, results } = endState;

  return (
    <div className="lobby-content">
      <div className="lobby-header">
        <img src={logo} alt="bidbybid-logo" className="lobby-logo"></img>

        {username === results.winner ? (
          <h1>You won!</h1>
        ) : (
          <h1>Player {results.winner} won!</h1>
        )}

        {results.playerScores.map((r) => (
          <div>
            <h3>{r.name}</h3>
            <h4>{r.endScore}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
