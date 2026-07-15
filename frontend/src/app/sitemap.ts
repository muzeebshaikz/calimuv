import type { MetadataRoute } from "next";

import { navLinks, site } from "@/lib/site";

// Static-page sitemap. Dynamic trainer/program pages could be appended here
// by fetching their slugs at build time once the content is finalized.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...navLinks.map((l) => l.href), "/join"];
  return routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
