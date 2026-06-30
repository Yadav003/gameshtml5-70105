/**
 * SEO Configuration File
 * Centralized location for all SEO-related tasks including:
 * - Page titles with targeted keywords
 * - Meta descriptions
 * - Keywords and tags
 * - Open Graph tags
 * - Schema markup recommendations
 * - Canonical URLs
 */

// ============================================
// PAGE METADATA & KEYWORDS
// ============================================

export const seoConfig = {
  // HOMEPAGE
  home: {
    title: "Free Online Games | Play 100+ HTML5 Games | Gaming Hub",
    metaDescription:
      "Play 100+ free online games instantly. No download required. HTML5 games including puzzle, action, sports, and adventure games. Play now!",
    keywords:
      "free online games, play games online, HTML5 games, browser games, online gaming, casual games, puzzle games, action games",
    ogTitle: "Free Online Games Hub - Play Now",
    ogDescription: "Discover and play hundreds of free online games instantly.",
    canonicalUrl: "https://playarena.co.in",
  },

  // GAMES LISTING PAGE
  games: {
    title: "Online Games Library | 100+ Free HTML5 Games to Play",
    metaDescription:
      "Browse our collection of 100+ free online games. Find puzzle, action, sports, adventure, and casual games. Start playing today!",
    keywords:
      "online games, free games, browser games, play games online, game library, HTML5 games, casual gaming",
    ogTitle: "Browse 100+ Free Online Games",
    ogDescription: "Explore our extensive collection of free HTML5 games.",
    canonicalUrl: "https://playarena.co.in/games",
  },

  // GAME PLAYER PAGE (Dynamic)
  gamePlayer: {
    titleTemplate: "Play {gameName} Online Free | Instant Browser Gaming",
    metaDescriptionTemplate:
      "Play {gameName} online for free. No download needed. {gameDescription} Start playing instantly in your browser!",
    keywordsTemplate:
      "play {gameName}, {gameName} online, free {gameName} game, {gameCategory} game, browser game",
    ogTitleTemplate: "Play {gameName} - Free Online Game",
    ogDescriptionTemplate:
      "Join thousands playing {gameName} online. Play now for free!",
  },

  // LEADERBOARD PAGE
  leaderboard: {
    title: "Game Leaderboard | Top Players & High Scores | Gaming Rankings",
    metaDescription:
      "Check out the global leaderboard. See top players and high scores across all games. Compete and climb the rankings!",
    keywords:
      "game leaderboard, high scores, top players, gaming rankings, leaderboard, game scores, competitive gaming",
    ogTitle: "Global Game Leaderboard",
    ogDescription: "View top players and compete on the global leaderboard.",
    canonicalUrl: "https://playarena.co.in/leaderboard",
  },

  // PROFILE PAGE
  profile: {
    title: "My Gaming Profile | Game Statistics & Achievements",
    metaDescription:
      "View your gaming profile, statistics, achievements, and high scores. Track your gaming progress and compete with other players.",
    keywords:
      "gaming profile, game statistics, achievements, high scores, gaming history, player profile",
    ogTitle: "My Gaming Profile",
    ogDescription: "View your gaming statistics and achievements.",
  },

  // FAVORITES PAGE
  favorites: {
    title: "My Favorite Games | Saved Games Library",
    metaDescription:
      "Access your favorite games and bookmarked titles. Quickly play your most loved games.",
    keywords:
      "favorite games, saved games, bookmarked games, my games, game library",
    ogTitle: "My Favorite Games",
    ogDescription: "Quick access to your favorite games.",
  },

  // ABOUT US PAGE
  aboutUs: {
    title: "About Us | Free Online Gaming Platform | Our Mission",
    metaDescription:
      "Learn about our free online gaming platform. Discover our mission to bring quality games to everyone. Play, compete, and have fun!",
    keywords:
      "about us, gaming platform, online gaming, game website, free games, gaming community",
    ogTitle: "About Our Gaming Platform",
    ogDescription: "Discover the story behind our free online gaming platform.",
    canonicalUrl: "https://playarena.co.in/about-us",
  },

  // CONTACT US PAGE
  contactUs: {
    title: "Contact Us | Get in Touch | Support & Feedback",
    metaDescription:
      "Have questions or feedback? Contact our support team. We're here to help. Send us a message today!",
    keywords:
      "contact us, support, feedback, help, customer service, contact form, get in touch",
    ogTitle: "Contact Us - Gaming Support",
    ogDescription: "Get in touch with our support team.",
    canonicalUrl: "https://playarena.co.in/contact-us",
  },

  // FAQ PAGE
  faq: {
    title: "FAQs | Frequently Asked Questions | Help & Support",
    metaDescription:
      "Find answers to common questions about our gaming platform. Learn how to play, account management, technical support, and more.",
    keywords:
      "FAQ, frequently asked questions, help, support, how to play, troubleshooting, gaming help",
    ogTitle: "Frequently Asked Questions",
    ogDescription: "Find answers to your questions about our gaming platform.",
    canonicalUrl: "https://playarena.co.in/faq",
  },

  // HELP CENTER PAGE
  helpCenter: {
    title: "Help Center | Gaming Support & Documentation",
    metaDescription:
      "Browse our help center for tutorials, guides, and support documentation. Get answers and learn how to use our gaming platform.",
    keywords:
      "help center, support, documentation, tutorials, guides, how-to, gaming help",
    ogTitle: "Help Center & Support",
    ogDescription: "Find help and support for our gaming platform.",
    canonicalUrl: "https://playarena.co.in/help-center",
  },

  // PRIVACY POLICY PAGE
  privacyPolicy: {
    title: "Privacy Policy | Your Data Protection | Gaming Platform",
    metaDescription:
      "Read our privacy policy to understand how we protect your data and personal information on our gaming platform.",
    keywords:
      "privacy policy, data protection, personal information, privacy, data security",
    ogTitle: "Privacy Policy",
    ogDescription: "Review our privacy policy and data protection practices.",
    canonicalUrl: "https://playarena.co.in/privacy-policy",
  },

  // TERMS & CONDITIONS PAGE
  termsConditions: {
    title: "Terms & Conditions | User Agreement | Gaming Platform",
    metaDescription:
      "Read our terms and conditions for using our gaming platform. Understand your rights and responsibilities as a user.",
    keywords:
      "terms and conditions, user agreement, legal, user agreement",
    ogTitle: "Terms & Conditions",
    ogDescription: "Review our terms and conditions for platform usage.",
    canonicalUrl: "https://playarena.co.in/terms-conditions",
  },

  // COOKIE POLICY PAGE
  cookiePolicy: {
    title: "Cookie Policy | How We Use Cookies | Gaming Platform",
    metaDescription:
      "Learn how we use cookies on our gaming platform. Understand cookie preferences and data collection practices.",
    keywords:
      "cookie policy, cookies, data collection, privacy, cookie preferences",
    ogTitle: "Cookie Policy",
    ogDescription: "Review our cookie policy and preferences.",
    canonicalUrl: "https://playarena.co.in/cookie-policy",
  },

  // SUBSCRIPTION/PRICING PAGE
  subscriptionPlans: {
    title: "Premium Membership Plans | Unlock More Games | Affordable Gaming",
    metaDescription:
      "Explore our premium membership plans. Unlock exclusive games, remove ads, and get premium features. Affordable gaming at its best!",
    keywords:
      "subscription plans, premium membership, pricing, premium games, ad-free gaming, exclusive games",
    ogTitle: "Premium Membership Plans",
    ogDescription: "Unlock more games with our affordable premium plans.",
    canonicalUrl: "https://playarena.co.in/premium-games",
  },
};

