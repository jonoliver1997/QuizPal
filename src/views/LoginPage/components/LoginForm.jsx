import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginForm() {
  const { setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginAsGuest, setLoginAsGuest] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      const { data } = response;

      localStorage.setItem("token", data.token);

      // Set the isAuthenticated state to true
      setIsAuthenticated(true);

      // Redirect the user to the chat page
      navigate("/home");
    } catch (error) {
      // Handle login failure/error
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLoginAsGuest = () => {
    setLoginAsGuest((prev) => !prev);
    if (!loginAsGuest) {
      setFormData({
        email: "guest@gmail.com",
        password: "password",
      });
    } else {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="login--form">
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div className="login--button--container">
            <button className="login--button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="login-as-guest">
        <label htmlFor="login-as-guest">
          Login as Guest{" "}
          <input
            type="checkbox"
            id="login-as-guest"
            checked={loginAsGuest}
            onChange={handleLoginAsGuest}
          />
        </label>
      </div>
    </>
  );
}
