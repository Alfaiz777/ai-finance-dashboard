import { Link } from "react-router-dom";
import logo from "@/assets/financeLogo-icon.png";

const LandingPage = () => {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* 🔥 NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <img
              src={logo}
              alt="FinScope"
              className="w-6 h-6 object-contain scale-400"
            />
          </div>

          <span className="font-semibold text-lg">FinScope</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Sign In
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl z-10">
          Take Control of Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
            Financial Life
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl text-lg z-10">
          Track expenses, manage assets, and analyze your finances with
          AI-powered insights — all in one dashboard.
        </p>

        <div className="flex gap-4 mt-8 z-10">
          <Link to="/register">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 font-semibold shadow-lg shadow-blue-500/20 transition">
              Get Started Free
            </button>
          </Link>

          <Link to="/login">
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition">
              Sign In
            </button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-4 z-10">
          No credit card required
        </p>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Manage Money
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expense Tracking",
              desc: "Track where your money goes with smart categorization.",
            },
            {
              title: "Assets & Net Worth",
              desc: "Monitor your assets and liabilities in one place.",
            },
            {
              title: "Split & Owe",
              desc: "Manage shared expenses and debts easily.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 AI SECTION */}
      <section className="py-16 px-6 relative">
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full left-[-100px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            AI-Powered Financial Insights
          </h2>

          <p className="text-gray-400 mb-8">
            Get smart suggestions on your spending habits and savings.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-gray-300 italic">
              “You're spending 20% more on food this month. Try reducing by
              ₹3,000.”
            </p>
          </div>
        </div>
      </section>

      {/* 🔥 FINAL CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Financial Journey Today
        </h2>

        <p className="text-gray-400 mb-8">
          Join now and take control of your money with powerful tools.
        </p>

        <Link to="/register">
          <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-lg font-semibold shadow-lg shadow-blue-500/20 transition">
            Create Free Account
          </button>
        </Link>
      </section>

      {/* 🔥 FOOTER */}
      <footer className="border-t border-white/10 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FinScope. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
