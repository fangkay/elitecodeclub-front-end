import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUsername } from "../../store/user/actions";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const navigateToList = () => {
    dispatch(storeUsername(username));
    navigate("/list");
  };

  return (
    <div>
      <form className="form">
        <div className="form-item">
          <label htmlFor="username">Your username</label>
        </div>
        <div className="form-item">
          <input
            className="form-input"
            name="username"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button
            className="form-button"
            type="submit"
            onClick={navigateToList}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
