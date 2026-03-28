import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { ROUTES } from "@/navigators/routes";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/financeLogo-full.png";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useAuth();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        name,
        email,
        password,
      });

      setAuthUser(res);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center  overflow-hidden px-4 bg-[#0B0F19]">
      {/* 🔥 ANIMATED GRADIENT BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[160px] animate-blob top-[-200px] left-[-200px]" />
        <div className="absolute w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[160px] animate-blob animation-delay-2000 bottom-[-200px] right-[-200px]" />
        <div className="absolute w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[140px] animate-blob animation-delay-4000 top-[20%] left-[40%]" />
      </div>
      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* INNER GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/90 p-4 rounded-full border border-white/20 shadow-md">
              <img
                src={logo}
                alt="FinScope"
                className="w-24 object-contain scale-160"
              />
            </div>
          </div>

          {/* HEADING */}
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create Account
          </h2>

          <p className="text-gray-400 text-center mb-6 text-sm">
            Start managing your finances smarter
          </p>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
              hover:bg-white/10 transition-all duration-300"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName((e.target as HTMLInputElement).value)}
            />

            <Input
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
              hover:bg-white/10 transition-all duration-300"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            />

            <Input
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 
              hover:bg-white/10 transition-all duration-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
            />

            <Button
              type="submit"
              className="w-full py-3 rounded-xl 
              bg-gradient-to-r from-blue-500 to-indigo-600 
              hover:scale-[1.02] active:scale-[0.98] 
              transition-all duration-200 
              shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-white font-semibold"
            >
              Create Account
            </Button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-medium transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
