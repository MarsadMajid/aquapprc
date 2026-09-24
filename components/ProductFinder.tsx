"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import { useInquiry } from "./InquiryProvider";
const needs = [
  ["Pipe", "pn20,fiber"],
  ["Directional fitting", "elbow"],
  ["Branch fitting", "tee"],
  ["Threaded transition", "socket"],
  ["Isolation valve", "valve"],
  ["Unsure", ""],
];
export default function ProductFinder() {
  const [step, setStep] = useState(0),
    [application, setApplication] = useState(""),
    [need, setNeed] = useState(""),
    [size, setSize] = useState(""),
    [quantity, setQuantity] = useState(""),
    [documents, setDocuments] = useState(""),
    [added, setAdded] = useState<string[]>([]),
    [attached, setAttached] = useState(false);
  const { add, setCustomer, ready } = useInquiry();
  const suggested = (needs.find((n) => n[0] === need)?.[1] || "")
    .split(",")
    .filter(Boolean);
  function carry(id?: string) {
    setAttached(true);
    setCustomer((prev) => ({
      ...prev,
      notes: [
        prev.notes,
        `Help me choose: ${application}; need: ${need}; size: ${size || "to confirm"}; quantity: ${quantity || "to discuss"}; documents: ${documents || "to discuss"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }));
    if (id) {
      add(id, {
        size: size || "Confirm with factory",
        quantity,
        pressure: "Confirm with factory",
      });
      setAdded((prev) => [...prev, id]);
    }
  }
  return (
    <section className="container finder-section">
      <div className="finder">
        <ol className="finder-steps">
          {[
            "Application",
            "Product need",
            "Requirements",
            "Your next step",
          ].map((x, i) => (
            <li key={x} aria-current={step === i ? "step" : undefined}>
              <span>{i + 1}</span>
              {x}
            </li>
          ))}
        </ol>
        <div className="finder-body">
          {step === 0 ? (
            <>
              <p className="eyebrow">LET’S START WITH YOUR PROJECT</p>
              <h2>What are you planning?</h2>
              <div className="choice-grid">
                {["Hot/cold water", "Heating", "Distribution", "Unsure"].map(
                  (x) => (
                    <button
                      className={
                        application === x ? "choice selected" : "choice"
                      }
                      onClick={() => setApplication(x)}
                      key={x}
                      aria-pressed={application === x}
                    >
                      {x}
                      <ArrowRight size={18} />
                    </button>
                  ),
                )}
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h2>Which connection do you need?</h2>
              <div className="choice-grid">
                {needs.map(([x]) => (
                  <button
                    className={need === x ? "choice selected" : "choice"}
                    onClick={() => setNeed(x)}
                    key={x}
                    aria-pressed={need === x}
                  >
                    {x}
                    <ArrowRight size={18} />
                  </button>
                ))}
              </div>
            </>
          ) : step === 2 ? (
            <>
              <h2>Tell us what you know.</h2>
              <p className="muted">
                Leave unknown details blank. The factory can help clarify your
                requirements.
              </p>
              <div className="form-grid">
                <label className="field">
                  Size / thread
                  <input
                    maxLength={80}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 25 mm"
                  />
                </label>
                <label className="field">
                  Quantity
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Optional"
                  />
                </label>
                <label className="field full-width">
                  Documents required
                  <textarea
                    maxLength={1000}
                    value={documents}
                    onChange={(e) => setDocuments(e.target.value)}
                    placeholder="Dimensions, material information, test reports…"
                  />
                </label>
              </div>
              <p className="small muted">
                Quantities are carried as metres for pipes and pieces for
                fittings. Confirm the unit in your quote request.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">A STARTING POINT FOR YOUR QUOTE</p>
              <h2>
                {suggested.length
                  ? "Explore these product families."
                  : "Let's clarify your project."}
              </h2>
              <p className="technical-note">
                These matches are based on connection type. Pressure,
                temperature and application suitability must be confirmed by the
                factory.
              </p>
              <div className="finder-results">
                {suggested.map((id) => {
                  const p = FACTORY_PRODUCTS.find((p) => p.id === id)!;
                  return (
                    <article key={id}>
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                      <div className="actions">
                        <Link href={`/products/${p.slug}`}>
                          Explore product →
                        </Link>
                        <button
                          disabled={!ready || added.includes(id)}
                          className="button secondary"
                          onClick={() => carry(id)}
                        >
                          {added.includes(id) ? (
                            <>
                              <Check size={16} /> Added
                            </>
                          ) : (
                            "Add with requirements"
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {!suggested.length && (
                <button
                  className="button secondary"
                  disabled={attached}
                  onClick={() => carry()}
                >
                  {attached
                    ? "Requirements attached"
                    : "Attach requirements to quote list"}
                </button>
              )}
              <Link href="/quote" className="button primary">
                Continue to quote list <ArrowRight size={18} />
              </Link>
            </>
          )}
          <div className="finder-navigation">
            {step > 0 && (
              <button className="text-button" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={17} /> Back
              </button>
            )}
            {step < 3 && (
              <button
                className="button primary"
                disabled={
                  step === 0 ? !application : step === 1 ? !need : false
                }
                onClick={() => setStep(step + 1)}
              >
                Continue <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
