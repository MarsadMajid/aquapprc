import PageIntro from "@/components/PageIntro";
import Comparison from "@/components/Comparison";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import { comparisonIds } from "@/lib/draft";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Compare products",
  "/compare",
  "Compare construction and connection details for up to three Aqua PPRC products.",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  return (
    <>
      <PageIntro
        eyebrow="SIDE BY SIDE"
        title="A clearer choice."
        description="Compare product details, then bring your shortlist into a single factory inquiry."
      />
      <Comparison
        ids={comparisonIds(
          ids || "",
          FACTORY_PRODUCTS.map((p) => p.id),
        )}
      />
    </>
  );
}
