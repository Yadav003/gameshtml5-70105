import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, LockKeyhole, Mail, Sparkles, ArrowRight, ArrowLeft, Radar } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.16),_transparent_28%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5rem] top-20 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-36 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 md:px-6 lg:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between rounded-[2rem] border border-border/60 bg-background/75 p-8 shadow-sm backdrop-blur">
            <div className="space-y-6">
              <Badge className="w-fit gap-2 rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin Access
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight md:text-5xl">PlayVerse Admin Login</h1>
                <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                  Sign in to access moderation tools, manage users, and monitor account activity from the admin
                  control center.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
                  <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Radar className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Monitor accounts</p>
                  <p className="mt-1 text-sm text-muted-foreground">Track active, pending, and suspended users in one place.</p>
                </div>
                <div className="rounded-3xl border border-border/60 bg-muted/20 p-4">
                  <div className="mb-3 inline-flex rounded-2xl bg-emerald-500/10 p-3 text-emerald-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Fast actions</p>
                  <p className="mt-1 text-sm text-muted-foreground">Move from login to the management console in a click.</p>
                </div>
              </div>
            </div>

            <Button variant="ghost" className="mt-10 w-fit gap-2 px-0 text-muted-foreground hover:bg-transparent hover:text-primary" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Button>
          </div>

          <Card className="border-border/60 bg-card/90 shadow-lg backdrop-blur">
            <CardHeader className="space-y-3 border-b border-border/60 pb-6">
              <div className="inline-flex w-fit rounded-2xl bg-primary/10 p-3 text-primary">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-3xl">Administrator Sign In</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Use your admin credentials to continue.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Admin email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@playverse.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Password</label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter admin password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 text-muted-foreground">
                    <input type="checkbox" className="rounded border-border" />
                    Remember this device
                  </label>
                  <button type="button" className="font-medium text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <div className="space-y-3">
                  <Button type="submit" className="h-11 w-full gap-2 text-base">
                    Sign in to Admin Console
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full gap-2 text-base"
                    onClick={() => navigate("/login")}
                  >
                    Not an admin? Go to user login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;