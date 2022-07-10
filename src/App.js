import { Routes, Route } from "react-router-dom";
import "./App.css";
import { socket } from "./config/socket";
import { NavBar } from "./Components/NavBar";
import { GameList } from "./Pages/GameList";
import { LobbyPage } from "./Pages/LobbyPage";
import { MainGame } from "./Pages/MainGame";

function App() {
  console.log("socket", socket);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LobbyPage />} />
        <Route exact path="/list" element={<GameList />} />
        <Route path="/game/:id" element={<MainGame />} />
      </Routes>
    </div>
  );
}

export default App;