// ============================================
// GAME CATEGORIES & KEYWORDS
// ============================================

export const gameCategoryKeywords = {
  puzzle: {
    title: "Free Puzzle Games Online | Brain Teasers & Brain Games",
    keywords:
      "puzzle games, brain teasers, brain games, logic games, matching games, tile games",
    description:
      "Play challenging puzzle games online. Improve your brain with our collection of free puzzle and brain teaser games.",
  },
  action: {
    title: "Action Games Online | Play Free Action Games Now",
    keywords:
      "action games, shooting games, adventure games, fast-paced games, arcade games",
    description:
      "Experience thrilling action games. Fight, shoot, and conquer in our collection of free online action games.",
  },
  sports: {
    title: "Free Sports Games Online | Play Football, Basketball & More",
    keywords:
      "sports games, football games, basketball games, racing games, sports simulation",
    description:
      "Play your favorite sports games online. From football to basketball, enjoy realistic sports gaming.",
  },
  adventure: {
    title: "Adventure Games Online | Epic Quest & Story Games",
    keywords:
      "adventure games, quest games, RPG games, story games, exploration games",
    description:
      "Embark on epic adventures. Explore, quest, and discover in our collection of free adventure games.",
  },
  casual: {
    title: "Casual Games Online | Relaxing & Fun Games to Play",
    keywords:
      "casual games, relaxing games, fun games, simple games, browser games",
    description:
      "Enjoy casual gaming fun. Play relaxing and simple games perfect for any mood.",
  },
};

