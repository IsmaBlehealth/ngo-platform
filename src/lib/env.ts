import { z } from "zod";

const isDev = process.env.NODE_ENV === "development";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(isDev ? 1 : 32),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string(),

  // Payment provider: "stripe" | "paypal"
  PAYMENT_PROVIDER: z.enum(["stripe", "paypal"]).default("stripe"),

  // Stripe (optional if using PayPal only)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // PayPal (optional if using Stripe only)
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_WEBHOOK_ID: z.string().optional(),

  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
