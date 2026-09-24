import type { MetadataRoute } from "next";
import { FACTORY_INFO } from "@/data/factoryData";
export default function robots(): MetadataRoute.Robots {
  return FACTORY_INFO.siteUrl
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${FACTORY_INFO.siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
