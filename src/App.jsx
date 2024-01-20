import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import Header from "./components/Header";
import DecksPage from "./views/AllDecksPage/DecksPage";
import StudyDeckPage from "./views/StudyDeckPage/StudyDeckPage";
import Footer from "./components/Footer";
import DisplayDeckPage from "./views/DisplayDeckPage/DisplayDeckPage";
import CreateDeckPage from "./views/CreateDeckPage/CreateDeckPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LoginPage from "./views/LoginPage/LoginPage";

function App() {
  const [decks, setDecks] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  };
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
              }
            />
            <Route
              path="/home"
              element={
                !isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <DecksPage decks={decks} />
                )
              }
            />
            <Route path="/register" exact element={<RegisterPage />} />
            {isAuthenticated ? (
              <>
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
              </>
            ) : null}
          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
