import PageIntro from "@/components/PageIntro";
import DealershipRFQBuilder from "@/components/DealershipRFQBuilder";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Become a dealer",
  "/dealership",
  "Discuss Aqua PPRC product availability, distribution and dealership requirements.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/dealership"
        eyebrow="GROW WITH AQUA PPRC"
        title="Become a dealer"
        description="Tell us about your business, territory and product needs. Prepare a dealership inquiry to share directly with Aqua PPRC."
      />
      <DealershipRFQBuilder />
    </>
  );
}
