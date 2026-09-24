import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { FactoryProduct } from "@/data/factoryData";
import AddToQuote from "./AddToQuote";
import CompareButton from "./CompareButton";
export default function ProductCard({
  product: p,
  returnTo,
}: {
  product: FactoryProduct;
  returnTo?: string;
}) {
  const href = `/products/${p.slug}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`;
  return (
    <article className="product-card">
      <Link
        className="product-photo"
        href={href}
        aria-label={`Explore ${p.name}`}
      >
        <Image
          src={p.poster}
          alt={`${p.name} illustrative render`}
          fill
          sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 33vw"
        />
        <span className="product-number">
          GALAXY / {p.category.toUpperCase()}
        </span>
        <span className="zoom-icon">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="product-body">
        <p className="eyebrow">{p.label}</p>
        <h3>
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="product-description">{p.description}</p>
        <div className="product-meta">
          <span>{p.connection}</span>
          <CompareButton id={p.id} />
        </div>
        <div className="product-actions">
          <Link className="technical-link" href={href}>
            Explore product <ArrowUpRight size={15} />
          </Link>
          <AddToQuote productId={p.id} />
        </div>
      </div>
    </article>
  );
}
