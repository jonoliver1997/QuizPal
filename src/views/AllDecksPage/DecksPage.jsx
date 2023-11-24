import React, { useState, useEffect } from "react";
import DecksUtilityBar from "./components/DecksUtilityBar";
import DecksGrid from "./components/DecksGrid";

function DecksPage({ decks }) {
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filteredDecks, setFilteredDecks] = useState(decks); // State to store filtered decks

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
      <h2 className="decks--title">Your Decks</h2>
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
