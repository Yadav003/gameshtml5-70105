import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpinRewardLabel } from "@/types/spin";

export type WheelReward = {
  label: SpinRewardLabel;
  points: number;
};

export const SPIN_REWARDS: WheelReward[] = [
  { label: "Try Again", points: 0 },
  { label: "5 Points", points: 5 },
  { label: "10 Points", points: 10 },
  { label: "20 Points", points: 20 },
  { label: "50 Points", points: 50 },
];

export const REWARD_TO_SLICE_INDEX: Record<SpinRewardLabel, number> = {
  "Try Again": 0,
  "5 Points": 1,
  "10 Points": 2,
  "20 Points": 3,
  "50 Points": 4,
};

const colors = [
  "hsl(var(--secondary))",
  "hsl(var(--primary))",
  "#16a34a",
  "#15803d",
  "#365314",
];
const animationMs = 5000;

type SpinWheelProps = {
  canSpin: boolean;
  spinning: boolean;
  selectedReward: SpinRewardLabel | null;
  statusMessage?: string;
  onSpin: () => void;
  onAnimationComplete: () => void;
};

const SpinWheel = ({
  canSpin,
  spinning,
  selectedReward,
  statusMessage,
  onSpin,
  onAnimationComplete,
}: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);

  const angleSize = 360 / SPIN_REWARDS.length;

  const selectedSliceIndex = useMemo(() => {
    if (!selectedReward) return null;
    return REWARD_TO_SLICE_INDEX[selectedReward] ?? null;
  }, [selectedReward]);

  useEffect(() => {
    if (selectedSliceIndex === null) return;

    setAnimationActive(true);
    setRotation((current) => {
      const currentRotation = current % 360;
      const targetAngle = 360 - selectedSliceIndex * angleSize - angleSize / 2;
      const normalizedTarget = ((targetAngle % 360) + 360) % 360;
      const delta = (normalizedTarget - currentRotation + 360) % 360;
      const minimumTurns = 6 * 360;

      return current + minimumTurns + delta;
    });

    const timeoutId = window.setTimeout(() => {
      setAnimationActive(false);
      onAnimationComplete();
    }, animationMs);

    return () => window.clearTimeout(timeoutId);
  }, [angleSize, onAnimationComplete, selectedSliceIndex]);

  const radius = 150;
  const center = 160;
  const disabled = !canSpin || spinning || animationActive;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-[320px] w-[320px] max-w-full sm:h-[360px] sm:w-[360px]">
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="h-0 w-0 border-l-[18px] border-r-[18px] border-t-[35px] border-l-transparent border-r-transparent border-t-primary" />
        </div>

        <div
          className="transition-transform ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${animationMs}ms`,
          }}
        >
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]"
            role="img"
            aria-label="Daily rewards spin wheel"
          >
            <circle cx={center} cy={center} r={155} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="8" />

            {SPIN_REWARDS.map((item, index) => {
              const startAngle = (index * angleSize - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * angleSize - 90) * (Math.PI / 180);
              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);
              const largeArcFlag = angleSize > 180 ? 1 : 0;
              const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              const textAngle = (index + 0.5) * angleSize - 90;
              const textX = center + 92 * Math.cos((textAngle * Math.PI) / 180);
              const textY = center + 92 * Math.sin((textAngle * Math.PI) / 180);

              return (
                <g key={item.label}>
                  <path d={pathData} fill={colors[index]} stroke="hsl(var(--background))" strokeWidth="2" />
                  <text
                    x={textX}
                    y={textY}
                    fill={index === 0 ? "hsl(var(--foreground))" : "white"}
                    fontSize="13"
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle + 90} ${textX} ${textY})`}
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            <circle cx={center} cy={center} r={38} fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="5" />
            <text x={center} y={center + 5} fill="hsl(var(--primary))" fontSize="13" fontWeight="800" textAnchor="middle">
              SPIN
            </text>
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={onSpin}
        disabled={disabled}
        className={cn(
          "mt-8 inline-flex min-h-12 min-w-40 items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          disabled && "cursor-not-allowed bg-muted text-muted-foreground shadow-none hover:bg-muted"
        )}
      >
        {spinning && <Loader2 className="h-5 w-5 animate-spin" />}
        {spinning ? "Spinning..." : "Spin Now"}
      </button>

      {statusMessage && (
        <p className="mt-4 max-w-sm text-center text-sm font-medium text-muted-foreground">{statusMessage}</p>
      )}
    </div>
  );
};

export default SpinWheel;