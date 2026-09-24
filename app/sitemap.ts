import type { MetadataRoute } from "next";
import { FACTORY_INFO, FACTORY_PRODUCTS } from "@/data/factoryData";
import { LOCATIONS } from "@/data/locations";
export default function sitemap(): MetadataRoute.Sitemap {
  return FACTORY_INFO.siteUrl
    ? [
        "",
        "/products",
        "/compare",
        "/product-finder",
        "/factory",
        "/technical",
        "/dealership",
        "/locations",
        "/quote",
        ...FACTORY_PRODUCTS.map((p) => `/products/${p.slug}`),
        ...LOCATIONS.map((l) => `/locations/${l.slug}`),
      ].map((path) => ({
        url: `${FACTORY_INFO.siteUrl}${path}`,
        changeFrequency: "monthly",
        priority: path ? 0.7 : 1,
      }))
    : [];
}
