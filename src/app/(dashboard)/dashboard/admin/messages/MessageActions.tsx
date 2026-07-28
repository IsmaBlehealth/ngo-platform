"use client";

async function markAsRead(id: string) {
  await fetch(`/api/admin/messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isRead: true }),
  });
  window.location.reload();
}

async function deleteMessage(id: string) {
  if (!confirm("Delete this message?")) return;
  await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
  window.location.reload();
}

export default function MessageActions({
  id,
  isRead,
}: {
  id: string;
  isRead: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      {!isRead && (
        <button
          onClick={() => markAsRead(id)}
          className="rounded-md px-2 py-1 text-xs font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "#0D5C63" }}
        >
          Mark read
        </button>
      )}
      <button
        onClick={() => deleteMessage(id)}
        className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
