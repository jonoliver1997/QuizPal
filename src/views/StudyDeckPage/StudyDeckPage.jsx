import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import StudyCard from "./components/StudyCard";
import { Link, useParams } from "react-router-dom";
import "./StudyDeckPage.css";

function StudyDeckPage({}) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [flippedCardId, setFlippedCardId] = useState(null);

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://quizpal-api.onrender.com/decks/${deckId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Deck not found");
        }
        const data = await response.json();
        setDeck(data);
      } catch (error) {
        console.error("Error fetching deck:", error.message);
        // Handle the error (e.g., show an error message or redirect)
      }
    };

    fetchDeckById();
  }, [deckId]);

  if (!deck) {
    // Handle the case where the deck is not found, e.g., show an error message
    return <div>Deck not found</div>;
  }

  function handleNextClick() {
    setCurrentCardIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= deck.cards.length) {
        return 0;
      } else {
        return nextIndex;
      }
    });
  }

  function handlePrevClick() {
    setCurrentCardIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        return deck.cards.length - 1;
      } else {
        return prevIndex;
      }
    });
  }

  function handleCardFlip(cardId) {
    if (flippedCardId === cardId) {
      setFlippedCardId(null); // If the same card is clicked again, unflip it
    } else {
      setFlippedCardId(cardId); // Flip the clicked card
    }
  }

  const currentCard = deck.cards[currentCardIndex] || "Card not found";

  return (
    <div className="StudyDeckPage">
      <h2 className="deck--title">{deck.title}</h2>
      <p>
        Card {currentCardIndex + 1}/{deck.cards.length}
      </p>
      <div className="card--study--layout">
        <div>
          <StudyCard
            card={currentCard}
            flippedCardId={flippedCardId}
            handleCardFlip={handleCardFlip}
          />
        </div>
      </div>
      <div className="arrow-buttons">
        <FaArrowLeft className="arrow--icon" onClick={handlePrevClick} />
        <FaArrowRight className="arrow--icon" onClick={handleNextClick} />
      </div>
      {deck && (
        <div>
          <Link to={`/deck/${deckId}`}>
            <button className="utility--button">Back to Deck</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StudyDeckPage;
