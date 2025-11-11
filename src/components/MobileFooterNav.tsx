import { Home, Gamepad2, Heart, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const MobileFooterNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="grid grid-cols-4 h-16">
        <NavLink 
          to="/" 
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink 
          to="/games" 
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-xs">Games</span>
        </NavLink>
        <NavLink 
          to="/favourites" 
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Favourites</span>
        </NavLink>
        <NavLink 
          to="/profile" 
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};