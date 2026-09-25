import PageIntro from "@/components/PageIntro";
import FactoryQuoteBuilder from "@/components/FactoryQuoteBuilder";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Your quote list",
  "/quote",
  "Review your product schedule, prepare a quote request and share it directly with Aqua PPRC.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/quote"
        eyebrow="FACTORY DIRECT"
        title="Quote list"
        description="Your product list follows you between pages. Add requirements, review the details, then choose how to share."
      />
      <FactoryQuoteBuilder />
    </>
  );
}
