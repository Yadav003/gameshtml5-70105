import { useEffect, useState } from "react";

const rewards = [
  { label: "5 Points", value: 5 },
  { label: "Try Again", value: 0 },
  { label: "10 Points", value: 10 },
  { label: "50 Points", value: 50 },
  { label: "Try Again", value: 0 },
  { label: "7 Points", value: 7 },
];

const redeemRewards = [
  {
    title: "Amazon Voucher",
    points: 100,
  },
  {
    title: "Steam Wallet",
    points: 200,
  },
  {
    title: "Gaming Coupon",
    points: 300,
  },
];

const colors = [
  "#22c55e",
  "#0f172a",
  "#16a34a",
  "#15803d",
  "#0f172a",
  "#4ade80",
];

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem("playarena_points");

    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  const updatePoints = (newPoints: number) => {
    setPoints(newPoints);
    localStorage.setItem("playarena_points", String(newPoints));
  };

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * rewards.length);

    const segmentAngle = 360 / rewards.length;

    const targetAngle =
      360 * 6 +
      (360 - randomIndex * segmentAngle - segmentAngle / 2);

    const newRotation = rotation + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      const wonReward = rewards[randomIndex];

      setReward(wonReward.label);

      if (wonReward.value > 0) {
        updatePoints(points + wonReward.value);
      }

      setSpinning(false);
    }, 5000);
  };

  const radius = 150;
  const center = 160;
  const angleSize = 360 / rewards.length;

  return (
    <div className="w-full">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Wheel Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
              <div className="h-0 w-0 border-l-[18px] border-r-[18px] border-t-[35px] border-l-transparent border-r-transparent border-t-lime-400" />
            </div>

            {/* Wheel */}
            <div
              className="transition-transform duration-[5000ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className="drop-shadow-[0_0_30px_rgba(34,197,94,0.35)]"
              >
                <circle
                  cx={center}
                  cy={center}
                  r={155}
                  fill="#0b0b0b"
                  stroke="white"
                  strokeWidth="8"
                />

                {rewards.map((item, index) => {
                  const startAngle =
                    (index * angleSize - 90) * (Math.PI / 180);

                  const endAngle =
                    ((index + 1) * angleSize - 90) *
                    (Math.PI / 180);

                  const x1 =
                    center +
                    radius * Math.cos(startAngle);

                  const y1 =
                    center +
                    radius * Math.sin(startAngle);

                  const x2 =
                    center +
                    radius * Math.cos(endAngle);

                  const y2 =
                    center +
                    radius * Math.sin(endAngle);

                  const largeArcFlag =
                    angleSize > 180 ? 1 : 0;

                  const pathData = `
                    M ${center} ${center}
                    L ${x1} ${y1}
                    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                    Z
                  `;

                  const textAngle =
                    (index + 0.5) * angleSize - 90;

                  const textX =
                    center +
                    95 *
                      Math.cos(
                        (textAngle * Math.PI) / 180
                      );

                  const textY =
                    center +
                    95 *
                      Math.sin(
                        (textAngle * Math.PI) / 180
                      );

                  return (
                    <g key={index}>
                      <path
                        d={pathData}
                        fill={colors[index]}
                        stroke="#111"
                        strokeWidth="2"
                      />

                      <text
                        x={textX}
                        y={textY}
                        fill="white"
                        fontSize="13"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {item.label}
                      </text>
                    </g>
                  );
                })}

                {/* Center Circle */}
                <circle
                  cx={center}
                  cy={center}
                  r={35}
                  fill="#111"
                  stroke="#22c55e"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={spinWheel}
            disabled={spinning}
            className="mt-8 rounded-xl bg-lime-500 px-8 py-3 font-bold text-black transition hover:bg-lime-400 disabled:opacity-50"
          >
            {spinning ? "Spinning..." : "Spin Now"}
          </button>

          {reward && (
            <div className="mt-5 rounded-xl border border-lime-500/30 bg-zinc-900 px-6 py-3">
              <p className="font-bold text-white">
                🎉 You Won: {reward}
              </p>
            </div>
          )}
        </div>

        {/* Points Card */}
        <div className="h-fit rounded-2xl border border-lime-500/20 bg-zinc-900 p-6">
          <h3 className="text-lg font-bold text-white">
            Reward Wallet
          </h3>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Total Points
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-lime-400">
              {points}
            </h2>

            <p className="mt-4 text-sm text-gray-400">
              Earn more by spinning daily
            </p>
          </div>
        </div>
      </div>

      {/* Redeem Rewards */}
      <div className="mt-16">
        <h2 className="text-center text-3xl font-bold text-white">
          Redeem Rewards
        </h2>

        <p className="mt-2 text-center text-gray-400">
          Use your points to unlock exciting coupons
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {redeemRewards.map((rewardItem) => (
            <div
              key={rewardItem.title}
              className="rounded-2xl border border-white/10 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-bold text-white">
                {rewardItem.title}
              </h3>

              <p className="mt-3 text-lime-400 font-semibold">
                {rewardItem.points} Points
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  disabled={points < rewardItem.points}
                  className="rounded-lg bg-lime-500 px-5 py-2 font-semibold text-black disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {points >= rewardItem.points
                    ? "Redeem"
                    : `Need ${rewardItem.points}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;