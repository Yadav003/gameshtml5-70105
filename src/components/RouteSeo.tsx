import type { ReactNode } from "react";
import { Seo } from "./Seo";
import { SchemaHelmet } from "./SchemaHelmet";
import { getSeoForRoute, type SeoRouteKey, type SeoPageData } from "@/lib/seoData";

interface RouteSeoProps {
  route?: SeoRouteKey;
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  children?: ReactNode;
}

export const RouteSeo = ({
  route = "home",
  title,
  description,
  canonical,
  keywords,
  robots,
  noindex,
  nofollow,
  schema,
  children,
}: RouteSeoProps) => {
  const meta: SeoPageData = getSeoForRoute(route);

  return (
    <>
      <Seo
        title={title || meta.title}
        description={description || meta.description}
        canonical={canonical || meta.canonical}
        keywords={keywords || meta.keywords}
        robots={robots || meta.robots}
        noindex={noindex ?? meta.robots?.includes("noindex")}
        nofollow={nofollow ?? meta.robots?.includes("nofollow")}
        type={meta.type}
      >
        {children}
      </Seo>
      {schema ? <SchemaHelmet schema={schema} /> : null}
    </>
  );
};
