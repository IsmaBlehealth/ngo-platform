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

  RESEND_API_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  REDIS_URL: z.string().optional(),
});

const REQUIRED_VARS = ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL"] as const;

function resolveEnv(): z.infer<typeof serverEnvSchema> {
  for (const key of REQUIRED_VARS) {
    if (!process.env[key]) {
      console.error(`Missing required environment variable: ${key}`);
      process.exit(1);
    }
  }

  const merged: Record<string, string | undefined> = {};
  for (const key of [...REQUIRED_VARS, "NEXT_PUBLIC_URL", "NEXT_PUBLIC_APP_NAME", "PAYMENT_PROVIDER", "DIRECT_URL"]) {
    merged[key] = process.env[key] || undefined;
  }

  const optionalKeys = [
    "STRIPE_SECRET_KEY", "STRIPE_PUBLISHABLE_KEY", "STRIPE_WEBHOOK_SECRET",
    "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_WEBHOOK_ID",
    "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET",
    "RESEND_API_KEY", "CRON_SECRET", "REDIS_URL",
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
