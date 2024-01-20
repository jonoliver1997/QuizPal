import { useState, useEffect } from "react";
import Card from "./components/Card";
import CardsUtilityBar from "./components/CardsUtilityBar";
import { Link, useParams } from "react-router-dom";
import {
  deleteDeckFromLocalStorage,
  saveDeckToLocalStorage,
} from "../../utils/localStorage";
import "./DisplayDeckPage.css";
import NewCardForm from "./components/NewCardForm";
import axios from "axios";

export default function DisplayDeckPage({ isFlipped }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCards, setEditedCards] = useState([]);

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3500/decks/${deckId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDeck(response.data); // Set the fetched deck in state
      } catch (error) {
        console.error("Error fetching deck:", error.message);
        // Handle error states
      }
    };

    fetchDeckById(); // Call the function to fetch the deck by ID
  }, [deckId]); // Fetch whenever deckId changes

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  if (!deck || deck.length === 0) {
    return <div>Deck not found</div>;
  }

  //Flip Cards
  function handleCardFlip(cardId) {
    if (editMode) {
      return;
    } else if (flippedCardId === cardId) {
      setFlippedCardId(null); // If the same card is clicked again, unflip it
    } else {
      setFlippedCardId(cardId); // Flip the clicked card
    }
  }

  //Creating New Card
  const showAddCardForm = () => {
    setIsAddingCard(true);
  };

  const handleAddCard = () => {
    showAddCardForm();
  };

  const hideAddCardForm = () => {
    setIsAddingCard(false);
    setNewCardFront("");
    setNewCardBack("");
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    const updatedDecks = [...decks];

    const deckIndex = updatedDecks.findIndex((d) => d.deckId === deck.deckId);

    if (deckIndex !== -1) {
      // Create a new deck object with the updated cards array
      const updatedDeck = {
        ...updatedDecks[deckIndex],
        cards: [...updatedDecks[deckIndex].cards],
      };

      const newCardId = lastUsedCardId + 1;

      // Add the new card to the updated deck's cards array
      const newCard = {
        cardId: newCardId,
        front: newCardFront,
        back: newCardBack,
      };
      updatedDeck.cards.push(newCard);

      // Replace the old deck with the updated deck in the copy of the decks array
      updatedDecks[deckIndex] = updatedDeck;

      // Update the state with the modified copy of decks
      setDecks(updatedDecks);

      saveDeckToLocalStorage(updatedDeck);

      setNewCardFront("");
      setNewCardBack("");

      hideAddCardForm();
    }
  };
  //End of Creating New Card

  const displayedCards = deck.cards;

  //Edit Cards
  const onEditDeck = () => {
    setEditMode(!editMode);
    if (isFlipped !== null) {
      setFlippedCardId(null);
    }
  };

  const handleEditCard = (cardId, updatedFront, updatedBack) => {
    // Create a copy of the edited cards array
    const updatedEditedCards = [...editedCards];

    // Find the index of the card being edited in the copy
    const cardIndex = updatedEditedCards.findIndex(
      (editedCard) => editedCard._id === cardId
    );

    if (cardIndex !== -1) {
      // Update the card if it exists in the copy
      updatedEditedCards[cardIndex] = {
        cardId,
        front: updatedFront,
        back: updatedBack,
      };
    } else {
      // Add the card to the copy if it doesn't exist
      updatedEditedCards.push({
        cardId,
        front: updatedFront,
        back: updatedBack,
      });
    }

    // Update the state with the modified copy of edited cards
    setEditedCards(updatedEditedCards);
  };

  const handleCardUpdateSuccess = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3500/decks/${deckId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeck(response.data); // Update the deck in state
    } catch (error) {
      console.error("Error fetching updated deck:", error.message);
      // Handle error states
    }
  };

  //End of Edit Cards

  // Delete the card from the deck's cards array
  function handleDeleteCard(cardId) {
    // Filter out the card with the cardId from the deck's cards
    const updatedDeckCards = deck.cards.filter(
      (card) => card.cardId !== cardId
    );

    // Update the deck object with the modified cards
    const updatedDeck = {
      ...deck,
      cards: updatedDeckCards,
    };

    // Create a copy of the edited cards array
    const updatedEditedCards = [...editedCards];

    // Remove the deleted card from the edited cards array
    const cardIndex = updatedEditedCards.findIndex(
      (editedCard) => editedCard.cardId === cardId
    );

    if (cardIndex !== -1) {
      updatedEditedCards.splice(cardIndex, 1);
    }

    // Update the state with the modified copy of edited cards
    setEditedCards(updatedEditedCards);

    // Update the decks array with the modified deck
    const updatedDecks = decks.map((d) =>
      d.deckId === deck.deckId ? updatedDeck : d
    );
    setDecks(updatedDecks);

    // Update the local storage
    saveDeckToLocalStorage(updatedDeck);
  }

  // Delete the deck from the decks array
  function handleDeleteDeck() {
    deleteDeckFromLocalStorage(deckId);

    const updatedDecks = decks.filter((deck) => deck.deckId !== Number(deckId));

    setDecks(updatedDecks);
  }

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="DisplayDeckPage">
      <h2 className="page--title">{deck.title}</h2>
      <p>Cards: {deck.cards.length}</p>
      <CardsUtilityBar
        deck={deck}
        onDeleteDeck={handleDeleteDeck}
        onSearchChange={handleSearchChange}
        onAddCard={handleAddCard}
        onEditDeck={onEditDeck}
        editMode={editMode}
      />
      <div className="grid--container">
        <div className="cards--grid">
          {displayedCards
            .filter(
              (card) =>
                card.front.toLowerCase().includes(searchText.toLowerCase()) ||
                card.back.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((card) => (
              <div key={card._id} className="card-container">
                <Card
                  card={card}
                  isFlipped={card._id === flippedCardId}
                  handleCardFlip={handleCardFlip}
                  editMode={editMode}
                  onEditCard={handleEditCard}
                  onDeleteCard={handleDeleteCard}
                  onClick={handleCardFlip}
                  onCardUpdateSuccess={handleCardUpdateSuccess}
                />
              </div>
            ))}
        </div>
      </div>
      {isAddingCard && (
        <NewCardForm
          handleAddCardSubmit={handleAddCardSubmit}
          newCardFront={newCardFront}
          newCardBack={newCardBack}
          setNewCardFront={setNewCardFront}
          setNewCardBack={setNewCardBack}
          hideAddCardForm={hideAddCardForm}
        />
      )}
      <Link to={`/home`}>
        <button className="utility--button all--decks--button">
          Back to All Decks
        </button>
      </Link>
    </div>
  );
}
