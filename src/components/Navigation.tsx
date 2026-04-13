import { Gamepad2, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            <span className="text-xl font-bold">PlayVerse</span>
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
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={() => navigate('/favourites')}
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex"
            onClick={() => navigate('/profile')}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
