import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^A-Za-z0-9]/, "Must contain a special character");

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(100)
  .regex(/^[\p{L}\s'\-]+$/u, "Invalid characters");

export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .max(255)
  .toLowerCase();

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(128),
});

export const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const donationSchema = z.object({
  amount: z
    .number()
    .int()
    .min(100, "Minimum donation is $1.00")
    .max(10000000, "Maximum donation is $100,000"),
  type: z.enum(["ONE_TIME", "MONTHLY"]),
});

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .max(50)
    .regex(/^[\+]?[\d\s\-\(\)]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type DonationInput = z.infer<typeof donationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
