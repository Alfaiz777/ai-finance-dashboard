import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";
import Expense from "../models/Expense";

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
