import { FACTORY_INFO } from "@/data/factoryData";
import PageIntro from "@/components/PageIntro";
import PlantLocation from "@/components/PlantLocation";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our locations",
  "/locations",
  "Find the Galaxy PPRC factory on Millat Road and Asia Pipe Store on Railway Road, Faisalabad.",
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
        <h2>Talk to Galaxy</h2>
        <p>For product questions, factory quotes and dealership requests.</p>
        <div className="actions">
          <a className="button primary" href={`tel:+${FACTORY_INFO.whatsapp}`}>
            Call Galaxy: 0321-6661900
          </a>
          <a className="technical-link" href={`mailto:${FACTORY_INFO.email}`}>
            {FACTORY_INFO.email}
          </a>
        </div>
        <p className="muted small">
          This is the Galaxy inquiry desk. A separate retail shop number is not
          listed.
        </p>
      </section>
    </>
  );
}
