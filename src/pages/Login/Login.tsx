import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/navigators/routes";
import { useAuth } from "@/context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      // update global auth state
      setUser(res);

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        />

        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <Button type="submit">Login</Button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
}

export default Login;
