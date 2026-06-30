import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://playarena.co.in";
const DEFAULT_TITLE = "PlayArena | Free Online Games";
const DEFAULT_DESCRIPTION =
  "Play free online games instantly in your browser. Explore action, puzzle, sports, and casual games with no download required.";
const DEFAULT_KEYWORDS =
  "free online games, browser games, HTML5 games, casual games, puzzle games, action games, sports games";
const DEFAULT_IMAGE = "https://playarena.co.in/placeholder.svg";

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  robots?: string;
  lang?: string;
  themeColor?: string;
  image?: string;
  type?: string;
  siteName?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
  children?: ReactNode;
}

const buildRobots = (noindex?: boolean, nofollow?: boolean) => {
  const directives = [noindex ? "noindex" : "index", nofollow ? "nofollow" : "follow"];
  return directives.join(", ");
};

export const Seo = ({
  title,
  description,
  canonical,
  keywords,
  robots,
  lang = "en",
  themeColor = "#0f172a",
  image = DEFAULT_IMAGE,
  type = "website",
  siteName = "PlayArena",
  twitterCard = "summary_large_image",
  twitterSite = "@PlayArena",
  twitterCreator = "@PlayArena",
  locale = "en_US",
  noindex,
  nofollow,
  children,
}: SeoProps) => {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const resolvedCanonical = canonical || SITE_URL;
  const resolvedRobots = robots || buildRobots(noindex, nofollow);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      <meta name="robots" content={resolvedRobots} />
      <meta name="googlebot" content={resolvedRobots} />
      <meta name="theme-color" content={themeColor} />
      <meta name="color-scheme" content="dark light" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={resolvedCanonical} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />

      {children}
    </Helmet>
  );
};
