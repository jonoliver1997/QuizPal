import { useState } from "react";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaPlay,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CardsUtilityBar({
  deck,
  onDeleteDeck,
  onSearchChange,
  onAddCard,
  onEditDeck,
  onSaveChanges,
  editMode,
}) {
  const [searchText, setSearchText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchChange(text);
  };

  const handleDeleteButtonClick = () => {
    if (confirmDelete) {
      onDeleteDeck();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="UtilityBar">
      <button className="utility--button black" onClick={onAddCard}>
        New Card <FaPlus className="utility--button--icon" />
      </button>
      <Link to="./study">
        <button className="utility--button">
          Study <FaPlay className="utility--button--icon" />
        </button>
      </Link>
      {editMode ? (
        <div>
          <button
            className="utility--button apply--changes--button"
            onClick={onEditDeck}
          >
            Done
          </button>
        </div>
      ) : (
        <button onClick={onEditDeck} className="utility--button">
          Edit <FaPen className="utility--button--icon" />{" "}
        </button>
      )}
      <button
        className={`utility--button red`}
        onClick={handleDeleteButtonClick}
      >
        {confirmDelete ? (
          "Confirm"
        ) : (
          <>
            Delete <FaTrash className="utility--button--icon" />
          </>
        )}
      </button>
      <div className="search--bar">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <FaMagnifyingGlass className="FaMagnifyingGlass" />
      </div>
    </div>
  );
}
