import Deck from "./Deck";

function DecksGrid({ decks }) {
  if (!decks || decks.length === 0) {
    return <h1>Loading...</h1>;
  }
  const sortedDecks = decks.slice().sort((a, b) => a.deckId - b.deckId);

  return (
    <div className="grid--container">
      <div className="decks--grid">
        {sortedDecks.map((deck) => (
          <Deck
            key={deck._id}
            deckId={deck._id}
            title={deck.title}
            numberOfCards={deck.numberOfCards}
          />
        ))}
      </div>
    </div>
  );
}

export default DecksGrid;
