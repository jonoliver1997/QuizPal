function StudyCard({ card, flippedCardId, handleCardFlip }) {
  const isFlipped = flippedCardId === card.cardId;
  return (
    <div className="Card">
      <div className="delete--button-container"></div>
      <div
        className={`card--container ${isFlipped ? "flipped" : ""}`}
        onClick={() => handleCardFlip(card.cardId)}
      >
        <div className="card--front">
          <p>{card.front}</p>
        </div>
        <div className="card--back">
          <p>{card.back}</p>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
