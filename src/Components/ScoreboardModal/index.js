import { useEffect, useState } from "react";
import Modal from "react-modal";

export const ScoreboardModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [arrayOfPlayers, setArrayOfPlayers] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const players = props.players;

  useEffect(() => {
    setArrayOfPlayers(Object.keys(players));
  }, [players]);

  return (
    <div>
      <button onClick={openModal}>View scores</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="scoreboard-content">
          <h2>Scoreboard</h2>
          <div className="scoreboard-headers">
            <h4>Players</h4>
            <h4>Cards</h4>
          </div>
          <div className="scoreboard-players">
            {arrayOfPlayers.map((player) => {
              return (
                <div key={player.id} className="scoreboard-player">
                  <h3>{player}</h3>
                  <div className="score-cards">
                    {players[player].score.map((card) => {
                      return (
                        <div className="card score-card" key={card.id}>
                          {card}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <button id="scoreboard-close-button" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
