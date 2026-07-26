export type PaymentProviderName = "stripe" | "paypal";

export interface CreateCheckoutParams {
  amount: number; // cents
  currency: string;
  type: "ONE_TIME" | "MONTHLY";
  description: string;
  metadata: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  url: string;
  providerSessionId: string;
}

export interface WebhookResult {
  type: "donation.completed" | "donation.failed" | "donation.refunded" | "subscription.created" | "subscription.cancelled" | "unknown";
  providerPaymentId?: string;
  providerSessionId?: string;
  metadata?: Record<string, string>;
}

export interface PaymentProvider {
  name: PaymentProviderName;
  createCheckout(params: CreateCheckoutParams): Promise<CheckoutResult>;
  verifyWebhook(body: string, headers: Record<string, string | null>): Promise<boolean>;
  parseWebhook(body: string, headers: Record<string, string | null>): Promise<WebhookResult>;
}
