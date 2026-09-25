import { FACTORY_INFO } from "@/data/factoryData";
import PageIntro from "@/components/PageIntro";
import PlantLocation from "@/components/PlantLocation";
import { pageMetadata } from "@/lib/metadata";
import { MessageCircle } from "lucide-react";

export const metadata = pageMetadata(
  "Our locations",
  "/locations",
  "Find the Aqua PPRC factory on Millat Road and Asia Pipe Store on Railway Road, Faisalabad.",
);
export default function Page() {
  const factoryContacts = FACTORY_INFO.contacts.filter((c) => c.location === "factory");
  const shopContacts = FACTORY_INFO.contacts.filter((c) => c.location === "shop");

  return (
    <>
      <PageIntro
        path="/locations"
        eyebrow="VISIT THE RIGHT PLACE"
        title="Locations & contact"
        description="Choose the manufacturing factory for commercial inquiries or Asia Pipe Store for local retail and collection inquiries."
      />
      <PlantLocation />
      <section className="container contact-next">
        <h2>Talk to Aqua PPRC on WhatsApp</h2>
        <p>Click any contact number below to start a direct WhatsApp chat with our factory management or Asia Pipe Store team.</p>

        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "var(--brand-dark, #047348)" }}>
            Aqua PPRC Factory Contacts (Millat Road)
          </h3>
          <div className="actions" style={{ flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {factoryContacts.map((c) => (
              <a
                key={c.phone}
                className="button primary"
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.875rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <MessageCircle size={17} style={{ color: "#25D366" }} /> {c.role}: {c.phone}
              </a>
            ))}
          </div>

          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "var(--brand-dark, #047348)" }}>
            Asia Pipe Store Contacts (Railway Road Outlet & Wholesale)
          </h3>
          <div className="actions" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
            {shopContacts.map((c) => (
              <a
                key={c.phone}
                className="button secondary"
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.875rem", padding: "0.5rem 1rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <MessageCircle size={17} style={{ color: "#25D366" }} /> {c.role}: {c.phone}
              </a>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <a className="technical-link" href={`mailto:${FACTORY_INFO.email}`}>
            {FACTORY_INFO.email}
          </a>
        </div>
      </section>
    </>
  );
}
