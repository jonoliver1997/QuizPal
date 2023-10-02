import { useState } from "react";
import { FaXmark, FaPenToSquare } from "react-icons/fa6";

const cardFront = "What is the capital of France?";
const cardBack = "Paris";

function Card({
  card,
  isFlipped,
  handleCardFlip,
  editMode,
  onEditCard,
  onDeleteCard,
}) {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const [isEditing, setIsEditing] = useState(false);

  //Edit mode for each card when edit button is clicked
  const onEditCardButton = () => {
    if (editMode) {
      setIsEditing(!isEditing);
    } else {
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
        onClick={() => handleCardFlip(card.cardId)}
      >
        {editMode && (
          <div className="edit--buttons--container">
            <div className="">
              <FaXmark
                className="delete--card--button"
                onClick={() => onDeleteCard(card.cardId)}
              />
            </div>
            <div>
              <FaPenToSquare
                className="edit--card--button"
                onClick={onEditCardButton}
              />
            </div>
          </div>
        )}
        {editMode && isEditing ? (
          <div className="card--edit--form">
            <input
              type="text"
              value={front}
              onChange={handleFrontChange}
              placeholder="Front"
            />
            <input
              type="text"
              value={back}
              onChange={handleBackChange}
              placeholder="Back"
            />
          </div>
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
