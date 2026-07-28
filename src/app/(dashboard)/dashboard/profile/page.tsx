"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setFirstName(session.user.name?.split(" ")[0] || "");
      setLastName(session.user.name?.split(" ").slice(1).join(" ") || "");
    }
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      if (res.ok) {
        setMessage("Profile updated successfully");
        await update();
      } else {
        setMessage("Failed to update profile");
      }
    } catch {
      setMessage("An error occurred");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted mt-2">Manage your account information</p>
      </div>

      <form onSubmit={handleSave} className="liquid-glass-surface rounded-2xl p-8 shadow-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-[#FAF9F6] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-[#FAF9F6] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={session?.user?.email || ""}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-gray-100 text-muted cursor-not-allowed"
          />
          <p className="text-xs text-muted mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Role</label>
          <input
            type="text"
            value={session?.user?.role || ""}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-gray-100 text-muted cursor-not-allowed"
          />
        </div>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}