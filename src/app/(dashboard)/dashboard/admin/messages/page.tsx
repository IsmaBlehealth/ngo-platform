import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitize } from "@/lib/sanitize";
import { redirect } from "next/navigation";

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Contact Messages</h1>
      <p className="mt-2 text-muted">
        Messages submitted through the contact form.
      </p>

      {messages.length === 0 ? (
        <p className="mt-12 text-center text-muted">No messages yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border p-6 ${
                msg.isRead ? "bg-white" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{msg.name}</h3>
                  <p className="text-sm text-muted">{msg.email}</p>
                </div>
                <span className="text-xs text-muted">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              {msg.subject && (
                <p className="mt-2 text-sm font-medium">{msg.subject}</p>
              )}
              <p className="mt-2 text-sm text-foreground/70" dangerouslySetInnerHTML={{ __html: sanitize(msg.message) }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
