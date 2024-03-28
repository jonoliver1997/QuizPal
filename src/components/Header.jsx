import { useState } from "react";
import { FaCircleUser, FaHouse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const togglePopUp = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  return (
    <div className="Header">
      <button className="header--button" onClick={togglePopUp}>
        <FaCircleUser />
      </button>
      <h1 className="webpage--title">QuizPal</h1>
      <a href="/home" className="header--links">
        <FaHouse />
      </a>
      {isAuthenticated && isLogoutOpen && (
        <div className="logout-popup">
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
    </div>
  );
}
