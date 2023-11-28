import "./RegisterPage.css";
import RegisterForm from "./components/RegisterForm";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="RegisterPage">
      <h2 className="page--title">Register</h2>
      <RegisterForm />
      <p>
        Already have an account? Login <Link to="/login">Here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
