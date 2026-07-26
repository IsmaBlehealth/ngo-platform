import Stripe from "stripe";
import "server-only";
import type {
  PaymentProvider,
  CreateCheckoutParams,
  CheckoutResult,
  WebhookResult,
} from "./types";

let stripeInstance: Stripe | null = null;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

function getStripe(): Stripe {
  if (stripeInstance) return stripeInstance;
  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2026-06-24.dahlia",
    typescript: true,
    maxNetworkRetries: 2,
  });
  return stripeInstance;
}

export const stripeProvider: PaymentProvider = {
  name: "stripe",

  async createCheckout(params: CreateCheckoutParams): Promise<CheckoutResult> {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: params.currency,
            product_data: {
              name: params.description,
              description:
                params.type === "MONTHLY"
                  ? "Monthly donation"
                  : "One-time donation",
            },
            unit_amount: params.amount,
            ...(params.type === "MONTHLY" && {
              recurring: { interval: "month" },
            }),
          },
          quantity: 1,
        },
      ],
      mode: params.type === "MONTHLY" ? "subscription" : "payment",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    });

    if (!session.url) {
      throw new Error("Stripe checkout session created without URL");
    }

    return {
      url: session.url,
      providerSessionId: session.id,
    };
  },

  async verifyWebhook(body: string, headers: Record<string, string | null>): Promise<boolean> {
    const sig = headers["stripe-signature"];
    if (!sig) return false;

    try {
      getStripe().webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
      return true;
    } catch {
      return false;
    }
  },

  async parseWebhook(
    body: string,
    headers: Record<string, string | null>
  ): Promise<WebhookResult> {
    const sig = headers["stripe-signature"];
    if (!sig) {
      return { type: "unknown" };
    }

    const event = getStripe().webhooks.constructEvent(
      body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        return {
          type:
            session.payment_status === "paid"
              ? "donation.completed"
              : "unknown",
          providerPaymentId: session.payment_intent as string,
          providerSessionId: session.id,
          metadata: session.metadata as Record<string, string>,
        };
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const invAny = invoice as unknown as Record<string, unknown>;
        return {
          type: "subscription.created",
          providerPaymentId: invoice.id,
          providerSessionId: (invAny.subscription as string) || invoice.id,
        };
      }
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        return {
          type: "donation.failed",
          providerPaymentId: pi.id,
        };
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        return {
          type: "donation.refunded",
          providerPaymentId: charge.payment_intent as string,
        };
      }
      default:
        return { type: "unknown" };
    }
  },
};
