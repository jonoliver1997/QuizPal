import { Link } from "react-router-dom";
import "./LoginPage.css";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <h2 className="page--title">Login</h2>
      <LoginForm />
      <div>
        <p>
          Don't have an account? Register <Link to="/register">Here</Link>
        </p>
      </div>
    </div>
  );
}
