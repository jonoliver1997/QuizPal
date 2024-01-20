import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const response = await axios.post("http://localhost:3500/users/login", {
        email,
        password,
      });

      const { data } = response;

      alert("Login success!");
      console.log("Login success:", data);

      // Store the JWT token in local storage but you can also use cookies
      localStorage.setItem("token", data.token);

      console.log("JWT token:", data.token);

      // Redirect the user to the chat page
    } catch (error) {
      // Handle login failure/error
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
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
  );
}
