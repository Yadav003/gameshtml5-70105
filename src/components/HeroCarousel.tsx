import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import rocketimage from "@/assets/2.jpg";
// import bikeimage from "@/assets/1.jpg";
// import gameFruitNinja from "@/assets/fruit_ninja.jpg"
import gameCar from "@/assets/carracing.jpg"
import gameHextris from "@/assets/hextris.jpg"
import game100meter from "@/assets/100meter.jpg"
import gameBarrier from "@/assets/barrier.png"

const slides = [
  {
    id: 1,
    title: "Auto Offroad",
    image: gameCar,
    gameId: "auto-offroad",
  },
  {
    id: 2,
    title: "Hextris",
    image: gameHextris,
    gameId: "hextris",
  },
  {
    id: 3,
    title: "100 Metres Race",
    image: game100meter,
    gameId: "100m-race",
  },
  {
    id: 4,
    title: "Dotch Barrier",
    image: gameBarrier,
    gameId: "barrier",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handlePlayGame = (gameId: string) => {
    navigate(`/play/${gameId}`, { state: { from: 'home' } });
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-background dark:via-background/50 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg text-white">
              {slide.title}
            </h1>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => handlePlayGame(slide.gameId)}
            >
              Let's Play
            </Button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
