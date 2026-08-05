import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

const registerAndGetCookie = async () => {
  const res = await request(app).post("/api/auth/register").send({
    name: "AI User",
    email: "ai@example.com",
    password: "password123",
  });

  return res.headers["set-cookie"];
};

describe("AI chat API validation", () => {
  it("rejects empty AI message", async () => {
    const cookie = await registerAndGetCookie();

    const res = await request(app)
      .post("/api/ai/chat")
      .set("Cookie", cookie)
      .send({
        message: "",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("message is required");
  });

  it("rejects AI request without login", async () => {
    const res = await request(app).post("/api/ai/chat").send({
      message: "What are my expenses?",
    });

    expect(res.status).toBe(401);
  });
});
