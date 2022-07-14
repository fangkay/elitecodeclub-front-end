import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUsername } from "../../store/user/actions";
import logo from "../../Logo-green.svg";

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
      <img src={logo} alt="bidbybid-logo" className="lobby-logo"></img>
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
