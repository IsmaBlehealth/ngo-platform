import type { PaymentProvider, PaymentProviderName } from "./types";
import { stripeProvider } from "./stripe";
import { paypalProvider } from "./paypal";

export type { PaymentProvider, PaymentProviderName, CreateCheckoutParams, CheckoutResult, WebhookResult } from "./types";

const providers: Record<PaymentProviderName, PaymentProvider> = {
  stripe: stripeProvider,
  paypal: paypalProvider,
};

const activeProviderName: PaymentProviderName =
  (process.env.PAYMENT_PROVIDER as PaymentProviderName) || "stripe";

export function getPaymentProvider(): PaymentProvider {
  return providers[activeProviderName];
}

export function getPaymentProviderByName(name: PaymentProviderName): PaymentProvider {
  return providers[name];
}

export function getAvailableProviders(): PaymentProviderName[] {
  const available: PaymentProviderName[] = [];

  if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("CHANGE_ME")) {
    available.push("stripe");
  }
  if (process.env.PAYPAL_CLIENT_ID && !process.env.PAYPAL_CLIENT_ID.includes("CHANGE_ME")) {
    available.push("paypal");
  }

  return available.length > 0 ? available : [activeProviderName];
}

export function isProviderConfigured(name: PaymentProviderName): boolean {
  if (name === "stripe") {
    return !!(
      process.env.STRIPE_SECRET_KEY &&
      !process.env.STRIPE_SECRET_KEY.includes("CHANGE_ME")
    );
  }
  if (name === "paypal") {
    return !!(
      process.env.PAYPAL_CLIENT_ID &&
      !process.env.PAYPAL_CLIENT_ID.includes("CHANGE_ME")
    );
  }
  return false;
}
