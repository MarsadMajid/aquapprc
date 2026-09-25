import type { MetadataRoute } from "next";
import { FACTORY_INFO, FACTORY_PRODUCTS } from "@/data/factoryData";
import { LOCATIONS } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = FACTORY_INFO.siteUrl || "https://aquapprc.com";
  const routes = [
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
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/products" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : path === "/products" ? 0.9 : 0.8,
  }));
}
