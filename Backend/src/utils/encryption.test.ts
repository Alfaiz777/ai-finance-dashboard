import { describe, it, expect, beforeEach } from "vitest";
import { encrypt, decrypt } from "./encryption";

describe("encryption utility", () => {
  beforeEach(() => {
    process.env.ENCRYPTION_SECRET =
      "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  });

  it("encrypts and decrypts a value back to the original text", () => {
    const token = "gmail-access-token-example";

    const encrypted = encrypt(token);
    const decrypted = decrypt(encrypted);

    expect(encrypted).not.toBe(token);
    expect(decrypted).toBe(token);
  });

  it("creates a different encrypted value each time", () => {
    const token = "same-token";

    const encrypted1 = encrypt(token);
    const encrypted2 = encrypt(token);

    expect(encrypted1).not.toBe(encrypted2);
  });

  it("throws when encrypted value is invalid", () => {
    expect(() => decrypt("not-valid")).toThrow("Invalid encrypted value");
  });
});
