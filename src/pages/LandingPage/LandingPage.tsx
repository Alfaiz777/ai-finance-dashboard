import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Finance Dashboard</h1>
      <p>Track expenses, assets, and splitWise debts in one place.</p>

      <Link to="/register">
        <button>Sign Up</button>
      </Link>

      <Link to="/login">
        <button>Sign In</button>
      </Link>
    </div>
  );
};

export default LandingPage;
