import { Link } from "react-router-dom";

function Deck({ deckId, title, numberOfCards }) {
  return (
    <Link
      to={`/deck/${deckId}`}
      style={{ paddingLeft: 13, textDecoration: "none" }}
    >
      <div className="Deck">
        <h4>{title}</h4>
        <p>Number of Cards: {numberOfCards}</p>
      </div>
    </Link>
  );
}

export default Deck;
