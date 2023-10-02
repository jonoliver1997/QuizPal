import Deck from "./Deck";

function DecksGrid({ decks }) {
  const sortedDecks = decks.slice().sort((a, b) => a.deckId - b.deckId);

  return (
    <div className="grid--container">
      <div className="decks--grid">
        {sortedDecks.map((deck) => (
          <Deck
            key={deck.deckId}
            deckId={deck.deckId}
            title={deck.title}
            numberOfCards={deck.cards.length}
          />
        ))}
      </div>
    </div>
  );
}

export default DecksGrid;
