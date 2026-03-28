import { Link } from "react-router-dom";
import logo from "@/assets/financeLogo-icon.png";
import ProductCarousel from "@/components/ProductCarousel";
import FadeInSection from "@/components/FadeInSection";
import {
  Wallet,
  BarChart3,
  Users,
  Sparkles,
  Layers,
  PieChart,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative text-white overflow-x-hidden">
      {/* 🔥 BACKGROUND (Premium gradient mesh style) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[900px] h-[900px] bg-blue-600/20 blur-[160px] animate-float top-[-200px] left-[-200px]" />
        <div className="absolute w-[800px] h-[800px] bg-indigo-600/20 blur-[140px] animate-float-slow bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🔥 NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow">
            <img src={logo} className="w-5 h-5 scale-430" />
          </div>
          <span className="font-semibold text-lg">FinScope</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link to="/register">
            <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          Unified Finance.
          <span className="block bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
            Smart Insights.
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl text-lg">
          Track everything. Understand everything. Auto-detect bank
          transactions, manually log daily expenses, manage assets, and get
          AI-powered insights — all in one place.
        </p>

        {/* CTA */}
        <div className="flex gap-4 mt-8">
          <Link to="/register">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/30 hover:scale-105 transition font-semibold">
              Get Started Free
            </button>
          </Link>

          <Link to="/login">
            <button className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              Sign In
            </button>
          </Link>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-400">
          <span>✔ Gmail-powered tracking</span>
          <span>✔ Manual + auto hybrid</span>
          <span>✔ AI insights</span>
        </div>
      </section>

      {/* 🔥 PRODUCT PREVIEW */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <FadeInSection>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              See Your Entire Financial Life in One Dashboard
            </h2>

            <p className="text-gray-400 mb-6">
              From expenses to assets to shared debts — everything is visualized
              in a clean, powerful interface.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li>• Real-time expense tracking</li>
              <li>• Monthly analytics & charts</li>
              <li>• Net worth overview</li>
              <li>• Clean transaction history</li>
            </ul>
          </div>
        </FadeInSection>

        <FadeInSection>
          <ProductCarousel />
        </FadeInSection>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="py-20 px-6 text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">How FinScope Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Connect Gmail",
              desc: "Automatically detect bank transactions from your emails.",
            },
            {
              title: "Track Daily Expenses",
              desc: "Manually log small expenses like UPI, cash, and food.",
            },
            {
              title: "Get Insights",
              desc: "AI analyzes your spending and helps you save more.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Powerful Features Built for You
        </h2>

        <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
          Everything you need to track, analyze, and optimize your finances — in
          one unified platform.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expense Tracking",
              icon: Wallet,
              desc: "Track daily expenses manually or automatically via Gmail.",
            },
            {
              title: "Assets & Net Worth",
              icon: Layers,
              desc: "Monitor your assets and liabilities in real-time.",
            },
            {
              title: "Split & Owe",
              icon: Users,
              desc: "Manage shared expenses and debts with ease.",
            },
            {
              title: "AI Insights",
              icon: Sparkles,
              desc: "Get smart suggestions to improve your financial habits.",
            },
            {
              title: "Smart Categorization",
              icon: PieChart,
              desc: "Automatically categorize your transactions.",
            },
            {
              title: "Monthly Analytics",
              icon: BarChart3,
              desc: "Visualize your spending trends with charts.",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 
          backdrop-blur-xl transition-all duration-300
          hover:scale-[1.04] hover:bg-white/10 
          hover:shadow-xl hover:shadow-blue-500/20"
              >
                {/* 🔥 Glow layer */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl" />

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* ICON */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-4">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🔥 AI SECTION */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          AI-Powered Financial Intelligence
        </h2>

        <p className="text-gray-400 mb-8">
          Your personal AI advisor helps you spend smarter and save better.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2">
          <p className="text-sm text-gray-300">
            “You're spending 20% more on food this month.”
          </p>
          <p className="text-sm text-gray-300">
            “You can save ₹5,000 by reducing subscriptions.”
          </p>
        </div>
      </section>

      {/* 🔥 FINAL CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Financial Journey Today
        </h2>

        <p className="text-gray-400 mb-8">
          Track smarter. Save better. Live financially aware.
        </p>

        <Link
          to="/register"
          className="hover:underline underline-offset-4 transition"
        >
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/30 hover:scale-105 transition font-semibold">
            Create Free Account
          </button>
        </Link>
      </section>

      {/* 🔥 FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FinScope. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
