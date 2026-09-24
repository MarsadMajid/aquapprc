import Link from "next/link";
import { ArrowUpRight, MapPin, Factory, Store } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
export default function PlantLocation() {
  return (
    <section className="section location-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TWO LOCATIONS. ONE CONNECTION.</p>
            <h2>
              Come find us
              <br />
              in Faisalabad.
            </h2>
          </div>
          <MapPin className="location-symbol" size={60} />
        </div>
        <div className="location-grid">
          {LOCATIONS.map((l, i) => (
            <article className="location-card" key={l.slug}>
              {i ? <Store size={26} /> : <Factory size={26} />}
              <p className="eyebrow">
                {i
                  ? "SHOP — LOCAL RETAIL & COLLECTION"
                  : "FACTORY — MANUFACTURING & COMMERCIAL INQUIRIES"}
              </p>
              <h3>{l.name}</h3>
              <address>{l.address}</address>
              <Link className="button secondary" href={`/locations/${l.slug}`}>
                Location & directions <ArrowUpRight size={18} />
              </Link>
              <p className="mono location-coordinates">
                {l.lat}° N / {l.lng}° E
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
