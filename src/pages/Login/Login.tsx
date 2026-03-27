import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { ROUTES } from "@/navigators/routes";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/financeLogo-full.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      setAuthUser(res);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden px-4">
      {/* CARD */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        {/* 🔥 LOGO (FIXED) */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-full border border-white/10">
            <img
              src={logo}
              alt="FinScope"
              className="w-24 object-contain scale-150"
            />
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Login to continue managing your finances
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />

          <Input
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          />

          <Button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold transition duration-200"
          >
            Login
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
