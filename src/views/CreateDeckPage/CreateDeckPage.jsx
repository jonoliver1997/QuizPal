import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveDeckToLocalStorage } from "../../utils/localStorage";
import "./CreateDeckPage.css";

function CreateDeckPage({ decks, setDecks }) {
  const navigate = useNavigate();
  const [deckTitle, setDeckTitle] = useState("");
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    if (cardFront.trim() === "" || cardBack.trim() === "") {
      return;
    }

    // Create a new card object
    const newCard = {
      cardId: cards.length + 1,
      front: cardFront,
      back: cardBack,
    };

    // Add the new card to the cards array
    setCards([...cards, newCard]);

    // Clear card inputs
    setCardFront("");
    setCardBack("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new deck with the provided title
    const newDeck = {
      title: deckTitle,
      deckId: decks.length + 1,
      cards: [...cards],
    };

    // Save deck to local storage
    saveDeckToLocalStorage(newDeck);

    // Add the new deck to the decks array
    setDecks([...decks, newDeck]);

    // Clear form inputs
    setDeckTitle("");
    setCards([]);

    // Navigate back to DecksPage
    navigate("/");
  };

  return (
    <div className="CreateDeckPage">
      <h2 className="create--deck--title">Create a New Deck</h2>
      <form onSubmit={handleSubmit} className="new--deck--form">
        <div className="form--inputs">
          <input
            type="text"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <h3>Add a New Card</h3>
          <p>Card {cards.length + 1}</p>
          <input
            type="text"
            value={cardFront}
            onChange={(e) => setCardFront(e.target.value)}
            placeholder="Card Front"
          />
          <input
            type="text"
            value={cardBack}
            onChange={(e) => setCardBack(e.target.value)}
            placeholder="Card Back"
          />
        </div>

        <button
          type="button"
          className="utility--button"
          onClick={handleAddCard}
        >
          Add Card
        </button>
        <button className="utility--button create--deck--button" type="submit">
          Create Deck
        </button>
      </form>
      <Link to="/">
        <button className=" all--decks--button">Back to Decks</button>
      </Link>
    </div>
  );
}

export default CreateDeckPage;
