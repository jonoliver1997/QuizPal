export function loadDecksFromLocalStorage() {
  const deckKeys = Object.keys(localStorage);
  const loadedDecks = deckKeys
    .filter((key) => key.startsWith("deck_"))
    .map((key) => JSON.parse(localStorage.getItem(key)));
  return loadedDecks;
}

export function saveDeckToLocalStorage(newDeck) {
  localStorage.setItem(`deck_${newDeck.deckId}`, JSON.stringify(newDeck));
}

export function deleteDeckFromLocalStorage(deckId) {
  localStorage.removeItem(`deck_${deckId}`);
  // Remove the deckId from local storage where you keep track of used deckIds (if applicable)
  const usedDeckIds = JSON.parse(localStorage.getItem("used_deck_ids")) || [];
  const updatedUsedDeckIds = usedDeckIds.filter((id) => id !== deckId);
  localStorage.setItem("used_deck_ids", JSON.stringify(updatedUsedDeckIds));
}
