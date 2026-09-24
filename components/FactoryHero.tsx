import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import ProductViewer from "./ProductViewer";
export default function FactoryHero() {
  return (
    <section className="showroom-hero">
      <div className="container">
        <div className="hero-topline">
          <span>
            <span className="status-dot" /> ENGINEER YOUR NEXT CONNECTION
          </span>
          <span>FAISALABAD, PAKISTAN / GALAXY PPRC</span>
        </div>
        <div className="showroom-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">A CLOSER LOOK. A BETTER CONNECTION.</p>
            <h1>
              Built around
              <br />
              your next
              <br />
              <em>connection.</em>
            </h1>
            <p>
              PPRC pipes, fittings and valves from Faisalabad. Browse products,
              choose your products, and request a factory quote.
            </p>
            <div className="actions">
              <Link href="/products" className="button primary">
                Browse products <ArrowUpRight size={19} />
              </Link>
              <Link href="/product-finder" className="hero-link">
                Help me choose <MoveUpRight size={17} />
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="mono">01 / PPRC PIPE SYSTEMS</span>
              <span>From our factory to your project.</span>
            </div>
          </div>
          <ProductViewer product={FACTORY_PRODUCTS[0]} hero />
        </div>
        <nav
          className="hero-strip journey-strip"
          aria-label="How to request a quote"
        >
          <Link href="/products">
            <span>01 / CHOOSE</span>
            <strong>Choose products →</strong>
          </Link>
          <Link href="/quote">
            <span>02 / BUILD</span>
            <strong>Build your quote list →</strong>
          </Link>
          <Link href="/quote#review-guide">
            <span>03 / SHARE</span>
            <strong>Review and share →</strong>
          </Link>
        </nav>
        <p className="journey-note">
          Adding products saves a quote request. It does not place an order.
        </p>
      </div>
    </section>
  );
}
