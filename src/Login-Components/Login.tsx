import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, googleLogin, register, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string | undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(email, password);
      } else if (mode === "register") {
        await register(name, email, password);
      } else {
        // forgot
        const result = await forgotPassword(email);
        alert(result?.message || `If your email exists, a reset link was sent to ${email}`);
        setMode("login");
      }
    } catch (err) {
      console.error(err);
      alert("Authentication failed");
    }
  };

  const handleGoogleSuccess = async (credential: string | undefined) => {
    if (!credential) {
      alert("Google login failed: missing credentials.");
      return;
    }

    setGoogleLoading(true);
    try {
      await googleLogin(credential);
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    } finally {
      setGoogleLoading(false);
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
                      <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={40} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-foreground/80 mb-1">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required maxLength={40} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
                  </div>

                  {mode !== 'forgot' && (
                    <div>
                      <label className="block text-sm text-foreground/80 mb-1">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} maxLength={30} className="w-full px-3 py-2 border border-border rounded bg-transparent" />
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
                    {googleClientId ? (
                      <div className="w-full flex justify-center">
                        <GoogleLogin
                          onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse.credential)}
                          onError={() => alert("Google login failed")}
                          theme="outline"
                          size="large"
                          text="signin_with"
                          shape="pill"
                          width="100%"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full px-4 py-2 border border-border rounded flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                      >
                        <img src="/assets/google.svg" alt="" className="w-5 h-5" />
                        <span>Login with Google</span>
                      </button>
                    )}
                    {googleLoading && (
                      <div className="text-center text-xs text-foreground/70">Signing you in with Google...</div>
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
              <div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Admin Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
