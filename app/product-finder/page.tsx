import PageIntro from "@/components/PageIntro";
import ProductFinder from "@/components/ProductFinder";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Help me choose",
  "/product-finder",
  "Tell us about your project and prepare an Aqua PPRC product inquiry.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/product-finder"
        eyebrow="A LITTLE GUIDANCE"
        title="Help me choose"
        description="Four simple steps to understand your product needs. Final engineering selection is confirmed with the factory."
      />
      <ProductFinder />
    </>
  );
}
