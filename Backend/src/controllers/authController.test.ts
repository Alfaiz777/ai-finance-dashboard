import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";
import User from "../models/User";

describe("auth API", () => {
  it("registers a user and sets an httpOnly cookie", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("test@example.com");
    expect(res.body.token).toBeUndefined();

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("HttpOnly");

    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
  });

  it("rejects register with invalid email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "bad-email",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email");
  });

  it("logs in a valid user and sets an httpOnly cookie", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "login@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("login@example.com");
    expect(res.body.token).toBeUndefined();

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("HttpOnly");
  });

  it("rejects login with wrong password", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "wrongpass@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "wrongpass@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
