"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import InquiryReview from "./InquiryReview";
export default function DealershipRFQBuilder() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    company: "",
    name: "",
    phone: "",
    city: "",
    type: "Retailer",
    volume: "",
    notes: "",
  });
  function change(k: keyof typeof values, v: string) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }
  return (
    <section className="section dealership" id="dealership">
      <div className="container dealership-grid">
        <div>
          <p className="eyebrow">05 / GROW WITH GALAXY</p>
          <h2>
            Local knowledge.
            <br />A shared ambition.
          </h2>
          <p className="dealership-intro">
            Stockists, retailers and distributors: let’s discuss how Galaxy can
            fit into your business.
          </p>
          <ul className="benefit-list">
            {[
              "Discuss your city and market requirements",
              "Request the product range and trade terms",
              "Plan your opening order and delivery needs",
            ].map((x) => (
              <li key={x}>
                <Check size={19} />
                {x}
              </li>
            ))}
          </ul>
          <div className="depot-note">
            <span className="eyebrow">OUR FLAGSHIP DISTRIBUTION OUTLET</span>
            <strong>Asia Pipe Store</strong>
            <span>Railway Road, Sadiq Market</span>
          </div>
        </div>
        <div className="dealer-form">
          {message ? (
            <InquiryReview message={message} onEdit={() => setMessage("")} />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  [values.company, values.name, values.city].some(
                    (v) => !v.trim(),
                  )
                ) {
                  setError(
                    "Please complete your company, contact name and city.",
                  );
                  return;
                }
                if (!/^\d{10,15}$/.test(values.phone.replace(/\D/g, ""))) {
                  setError("Enter a phone number with 10 to 15 digits.");
                  return;
                }
                setError("");
                setMessage(
                  [
                    "GALAXY PPRC — DEALERSHIP INQUIRY",
                    `Business: ${values.company.trim()}`,
                    `Contact person: ${values.name.trim()}`,
                    `Phone: ${values.phone.trim()}`,
                    `City / territory: ${values.city.trim()}`,
                    `Business type: ${values.type}`,
                    `Expected monthly volume: ${values.volume.trim() || "To discuss"}`,
                    `Notes: ${values.notes.trim() || "None"}`,
                    "Please share product availability, trade terms and dealership requirements.",
                  ].join("\n"),
                );
              }}
            >
              <h3>Start a dealership conversation</h3>
              <p className="muted small">
                Tell us a little about your business.
              </p>
              <div className="form-grid">
                {(
                  [
                    ["company", "Business name", "organization"],
                    ["name", "Contact person", "name"],
                    ["phone", "Phone / WhatsApp", "tel"],
                    ["city", "City / territory", "address-level2"],
                  ] as const
                ).map(([k, label, auto]) => (
                  <label className="field" key={k}>
                    {label} *
                    <input
                      required
                      type={k === "phone" ? "tel" : "text"}
                      maxLength={k === "phone" ? 24 : 120}
                      autoComplete={auto}
                      value={values[k]}
                      onChange={(e) => change(k, e.target.value)}
                    />
                  </label>
                ))}
                <label className="field">
                  Business type
                  <select
                    value={values.type}
                    onChange={(e) => change("type", e.target.value)}
                  >
                    <option>Retailer</option>
                    <option>Wholesaler</option>
                    <option>Distributor</option>
                    <option>Contractor</option>
                    <option>New business</option>
                  </select>
                </label>
                <label className="field">
                  Expected monthly volume
                  <input
                    maxLength={100}
                    placeholder="Quantity and unit, or to discuss"
                    value={values.volume}
                    onChange={(e) => change("volume", e.target.value)}
                  />
                </label>
                <label className="field full-width">
                  Anything else we should know?
                  <textarea
                    rows={3}
                    maxLength={1500}
                    value={values.notes}
                    onChange={(e) => change("notes", e.target.value)}
                  />
                </label>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="button primary" type="submit">
                Review dealership request <ArrowRight size={18} />
              </button>
              <p className="muted small form-privacy">
                Review and share your inquiry yourself. No application is
                submitted automatically.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
