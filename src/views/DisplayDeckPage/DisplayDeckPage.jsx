import { useState, useEffect } from "react";
import Card from "./components/Card";
import CardsUtilityBar from "./components/CardsUtilityBar";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
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

  const handleAddCardSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
        {
          front: newCardFront,
          back: newCardBack,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeck(response.data);
      hideAddCardForm();
    } catch (error) {
      console.error("Error adding card to deck:", error.message);
      // Handle the error (e.g., show an error message)
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
        `${import.meta.env.VITE_API_URL}/decks/${deckId}`,
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

  // Delete the card from the deck
  function handleDeleteCard(cardId) {
    try {
      const token = localStorage.getItem("token");
      axios.delete(
        `${import.meta.env.VITE_API_URL}/decks/${deckId}/cards/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedDeck = deck.cards.filter((card) => card._id !== cardId);
      setDeck({ ...deck, cards: updatedDeck });
    } catch (error) {
      console.error("Error deleting card:", error.message);
    }
  }

  // Delete the deck from the decks array
  function handleDeleteDeck() {
    try {
      const token = localStorage.getItem("token");
      axios.delete(`${import.meta.env.VITE_API_URL}/decks/${deckId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error deleting deck:", error.message);
    }
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
                (card.front &&
                  card.front
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) ||
                (card.back &&
                  card.back.toLowerCase().includes(searchText.toLowerCase()))
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
