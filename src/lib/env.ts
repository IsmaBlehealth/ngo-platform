import { z } from "zod";

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

function resolveEnv(): z.infer<typeof serverEnvSchema> {
  const defaults: Record<string, string> = {
    DATABASE_URL: "postgresql://placeholder:placeholder@localhost/db",
    NEXTAUTH_SECRET: "build-placeholder",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXT_PUBLIC_URL: "http://localhost:3000",
    NEXT_PUBLIC_APP_NAME: "Global Approach To Development",
    PAYMENT_PROVIDER: "stripe",
  };

  const merged: Record<string, string | undefined> = {};
  for (const key of Object.keys(defaults)) {
    merged[key] = process.env[key] || defaults[key];
  }

  const optionalKeys = [
    "STRIPE_SECRET_KEY", "STRIPE_PUBLISHABLE_KEY", "STRIPE_WEBHOOK_SECRET",
    "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_WEBHOOK_ID",
    "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET",
  ];
  for (const key of optionalKeys) {
    if (process.env[key]) merged[key] = process.env[key];
  }

  const parsed = serverEnvSchema.safeParse(merged);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}

export const env = resolveEnv();
