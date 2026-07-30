"use client";

import { useState, useEffect } from "react";

async function markAsRead(id: string, csrfToken: string) {
  await fetch(`/api/admin/messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
    body: JSON.stringify({ isRead: true }),
  });
  window.location.reload();
}

async function deleteMessage(id: string, csrfToken: string) {
  if (!confirm("Delete this message?")) return;
  await fetch(`/api/admin/messages/${id}`, {
    method: "DELETE",
    headers: { "X-CSRF-Token": csrfToken },
  });
  window.location.reload();
}

export default function MessageActions({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("/api/csrf").then((r) => r.json()).then((d) => setCsrfToken(d.csrfToken));
  }, []);

  return (
    <div className="flex items-center gap-1">
      {!isRead && (
        <button
          onClick={() => markAsRead(id, csrfToken)}
          className="rounded-md px-2 py-1 text-xs font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "#0D5C63" }}
        >
          Mark read
        </button>
      )}
      <button
        onClick={() => deleteMessage(id, csrfToken)}
        className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
