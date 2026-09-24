import { Suspense } from "react";
import PageIntro from "@/components/PageIntro";
import Catalogue from "@/components/ProductShowcaseWithImages";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Products",
  "/products",
  "Browse Galaxy pipes, fittings and valves. Compare products and build your quote list.",
);
export default function Page() {
  return (
    <>
      <PageIntro
        path="/products"
        eyebrow="THE GALAXY COLLECTION"
        title="Browse products"
        description="Choose a category, explore a product, then add it to your quote list. Need guidance? Use Help me choose."
      />
      <Suspense fallback={<p className="container">Loading products…</p>}>
        <Catalogue />
      </Suspense>
    </>
  );
}
