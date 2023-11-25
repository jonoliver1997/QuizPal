import axios from "axios";

const fetchDecks = async () => {
  try {
    const response = await axios.get("https://quizpal-api.onrender.com/decks");
    const loadedDecks = response.data;
    return loadedDecks;
  } catch (error) {
    console.error("Error fetching decks:", error.message);
    // Handle error states
  }
};

export { fetchDecks };
