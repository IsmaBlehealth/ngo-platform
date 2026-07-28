import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitize } from "@/lib/sanitize";
import { redirect } from "next/navigation";
import MessageActions from "./MessageActions";

export const metadata = {
  title: "Contact Messages",
};

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Contact Messages</h1>
          <p className="mt-1 text-sm text-muted">
            Messages submitted through the contact form.
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white">
            {unreadCount} unread
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary">No messages yet</h3>
          <p className="mt-2 text-sm text-muted">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const initials = msg.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={msg.id}
                className={`rounded-2xl p-6 shadow-lg ${
                  msg.isRead ? "bg-white" : "bg-white border-l-4 border-accent"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-primary">{msg.name}</h3>
                        <p className="text-sm text-muted">{msg.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageActions id={msg.id} isRead={msg.isRead} />
                        {!msg.isRead && (
                          <span className="h-2.5 w-2.5 rounded-full bg-accent" title="Unread" />
                        )}
                        <span className="text-xs text-muted whitespace-nowrap">
                          {getRelativeTime(new Date(msg.createdAt))}
                        </span>
                      </div>
                    </div>
                    {msg.subject && (
                      <p className="mt-2 text-sm font-medium">{msg.subject}</p>
                    )}
                    <p
                      className="mt-2 text-sm text-foreground/70 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sanitize(msg.message) }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
