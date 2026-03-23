import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-black">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl">
          Take Control of Your{" "}
          <span className="text-blue-500">Financial Life</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl text-lg">
          Track expenses, manage assets, and analyze your finances with
          AI-powered insights — all in one dashboard.
        </p>

        <div className="flex gap-4 mt-8">
          <Link to="/register">
            <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition">
              Get Started Free
            </button>
          </Link>

          <Link to="/login">
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition">
              Sign In
            </button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-4">No credit card required</p>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Manage Money
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
            <p className="text-gray-400 text-sm">
              Log and categorize your expenses easily. Know exactly where your
              money goes.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Assets & Net Worth</h3>
            <p className="text-gray-400 text-sm">
              Track your assets and liabilities to get a real-time view of your
              net worth.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">SplitWise Debts</h3>
            <p className="text-gray-400 text-sm">
              Manage shared expenses and debts with friends without confusion.
            </p>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            AI-Powered Financial Insights
          </h2>

          <p className="text-gray-400 mb-8">
            Get smart suggestions on your spending habits, savings, and
            financial decisions using AI.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-sm text-gray-300 italic">
              “You're spending 20% more on food this month. Consider setting a
              budget to save ₹3,000.”
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Financial Journey Today
        </h2>

        <p className="text-gray-400 mb-8">
          Join now and take control of your money with powerful tools and
          insights.
        </p>

        <Link to="/register">
          <button className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition">
            Create Free Account
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Finance Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
