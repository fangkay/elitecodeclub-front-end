import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUsername } from "../../store/user/actions";
import logo from "../../Logo-green.svg";
import headerimg from "../../header-image.png";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const navigateToList = () => {
    dispatch(storeUsername(username));
    navigate("/list");
  };

  return (
    <div className="lobby-content">
      <div className="lobby-header">
        <img src={headerimg} alt="money jar" className="money-jar"></img>
        <img src={logo} alt="bidbybid-logo" className="lobby-logo"></img>
        <h3>
          A card game where players bid on cards to earn points. But don't spend
          too much because the poorest player can never win
        </h3>
      </div>
      <form className="form">
        <div className="form-item">
          <label htmlFor="username">Your username</label>
        </div>
        <input
          className="form-item form-input"
          name="username"
          type="text"
          value={username}
          placeholder="Enter username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button
          className="form-item form-button"
          type="submit"
          onClick={navigateToList}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
