import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";
import FactoryHero from "@/components/FactoryHero";
import PlantLocation from "@/components/PlantLocation";
import LegacyLinks from "@/components/LegacyLinks";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Aqua PPRC Pipes & Fittings | Manufacturer in Faisalabad, Pakistan",
  "/",
  "Top manufacturer of Aqua PPRC single-layer & 2-layer PN20/PN25 pipes, fusion fittings, sockets, elbows, tees & valves in Faisalabad, Pakistan. Factory direct quotes & wholesale distribution.",
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Aqua PPRC Pipe and what is it used for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aqua PPRC (Polypropylene Random Copolymer) pipes are high-grade plastic pipes designed for hot and cold water distribution systems, industrial fluid transport, and sanitary plumbing. They offer high chemical resistance, zero corrosion, and 50+ years of operational life.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Aqua PPRC manufactured in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aqua PPRC pipes and fittings are manufactured at Chak 117 JB, Millat Road, Faisalabad, Punjab, Pakistan, with flagship retail and wholesale distribution at Asia Pipe Store, Railway Road, Sadiq Market, Faisalabad.",
      },
    },
    {
      "@type": "Question",
      name: "What pressure classes are available for Aqua PPRC pipes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aqua PPRC manufactures both Single-Layer and Double-Layer (2-Layer) PPRC pipes available in PN20 and PN25 pressure classes, in sizes ranging from 25 mm to 63 mm.",
      },
    },
    {
      "@type": "Question",
      name: "How can I request a factory quote for Aqua PPRC products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can build a quote request list directly on our website or contact our factory sales desk directly via WhatsApp at +92 300 6661900 or +92 300 2828860 for wholesale pricing and specifications.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <LegacyLinks />
      <FactoryHero />

      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE AQUA PPRC COLLECTION</p>
            <h2>
              High-performance pipes & fittings.
              <br />A complete piping system.
            </h2>
          </div>
          <Link href="/products" className="text-button">
            View all 21 products <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="family-grid">
          {[
            {
              name: "Single & 2-Layer Pipes",
              id: "pn20",
              category: "pipes",
              text: "PN20 & PN25 hot and cold water PPRC piping systems.",
            },
            {
              name: "Fusion & Threaded Fittings",
              id: "elbow",
              category: "fittings",
              text: "Sockets, 90° elbows, equal & reducing tees with brass inserts.",
            },
            {
              name: "Flow Control Valves",
              id: "valve",
              category: "valves",
              text: "Gate valves, full bore valves, fancy valves & ball valves.",
            },
          ].map((x, i) => (
            <Link
              key={x.id}
              href={`/products?category=${x.category}`}
              className="family-card"
            >
              <div className="family-image">
                <Image
                  src={`/images/models/${x.id}-studio.png`}
                  alt={`${x.name} Aqua PPRC product model`}
                  fill
                  sizes="(max-width:700px) 100vw, 33vw"
                />
                <span className="mono">0{i + 1} / AQUA PPRC</span>
              </div>
              <div>
                <h3>
                  {x.name}
                  <ArrowUpRight size={24} />
                </h3>
                <p>{x.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="inside-section">
        <div className="container inside-grid">
          <div className="inside-image">
            <Image
              src="/images/models/fiber-layers-studio.png"
              alt="Aqua PPRC double-layer 2-layer pipe construction"
              fill
              sizes="(max-width:800px) 100vw, 55vw"
            />
          </div>
          <div>
            <p className="eyebrow">ENGINEERED FOR DURABILITY</p>
            <h2>
              Double-Layer & Single-Layer
              <br />
              PPRC Piping Technology.
            </h2>
            <p>
              Explore our single-layer and 2-layer PN20 and PN25 PPRC pipes. Manufactured using high-density virgin polymer raw material designed for zero scale accumulation, leak-proof fusion joints, and 50+ years of operational performance in domestic, commercial, and industrial plumbing.
            </p>
            <div className="actions" style={{ gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <Link
                className="button primary"
                href="/products/single-layer-pprc-pipe"
              >
                Single-Layer Pipe Specs <ArrowRight size={18} />
              </Link>
              <Link
                className="button secondary"
                href="/products/double-layer-pprc-pipe"
              >
                Double-Layer Pipe Specs <ArrowRight size={18} />
              </Link>
            </div>
            <span className="small muted">
              Illustrative 3D construction visual. Request engineering datasheets for exact dimensions.
            </span>
          </div>
        </div>
      </section>

      <section className="section container story-grid">
        <div>
          <p className="eyebrow">FAISALABAD MANUFACTURING</p>
          <h2>
            PPRC Factory Direct
            <br />
            & Wholesale Supply.
          </h2>
          <p>
            Located at Chak 117 JB, Millat Road, Faisalabad, Aqua PPRC supplies contractors, wholesalers, stockists, and retailers across Pakistan with certified PPRC piping solutions.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0", display: "grid", gap: "0.5rem" }}>
            {[
              "PN20 & PN25 Pressure Class Ratings",
              "Precision Threaded Brass Insert Fittings",
              "Socket Fusion Leak-Proof Connection",
              "Wholesale & Retail Outlet at Asia Pipe Store",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
                <CheckCircle2 size={16} style={{ color: "#00a859" }} /> {item}
              </li>
            ))}
          </ul>
          <Link className="technical-link" href="/factory">
            Meet our factory & manufacturing team <ArrowUpRight size={17} />
          </Link>
        </div>
        <figure>
          <Image
            src="/images/products/galaxy-factory-plant.jpg"
            width={1376}
            height={768}
            alt="Aqua PPRC Pipes & Fittings Factory Production Facility in Faisalabad"
            sizes="(max-width:800px) 100vw, 50vw"
          />
          <figcaption>Aqua PPRC Extrusion Facility Visual — Millat Road, Faisalabad</figcaption>
        </figure>
      </section>

      <section className="section container" style={{ background: "rgba(0, 168, 89, 0.04)", borderRadius: "12px", padding: "2.5rem" }}>
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h2 style={{ marginBottom: "1.5rem" }}>PPRC Pipes & Fittings FAQ</h2>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} style={{ background: "#fff", padding: "1.25rem", borderRadius: "8px", border: "1px solid #e0e6e2" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>{faq.name}</h3>
              <p style={{ color: "#475569", margin: 0, fontSize: "0.925rem" }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="partner-strip">
        <div className="container">
          <div>
            <p className="eyebrow light">GROW WITH AQUA PPRC</p>
            <h2>
              Become a Dealer.
              <br />
              Expand your Territory.
            </h2>
          </div>
          <div>
            <p>
              Retailer, stockist or wholesale distributor?
              <br />
              Let’s discuss dealership opportunities and trade terms.
            </p>
            <Link className="button primary" href="/dealership">
              Become an Aqua PPRC Dealer <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <PlantLocation />
    </>
  );
}
