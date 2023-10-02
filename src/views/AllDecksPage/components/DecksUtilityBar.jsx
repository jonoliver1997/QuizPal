import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../DecksPage.css";

export default function DecksUtilityBar({ onSearchInputChange }) {
  return (
    <div className="UtilityBar">
      <Link to="/create-deck">
        <button className="add--new--button">
          New Deck <FaPlus />
        </button>
      </Link>
      <div className="search--bar">
        <input
          type="text"
          placeholder="Search"
          onChange={onSearchInputChange}
        />
        <FaMagnifyingGlass className="FaMagnifyingGlass" />
      </div>
    </div>
  );
}
