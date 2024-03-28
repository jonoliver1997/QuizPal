import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const { firstName, lastName, email, username, password, confirmPassword } =
      formData;

    //Perform validation checks
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (username.length < 5) {
      alert("Username must be at least 5 characters");
      return;
    }

    //If all checks pass, alert user and navigate to home page

    try {
      const response = await axios.post(
        `https://quizpal-api.onrender.com/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Network response was not ok.");
      }

      alert("Registration successful!");
      console.log("formData:", formData);

      // Redirect to login page
      navigate("/home");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <form className="register--form" onSubmit={handleSubmit}>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <input
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
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
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={formData.username}
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
      {formData.password != "" && formData.password.length < 8 && (
        <p>Password must be at least 8 characters</p>
      )}
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        required
      />
      {formData.confirmPassword != "" &&
        formData.password !== formData.confirmPassword && (
          <p>Passwords do not match</p>
        )}
      {error && <p>{error}</p>}
      <button type="submit" className="register--button">
        Register
      </button>
    </form>
  );
}
