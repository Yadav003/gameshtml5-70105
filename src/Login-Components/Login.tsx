import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { login, startGoogleOAuth, register, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleRedirecting, setGoogleRedirecting] = useState(false);

  const locationState = location.state as { redirectTo?: string; from?: Location } | null;
  const fallbackRedirect = locationState?.from
    ? `${locationState.from.pathname}${locationState.from.search}${locationState.from.hash}`
    : undefined;
  const redirectTo = locationState?.redirectTo ?? fallbackRedirect;
  const safeRedirectTo = redirectTo?.startsWith("/") ? redirectTo : undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValue = email.trim();
    const nameValue = name.trim();

    if (mode === "register") {
      if (nameValue.length < 3 || nameValue.length > 30) {
        toast({
          title: "Invalid name",
          description: "Name must be between 3 and 30 characters.",
          variant: "destructive",
        });
        return;
      }
      if (password.length < 8) {
        toast({
          title: "Invalid password",
          description: "Password must be at least 8 characters.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      if (mode === "login") {
        await login(emailValue, password, safeRedirectTo);
        toast({
          title: "Login successful",
          description: "Welcome back to PlayVerse.",
        });
      } else if (mode === "register") {
        await register(nameValue, emailValue, password);
        toast({
          title: "Registration successful",
          description: "Your account is ready. Please sign in to continue.",
          duration: 10000,
        });
        setMode("login");
        setName("");
        setPassword("");
      } else {
        // forgot
        const result = await forgotPassword(emailValue);
        toast({
          title: "Password reset sent",
          description: result?.message || `If your email exists, a reset link was sent to ${emailValue}`,
        });
        setMode("login");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Authentication failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleRedirect = async () => {
    setGoogleRedirecting(true);
    try {
      if (safeRedirectTo) {
        sessionStorage.setItem("playverse_post_login_redirect", safeRedirectTo);
      } else {
        sessionStorage.removeItem("playverse_post_login_redirect");
      }
      await startGoogleOAuth();
    } catch (err) {
      console.error(err);
      alert("Google login failed");
      setGoogleRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-180 pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-transparent rounded-lg overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
            {/* Left panel - welcome */}
            <div className="hidden md:flex flex-col justify-center px-10 py-12 bg-emerald-800 text-white gap-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-full">
               
                <img src="favicon.svg" alt="PlayVerse logo" className="w-8 h-8 brightness-0" />
              </div>
              <h1 className="text-4xl font-extrabold leading-tight">Welcome Back.</h1>
              <p className="text-foreground/800 max-w-sm">Your exclusive PlayVerse dashboard is ready — sign in to continue playing, track favourites and manage your profile.</p>
              <div className="mt-4">
                <button onClick={() => navigate('/')} className="px-4 py-2 bg-emerald-600 rounded text-sm font-medium">Back to home</button>
              </div>
            </div>

            {/* Right panel - form */}
            <div className="bg-card px-6 py-10">
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">{mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'}</h2>
                  <p className="text-sm text-foreground/70 mt-1">{mode === 'login' ? 'Welcome back — please sign in to continue.' : mode === 'register' ? 'Create your PlayVerse account.' : 'Enter your email to receive a password reset link.'}</p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm text-foreground/80 mb-1">Full name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} required minLength={3} maxLength={30} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-foreground/80 mb-1">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required maxLength={40} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                  </div>

                  {mode !== 'forgot' && (
                    <div>
                      <label className="block text-sm text-foreground/80 mb-1">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {mode === 'login' && (
                        <label className="inline-flex items-center text-sm text-foreground/80">
                          <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                      )}
                    </div>
                    <div>
                      {mode === 'login' ? (
                        <button type="button" onClick={() => setMode('forgot')} className="text-sm text-primary underline">Forgot?</button>
                      ) : (
                        <button type="button" onClick={() => setMode('login')} className="text-sm text-primary underline">Back to sign in</button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded">{mode === 'login' ? 'Login' : mode === 'register' ? 'Create account' : 'Send reset link'}</button>
                    <div className="text-center text-sm text-foreground/70">or</div>
                    <button
                      type="button"
                      onClick={handleGoogleRedirect}
                      disabled={googleRedirecting}
                      className="w-full px-4 py-2 border border-border rounded flex items-center justify-center gap-2"
                    >
                      <img src="/assets/google.svg" alt="" className="w-5 h-5" />
                      <span>{googleRedirecting ? "Redirecting..." : "Continue with Google"}</span>
                    </button>
                    {googleRedirecting && (
                      <div className="text-center text-xs text-foreground/70">Redirecting to Google...</div>
                    )}
                  </div>

                  {mode === 'forgot' && (
                    <div className="text-center text-sm text-foreground/80">
                      Already have a reset token?{" "}
                      <button type="button" onClick={() => navigate('/reset-password')} className="text-primary underline ml-1">
                        Reset here
                      </button>
                    </div>
                  )}

                  <div className="text-center text-sm text-foreground/80">
                    {mode === 'login' ? (
                      <>
                        Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-primary underline ml-1">Register</button>
                      </>
                    ) : mode === 'register' ? (
                      <>
                        Already have an account? <button type="button" onClick={() => setMode('login')} className="text-primary underline ml-1">Sign in</button>
                      </>
                    ) : (
                      <>
                        Remembered your password? <button type="button" onClick={() => setMode('login')} className="text-primary underline ml-1">Sign in</button>
                      </>
                    )}
                  </div>
                </form>

              </div>
              {/* <div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Admin Login
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
