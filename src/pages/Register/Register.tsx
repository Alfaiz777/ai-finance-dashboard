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

      setUser(res);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Start managing your finances smarter
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
          />

          <Input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />

          <Input
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />

          <Button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
          >
            Register
          </Button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
