import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
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
              <div key={c.phone} style={{ marginBottom: "0.6rem" }}>
                <strong style={{ fontSize: "0.85rem", display: "block", color: "#86efac" }}>{c.role}</strong>
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontWeight: 600 }}
                  title={`Open WhatsApp chat with ${c.role}`}
                >
                  <MessageCircle size={15} style={{ color: "#25D366" }} /> {c.phone}
                </a>
              </div>
            ))}
            <a href={`mailto:${FACTORY_INFO.email}`}>{FACTORY_INFO.email}</a>
            <address>{FACTORY_INFO.address}</address>
            <p>
              Products are saved as a quote request. Contact us via WhatsApp for latest pricing and factory quotes.
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
