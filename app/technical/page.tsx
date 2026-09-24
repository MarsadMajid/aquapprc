import PageIntro from "@/components/PageIntro";
import FactorySpecTables from "@/components/FactorySpecTables";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Specifications & documents",
  "/technical",
  "Galaxy product reference, printable product information and approved-document inquiries.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/technical"
        eyebrow="INFORMATION FOR YOUR PROJECT"
        title="Specifications & documents"
        description="Explore construction and connection information. Request approved dimensions, pressure/temperature data and supporting documentation before installation."
      />
      <FactorySpecTables />
    </>
  );
}
