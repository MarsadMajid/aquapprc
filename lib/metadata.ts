import type { Metadata } from "next";
import { FACTORY_INFO } from "@/data/factoryData";
export function pageMetadata(
  title: string,
  path: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    ...(FACTORY_INFO.siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: `${title} | Galaxy PPRC`,
      description,
      type: "website",
      ...(FACTORY_INFO.siteUrl
        ? { url: path, images: ["/images/models/fiber.png"] }
        : {}),
    },
  };
}
