import type { ReactNode } from "react";

const SITE_URL = "https://playarena.co.in";
const SITE_LOGO = "https://playarena.co.in/favicon.svg";
const SITE_NAME = "PlayArena";
const SITE_DESCRIPTION =
  "PlayArena is a browser-based gaming platform offering free online games across action, puzzle, sports, racing, and casual genres.";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SchemaProps {
  type: "WebPage" | "CollectionPage" | "FAQPage" | "AboutPage" | "ContactPage" | "VideoGame" | "Organization" | "WebSite";
  data: Record<string, unknown>;
}

type JsonLdSchemaInput = Record<string, unknown> | Array<Record<string, unknown>>;

const buildSchemaScript = (schema: JsonLdSchemaInput) => ({
  __html: JSON.stringify(schema),
});

export const injectSchema = (schema: JsonLdSchemaInput) => {
  if (typeof document === "undefined") return null;

  const existing = document.querySelector('script[data-schema="playarena"]');
  if (existing) {
    existing.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", "playarena");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
  return script;
};

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: SITE_LOGO,
    width: 512,
    height: 512,
  },
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://www.instagram.com/official_playarena/",
    "https://www.youtube.com/@Playarena-web",
  ],
});

export const createWebsiteSchema = (url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${url}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const createWebPageSchema = (url: string, title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  url,
  name: title,
  description,
  inLanguage: "en",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createCollectionPageSchema = (url: string, title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url,
  name: title,
  description,
  inLanguage: "en",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createFaqPageSchema = (url: string, title: string, description: string, mainEntity: Array<Record<string, unknown>>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url,
  name: title,
  description,
  inLanguage: "en",
  mainEntity,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createAboutPageSchema = (url: string, title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url,
  name: title,
  description,
  inLanguage: "en",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createContactPageSchema = (url: string, title: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url,
  name: title,
  description,
  inLanguage: "en",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createVideoGameSchema = ({
  title,
  description,
  image,
  url,
  genre,
  operatingSystem = "Web Browser",
  applicationCategory = "Game",
  publisher = SITE_NAME,
  inLanguage = "en",
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  genre: string;
  operatingSystem?: string;
  applicationCategory?: string;
  publisher?: string;
  inLanguage?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: title,
  description,
  image: {
    "@type": "ImageObject",
    url: image,
  },
  genre,
  operatingSystem,
  applicationCategory,
  url,
  publisher: {
    "@type": "Organization",
    name: publisher,
  },
  inLanguage,
});

export const createImageObjectSchema = (url: string, alt: string) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  url,
  name: alt,
});

export const createSchemaComponent = (schema: Record<string, unknown>): ReactNode => {
  return null;
};
