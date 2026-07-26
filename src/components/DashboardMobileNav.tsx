"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardMobileNav({
  userName,
  isAdmin,
}: {
  userName: string;
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/dashboard" className="text-lg font-bold text-primary">
          GAD Dashboard
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-lg p-2"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-b bg-gray-50 px-4 pb-4 pt-2">
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/donations"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
            >
              My Donations
            </Link>
            {isAdmin && (
              <>
                <div className="my-3 border-t" />
                <p className="px-3 py-1 text-xs font-semibold uppercase text-muted">
                  Admin
                </p>
                <Link
                  href="/dashboard/admin/messages"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
                >
                  Messages
                </Link>
                <Link
                  href="/dashboard/admin/users"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-gray-100"
                >
                  Users
                </Link>
              </>
            )}
          </nav>
          <div className="my-3 border-t" />
          <p className="px-3 py-1 text-sm text-muted">{userName}</p>
          <button
            onClick={() => signOut()}
            className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground/70 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
