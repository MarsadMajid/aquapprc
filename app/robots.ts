import type { MetadataRoute } from "next";
import { FACTORY_INFO } from "@/data/factoryData";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = FACTORY_INFO.siteUrl || "https://aquapprc.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "PerplexityBot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Google-Extended",
          "Ccbot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
