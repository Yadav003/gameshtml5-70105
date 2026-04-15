export type LeaderboardPlayer = {
  rank: number;
  name: string;
  score: string;
};

export type LeaderboardGame = {
  id: string;
  title: string;
  subtitle: string;
  topPlayers: LeaderboardPlayer[];
};

export const leaderboardGames: LeaderboardGame[] = [
  {
    id: "snake-blitz",
    title: "Snake",
    subtitle: "Top high-score champions",
    topPlayers: [
      { rank: 1, name: "Avery", score: "24,500" },
      { rank: 2, name: "Mia", score: "23,100" },
      { rank: 3, name: "Leo", score: "20,900" },
    ],
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    subtitle: "Galaxy defenders with the highest kills",
    topPlayers: [
      { rank: 1, name: "Nova", score: "18,300" },
      { rank: 2, name: "Kai", score: "17,800" },
      { rank: 3, name: "Riley", score: "16,700" },
    ],
  },
  {
    id: "tetris-champ",
    title: "Tetris Champion",
    subtitle: "Players who cleared the most lines",
    topPlayers: [
      { rank: 1, name: "Jordan", score: "9,400" },
      { rank: 2, name: "Taylor", score: "9,100" },
      { rank: 3, name: "Sage", score: "8,800" },
    ],
  },
  {
    id: "100m-race",
    title: "100 Metres Race",
    subtitle: "Sprint racing game",
    topPlayers: [
      { rank: 1, name: "Ezra", score: "12,200" },
      { rank: 2, name: "Sam", score: "11,900" },
      { rank: 3, name: "Noah", score: "11,400" },
    ],
  },
];