// ============================================
// GAME-SPECIFIC OPTIMIZATION TEMPLATE
// ============================================

export const gameOptimizationTemplate = {
  // Example: Use this template for each game
  // gameId: "2048",
  titleTemplate: "{gameName} - Free Online Game | Play Now",
  descriptionTemplate:
    "Play {gameName} online for free. {fullDescription} Enjoy this {category} game instantly in your browser. No download needed!",
  keywordsTemplate:
    "play {gameName}, {gameName} game, free {gameName}, {gameName} online, {category} game",
  altTextTemplate: "Screenshot of {gameName} gameplay",
};

// ============================================
// META TAGS & STRUCTURED DATA
// ============================================

export const defaultMetaTags = [
  {
    name: "viewport",
    content: "width=device-width, initial-scale=1, maximum-scale=5",
  },
  {
    name: "theme-color",
    content: "#000000",
  },
  {
    httpEquiv: "X-UA-Compatible",
    content: "ie=edge",
  },
  {
    name: "format-detection",
    content: "telephone=no",
  },
];

// ============================================
// STRUCTURED DATA (Schema.org JSON-LD)
// ============================================

export const structuredDataSchemas = {
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gaming Hub",
    url: "https://yourdomain.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yourdomain.com/games?search={search_term_string}",
      },
      query: "required name=search_term_string",
    },
  },

  gameItem: {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "{gameName}",
    description: "{gameDescription}",
    genre: "{category}",
    url: "https://yourdomain.com/game/{gameId}",
    image: "https://yourdomain.com/assets/games/{gameId}/thumbnail.jpg",
    playMode: "SinglePlayer",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gaming Hub",
    url: "https://yourdomain.com",
    logo: "https://yourdomain.com/assets/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@yourdomain.com",
    },
    sameAs: [
      "https://www.facebook.com/yourgaming",
      "https://twitter.com/yourgaming",
      "https://instagram.com/yourgaming",
    ],
  },

  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the games free to play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all games on our platform are completely free to play.",
        },
      },
    ],
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourdomain.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Games",
        item: "https://yourdomain.com/games",
      },
    ],
  },
};

// ============================================
// SEO BEST PRACTICES & CHECKLIST
// ============================================

