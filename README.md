# 💰 AI Finance Dashboard

A modern fintech-style personal finance dashboard that aggregates financial data from multiple sources and transforms it into clear insights.

The application allows users to track expenses, monitor assets, manage shared debts, and interact with an AI-powered financial advisor — all from a single interface.

> This project focuses on building a clean, scalable frontend architecture before integrating real APIs and AI services in the backend phase.

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

Assets supported:

- Bank accounts
- Fixed deposits
- Stocks
- Mutual funds

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

## 🧠 Architecture Highlights

The frontend is designed using modular SaaS-style architecture with clear separation of concerns.

```
Pages
 ├── Dashboard
 ├── Transactions
 ├── Spend Analysis
 ├── Assets
 ├── Split & Owe
 ├── AI Advisor
 └── Settings

Components
 ├── layout
 ├── charts
 ├── tables
 ├── assets
 ├── splitwise
 └── settings

Utils
 └── financial calculations
```

**Key design principles:**

- Reusable UI components
- Derived financial calculations
- Modular feature-based structure
- Scalable integration-ready architecture

---

## 🧮 Financial Calculation Engine

Custom utility functions power the analytics layer:

- Monthly expense aggregation
- Total asset calculation
- Net worth computation
- Savings calculation
- Category-based spending breakdown
- Monthly spending trends

These calculations power charts, insights, and dashboard summaries.

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

## 📍 Project Status

- ✅ Frontend application completed
- 🔜 Backend development starting next

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

- Store transactions
- Store assets
- Store user financial preferences
- Maintain historical financial records

**Backend stack will include:** Node.js · Express · MongoDB · AI API integration

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
