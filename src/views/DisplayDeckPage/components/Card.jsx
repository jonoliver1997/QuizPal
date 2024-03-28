import { useEffect, useState } from "react";
import { FaXmark, FaPenToSquare, FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import { useParams } from "react-router-dom";

function Card({
  card,
  isFlipped,
  handleCardFlip,
  editMode,
  onEditCard,
  onDeleteCard,
  onCardUpdateSuccess,
}) {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const [isEditing, setIsEditing] = useState(false);
  const { deckId } = useParams();
  console;
  const handleSaveChanges = async (cardId, updatedFront, updatedBack) => {
    try {
      const token = localStorage.getItem("token");
      const updatedCard = {
        front: updatedFront,
        back: updatedBack,
      };
      // Make a PUT request to update the card
      const response = await axios.put(
        `https://quizpal-api.onrender.com/decks/${deckId}/cards/${cardId}`,
        { updatedCard },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success or navigate to another page
      setIsEditing(false);
      onCardUpdateSuccess();
    } catch (error) {
      console.error("Error updating card:", error);
      // Handle error
    }
  };
  //Edit mode for each card when edit button is clicked

  useEffect(() => {
    setFront(card.front);
    setBack(card.back);
  }, [isEditing, card]);

  const onEditCardButton = () => {
    if (editMode) {
      setIsEditing(!isEditing);
    } else {
      handleSaveChanges(card._id);
      setIsEditing(false);
    }
  };

  const handleFrontChange = (e) => {
    setFront(e.target.value);
    onEditCard(card.cardId, e.target.value, back);
  };

  const handleBackChange = (e) => {
    setBack(e.target.value);
    onEditCard(card.cardId, front, e.target.value);
  };

  return (
    <div className="Card">
      <div
        className={`card--container ${isFlipped ? "flipped" : ""}`}
        onClick={() => handleCardFlip(card._id)}
      >
        {editMode && (
          <div className="edit--buttons--container">
            <div className="">
              <FaXmark
                className="delete--card--button"
                onClick={() => onDeleteCard(card._id)}
              />
            </div>
            {isEditing ? (
              <div>
                <FaCircleCheck
                  className="save--card--button"
                  onClick={() => handleSaveChanges(card._id, front, back)}
                />
              </div>
            ) : (
              <div>
                <FaPenToSquare
                  className="edit--card--button"
                  onClick={onEditCardButton}
                />
              </div>
            )}
          </div>
        )}
        {editMode && isEditing ? (
          <>
            <div className="card--edit--form">
              <textarea
                className="edit--textarea"
                type="text"
                value={front}
                onChange={handleFrontChange}
                placeholder="Front"
              />
              <textarea
                className="edit--textarea"
                type="text"
                value={back}
                onChange={handleBackChange}
                placeholder="Back"
              />
            </div>
          </>
        ) : (
          <>
            <div className="card--front">
              <p>{card.front}</p>
            </div>
            <div className="card--back">
              <p>{card.back}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
