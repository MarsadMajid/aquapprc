import type { Metadata } from "next";
import { FACTORY_INFO } from "@/data/factoryData";
import "@fontsource-variable/manrope";
import "./globals.css";
import InquiryProvider from "@/components/InquiryProvider";
import FactoryHeader from "@/components/FactoryHeader";
import FactoryFooter from "@/components/FactoryFooter";
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: {
    default: "Aqua PPRC | Pipes & Fittings Factory, Faisalabad",
    template: "%s | Aqua PPRC",
  },
  description:
    "Explore Aqua PPRC pipes, fittings and valves. Request a factory quote or discuss dealership opportunities at Chak 117 JB, Millat Road, Faisalabad.",
  ...(FACTORY_INFO.siteUrl
    ? {
        metadataBase: new URL(FACTORY_INFO.siteUrl),
      }
    : {}),
  openGraph: {
    title: "Every connection starts with Aqua PPRC.",
    description:
      "Aqua PPRC pipes and fittings. Factory quotes and dealership inquiries from Faisalabad, Pakistan.",
    type: "website",
    locale: "en_PK",
    ...(FACTORY_INFO.siteUrl
      ? {
          images: [
            {
              url: "/images/products/galaxy-factory-plant.jpg",
              width: 1376,
              height: 768,
              alt: "Aqua PPRC factory visual",
            },
          ],
        }
      : {}),
  },
  robots: FACTORY_INFO.siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <InquiryProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <FactoryHeader />
          <main id="main">{children}</main>
          <FactoryFooter />
        </InquiryProvider>
      </body>
    </html>
  );
}
