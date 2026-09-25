import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FACTORY_INFO } from "@/data/factoryData";
import { NAVIGATION } from "@/data/navigation";

export default function FactoryFooter() {
  return (
    <footer className="footer guided-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="brand" href="/" aria-label="Aqua PPRC home">
            <span className="brand-mark" aria-hidden="true">
              A
            </span>
            <span>
              AQUA<span className="brand-sub">PPRC PIPES & FITTINGS</span>
            </span>
          </Link>
          <Link className="footer-cta" href="/quote">
            Build your quote list <ArrowUpRight />
          </Link>
        </div>
        <div className="guided-footer-grid">
          {NAVIGATION.map((group) => (
            <nav key={group.id} aria-label={`${group.label} footer`}>
              <h3>{group.label}</h3>
              {group.children?.map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
          <div>
            <h3>Aqua PPRC Inquiries</h3>
            {FACTORY_INFO.contacts.map((c) => (
              <div key={c.phone} style={{ marginBottom: "0.5rem" }}>
                <strong style={{ fontSize: "0.85rem", display: "block" }}>{c.role}</strong>
                <a href={`tel:${c.phone}`} style={{ display: "inline-block", marginRight: "0.5rem" }}>
                  {c.phone}
                </a>
              </div>
            ))}
            <a href={`mailto:${FACTORY_INFO.email}`}>{FACTORY_INFO.email}</a>
            <address>{FACTORY_INFO.address}</address>
            <p>
              Products are saved as a quote request. Contact us for latest pricing and factory quotes.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aqua PPRC Pipes & Fittings</span>
          <Link href="/">Back to home</Link>
        </div>
      </div>
    </footer>
  );
}
