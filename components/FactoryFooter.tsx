import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FACTORY_INFO } from "@/data/factoryData";
import { NAVIGATION } from "@/data/navigation";
export default function FactoryFooter() {
  return (
    <footer className="footer guided-footer">
      <div className="container">
        <div className="footer-top">
          <Link className="brand" href="/" aria-label="Galaxy PPRC home">
            <span className="brand-mark" aria-hidden="true">
              G
            </span>
            <span>
              GALAXY<span className="brand-sub">PPRC PIPES & FITTINGS</span>
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
            <h3>Galaxy inquiries</h3>
            <a href={`tel:+${FACTORY_INFO.whatsapp}`}>0321-6661900</a>
            <a href={`mailto:${FACTORY_INFO.email}`}>{FACTORY_INFO.email}</a>
            <address>{FACTORY_INFO.address}</address>
            <p>
              Products are saved as a quote request. No order is placed on this
              website.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Galaxy PPRC Pipes & Fittings</span>
          <Link href="/">Back to home</Link>
        </div>
      </div>
    </footer>
  );
}
