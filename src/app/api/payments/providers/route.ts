import { NextResponse } from "next/server";
import { getAvailableProviders, isProviderConfigured } from "@/lib/payments";
import type { PaymentProviderName } from "@/lib/payments";

export async function GET() {
  const available = getAvailableProviders();
  const configured: Record<PaymentProviderName, boolean> = {
    stripe: isProviderConfigured("stripe"),
    paypal: isProviderConfigured("paypal"),
  };

  return NextResponse.json({
    available,
    defaultProvider: available[0] || "stripe",
    configured,
  });
}
