"use client";

import { useEffect, useState } from "react";

interface UserSession {
  id: string;
  expires: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/sessions")
      .then((res) => res.json())
      .then((data) => {
        setSessions(data.sessions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function revokeSession(id: string) {
    await fetch(`/api/user/sessions/${id}`, { method: "DELETE" });
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto p-8"><p className="text-muted">Loading sessions...</p></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Active Sessions</h1>
        <p className="text-muted mt-2">Manage your active login sessions</p>
      </div>

      <div className="liquid-glass-surface rounded-2xl p-8 shadow-lg">
        {sessions.length === 0 ? (
          <p className="text-muted">No active sessions found.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-[#FAF9F6] rounded-xl">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Session {s.id.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-muted">
                    Expires: {new Date(s.expires).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => revokeSession(s.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Revoke
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
