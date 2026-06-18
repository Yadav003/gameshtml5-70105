import { DollarSign, Gamepad2, User, Heart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useState, useRef, useEffect } from "react";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on homepage, navigate to homepage with hash
      navigate(`/#${sectionId}`);
    } else {
      // If already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">PlayArena</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/games" className="text-foreground/80 hover:text-foreground transition-colors">
              GAMES
            </Link>
            <button 
              onClick={() => scrollToSection('trending')} 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              TRENDING
            </button>
            <button 
              onClick={() => scrollToSection('categories')} 
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              CATEGORIES
            </button>
            {/* <Link
              to="/premium-games"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              PREMIUM GAMES
            </Link> */}
            <Link
              to="/play-and-earn"
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              PLAY & EARN
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button
            asChild
            size="icon"
            className="md:hidden"
            aria-label="Play and earn"
          >
            <Link to="/play-and-earn">
              <DollarSign className="w-5 h-5" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={() => navigate('/favourites')}
          >
            <Heart className="w-5 h-5" />
          </Button>
          {/* Auth-aware area */}
          <AuthArea />
        </div>
      </div>
    </nav>
  );
};

const AuthArea = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/login')} className="px-3 py-2 rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90">Login</button>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((s) => !s)} className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-primary hover:text-primary-foreground">
        <User className="w-5 h-5" />
        <span className="hidden md:inline">{user.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg">
          <button onClick={() => { setOpen(false); navigate('/profile'); }} className="w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary hover:text-primary-foreground">Profile</button>
          {/* <button onClick={() => { setOpen(false); navigate('/update-password'); }} className="w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary hover:text-primary-foreground">Update password</button> */}
          <button onClick={() => { setOpen(false); logout(); }} className="w-full rounded-lg px-4 py-3 text-left transition-colors hover:bg-primary hover:text-primary-foreground">Logout</button>
        </div>
      )}
    </div>
  );
};
