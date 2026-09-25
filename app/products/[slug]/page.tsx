import { Suspense } from "react";
import ProductReturn from "@/components/ProductReturn";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FACTORY_PRODUCTS, FACTORY_INFO } from "@/data/factoryData";
import ProductViewer from "@/components/ProductViewer";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return FACTORY_PRODUCTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = FACTORY_PRODUCTS.find((p) => p.slug === slug);
  return p ? pageMetadata(p.name, `/products/${p.slug}`, p.description) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = FACTORY_PRODUCTS.find((p) => p.slug === slug);
  if (!p) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    brand: { "@type": "Brand", name: "Aqua PPRC" },
    ...(FACTORY_INFO.siteUrl
      ? {
          image: `${FACTORY_INFO.siteUrl}${p.poster}`,
          url: `${FACTORY_INFO.siteUrl}/products/${p.slug}`,
        }
      : {}),
  };
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span aria-current="page">{p.name}</span>
        </nav>
        <Suspense fallback={<Link href="/products">Back to products</Link>}>
          <ProductReturn />
        </Suspense>
        <div className="product-detail-grid">
          <ProductViewer product={p} />
          <ProductDetails product={p} />
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">KEEP YOUR PROJECT CONNECTED</p>
            <h2>Explore the rest of the system.</h2>
          </div>
        </div>
        <div className="product-grid">
          {p.related.map((id) => (
            <ProductCard
              key={id}
              product={FACTORY_PRODUCTS.find((p) => p.id === id)!}
            />
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
