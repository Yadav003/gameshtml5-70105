const SITE_URL = "https://playarena.co.in";

export interface SeoPageData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  type: string;
  robots?: string;
}

export const seoPages: Record<string, SeoPageData> = {
  home: {
    title: "PlayArena | Free Online Games | Play Browser Games Instantly",
    description:
      "Play free online games instantly in your browser. Explore action, puzzle, sports, and casual games with no download required.",
    keywords:
      "free online games, browser games, html5 games, casual games, puzzle games, action games, sports games",
    canonical: `${SITE_URL}/`,
    type: "website",
  },
  games: {
    title: "Play Free Games Online | PlayArena Game Library",
    description:
      "Browse the PlayArena game library with free online games across puzzle, arcade, racing, sports, and casual categories.",
    keywords:
      "free online games, play games online, game library, browser games, html5 games",
    canonical: `${SITE_URL}/games`,
    type: "website",
  },
  leaderboard: {
    title: "Game Leaderboard | Top Players and High Scores",
    description:
      "Check the latest PlayArena leaderboard, high scores, and top players across featured browser games.",
    keywords: "game leaderboard, high scores, top players, browser game rankings",
    canonical: `${SITE_URL}/leaderboard`,
    type: "website",
  },
  favourites: {
    title: "My Favourite Games | PlayArena",
    description: "Access your saved favourite games and jump back into the titles you love on PlayArena.",
    keywords: "favorite games, saved games, play arena favourites",
    canonical: `${SITE_URL}/favourites`,
    type: "website",
  },
  profile: {
    title: "My Profile | PlayArena",
    description: "Manage your PlayArena profile, game history, and achievements in one place.",
    keywords: "player profile, game history, achievements, playarena profile",
    canonical: `${SITE_URL}/profile`,
    type: "website",
    robots: "noindex, nofollow",
  },
  helpCenter: {
    title: "Help Center | PlayArena Support",
    description: "Find answers to common questions, technical help, and account support for PlayArena.",
    keywords: "playarena help, support, gaming help, faq, contact support",
    canonical: `${SITE_URL}/help-center`,
    type: "website",
  },
  contactUs: {
    title: "Contact PlayArena | Support and Feedback",
    description: "Get in touch with the PlayArena team for support, feedback, or general questions.",
    keywords: "contact playarena, support, feedback, help",
    canonical: `${SITE_URL}/contact-us`,
    type: "website",
  },
  faq: {
    title: "PlayArena FAQ | Common Questions and Answers",
    description: "Read the PlayArena FAQ for answers about playing games, accounts, and platform features.",
    keywords: "playarena faq, gaming faq, common questions",
    canonical: `${SITE_URL}/faq`,
    type: "website",
  },
  privacyPolicy: {
    title: "Privacy Policy | PlayArena",
    description: "Review the PlayArena privacy policy and understand how your data is handled.",
    keywords: "privacy policy, data protection, playarena privacy",
    canonical: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
  termsConditions: {
    title: "Terms and Conditions | PlayArena",
    description: "Review the PlayArena terms and conditions for using the website and its services.",
    keywords: "terms and conditions, playarena terms, user agreement",
    canonical: `${SITE_URL}/terms-conditions`,
    type: "website",
  },
  aboutUs: {
    title: "About PlayArena | Free Online Game Platform",
    description: "Learn about PlayArena, our mission, and the free online gaming experience we offer.",
    keywords: "about playarena, online gaming platform, free games website",
    canonical: `${SITE_URL}/about-us`,
    type: "website",
  },
  cookiePolicy: {
    title: "Cookie Policy | PlayArena",
    description: "Learn how PlayArena uses cookies and manages your privacy choices.",
    keywords: "cookie policy, playarena cookies, privacy preferences",
    canonical: `${SITE_URL}/cookie-policy`,
    type: "website",
  },
  premiumGames: {
    title: "Premium Games | PlayArena",
    description: "Discover premium gaming experiences and exclusive content available on PlayArena.",
    keywords: "premium games, exclusive games, playarena premium",
    canonical: `${SITE_URL}/premium-games`,
    type: "website",
  },
  spinWheel: {
    title: "Spin the Wheel | PlayArena Rewards",
    description: "Spin the PlayArena wheel to unlock rewards, bonuses, and exciting in-game opportunities.",
    keywords: "spin wheel, rewards, playarena rewards, bonus spins",
    canonical: `${SITE_URL}/spin-wheel`,
    type: "website",
  },
  redeem: {
    title: "Redeem Rewards | PlayArena",
    description: "Redeem your PlayArena rewards and claim the prizes you have earned.",
    keywords: "redeem rewards, playarena rewards, claim prizes",
    canonical: `${SITE_URL}/redeem`,
    type: "website",
    robots: "noindex, nofollow",
  },
  adminDashboard: {
    title: "Admin Dashboard | PlayArena",
    description: "Administrative dashboard for managing content, users, and platform settings.",
    keywords: "admin dashboard, playarena admin",
    canonical: `${SITE_URL}/admin/dashboard`,
    type: "website",
    robots: "noindex, nofollow",
  },
  adminUsers: {
    title: "User Management | PlayArena",
    description: "Manage user accounts and platform access from the PlayArena admin area.",
    keywords: "user management, admin users, playarena admin",
    canonical: `${SITE_URL}/admin/user-management`,
    type: "website",
    robots: "noindex, nofollow",
  },
  adminAds: {
    title: "Ad Management | PlayArena",
    description: "Manage advertising settings and campaigns from the PlayArena admin panel.",
    keywords: "ad management, admin ads, playarena ads",
    canonical: `${SITE_URL}/admin/ads-management`,
    type: "website",
    robots: "noindex, nofollow",
  },
  adminReports: {
    title: "Reports | PlayArena",
    description: "Review analytics and performance reports from the PlayArena admin dashboard.",
    keywords: "playarena reports, admin analytics",
    canonical: `${SITE_URL}/admin/reports`,
    type: "website",
        
  },
  adminRewards: {
    title: "Reward Redemptions | PlayArena",
    description: "Manage reward redemptions and player prizes in the PlayArena admin area.",
    keywords: "reward redemptions, playarena rewards",
    canonical: `${SITE_URL}/admin/reward-redemptions`,
    type: "website",
    robots: "noindex, nofollow",
  },
  login: {
    title: "Login | PlayArena",
    description: "Sign in to PlayArena and continue playing your favorite browser games.",
    keywords: "playarena login, sign in, account access",
    canonical: `${SITE_URL}/login`,
    type: "website",
    robots: "noindex, nofollow",
  },
  resetPassword: {
    title: "Reset Password | PlayArena",
    description: "Reset your PlayArena password and regain access to your account.",
    keywords: "reset password, playarena password reset",
    canonical: `${SITE_URL}/reset-password`,
    type: "website",
    robots: "noindex, nofollow",
  },
  updatePassword: {
    title: "Update Password | PlayArena",
    description: "Update your PlayArena password and keep your account secure.",
    keywords: "update password, playarena password update",
    canonical: `${SITE_URL}/update-password`,
    type: "website",
    robots: "noindex, nofollow",
  },
  oauthCallback: {
    title: "Authentication | PlayArena",
    description: "Complete your PlayArena authentication securely.",
    keywords: "oauth, authentication, playarena login",
    canonical: `${SITE_URL}/oauth/callback`,
    type: "website",
    robots: "noindex, nofollow",
  },
  notFound: {
    title: "Page Not Found | PlayArena",
    description: "The requested page could not be found. Return to PlayArena and discover more free games.",
    keywords: "404, page not found, playarena",
    canonical: `${SITE_URL}/404`,
    type: "website",
    robots: "noindex, follow",
  },
};

export type SeoRouteKey = keyof typeof seoPages;

export const getSeoForRoute = (route: SeoRouteKey): SeoPageData => seoPages[route];
