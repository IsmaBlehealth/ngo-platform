"use client";

import { Pagination, usePagination } from "@/components/Pagination";
import { sanitize } from "@/lib/sanitize";
import MessageActions from "./MessageActions";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

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

export default function MessagesList({ messages }: { messages: Message[] }) {
  const { page, setPage, totalPages, paginatedItems } = usePagination(messages);

  return (
    <>
      <div className="space-y-4">
        {paginatedItems.map((msg) => {
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
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
