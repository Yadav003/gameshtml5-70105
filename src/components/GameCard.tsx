import { Card } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  image: string;
}

export const GameCard = ({ title, image }: GameCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 bg-card hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-primary font-semibold">Play Now</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
    </Card>
  );
};
