import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const { user, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) return alert("New password must be at least 8 characters");
    if (newPassword !== confirm) return alert("New passwords do not match");
    try {
      setLoading(true);
      await updatePassword(currentPassword, newPassword);
      alert("Password updated");
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6">You must be logged in to update password.</div>;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-transparent rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            <div className="hidden md:flex flex-col justify-center px-10 py-12 bg-primary/80 text-white gap-6">
              <h2 className="text-3xl font-extrabold">Secure your account</h2>
              <p className="text-foreground/800 max-w-sm">Use a strong password to keep your PlayArena account safe. Update your password regularly and avoid reusing passwords.</p>
              <div>
                <button onClick={() => navigate('/profile')} className="px-4 py-2 bg-primary/90 rounded text-sm font-medium border-2 border-white">Back to profile</button>
              </div>
            </div>

            <div className="bg-card px-6 py-10">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold mb-2">Update password</h3>
                <p className="text-sm text-foreground/70 mb-6">Enter your current password and choose a new secure password.</p>

                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-foreground/80 mb-1">Current password</label>
                    <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" required minLength={8} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                  </div>

                  <div>
                    <label className="block text-sm text-foreground/80 mb-1">New password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" minLength={8} required className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                    <p className="text-xs text-foreground/60 mt-1">Minimum 8 characters. Use letters, numbers, and symbols for a stronger password.</p>
                  </div>

                  <div>
                    <label className="block text-sm text-foreground/80 mb-1">Confirm new password</label>
                    <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" minLength={8} required className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">{loading ? 'Updating…' : 'Update password'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
