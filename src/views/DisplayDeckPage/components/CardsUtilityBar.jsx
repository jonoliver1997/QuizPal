import { useState } from "react";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaPlay,
  FaPen,
  FaTrash,
  FaCheck,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const handleStudyClick = () => {
    navigate("./study");
  };

  return (
    <div className="UtilityBar">
      <button className="utility--button black" onClick={onAddCard}>
        <span className="utility--button--text"> New Card</span>{" "}
        <FaPlus className="utility--button--icon" />
      </button>
      <button className="utility--button" onClick={handleStudyClick}>
        <span className="utility--button--text">Study</span>{" "}
        <FaPlay className="utility--button--icon" />
      </button>

      {editMode ? (
        <button
          className="utility--button apply--changes--button"
          onClick={onEditDeck}
        >
          <span className="utility--button--text">Done</span>{" "}
          <FaCheck className="utility--button--icon" />
        </button>
      ) : (
        <button onClick={onEditDeck} className="utility--button">
          <span className="utility--button--text">Edit</span>{" "}
          <FaPen className="utility--button--icon" />{" "}
        </button>
      )}
      <button
        className={`utility--button red`}
        onClick={handleDeleteButtonClick}
      >
        {confirmDelete ? (
          <>
            <span className="utility--button--text">Confirm</span>{" "}
            <FaCheck className="utility--button--icon" />
          </>
        ) : (
          <>
            <span className="utility--button--text">Delete</span>{" "}
            <FaTrash className="utility--button--icon" />
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
