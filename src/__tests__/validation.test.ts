import { describe, it, expect } from "vitest";
import {
  passwordSchema,
  nameSchema,
  emailSchema,
  loginSchema,
  registerSchema,
  donationSchema,
  contactSchema,
} from "@/lib/validation";

describe("passwordSchema", () => {
  it("rejects short passwords", () => {
    expect(passwordSchema.safeParse("Ab1!abc").success).toBe(false);
  });
  it("rejects passwords without uppercase", () => {
    expect(passwordSchema.safeParse("abc123!@#defg").success).toBe(false);
  });
  it("rejects passwords without lowercase", () => {
    expect(passwordSchema.safeParse("ABC123!@#DEFG").success).toBe(false);
  });
  it("rejects passwords without digit", () => {
    expect(passwordSchema.safeParse("AbcDef!@#GhiJ").success).toBe(false);
  });
  it("rejects passwords without special char", () => {
    expect(passwordSchema.safeParse("AbcDef123GhiJ").success).toBe(false);
  });
  it("accepts valid passwords", () => {
    expect(passwordSchema.safeParse("MyP@ssw0rd123").success).toBe(true);
    expect(passwordSchema.safeParse("C0mpl3x!Pass#2024").success).toBe(true);
  });
});

describe("emailSchema", () => {
  it("lowercases and trims emails", () => {
    const result = emailSchema.safeParse("  TEST@Example.COM  ");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("test@example.com");
  });
  it("rejects invalid emails", () => {
    expect(emailSchema.safeParse("notanemail").success).toBe(false);
    expect(emailSchema.safeParse("@example.com").success).toBe(false);
  });
  it("enforces max length", () => {
    const longEmail = "a".repeat(250) + "@example.com";
    expect(emailSchema.safeParse(longEmail).success).toBe(false);
  });
});

describe("nameSchema", () => {
  it("accepts valid names", () => {
    expect(nameSchema.safeParse("John").success).toBe(true);
    expect(nameSchema.safeParse("Mary-Jane").success).toBe(true);
    expect(nameSchema.safeParse("O'Brien").success).toBe(true);
  });
  it("rejects names with numbers", () => {
    expect(nameSchema.safeParse("John123").success).toBe(false);
  });
  it("rejects single character names", () => {
    expect(nameSchema.safeParse("A").success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("rejects empty password", () => {
    expect(loginSchema.safeParse({ email: "test@test.com", password: "" }).success).toBe(false);
  });
  it("accepts valid login", () => {
    expect(loginSchema.safeParse({ email: "test@test.com", password: "pass" }).success).toBe(true);
  });
  it("enforces password max length", () => {
    expect(loginSchema.safeParse({ email: "test@test.com", password: "a".repeat(129) }).success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("requires all fields", () => {
    expect(registerSchema.safeParse({}).success).toBe(false);
  });
  it("accepts valid registration", () => {
    expect(registerSchema.safeParse({
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      password: "MyP@ssw0rd123",
    }).success).toBe(true);
  });
});

describe("donationSchema", () => {
  it("rejects amounts below minimum", () => {
    expect(donationSchema.safeParse({ amount: 50, type: "ONE_TIME" }).success).toBe(false);
  });
  it("accepts valid donation", () => {
    expect(donationSchema.safeParse({ amount: 5000, type: "ONE_TIME" }).success).toBe(true);
  });
  it("rejects invalid type", () => {
    expect(donationSchema.safeParse({ amount: 5000, type: "WEEKLY" }).success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("requires message minimum length", () => {
    expect(contactSchema.safeParse({
      name: "John",
      email: "john@test.com",
      message: "Hi",
    }).success).toBe(false);
  });
  it("accepts valid contact form", () => {
    expect(contactSchema.safeParse({
      name: "John Doe",
      email: "john@test.com",
      message: "This is a test message that is long enough",
    }).success).toBe(true);
  });
  it("honeypot field rejects bots", () => {
    expect(contactSchema.safeParse({
      name: "John Doe",
      email: "john@test.com",
      message: "This is a test message that is long enough",
      website: "http://spam.com",
    }).success).toBe(false);
  });
});