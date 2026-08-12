import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../app";
import Expense from "../models/Expense";

vi.mock("../services/aiService", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../services/aiService")>();

  return {
    ...actual,
    categorizeExpense: vi.fn(async () => "Food"),
  };
});

const registerAndGetCookie = async () => {
  const res = await request(app).post("/api/auth/register").send({
    name: "Expense User",
    email: "expense@example.com",
    password: "password123",
  });

  return res.headers["set-cookie"];
};

describe("expense API", () => {
  it("creates an expense for an authenticated user", async () => {
    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/expenses")
      .set("Cookie", cookie)
      .send({
        amount: 250,
        merchant: "Zomato",
        category: "Food",
        date: "2026-08-05",
        paymentMethod: "upi",
      });

    expect(res.status).toBe(201);
    expect(res.body.amount).toBe(250);
    expect(res.body.merchant).toBe("Zomato");
    expect(res.body.id).toBeDefined();

    const expenses = await Expense.find({});
    expect(expenses).toHaveLength(1);
  });

  it("uses the selected category and does not AI categorize when category is provided", async () => {
    const { categorizeExpense } = await import("../services/aiService");
    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/expenses")
      .set("Cookie", cookie)
      .send({
        amount: 450,
        merchant: "Swiggy",
        category: "Shopping",
        date: "2026-08-12",
        paymentMethod: "net_banking",
      });

    expect(res.status).toBe(201);
    expect(res.body.category).toBe("Shopping");
    expect(res.body.aiCategorized).toBe(false);
    expect(categorizeExpense).not.toHaveBeenCalled();
  });

  it("AI categorizes when category is omitted", async () => {
    const { categorizeExpense } = await import("../services/aiService");
    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/expenses")
      .set("Cookie", cookie)
      .send({
        amount: 450,
        merchant: "Swiggy",
        date: "2026-08-12",
        paymentMethod: "upi",
      });

    expect(res.status).toBe(201);
    expect(res.body.category).toBe("Food");
    expect(res.body.aiCategorized).toBe(true);
    expect(categorizeExpense).toHaveBeenCalledWith("Swiggy 450");
  });

  it("saves with Other when AI categorization fails", async () => {
    const { categorizeExpense } = await import("../services/aiService");
    vi.mocked(categorizeExpense).mockRejectedValueOnce(new Error("AI failed"));

    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/expenses")
      .set("Cookie", cookie)
      .send({
        amount: 450,
        merchant: "Swiggy",
        date: "2026-08-12",
        paymentMethod: "upi",
      });

    expect(res.status).toBe(201);
    expect(res.body.category).toBe("Other");
    expect(res.body.aiCategorized).toBe(false);

    const expenses = await Expense.find({});
    expect(expenses).toHaveLength(1);
    expect(expenses[0]?.category).toBe("Other");
  });

  it("rejects expense creation without login", async () => {
    const res = await request(app).post("/api/expenses").send({
      amount: 250,
      merchant: "Zomato",
      category: "Food",
      date: "2026-08-05",
      paymentMethod: "upi",
    });

    expect(res.status).toBe(401);
  });

  it("rejects negative expense amount", async () => {
    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/expenses")
      .set("Cookie", cookie)
      .send({
        amount: -100,
        merchant: "Zomato",
        category: "Food",
        date: "2026-08-05",
        paymentMethod: "upi",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Amount must be positive");

    const expenses = await Expense.find({});
    expect(expenses).toHaveLength(0);
  });
});
