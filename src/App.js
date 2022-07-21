import { Routes, Route } from "react-router-dom";
import "./App.css";
import { socket } from "./config/socket";
import { NavBar } from "./Components/NavBar";
import { GameList } from "./Pages/GameList";
import { LobbyPage } from "./Pages/LobbyPage";
import { MainGame } from "./Pages/MainGame";
import { RulesPage } from "./Pages/Rules";
import { ScoreScreen } from "./Pages/ScoreScreen";
import { FAQPage } from "./Pages/FAQPage";
import { ResultsScreen } from "./Pages/ResultsScreen";

function App() {
  console.log("socket", socket);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LobbyPage />} />
        <Route exact path="/list" element={<GameList />} />
        <Route path="/game/:id" element={<MainGame />} />
        <Route path="/game/:id/scorescreen" element={<ScoreScreen />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/results" element={<ResultsScreen />} />
      </Routes>
    </div>
  );
}

export default App;
