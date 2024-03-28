function NewCardForm({
  handleAddCardSubmit,
  newCardFront,
  setNewCardFront,
  newCardBack,
  setNewCardBack,
  hideAddCardForm,
}) {
  return (
    <div className="modal--overlay">
      <div className="modal--content">
        <div className="new--card--form">
          <form onSubmit={handleAddCardSubmit}>
            <h3>Add a New Card</h3>
            <div className="form--inputs">
              <input
                type="text"
                placeholder="Front"
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Back"
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                required
              />
            </div>
            <div className="add--card--buttons">
              <button
                type="submit"
                className="create--utility--button add--card--button"
              >
                Add Card
              </button>
              <button
                className="create--utility--button"
                onClick={hideAddCardForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCardForm;
