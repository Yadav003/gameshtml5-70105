import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const decodeUser = (encoded: string): User | null => {
  try {
    const raw = decodeBase64Url(encoded);
    const parsed = JSON.parse(raw) as User;
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.email !== "string" || typeof parsed.name !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
};

const OAuthCallback = () => {
  const { completeOAuthLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const hasHandled = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasHandled.current) return;
    hasHandled.current = true;

    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    const params = new URLSearchParams(hash);

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const userEncoded = params.get("user");

    if (!userEncoded) {
      setError("Missing user information in callback.");
      return;
    }

    const user = decodeUser(userEncoded);
    if (!user) {
      setError("Invalid user information in callback.");
      return;
    }

    if (user.status?.toLowerCase() === "disabled") {
      setError("This account is disabled.");
      return;
    }

    completeOAuthLogin({ user, accessToken, refreshToken });
    toast({
      title: "Login successful",
      description: "Signed in with Google.",
    });
    window.history.replaceState({}, document.title, "/oauth/callback");

    const role = user.role?.toLowerCase();
    navigate(role === "admin" ? "/admin/dashboard" : "/", { replace: true });
  }, [completeOAuthLogin, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">Login failed</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
