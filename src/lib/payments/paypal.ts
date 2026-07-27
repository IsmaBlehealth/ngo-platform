import "server-only";
import type {
  PaymentProvider,
  CreateCheckoutParams,
  CheckoutResult,
  WebhookResult,
} from "./types";

const PAYPAL_API = "https://api-m.paypal.com";

function getPayPalConfig() {
  const { env } = require("@/lib/env");
  return {
    clientId: env.PAYPAL_CLIENT_ID || "",
    clientSecret: env.PAYPAL_CLIENT_SECRET || "",
    webhookId: env.PAYPAL_WEBHOOK_ID || "",
  };
}

async function getAccessToken(): Promise<string> {
  const config = getPayPalConfig();
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function verifyWebhookSignature(
  body: string,
  headers: Record<string, string | null>
): Promise<boolean> {
  const config = getPayPalConfig();
  const transmissionId = headers["paypal-transmission-id"];
  const certId = headers["paypal-cert-id"];
  const sig = headers["paypal-transmission-sig"];
  const timestamp = headers["paypal-transmission-time"];
  const authAlgo = headers["paypal-auth-algo"];

  if (!transmissionId || !certId || !sig || !timestamp || !authAlgo) {
    return false;
  }

  try {
    const accessToken = await getAccessToken();
    const res = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_id: certId,
        transmission_id: transmissionId,
        transmission_sig: sig,
        transmission_time: timestamp,
        webhook_id: config.webhookId,
        webhook_event: JSON.parse(body),
      }),
    });

    const result = await res.json();
    return result.verification_status === "SUCCESS";
  } catch {
    return false;
  }
}

export const paypalProvider: PaymentProvider = {
  name: "paypal",

  async createCheckout(params: CreateCheckoutParams): Promise<CheckoutResult> {
    const accessToken = await getAccessToken();

    if (params.type === "MONTHLY") {
      const res = await fetch(`${PAYPAL_API}/v1/billing/plans`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          product_id: "GAD_DONATION",
          name: params.description,
          description: "Monthly donation to Global Approach To Development",
          billing_cycles: [
            {
              frequency: { interval_unit: "MONTH", interval_count: 1 },
              tenure_type: "REGULAR",
              sequence: 1,
              pricing_scheme: {
                fixed_price: {
                  value: (params.amount / 100).toFixed(2),
                  currency_code: params.currency,
                },
              },
            },
          ],
          payment_preferences: {
            auto_bill_outstanding: true,
            payment_failure_threshold: 3,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(`PayPal plan creation failed: ${JSON.stringify(err)}`);
      }

      const plan = await res.json();

      const subRes = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          plan_id: plan.id,
          custom_id: JSON.stringify(params.metadata),
          application_context: {
            brand_name: "Global Approach To Development",
            return_url: params.successUrl,
            cancel_url: params.cancelUrl,
          },
        }),
      });

      if (!subRes.ok) {
        const err = await subRes.json();
        throw new Error(`PayPal subscription creation failed: ${JSON.stringify(err)}`);
      }

      const subscription = await subRes.json();
      const approveLink = subscription.links?.find(
        (l: { rel: string }) => l.rel === "approve"
      );

      return {
        url: approveLink?.href || params.cancelUrl,
        providerSessionId: subscription.id,
      };
    }

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: params.currency,
              value: (params.amount / 100).toFixed(2),
            },
            description: params.description,
            custom_id: JSON.stringify(params.metadata),
          },
        ],
        application_context: {
          brand_name: "Global Approach To Development",
          return_url: params.successUrl,
          cancel_url: params.cancelUrl,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`PayPal order creation failed: ${JSON.stringify(err)}`);
    }

    const order = await res.json();
    const approveLink = order.links?.find(
      (l: { rel: string }) => l.rel === "approve"
    );

    return {
      url: approveLink?.href || params.cancelUrl,
      providerSessionId: order.id,
    };
  },

  async verifyWebhook(
    body: string,
    headers: Record<string, string | null>
  ): Promise<boolean> {
    return verifyWebhookSignature(body, headers);
  },

  async parseWebhook(
    body: string,
    _headers: Record<string, string | null>
  ): Promise<WebhookResult> {
    const event = JSON.parse(body);

    switch (event.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED": {
        const resource = event.resource;
        return {
          type: "donation.completed",
          providerPaymentId: resource.id,
          providerSessionId: resource.custom_id || undefined,
        };
      }
      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.REFUNDED": {
        const resource = event.resource;
        return {
          type:
            event.event_type === "PAYMENT.CAPTURE.REFUNDED"
              ? "donation.refunded"
              : "donation.failed",
          providerPaymentId: resource.id,
        };
      }
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        return {
          type: "subscription.created",
          providerSessionId: event.resource?.id,
        };
      }
      case "BILLING.SUBSCRIPTION.CANCELLED": {
        return {
          type: "subscription.cancelled",
          providerSessionId: event.resource?.id,
        };
      }
      default:
        return { type: "unknown" };
    }
  },
};
