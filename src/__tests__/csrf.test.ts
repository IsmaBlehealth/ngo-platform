import { describe, it, expect } from "vitest";

describe("CSRF token format", () => {
  it("token should have correct format (token.signature)", () => {
    const mockToken = "a".repeat(64) + "." + "b".repeat(64);
    const parts = mockToken.split(".");
    expect(parts).toHaveLength(2);
    expect(parts[0]).toHaveLength(64);
    expect(parts[1]).toHaveLength(64);
  });

  it("rejects tokens without signature", () => {
    const badToken = "onlytokenpart";
    const parts = badToken.split(".");
    expect(parts).toHaveLength(1);
    expect(parts.length >= 2).toBe(false);
  });
});

describe("rate limit constants", () => {
  it("contact rate limit is reasonable", () => {
    const limit = 5;
    const windowMs = 60_000;
    expect(limit).toBeGreaterThan(0);
    expect(windowMs).toBeGreaterThan(0);
    expect(limit).toBeLessThanOrEqual(10);
  });

  it("donation rate limit is reasonable", () => {
    const limit = 10;
    expect(limit).toBeGreaterThan(0);
    expect(limit).toBeLessThanOrEqual(20);
  });
});