import type { Metadata } from "next";
import { FACTORY_INFO } from "@/data/factoryData";
import "@fontsource-variable/manrope";
import "./globals.css";
import InquiryProvider from "@/components/InquiryProvider";
import FactoryHeader from "@/components/FactoryHeader";
import FactoryFooter from "@/components/FactoryFooter";

const baseUrl = FACTORY_INFO.siteUrl || "https://www.aquapprc.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: { icon: "/icon.svg" },
  title: {
    default: "Aqua PPRC | Top PPRC Pipes & Fittings Manufacturer in Faisalabad, Pakistan",
    template: "%s | Aqua PPRC Pipes & Fittings",
  },
  description:
    "Leading manufacturer of high-grade Aqua PPRC pipes, PN20 & PN25 single-layer & 2-layer pipes, sockets, elbows, tees, and valves in Faisalabad, Pakistan. Factory direct quotes & wholesale distribution.",
  keywords: [
    "PPRC pipe",
    "PPRC pipes manufacturer Pakistan",
    "Aqua PPRC",
    "Aqua PPRC pipes and fittings",
    "best PPRC pipe Faisalabad",
    "PPRC fittings manufacturer",
    "PN20 PPRC pipe",
    "PN25 PPRC pipe",
    "2 layer PPRC pipe",
    "PPRC socket",
    "PPRC elbow",
    "PPRC tee",
    "female threaded socket",
    "reducing socket",
    "PPRC gate valve",
    "plastic union",
    "Asia Pipe Store Faisalabad",
    "hot and cold water pipes Pakistan",
    "plumbing pipes manufacturer Pakistan",
    "Chak 117 JB Millat Road Faisalabad",
  ],
  authors: [{ name: "Aqua PPRC Pipes & Fittings" }],
  creator: "Aqua PPRC",
  publisher: "Aqua PPRC Pipes & Fittings",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aqua PPRC Pipes & Fittings | High-Grade Water Piping Systems",
    description:
      "Explore Aqua PPRC single-layer and 2-layer PN20/PN25 pipes, fusion fittings, and valves. Factory direct quotes from Faisalabad, Pakistan.",
    type: "website",
    locale: "en_PK",
    siteName: "Aqua PPRC Pipes & Fittings",
    images: [
      {
        url: "/images/products/galaxy-factory-plant.jpg",
        width: 1376,
        height: 768,
        alt: "Aqua PPRC Pipes & Fittings Factory Plant, Faisalabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqua PPRC Pipes & Fittings | Faisalabad, Pakistan",
    description: "High-grade PPRC pipes, fittings & valves. Direct factory quotes and wholesale distribution.",
    images: ["/images/products/galaxy-factory-plant.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Aqua PPRC Pipes & Fittings",
      url: baseUrl,
      logo: `${baseUrl}/icon.svg`,
      description: "Manufacturer of high-performance PPRC pipes, fittings, and flow control valves in Faisalabad, Pakistan.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chak 117 JB, Millat Road",
        addressLocality: "Faisalabad",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      contactPoint: FACTORY_INFO.contacts.map((c) => ({
        "@type": "ContactPoint",
        telephone: c.phone,
        contactType: c.role,
        availableLanguage: ["English", "Urdu"],
      })),
    },
    {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#localbusiness`,
      name: "Aqua PPRC Factory",
      image: `${baseUrl}/images/products/galaxy-factory-plant.jpg`,
      url: baseUrl,
      telephone: "+923006661900",
      email: FACTORY_INFO.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chak 117 JB, Millat Road",
        addressLocality: "Faisalabad",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.5004234,
        longitude: 73.1084974,
      },
      priceRange: "$$",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrg).replace(/</g, "\\u003c"),
          }}
        />
      </head>
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
