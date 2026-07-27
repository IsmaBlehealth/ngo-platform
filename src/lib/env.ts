import { z } from "zod";

function getEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

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

const rawEnv: Record<string, string | undefined> = {
  DATABASE_URL: getEnv("DATABASE_URL", "postgresql://placeholder:placeholder@localhost/db"),
  NEXTAUTH_SECRET: getEnv("NEXTAUTH_SECRET", "build-placeholder"),
  NEXTAUTH_URL: getEnv("NEXTAUTH_URL", "http://localhost:3000"),
  NEXT_PUBLIC_URL: getEnv("NEXT_PUBLIC_URL", "http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: getEnv("NEXT_PUBLIC_APP_NAME", "Global Approach To Development"),
  PAYMENT_PROVIDER: getEnv("PAYMENT_PROVIDER", "stripe"),
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

const parsed = serverEnvSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
