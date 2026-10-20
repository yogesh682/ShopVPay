import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { firstError, newPasswordSchema, MIN_PASSWORD_LENGTH } from "@/lib/account";
import { LOGO_URL } from "@/data/products";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset your password | ShopVPay" },
      { name: "description", content: "Choose a new password for your ShopVPay student account." },
      { property: "og:title", content: "Reset your password | ShopVPay" },
      { property: "og:description", content: "Choose a new password for your ShopVPay student account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

const field =
  "w-full rounded-lg border border-outline-variant/60 bg-surface-lowest p-2.5 text-sm text-on-surface outline-none focus:border-secondary";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hasRecovery, setHasRecovery] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const isRecoveryLink = window.location.hash.includes("type=recovery");
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setHasRecovery(true);
    });
    // The recovery link signs the user in; the hash may already be consumed, so a session also counts.
    supabase.auth.getSession().then(({ data }) => {
      setHasRecovery((prev) => prev === true || isRecoveryLink || !!data.session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = newPasswordSchema.safeParse({ password });
    if (!parsed.success) return setError(firstError(parsed));
    if (password !== confirm) return setError("Passwords don't match");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(err.message);
    setDone(true);
    setTimeout(() => navigate({ to: "/", replace: true }), 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-low px-4">
      <div className="w-full max-w-sm rounded-2xl bg-surface-lowest p-6 shadow-2xl">
        <img src={LOGO_URL} alt="ShopVPay" className="mx-auto mb-4 h-8" />
        <h1 className="text-center text-title-lg text-on-surface">Set a new password</h1>
        {done ? (
          <p className="mt-4 text-center text-sm text-success">Password updated! Taking you back to the store…</p>
        ) : hasRecovery === false ? (
          <div className="mt-4 space-y-3 text-center text-sm text-on-surface-variant">
            <p>This reset link is invalid or has expired. Request a new one from the Login window.</p>
            <Link to="/" className="font-semibold text-primary hover:underline">
              Back to store
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input
              type="password"
              aria-label="New password"
              placeholder={`New password (min ${MIN_PASSWORD_LENGTH} characters)`}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
            <input
              type="password"
              aria-label="Confirm new password"
              placeholder="Confirm new password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={field}
            />
            {error && <p className="text-xs font-medium text-error">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-primary-container py-2.5 text-sm font-semibold text-on-primary transition-all hover:bg-primary disabled:opacity-60"
            >
              {busy ? "Saving…" : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
