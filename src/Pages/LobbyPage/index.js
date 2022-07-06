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
      <label htmlFor="username">Your username</label>
      <input
        name="username"
        type="text"
        value={username}
        placeholder="Enter username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <button onClick={navigateToList}>Submit</button>
    </div>
  );
};
