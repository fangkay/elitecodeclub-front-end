export const LobbyList = (props) => {
  return (
    <div className="lobby-details">
      <h2>Lobby code: {props.id}</h2>
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
