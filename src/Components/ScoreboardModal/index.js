import { useState } from "react";
import Modal from "react-modal";

export const ScoreboardModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button onClick={openModal}>View scores</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Scoreboard</h2>
        <div>
          {props.scores.map((s, index) => {
            return (
              <div key={index}>
                <div>{s}</div>
              </div>
            );
          })}
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};
