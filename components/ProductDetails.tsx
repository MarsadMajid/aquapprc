"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Printer, ArrowRight, Phone } from "lucide-react";
import { TECHNICAL_NOTE, FACTORY_INFO, type FactoryProduct } from "@/data/factoryData";
import { useInquiry } from "./InquiryProvider";
import CompareButton from "./CompareButton";
import SpecModal from "./SpecModal";

export default function ProductDetails({
  product: p,
}: {
  product: FactoryProduct;
}) {
  const { add, ready } = useInquiry(),
    [size, setSize] = useState(p.sizes?.[0] || ""),
    [quantity, setQuantity] = useState(""),
    [pressure, setPressure] = useState(p.requestedClass),
    [unit, setUnit] = useState(p.category === "pipes" ? "metres" : "pieces"),
    [sheet, setSheet] = useState(false);

  return (
    <div className="detail-information">
      <p className="eyebrow">{p.label}</p>
      <h1>{p.name}</h1>
      <p className="detail-description">{p.description}</p>
      <div className="price-tag" style={{ margin: "1rem 0", padding: "0.75rem 1rem", background: "rgba(0, 168, 89, 0.08)", borderRadius: "8px", border: "1px solid rgba(0, 168, 89, 0.2)" }}>
        <strong style={{ color: "var(--brand-dark, #047348)" }}>Pricing: Contact for quote</strong>
        <p className="small muted" style={{ margin: "0.25rem 0 0 0" }}>
          Factory direct prices depend on quantity, specifications and delivery destination.
        </p>
      </div>

      <dl className="detail-facts">
        <div>
          <dt>Construction</dt>
          <dd>{p.construction}</dd>
        </div>
        <div>
          <dt>Connection</dt>
          <dd>{p.connection}</dd>
        </div>
        <div>
          <dt>Requested series</dt>
          <dd>{p.requestedClass}</dd>
        </div>
      </dl>

      {!!p.sizes?.length && (
        <div style={{ marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}>
            Available Sizes:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {p.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`size-badge ${size === s ? "active" : ""}`}
                style={{
                  padding: "0.3rem 0.6rem",
                  fontSize: "0.825rem",
                  borderRadius: "4px",
                  border: size === s ? "2px solid #00a859" : "1px solid #ccc",
                  background: size === s ? "#00a859" : "#fff",
                  color: size === s ? "#fff" : "#333",
                  cursor: "pointer",
                  fontWeight: size === s ? 600 : 400,
                }}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {!!p.verifiedSpecifications?.length && (
        <dl className="detail-facts">
          {p.verifiedSpecifications.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          add(p.id, { size, quantity, pressure, unit });
        }}
      >
        <div className="form-grid">
          <label className="field">
            Requested size
            <input
              maxLength={80}
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 25 mm"
            />
          </label>
          <label className="field">
            Pressure class
            <select
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
            >
              <option>PN16</option>
              <option>PN20</option>
              <option>PN25</option>
              <option>Confirm with factory</option>
            </select>
          </label>
          <label className="field">
            Quantity
            <input
              type="number"
              min="0.01"
              step={unit === "pieces" ? "1" : "0.01"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Your requirement"
            />
          </label>
          <label className="field">
            Unit
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="metres">Metres</option>
              <option value="pieces">Pieces</option>
              <option value="tonnes">Tonnes</option>
            </select>
          </label>
        </div>
        <button disabled={!ready} className="button primary detail-add">
          <Plus size={19} /> Add to quote list
        </button>
      </form>
      <div className="detail-actions">
        <CompareButton id={p.id} />
        <button className="text-button" onClick={() => setSheet(true)}>
          <Printer size={17} /> Print product sheet
        </button>
      </div>
      <p className="technical-note">{TECHNICAL_NOTE}</p>
      {p.documents?.length ? (
        <ul>
          {p.documents.map((d) => (
            <li key={d.url}>
              <a className="technical-link" href={d.url}>
                {d.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <Link className="technical-link" href="/technical">
          Request approved technical documents <ArrowRight size={16} />
        </Link>
      )}
      {sheet && <SpecModal product={p} onClose={() => setSheet(false)} />}
    </div>
  );
}
