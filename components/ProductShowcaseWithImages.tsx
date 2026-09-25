"use client";
import { useSearchParams } from "next/navigation";
import { catalogueUrl } from "@/lib/catalogue";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import ProductCard from "./ProductCard";
import { useInquiry } from "./InquiryProvider";
export default function ProductShowcaseWithImages() {
  const params = useSearchParams();
  const filter = ["pipes", "fittings", "valves"].includes(
    params.get("category") || "",
  )
    ? params.get("category")!
    : "all";
  const search = (params.get("q") || "").slice(0, 100);
  const { compared } = useInquiry();
  const returnTo = catalogueUrl(filter, search);
  function update(category: string, query: string) {
    window.history.replaceState(null, "", catalogueUrl(category, query));
  }
  const products = FACTORY_PRODUCTS.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      `${p.name} ${p.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="catalog-section container">
      <h2 className="sr-only">Aqua PPRC Products List</h2>
      <div className="catalog-toolbar">
        <div className="filters">
          {["all", "pipes", "fittings", "valves"].map((f) => (
            <button
              key={f}
              className={filter === f ? "filter active" : "filter"}
              aria-pressed={filter === f}
              onClick={() => update(f, search)}
            >
              {f === "all" ? "All products" : f}
              <span>
                {f === "all"
                  ? FACTORY_PRODUCTS.length
                  : FACTORY_PRODUCTS.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={18} />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search pipes, fittings or valves"
            maxLength={100}
            value={search}
            onChange={(e) => update(filter, e.target.value)}
          />
        </label>
      </div>
      <div className="catalog-guidance">
        <p>
          {products.length} products · Not sure where to start?{" "}
          <Link href="/product-finder">Help me choose</Link>
        </p>
        {compared.length > 0 && (
          <Link
            className="button secondary"
            href={`/compare?ids=${compared.join(",")}`}
          >
            Compare selected products ({compared.length}/3){" "}
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
      <p className="sr-only" role="status">
        {products.length} products shown
      </p>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} returnTo={returnTo} />
        ))}
      </div>
      {!products.length && (
        <div className="empty-state">
          <h3>No matching products</h3>
          <p>Try another product name or category.</p>
          <button
            className="button secondary"
            onClick={() => {
              update("all", "");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      <div className="catalog-bottom">
        <p className="catalog-note">
          Illustrative models. Final sizes and specifications are confirmed with
          the factory.
        </p>
        {compared.length > 0 && (
          <Link
            className="button secondary"
            href={`/compare?ids=${compared.join(",")}`}
          >
            Compare {compared.length} products <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </section>
  );
}
