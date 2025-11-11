import { Gamepad2, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">OvalPlay</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#games" className="text-foreground/80 hover:text-foreground transition-colors">
              GAMES
            </a>
            <a href="#trending" className="text-foreground/80 hover:text-foreground transition-colors">
              TRENDING
            </a>
            <a href="#categories" className="text-foreground/80 hover:text-foreground transition-colors">
              CATEGORIES
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
