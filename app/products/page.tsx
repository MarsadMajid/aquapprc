import { Suspense } from "react";
import PageIntro from "@/components/PageIntro";
import Catalogue from "@/components/ProductShowcaseWithImages";
import { pageMetadata } from "@/lib/metadata";
import { FACTORY_PRODUCTS, FACTORY_INFO } from "@/data/factoryData";

export const metadata = pageMetadata(
  "Products",
  "/products",
  "Browse Aqua PPRC pipes, fittings and valves. Compare products and build your quote list.",
);

const baseUrl = FACTORY_INFO.siteUrl || "https://www.aquapprc.com";

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Aqua PPRC Pipes & Fittings Product Catalog",
  description:
    "Full factory catalog of Aqua PPRC single-layer and 2-layer PN20/PN25 pipes, sockets, elbows, tees, unions, step over bends, and gate valves.",
  numberOfItems: FACTORY_PRODUCTS.length,
  itemListElement: FACTORY_PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      url: `${baseUrl}/products/${p.slug}`,
      image: `${baseUrl}${p.poster}`,
      description: p.description,
      category: p.category,
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Aqua PPRC Pipes & Fittings",
        },
      },
    },
  })),
};

function CatalogueSkeleton() {
  return (
    <section className="catalog-section container" aria-busy="true" aria-label="Loading products">
      <h2 className="sr-only">Aqua PPRC Products List</h2>
      <div className="catalog-toolbar">
        <div className="filters">
          <button className="filter active" disabled>All products <span>{FACTORY_PRODUCTS.length}</span></button>
          <button className="filter" disabled>Pipes <span>2</span></button>
          <button className="filter" disabled>Fittings <span>15</span></button>
          <button className="filter" disabled>Valves <span>4</span></button>
        </div>
        <div className="search-field" style={{ minWidth: "220px", height: "42px", background: "rgba(0,0,0,0.04)", borderRadius: "6px" }} />
      </div>
      <div className="catalog-guidance" style={{ minHeight: "42px" }}>
        <p>{FACTORY_PRODUCTS.length} products · Loading catalogue...</p>
      </div>
      <div className="product-grid">
        {FACTORY_PRODUCTS.slice(0, 9).map((p) => (
          <article key={p.id} className="product-card" style={{ opacity: 0.75 }}>
            <div className="product-photo" style={{ background: "#e2e8f0" }} />
            <div className="product-body">
              <div style={{ height: "14px", width: "40%", background: "#cbd5e1", borderRadius: "4px", marginBottom: "8px" }} />
              <h3 style={{ margin: "0 0 8px 0" }}>{p.name}</h3>
              <p className="product-description">{p.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        path="/products"
        eyebrow="THE AQUA PPRC COLLECTION"
        title="Browse products"
        description="Choose a category, explore a product, then add it to your quote list. Need guidance? Use Help me choose."
      />
      <Suspense fallback={<CatalogueSkeleton />}>
        <Catalogue />
      </Suspense>
    </>
  );
}
