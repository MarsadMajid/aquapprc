import { FACTORY_INFO } from "@/data/factoryData";
import PageIntro from "@/components/PageIntro";
import PlantLocation from "@/components/PlantLocation";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our locations",
  "/locations",
  "Find the Aqua PPRC factory on Millat Road and Asia Pipe Store on Railway Road, Faisalabad.",
);
export default function Page() {
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
        <h2>Talk to Aqua PPRC</h2>
        <p>For product questions, factory quotes, wholesale orders and dealership requests.</p>
        <div className="actions" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          {FACTORY_INFO.contacts.map((c) => (
            <a key={c.phone} className="button primary" href={`tel:${c.phone}`} style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
              {c.role}: {c.phone}
            </a>
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <a className="technical-link" href={`mailto:${FACTORY_INFO.email}`}>
            {FACTORY_INFO.email}
          </a>
        </div>
      </section>
    </>
  );
}
