import { Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./Components/NavBar";
import { GameList } from "./Pages/GameList";
import { LobbyPage } from "./Pages/LobbyPage";
import { MainGame } from "./Pages/MainGame";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LobbyPage />} />
        <Route exact path="/game" element={<MainGame />} />
        <Route exact path="/list" element={<GameList />} />
      </Routes>
    </div>
  );
}

export default App;
