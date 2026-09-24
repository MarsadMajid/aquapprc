import { notFound } from "next/navigation";
import { LOCATIONS } from "@/data/locations";
import { pageMetadata } from "@/lib/metadata";
import PageIntro from "@/components/PageIntro";
import LocationDetail from "@/components/LocationDetail";
export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = LOCATIONS.find((l) => l.slug === slug);
  return l
    ? pageMetadata(
        l.name,
        `/locations/${l.slug}`,
        `Find ${l.name}: ${l.address}. Exact map and driving directions.`,
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = LOCATIONS.find((l) => l.slug === slug);
  if (!l) notFound();
  return (
    <>
      <PageIntro
        eyebrow={l.role}
        title={l.name}
        description={l.address}
        crumbs={[{ label: "Locations", href: "/locations" }]}
      />
      <LocationDetail location={l} />
    </>
  );
}
