import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/dashboard/admin"];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  const bots = /bot|crawler|spider|scraper|curl|wget|python|go-http/i;
  return bots.test(userAgent);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent");

  if (isBot(userAgent) && !pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const { env } = await import("@/lib/env");

  const token = await getToken({
    req: request,
    secret: env.NEXTAUTH_SECRET,
  });

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "0");

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