export const seoChecklist = {
  onPage: [
    "✓ Include primary keyword in title (first 60 characters)",
    "✓ Add secondary keywords to title naturally",
    "✓ Meta description between 150-160 characters",
    "✓ Include CTA in meta description",
    "✓ H1 tag should match or relate to main title",
    "✓ Use H2, H3 tags for content structure",
    "✓ Internal linking with relevant anchor text",
    "✓ Image alt text describing content",
    "✓ Mobile responsive design",
    "✓ Page load speed optimization",
    "✓ Schema markup implementation",
  ],
  technical: [
    "✓ XML sitemap.xml created and submitted",
    "✓ robots.txt configured properly",
    "✓ HTTPS/SSL certificate installed",
    "✓ Canonical URLs set correctly",
    "✓ Structured data (JSON-LD) implemented",
    "✓ Open Graph tags for social sharing",
    "✓ Twitter Card tags added",
    "✓ Mobile-first indexing optimized",
    "✓ 404 error page configured",
    "✓ Redirects (301) setup for old URLs",
  ],
  content: [
    "✓ Unique content for each page",
    "✓ Keyword research completed",
    "✓ Long-tail keywords included",
    "✓ Content length adequate (min 300 words)",
    "✓ Natural keyword placement (2-3% density)",
    "✓ Fresh content updates scheduled",
    "✓ Content readability improved",
    "✓ External links to authoritative sources",
    "✓ Content formatted for quick scanning",
  ],
  linkBuilding: [
    "✓ Internal linking strategy established",
    "✓ Backlink profile analysis",
    "✓ Guest posting opportunities identified",
    "✓ Directory submissions completed",
    "✓ Social media links added",
    "✓ Brand mentions monitored",
  ],
};

// ============================================
// KEYWORD RESEARCH DATA
// ============================================

export const keywordResearch = {
  primaryKeywords: [
    "free online games",
    "play games online",
    "browser games",
    "HTML5 games",
    "casual games",
  ],
  longTailKeywords: [
    "free online games no download",
    "best free browser games",
    "HTML5 games to play online",
    "casual games for relaxation",
    "quick online games to play",
  ],
  locationKeywords: [
    // Add if you have regional targeting
    // "online games in [location]"
  ],
  competitorAnalysis: {
    // Add competitor domains and their ranking keywords
    // This helps identify opportunities
  },
};

// ============================================
// FUNCTION: Apply SEO Config to a Page
// ============================================

export const applySEOConfig = (
  pageName: keyof typeof seoConfig
): (typeof seoConfig)[keyof typeof seoConfig] => {
  return seoConfig[pageName];
};

// ============================================
// FUNCTION: Generate Dynamic Game Title
// ============================================

export const generateGameTitle = (
  gameName: string,
  category?: string
): string => {
  return `Play ${gameName} Online Free | Instant Browser Gaming${
    category ? ` | ${category}` : ""
  }`;
};

// ============================================
// FUNCTION: Generate Dynamic Meta Description
// ============================================

export const generateGameDescription = (
  gameName: string,
  shortDescription: string,
  category?: string
): string => {
  return `Play ${gameName} online for free. ${shortDescription} Start playing instantly in your browser! ${
    category ? `Popular ${category} game.` : ""
  }`;
};

// ============================================
// TRACKING & ANALYTICS RECOMMENDATIONS
// ============================================

export const analyticsRecommendations = {
  googleAnalytics: [
    "Track page views and bounce rates",
    "Monitor user engagement by game",
    "Track conversion goals (if applicable)",
    "Monitor organic search traffic",
    "Track user flow through site",
  ],
  googleSearchConsole: [
    "Submit sitemap.xml",
    "Monitor search impressions and CTR",
    "Track core web vitals",
    "Check for indexing issues",
    "Monitor keyword rankings",
  ],
  customTracking: [
    "Track game plays by source",
    "Monitor game popularity",
    "Track user retention rates",
    "Monitor leaderboard activity",
  ],
};

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

export const performanceOptimization = {
  imageOptimization: [
    "Compress all images (WebP format preferred)",
    "Use responsive images (srcset)",
    "Add lazy loading to images",
    "Optimize thumbnail sizes",
  ],
  caching: [
    "Enable browser caching",
    "Implement service worker caching",
    "Use CDN for static assets",
    "Cache API responses",
  ],
  codeOptimization: [
    "Minify CSS and JavaScript",
    "Remove unused CSS/JS",
    "Implement code splitting",
    "Defer non-critical JavaScript",
  ],
  coreWebVitals: [
    "LCP (Largest Contentful Paint) < 2.5s",
    "FID (First Input Delay) < 100ms",
    "CLS (Cumulative Layout Shift) < 0.1",
  ],
};

export default seoConfig;
