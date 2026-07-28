import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import MessagesList from "./MessagesList";

export const metadata = {
  title: "Contact Messages",
};

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = messages.filter((m: { isRead: boolean }) => !m.isRead).length;

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
        <MessagesList messages={messages} />
      )}
    </div>
  );
}
