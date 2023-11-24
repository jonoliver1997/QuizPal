import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import DecksPage from "./views/AllDecksPage/DecksPage";
import StudyDeckPage from "./views/StudyDeckPage/StudyDeckPage";
import Footer from "./components/Footer";
import DisplayDeckPage from "./views/DisplayDeckPage/DisplayDeckPage";
import CreateDeckPage from "./views/CreateDeckPage/CreateDeckPage";
import { loadDecksFromLocalStorage } from "./utils/localStorage";

function App() {
  const [decks, setDecks] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get("http://localhost:3500/decks");
        setDecks(response.data); // Update state with fetched decks
      } catch (error) {
        console.error("Error fetching decks:", error.message);
        // Handle error states
      }
    };

    fetchDecks();
  }, [setDecks]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<DecksPage decks={decks} />} />
          <Route
            path="/deck/:deckId"
            element={
              <DisplayDeckPage
                decks={decks}
                setDecks={setDecks}
                isFlipped={isFlipped}
              />
            }
          />
          <Route
            path="/deck/:deckId/study"
            element={
              <StudyDeckPage
                decks={decks}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
              />
            }
          />
          <Route
            path="/create-deck"
            element={
              <CreateDeckPage
                decks={decks}
                setDecks={setDecks}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
