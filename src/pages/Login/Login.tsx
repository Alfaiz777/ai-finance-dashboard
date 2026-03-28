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
    <div className="relative h-screen flex items-center justify-center overflow-hidden px-4">
      {/* 🔥 ANIMATED BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 🔥 Animated Gradient Base */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#020617,#0f172a,#020617)] bg-[length:200%_200%] animate-[gradientFlow_12s_ease_infinite]" />

        {/* 🔥 Floating Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/40 rounded-full blur-[160px] animate-[floatSlow_12s_ease-in-out_infinite] opacity-60" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/40 rounded-full blur-[160px] animate-[floatSlow_14s_ease-in-out_infinite] opacity-60" />

        <div className="absolute top-[30%] left-[40%] w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-[160px] animate-[floatSlow_18s_ease-in-out_infinite] opacity-60" />
      </div>
      {/* CARD */}
      <div className="w-full max-w-md relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl rounded-3xl" />

        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* 🔥 LOGO (FIXED) */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />
              <div className="bg-white/90 p-4 rounded-full border border-white/20 shadow-md">
                <img
                  src={logo}
                  alt="FinScope"
                  className="w-20 object-contain scale-160"
                />
              </div>
            </div>
          </div>

          {/* HEADING */}
          <h2 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
            Welcome Back
          </h2>

          <p className="text-gray-200 text-center mb-6 text-sm">
            Login to continue managing your finances
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
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
    </div>
  );
}

export default Login;
