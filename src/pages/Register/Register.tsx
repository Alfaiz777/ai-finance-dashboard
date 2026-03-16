import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { Input } from "@base-ui/react";
import { Button } from "@base-ui/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/navigators/routes";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.token);

      setUser(res);

      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
        />

        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        />

        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
