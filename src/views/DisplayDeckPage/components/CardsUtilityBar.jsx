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

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchChange(text); // Pass the search text to the parent component
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
            onClick={onSaveChanges}
          >
            Apply Changes
          </button>
        </div>
      ) : (
        <button onClick={onEditDeck} className="utility--button">
          Edit <FaPen className="utility--button--icon" />{" "}
        </button>
      )}
      <Link to="/">
        <button className="utility--button red" onClick={onDeleteDeck}>
          Delete <FaTrash className="utility--button--icon" />{" "}
        </button>
      </Link>
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
