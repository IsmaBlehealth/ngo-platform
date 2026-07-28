import { describe, it, expect } from "vitest";
import { rateLimit, RATE_LIMITS } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests within limit", () => {
    const key = `test-allow-${Date.now()}`;
    const result = rateLimit(key, 5, 60_000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks requests over limit", () => {
    const key = `test-block-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      rateLimit(key, 5, 60_000);
    }
    const result = rateLimit(key, 5, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it("resets after window expires", () => {
    const key = `test-reset-${Date.now()}`;
    const result1 = rateLimit(key, 2, 1);
    expect(result1.allowed).toBe(true);
    const result2 = rateLimit(key, 2, 1);
    expect(result2.allowed).toBe(true);
    const result3 = rateLimit(key, 2, 1);
    expect(result3.allowed).toBe(false);
  });
});

describe("RATE_LIMITS constants", () => {
  it("has all required rate limit configs", () => {
    expect(RATE_LIMITS.contact).toBeDefined();
    expect(RATE_LIMITS.donation).toBeDefined();
    expect(RATE_LIMITS.register).toBeDefined();
    expect(RATE_LIMITS.forgotPassword).toBeDefined();
    expect(RATE_LIMITS.resetPassword).toBeDefined();
    expect(RATE_LIMITS.webhook).toBeDefined();
  });

  it("register rate limit is strict", () => {
    expect(RATE_LIMITS.register.limit).toBeLessThanOrEqual(5);
    expect(RATE_LIMITS.register.windowMs).toBeGreaterThanOrEqual(300_000);
  });
});