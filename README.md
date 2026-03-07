# 💰 AI Finance Dashboard

> Managing personal finances across multiple platforms is fragmented.
>
> This project explores how a modern fintech dashboard can aggregate financial data, generate insights, and provide an AI-powered financial advisor — all within a clean and scalable architecture.

A modern fintech-style personal finance dashboard that aggregates financial data from multiple sources and transforms it into clear insights. The application allows users to track expenses, monitor assets, manage shared debts, and interact with an AI-powered financial advisor — all from a single interface.

---

## 📌 Project Status

- ✅ Frontend UI — In Progress (UI refinements underway)
- 🔜 Frontend Deployment — Coming Soon
- 🔜 Screenshots & Live Demo — Coming Soon
- 🔜 Backend Development — Next Phase

---

## 🚀 Features

### 📊 Dashboard Overview

Quick snapshot of the user's financial health.

- Net Worth summary
- Monthly expenses and savings
- Total debt overview
- Category spending pie chart
- Monthly spending trend
- Recent transactions preview

### 💳 Transactions Management

Complete expense inspection interface.

- Search transactions by merchant
- Filter by category
- Sort by amount or date
- Pagination for large datasets
- Clean table UI using reusable components

### 📈 Spend Analysis

Transforms raw financial data into insights.

- Expense breakdown by category
- Monthly spending trends
- Top spending merchants
- Key financial insight cards

### 💼 Assets Tracker

Displays the user's total wealth across multiple asset classes.

Assets supported: Bank accounts · Fixed deposits · Stocks · Mutual funds

Each asset displays important metadata like investment value, maturity date (FDs), and profit/loss indicators.

### 🤝 Split & Owe

Track shared expenses and debts.

- Who you owe
- Who owes you
- Net balance calculation
- Financial position indicator with color-coded feedback

### 🤖 AI Financial Advisor

Interactive chat interface to ask questions about finances.

- Chat-style conversation UI
- AI and user message bubbles
- Typing animation
- Avatars for conversation roles
- Auto-scrolling messages

> Currently uses simulated responses. Real AI integration will be implemented in the backend phase.

### ⚙️ Settings & Integrations

Control how financial data enters the system.

- Monthly income configuration
- Gmail integration for automated expense tracking
- Splitwise integration for shared debt tracking
- Integration status indicators

---

## 🏗 System Architecture

```
User
   ↓
React Frontend (TypeScript + TailwindCSS)
   ↓
Backend API (Next Phase — Node.js + Express)
   ↓
Database (MongoDB)
   ↓
External Integrations
   ├── Gmail API       → Automated expense parsing
   └── Splitwise API   → Shared debt syncing
        ↓
AI Layer (LLM Integration)
   └── Personalized financial insights
```

---

## 🧠 Frontend Architecture

The frontend is designed using modular SaaS-style architecture with clear separation of concerns.

```
src/
 ├── pages/
 │    ├── Dashboard
 │    ├── Transactions
 │    ├── Spend Analysis
 │    ├── Assets
 │    ├── Split & Owe
 │    ├── AI Advisor
 │    └── Settings
 │
 ├── components/
 │    ├── layout/
 │    ├── charts/
 │    ├── tables/
 │    ├── assets/
 │    ├── splitwise/
 │    └── settings/
 │
 └── utils/
      └── financial calculations
```

---

## 🧩 Engineering Patterns Used

This project demonstrates several important frontend engineering patterns:

- **Component-driven architecture** — reusable, self-contained UI components
- **Derived financial calculations** — computed values from raw transaction data
- **Data transformation pipelines** — filter → search → sort → paginate
- **Integration management UI** — status indicators and connection controls
- **Reusable chart components** — shared Recharts wrappers for consistent visuals
- **Modular feature-based folder structure** — scalable and maintainable codebase

---

## 🧮 Financial Calculation Engine

Custom utility functions power the analytics layer:

- Monthly expense aggregation
- Total asset calculation
- Net worth computation
- Savings calculation
- Category-based spending breakdown
- Monthly spending trends

These calculations power charts, insights, and dashboard summaries across the entire app.

---

## 🛠 Tech Stack

| Technology   | Purpose             |
| ------------ | ------------------- |
| React        | UI framework        |
| TypeScript   | Type safety         |
| TailwindCSS  | Styling             |
| shadcn/ui    | Component library   |
| Recharts     | Data visualization  |
| Lucide Icons | Icon set            |
| React Router | Client-side routing |

---

## ⚙️ Run Locally

**Clone the project**

```bash
git clone https://github.com/your-username/ai-finance-dashboard.git
```

**Go to project directory**

```bash
cd ai-finance-dashboard
```

**Install dependencies**

```bash
npm install
```

**Start development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔜 Next Phase — Backend Development

The next phase will focus on building the data and intelligence layer of the platform.

### 📩 Gmail Expense Parsing

- Connect Gmail API
- Scan payment confirmation emails
- Extract transaction details using regex/NLP
- Automatically add expenses to the dashboard

### 🤝 Splitwise Integration

- Fetch shared debts via API
- Sync owed balances automatically

### 🧠 AI Financial Advisor

- Integrate LLM APIs
- Allow AI to analyze real financial data
- Generate personalized insights and spending suggestions

### 🗄 Database Layer

- Store transactions and assets
- Store user financial preferences
- Maintain historical financial records

**Backend stack:** Node.js · Express · MongoDB · AI API integration

---

## 🎯 Project Goal

The goal of this project is to demonstrate how a modern fintech dashboard can be designed from scratch, focusing on:

- Clean frontend architecture
- Financial data modeling
- Scalable component systems
- Analytics-driven UI
- AI-ready interface design

---

## 📌 Future Improvements

- Real-time financial insights
- AI-driven spending analysis
- Automatic expense categorization
- Asset allocation visualization
- Financial goal tracking

---

⭐ If you found this project interesting, feel free to explore the code or share feedback!
