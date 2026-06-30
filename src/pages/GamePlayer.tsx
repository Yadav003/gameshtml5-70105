import { useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getGameById } from "@/lib/gameConfig";
import { trackGamePlay } from "@/lib/analytics";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { RouteSeo } from "@/components/RouteSeo";
import {
  createBreadcrumbSchema,
  createImageObjectSchema,
  createVideoGameSchema,
  createWebPageSchema,
} from "@/lib/schema";

const GamePlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const notifiedRef = useRef(false);

  // Get game configuration
  const game = gameId ? getGameById(gameId) : null;
  const requiresLogin = game?.Toplay === "Login-Required";

  // Helper function to get category as string
  const getCategoryString = (category?: string | string[]): string => {
    if (!category) return 'Uncategorized';
    return Array.isArray(category) ? category[0] : category;
  };

  useEffect(() => {
    if (!game || !requiresLogin) {
      notifiedRef.current = false;
      return;
    }

    if (user) {
      notifiedRef.current = false;
      return;
    }

    if (notifiedRef.current) return;
    notifiedRef.current = true;

    toast({
      title: "Login required",
      description: "Please sign in to play this game.",
      duration: 10000,
    });
    navigate("/login", {
      replace: true,
      state: { from: location, redirectTo: `/play/${gameId}` },
    });
  }, [game, requiresLogin, user, toast, navigate, location, gameId]);

  useEffect(() => {
    if (!game || (requiresLogin && !user)) {
      return;
    }

    // Track game play in Google Analytics
    if (game) {
      trackGamePlay(game.id, game.title, getCategoryString(game.category));
    }

    // Set full screen for better gaming experience
    document.body.style.overflow = "hidden";
    
    // Prevent zoom on mobile devices
    const viewport = document.querySelector('meta[name="viewport"]');
    const originalContent = viewport?.getAttribute('content');
    
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Prevent pinch zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // Prevent double tap zoom
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    
    return () => {
      document.body.style.overflow = "auto";
      if (viewport && originalContent) {
        viewport.setAttribute('content', originalContent);
      }
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, [game, requiresLogin, user]);

  // Determine where to navigate back to
  const getBackUrl = () => {
    // Check if there's a referrer state passed from navigation
    const state = location.state as { from?: string; category?: string } | null;
    
    if (state?.category) {
      // If category was passed, go back to that category in /games
      return `/games?category=${state.category}`;
    } else if (state?.from === 'games') {
      // If coming from games page, go back to games
      return '/games';
    } else if (state?.from === 'favourites') {
      // If coming from favourites, go back to favourites
      return '/favourites';
    } else if (state?.from === 'home') {
      // If coming from home, go back to home with scroll to categories
      return '/#categories';
    }
    
    // Check if the game has a category and navigate to that category
    if (game?.category) {
      return `/games?category=${getCategoryString(game.category)}`;
    }
    
    // Default fallback to home
    return '/';
  };

  const handleBack = () => {
    navigate(getBackUrl());
  };

  // If game not found, show error
  if (!game || !game.path) {
    return (
      <>
        <RouteSeo route="notFound" />
        <div className="fixed inset-0 bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The game you're looking for doesn't exist or is not yet available.
            </p>
            <Button onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <RouteSeo
        route="home"
        title={`${game.title} | Play Free Online Game | PlayArena`}
        description={`Play ${game.title} online for free in your browser. ${game.description || "Enjoy this exciting HTML5 game instantly with no download required."}`}
        canonical={`${window.location.origin}/play/${game.id}`}
        keywords={`play ${game.title}, ${game.title} online, free ${game.title}, browser game, html5 game`}
        schema={[
          createVideoGameSchema({
            title: game.title,
            description: game.description || `Play ${game.title} online for free in your browser.`,
            image: game.image,
            url: `${window.location.origin}/play/${game.id}`,
            genre: Array.isArray(game.category) ? game.category.join(", ") : game.category || "Game",
            operatingSystem: "Web Browser",
            applicationCategory: "Game",
            publisher: "PlayArena",
          }),
          createWebPageSchema(`${window.location.origin}/play/${game.id}`, `${game.title} | Play Free Online Game | PlayArena`, `Play ${game.title} online for free in your browser.`),
          createBreadcrumbSchema([
            { name: "Home", url: "https://playarena.co.in/" },
            { name: "Games", url: "https://playarena.co.in/games" },
            { name: game.title, url: `${window.location.origin}/play/${game.id}` },
          ]),
          createImageObjectSchema(game.image, game.title),
        ]}
      />
      <div className="fixed inset-0 bg-black touch-none">
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
        <iframe
          src={game.path}
          className="w-full h-full border-0"
          title={game.title}
          allowFullScreen
          allow="accelerometer; gyroscope"
          style={{ touchAction: 'none' }}
        />
      </div>
    </>
  );
};

export default GamePlayer;
