import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveDeckToLocalStorage } from "../../utils/localStorage";
import "./CreateDeckPage.css";
import axios from "axios";

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
  /* const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const newDeckData = {
      title: deckTitle,
      cards: cards, // Replace 'cards' with the array of cards you have in your state
    };

    // Make a POST request to create a new deck
    const response = await axios.post('http://localhost:3500/decks', newDeckData);

    console.log('Created new deck:', response.data);
    // Handle success or navigate to another page
  } catch (error) {
    console.error('Error creating deck:', error);
    // Handle error
  }
};*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDeck = {
      title: deckTitle,
      cards: [...cards],
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3500/decks",
        newDeck,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state or do other operations with the response
      setDecks([...decks, response.data]);

      setDeckTitle("");
      setCards([]);

      navigate("/home");
    } catch (error) {
      console.error("Error creating deck:", error.message);
      // Handle error states
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Create a new deck with the provided title
  //   const newDeck = {
  //     title: deckTitle,
  //     deckId: decks.length + 1,
  //     cards: [...cards],
  //   };

  //   // Save deck to local storage
  //   saveDeckToLocalStorage(newDeck);

  //   // Add the new deck to the decks array
  //   setDecks([...decks, newDeck]);

  //   // Clear form inputs
  //   setDeckTitle("");
  //   setCards([]);

  //   // Navigate back to DecksPage
  //   navigate("/");
  // };

  return (
    <div className="CreateDeckPage">
      <h2 className="page--title">Create a New Deck</h2>
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
