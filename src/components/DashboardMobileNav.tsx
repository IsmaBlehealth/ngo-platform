"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/donations", label: "My Donations" },
];

const adminItems = [
  { href: "/dashboard/admin/messages", label: "Messages" },
  { href: "/dashboard/admin/users", label: "Users" },
];

export default function DashboardMobileNav({
  userName,
  isAdmin,
}: {
  userName: string;
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white font-bold text-[10px]">
            GAD
          </div>
          <span className="text-sm font-bold text-primary">Dashboard</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center rounded-lg p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="dashboard-mobile-nav"
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
        <div id="dashboard-mobile-nav" className="border-b bg-white px-4 pb-4 pt-2 shadow-lg">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <div className="my-3 border-t" />
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Admin
                </p>
                {adminItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/60 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
          <div className="my-3 border-t" />
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {initials || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{userName}</p>
            </div>
          </div>
          <button
            onClick={() => { signOut(); setOpen(false); }}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground/60 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
