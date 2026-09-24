"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Plus, Trash2, Copy } from "lucide-react";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import {
  buildQuote,
  validateQuote,
  type QuoteLine,
  type Customer,
} from "@/lib/inquiry";
import { useInquiry, makeLine } from "./InquiryProvider";
import InquiryReview from "./InquiryReview";
const names = Object.fromEntries(FACTORY_PRODUCTS.map((p) => [p.id, p.name]));
export default function FactoryQuoteBuilder() {
  const { lines, setLines, customer, setCustomer, ready } = useInquiry();
  const [stage, setStage] = useState<1 | 2>(1);
  const [general, setGeneral] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function change(key: string, patch: Partial<QuoteLine>) {
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, ...patch } : l)),
    );
  }
  function field(key: keyof Customer, value: string) {
    setCustomer((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <section className="section quote-section" id="quote">
      <div className="container">
        <ol className="quote-progress" aria-label="Quote request progress">
          {["Products", "Your details", "Review & share"].map(
            (label, index) => (
              <li
                key={label}
                aria-current={
                  (message ? 3 : stage) === index + 1 ? "step" : undefined
                }
              >
                {index < 2 && !message ? (
                  <button
                    type="button"
                    onClick={() => {
                      setStage(index === 0 ? 1 : 2);
                      document
                        .getElementById(
                          index === 0 ? "quote-products" : "quote-details",
                        )
                        ?.scrollIntoView({
                          behavior: "instant",
                          block: "start",
                        });
                    }}
                  >
                    <span>{index + 1}</span>
                    {label}
                  </button>
                ) : (
                  <span>
                    <b>{index + 1}</b>
                    {label}
                  </span>
                )}
              </li>
            ),
          )}
        </ol>
        <p className="quote-guide" id="review-guide">
          Choose products and add your details. Review your request, then open a
          WhatsApp or email draft. Nothing sends automatically.
        </p>
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / FACTORY DIRECT</p>
            <h2>
              Your project.
              <br />
              Your product schedule.
            </h2>
          </div>
          <p>
            Add the products and quantities you need.
            <br />
            Review your quote request before sharing it with the factory.
          </p>
        </div>
        <div className="quote-panel">
          {message ? (
            <InquiryReview
              message={message}
              onEdit={() => {
                setMessage("");
                setStage(2);
              }}
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const issue = validateQuote(customer, lines, general);
                setError(issue);
                if (!issue) setMessage(buildQuote(customer, lines, names));
              }}
            >
              <div className="form-step" id="quote-products">
                <span>01</span>
                <h3>Build your product list</h3>
                <span className="muted small">
                  {lines.length} {lines.length === 1 ? "item" : "items"}
                </span>
              </div>
              {lines.length === 0 && (
                <div className="quote-empty">
                  <h3>Start your quote list</h3>
                  <div className="actions">
                    <Link className="button primary" href="/products">
                      Browse products
                    </Link>
                    <Link className="button secondary" href="/product-finder">
                      Help me choose
                    </Link>
                  </div>
                  <label className="general-inquiry">
                    <input
                      type="checkbox"
                      checked={general}
                      onChange={(e) => setGeneral(e.target.checked)}
                    />{" "}
                    I need help selecting products (describe your project in the
                    notes below).
                  </label>
                  <p>Your product list starts here.</p>
                  <p className="muted small">
                    Add an item below or choose a product from the catalogue.
                  </p>
                </div>
              )}
              <div className="quote-lines" onFocusCapture={() => setStage(1)}>
                {lines.map((line, i) => (
                  <fieldset className="quote-line" key={line.key}>
                    <legend>Item {i + 1}</legend>
                    <label className="field product-select">
                      Product
                      <select
                        value={line.productId}
                        onChange={(e) => {
                          const product = FACTORY_PRODUCTS.find(
                            (p) => p.id === e.target.value,
                          )!;
                          change(line.key, {
                            productId: product.id,
                            pressure: product.requestedClass,
                            unit:
                              product.category === "pipes"
                                ? "metres"
                                : "pieces",
                            size: "",
                          });
                        }}
                      >
                        {FACTORY_PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      Size / thread
                      <input
                        required
                        maxLength={80}
                        placeholder="e.g. 25 mm"
                        value={line.size}
                        onChange={(e) =>
                          change(line.key, { size: e.target.value })
                        }
                      />
                    </label>
                    <label className="field">
                      Pressure class
                      <select
                        value={line.pressure}
                        onChange={(e) =>
                          change(line.key, { pressure: e.target.value })
                        }
                      >
                        <option>PN16</option>
                        <option>PN20</option>
                        <option>PN25</option>
                        <option>Confirm with factory</option>
                      </select>
                    </label>
                    <label className="field quantity">
                      Quantity
                      <input
                        required
                        type="number"
                        min={line.unit === "pieces" ? "1" : "0.01"}
                        step={line.unit === "pieces" ? "1" : "0.01"}
                        value={line.quantity}
                        onChange={(e) =>
                          change(line.key, { quantity: e.target.value })
                        }
                        placeholder="100"
                      />
                    </label>
                    <label className="field">
                      Unit
                      <select
                        value={line.unit}
                        onChange={(e) =>
                          change(line.key, { unit: e.target.value })
                        }
                      >
                        <option value="metres">Metres</option>
                        <option value="pieces">Pieces</option>
                        <option value="tonnes">Tonnes</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label={`Duplicate item ${i + 1}`}
                      onClick={() =>
                        setLines((prev) => [
                          ...prev,
                          makeLine(line.productId, line),
                        ])
                      }
                    >
                      <Copy size={17} />
                    </button>
                    <button
                      className="remove-item icon-button"
                      type="button"
                      aria-label={`Remove item ${i + 1}`}
                      onClick={() =>
                        setLines((prev) =>
                          prev.filter((l) => l.key !== line.key),
                        )
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </fieldset>
                ))}
              </div>
              <button
                disabled={!ready}
                className="button secondary"
                type="button"
                onClick={() => setLines((prev) => [...prev, makeLine()])}
              >
                <Plus size={17} /> Add product
              </button>
              <div className="form-step details-step" id="quote-details">
                <span>02</span>
                <h3>Tell us where it’s going</h3>
              </div>
              <div
                className="form-grid customer-fields"
                onFocusCapture={() => setStage(2)}
              >
                <label className="field">
                  Name / company *
                  <input
                    required
                    autoComplete="organization"
                    maxLength={120}
                    value={customer.name}
                    onChange={(e) => field("name", e.target.value)}
                    placeholder="Your name or business"
                  />
                </label>
                <label className="field">
                  Phone / WhatsApp *
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    maxLength={24}
                    value={customer.phone}
                    onChange={(e) => field("phone", e.target.value)}
                    placeholder="e.g. +92 3XX XXXXXXX"
                  />
                </label>
                <label className="field">
                  Delivery city *
                  <input
                    required
                    autoComplete="address-level2"
                    maxLength={100}
                    value={customer.city}
                    onChange={(e) => field("city", e.target.value)}
                    placeholder="City or project location"
                  />
                </label>
                <label className="field full-width">
                  Project notes & documents needed
                  <textarea
                    rows={3}
                    maxLength={1500}
                    value={customer.notes}
                    onChange={(e) => field("notes", e.target.value)}
                    placeholder="Application, delivery requirements, standards or test documents…"
                  />
                </label>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="form-bottom">
                <p className="muted small">
                  Availability, final specifications and pricing are confirmed
                  by the factory.
                </p>
                <button className="button primary" type="submit">
                  Review quote request <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
