// NOTE: next-auth v5 is currently in beta. Monitor for stable release. API may change.
import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { env } from "@/lib/env";
import type { UserRole } from "@/generated/prisma/client";

const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

function isLockedOut(email: string): boolean {
  const entry = loginAttempts.get(email);
  if (!entry) return false;
  if (Date.now() > entry.lockedUntil) {
    loginAttempts.delete(email);
    return false;
  }
  return true;
}

function recordFailedLogin(email: string): void {
  const entry = loginAttempts.get(email);
  if (entry) {
    entry.count++;
    if (entry.count >= MAX_LOGIN_ATTEMPTS) {
      entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
  } else {
    loginAttempts.set(email, { count: 1, lockedUntil: 0 });
  }
}

function clearLoginAttempts(email: string): void {
  loginAttempts.delete(email);
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        if (isLockedOut(email)) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) {
          recordFailedLogin(email);
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          recordFailedLogin(email);
          return null;
        }

        clearLoginAttempts(email);

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.id;
        token.role = user.role ?? token.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        session.user.role = (token.role as UserRole) ?? "DONOR";

        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true },
          });
          if (!dbUser) {
            session.user.role = "DONOR";
          } else {
            session.user.role = dbUser.role;
          }
        } catch {
          // If DB is unreachable, keep the JWT role (fail open for session,
          // but the proxy will still enforce auth checks)
        }
      }
      return session;
    },
  },
});
