import React, { useState, useEffect } from "react";
import DecksUtilityBar from "./components/DecksUtilityBar";
import DecksGrid from "./components/DecksGrid";
import axios from "axios";

function DecksPage() {
  const [decks, setDecks] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filteredDecks, setFilteredDecks] = useState(decks); // State to store filtered decks

  //Fetch decks from API when component mounts
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://quizpal-api.onrender.com/decks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDecks(response.data); // Update state with fetched decks
      } catch (error) {
        console.error("Error fetching decks:", error.message);
        // Handle error states
      }
    };

    fetchDecks();
  }, []);

  //Update filtered decks whenever search text changes
  useEffect(() => {
    if (decks) {
      const filtered = decks.filter((deck) =>
        deck.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDecks(filtered);
    }
  }, [decks, searchText]);

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="DecksPage">
      <h2 className="page--title">Your Decks</h2>
      <DecksUtilityBar onSearchInputChange={handleSearchInputChange} />
      {filteredDecks.length === 0 ? (
        <h3>Add new Deck</h3>
      ) : (
        <DecksGrid decks={filteredDecks} />
      )}
    </div>
  );
}

export default DecksPage;
