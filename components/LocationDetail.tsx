"use client";
import { useState } from "react";
import { MapPin, ArrowUpRight, Copy, Phone } from "lucide-react";
import { FACTORY_INFO } from "@/data/factoryData";
import type { LocationRecord } from "@/data/locations";
export default function LocationDetail({
  location: l,
}: {
  location: LocationRecord;
}) {
  const [loaded, setLoaded] = useState(false),
    [status, setStatus] = useState("");
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus(`${label} copied.`);
    } catch {
      setStatus(`Copy manually: ${value}`);
    }
  }
  return (
    <section className="container location-detail">
      <div className="map-panel">
        {loaded ? (
          <iframe
            title={`Map of ${l.name}`}
            src={l.embed}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="map-placeholder">
            <MapPin size={48} />
            <p className="mono">
              {l.lat}, {l.lng}
            </p>
            <h2>{l.name}</h2>
            <button
              className="button secondary"
              onClick={() => setLoaded(true)}
            >
              Load interactive Google map
            </button>
            <p className="small muted">
              Loads Google Maps only when you choose.
            </p>
          </div>
        )}
      </div>
      <div className="location-information">
        <p className="eyebrow">{l.role}</p>
        <h2>Find your way here.</h2>
        <address>{l.address}</address>
        <div className="actions">
          <a
            className="button primary"
            href={`https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions <ArrowUpRight size={18} />
          </a>
          <a
            href={l.mapUrl}
            className="technical-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open listing
          </a>
        </div>
        <div className="copy-actions">
          <button
            onClick={() => copy(l.address, "Address")}
            className="text-button"
          >
            <Copy size={16} /> Copy address
          </button>
          <button
            onClick={() => copy(`${l.lat}, ${l.lng}`, "Coordinates")}
            className="text-button"
          >
            <Copy size={16} /> Copy coordinates
          </button>
        </div>
        <p role="status" className="small">
          {status}
        </p>
        <div className="location-contact">
          <p className="eyebrow">GALAXY INQUIRIES</p>
          <a href={`tel:+${FACTORY_INFO.whatsapp}`}>
            <Phone size={18} /> 0321-6661900
          </a>
          <a href={`mailto:${FACTORY_INFO.email}`}>{FACTORY_INFO.email}</a>
        </div>
        <p className="muted small">
          {l.slug === "factory"
            ? "Please arrange your factory visit before travelling."
            : "Visit the retail outlet for local purchasing and collection inquiries. The contact above is the Galaxy inquiry desk."}{" "}
          If the map does not load, use the directions or listing link.
        </p>
      </div>
    </section>
  );
}
