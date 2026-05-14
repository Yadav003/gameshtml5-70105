import React, { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initialToken = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("token") || "";
  }, [location.search]);

  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return alert("Reset token is required");
    if (password !== confirm) return alert("Passwords do not match");

    try {
      setLoading(true);
      const result = await resetPassword(token.trim(), password);
      alert(result?.message || "Password reset successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-2">Reset password</h1>
          <p className="text-sm text-foreground/70 mb-6">
            Enter the reset token from your email and choose a new password.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-foreground/80 mb-1">Reset token</label>
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                type="text"
                required
                maxLength={64}
                className="w-full px-3 py-2 border border-border rounded bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground/80 mb-1">New password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                minLength={8}
                maxLength={30}
                required
                className="w-full px-3 py-2 border border-border rounded bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-foreground/80 mb-1">Confirm new password</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                minLength={8}
                maxLength={30}
                required
                className="w-full px-3 py-2 border border-border rounded bg-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <button type="button" onClick={() => navigate("/login")} className="text-sm text-primary underline">
                Back to login
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
