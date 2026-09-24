import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import ManufacturingAndQC from "@/components/ManufacturingAndQC";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our factory",
  "/factory",
  "Learn about Galaxy PPRC factory inquiries, product documentation and our Millat Road location.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/factory"
        eyebrow="GALAXY / FAISALABAD"
        title="Our factory"
        description="Our manufacturing address is Chak 117 JB, Millat Road, Faisalabad. Start here to discuss your product and documentation requirements."
      />
      <ManufacturingAndQC />
      <section className="section container factory-next">
        <div>
          <p className="eyebrow">PLAN YOUR CONVERSATION</p>
          <h2>
            Bring your requirements.
            <br />
            We’ll start there.
          </h2>
          <p>
            Tell us the product, size, application and documents your project
            needs. Request approved dimensions and batch information with your
            order.
          </p>
        </div>
        <div className="actions">
          <Link className="button primary" href="/quote">
            Build a quote request
          </Link>
          <Link className="button secondary" href="/locations/factory">
            Factory location & directions
          </Link>
        </div>
      </section>
    </>
  );
}
