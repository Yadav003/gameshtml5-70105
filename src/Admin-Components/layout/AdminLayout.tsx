import { type ReactNode, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi } from "@/lib/api";

type AdminLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/user-management", label: "User Management", icon: Users },
];

const activeClass = "bg-primary/10 text-primary border-primary/20";

const AdminLayout = ({ title, subtitle, children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await adminApi.logout();
      navigate("/admin/login");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Unable to sign out right now.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto grid min-h-screen max-w-[1400px] md:grid-cols-[250px_1fr]">
        <aside className="border-r border-border bg-background px-4 py-5">
          <Link to="/admin/dashboard" className="mb-8 flex items-center gap-3 rounded-lg px-2 py-1">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <img src="/favicon.svg" alt="Playverse Logo" className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold leading-none">PlayVerse Admin</p>
              <p className="mt-1 text-xs text-muted-foreground">Control Panel</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? activeClass
                        : "border-transparent text-foreground/80 hover:border-border hover:bg-muted/50"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-border pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </aside>

        <main className="px-4 py-6 md:px-6 lg:px-8">
          <header className="mb-5 rounded-xl border border-border bg-background px-4 py-4 shadow-sm">
            <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
          </header>

          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;