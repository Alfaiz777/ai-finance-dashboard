import { describe, expect, it } from "vitest";
import {
  categorizeExpense,
  parseAmount,
  parseEmail,
} from "../services/gmailService";

describe("gmailService helpers", () => {
  it("parses amount strings with commas", () => {
    expect(parseAmount("1,299.50")).toBe(1299.5);
  });

  it("categorizes food merchants correctly", () => {
    expect(categorizeExpense("Zomato")).toBe("Food");
    expect(categorizeExpense("Swiggy")).toBe("Food");
  });

  it("categorizes transport merchants correctly", () => {
    expect(categorizeExpense("Uber")).toBe("Transport");
    expect(categorizeExpense("Ola")).toBe("Transport");
  });

  it("returns Other for unknown merchants", () => {
    expect(categorizeExpense("Random Local Store")).toBe("Other");
  });

  it("parses a transaction email into expense data", () => {
    const emailText = "Your account was debited by INR 1,250.00 at Zomato";
    const result = parseEmail(emailText, "2026-07-26");

    expect(result).toEqual({
      amount: 1250,
      merchant: "Zomato",
      category: "Food",
      date: "2026-07-26",
    });
  });

  it("returns null when email has no amount", () => {
    const emailText = "Your monthly statement is ready";
    const result = parseEmail(emailText, "2026-07-26");

    expect(result).toBeNull();
  });
});
