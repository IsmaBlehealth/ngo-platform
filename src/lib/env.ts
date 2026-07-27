import { z } from "zod";

const isBuild = process.argv.includes("next build") || process.argv.includes("next-telemetry");

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string(),

  PAYMENT_PROVIDER: z.enum(["stripe", "paypal"]).default("stripe"),

  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_WEBHOOK_ID: z.string().optional(),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://placeholder:placeholder@localhost/db";
  process.env.NEXTAUTH_SECRET = "build-placeholder-secret";
  process.env.NEXTAUTH_URL = "http://localhost:3000";
  process.env.NEXT_PUBLIC_URL = "http://localhost:3000";
  process.env.NEXT_PUBLIC_APP_NAME = "Global Approach To Development";
}

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
