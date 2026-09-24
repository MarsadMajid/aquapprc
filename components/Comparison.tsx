"use client";
import { useEffect } from "react";
import { useInquiry } from "./InquiryProvider";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import AddToQuote from "./AddToQuote";
export default function Comparison({ ids }: { ids: string[] }) {
  const { setCompared } = useInquiry();
  const signature = ids.join(",");
  useEffect(() => {
    const timer = setTimeout(
      () => setCompared(signature ? signature.split(",") : []),
      0,
    );
    return () => clearTimeout(timer);
  }, [signature, setCompared]);
  const router = useRouter(),
    products = ids.map((id) => FACTORY_PRODUCTS.find((p) => p.id === id)!);
  function update(next: string[]) {
    router.replace(`/compare?ids=${next.join(",")}`, { scroll: false });
  }
  return (
    <section className="container comparison-section">
      {!products.length ? (
        <div className="empty-state">
          <h2>Choose your first products.</h2>
          <p>
            Select up to three products from the catalogue to compare them here.
          </p>
          <Link className="button primary" href="/products">
            Explore products
          </Link>
        </div>
      ) : (
        <>
          <div className="table-scroll">
            <table className="spec-table comparison-table">
              <caption>
                Product comparison — final engineering data requires factory
                confirmation
              </caption>
              <thead>
                <tr>
                  <th scope="col">Product reference</th>
                  {products.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Explore</th>
                  {products.map((p) => (
                    <td key={p.id}>
                      <Image
                        src={p.poster}
                        alt={`${p.name} illustrative model`}
                        width={280}
                        height={220}
                      />
                      <Link href={`/products/${p.slug}`}>View product →</Link>
                    </td>
                  ))}
                </tr>
                {(
                  [
                    ["Family", "category"],
                    ["Construction", "construction"],
                    ["Connection", "connection"],
                    ["Requested series", "requestedClass"],
                  ] as const
                ).map(([label, key]) => (
                  <tr key={key}>
                    <th scope="row">{label}</th>
                    {products.map((p) => (
                      <td key={p.id}>{p[key]}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Approved specifications</th>
                  {products.map((p) => (
                    <td key={p.id}>
                      {p.verifiedSpecifications
                        ?.map((s) => `${s.label}: ${s.value}`)
                        .join("; ") || "Confirm with factory"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Your selection</th>
                  {products.map((p) => (
                    <td key={p.id}>
                      <AddToQuote productId={p.id} />
                      <button
                        className="text-button"
                        onClick={() => update(ids.filter((id) => id !== p.id))}
                      >
                        Remove {p.name}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="technical-note">
            Compare construction and connection requirements. This table does
            not establish suitability for an application.
          </p>
        </>
      )}
      {ids.length < 3 && (
        <label className="field compare-select">
          Add a product to compare
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) update([...ids, e.target.value]);
            }}
          >
            <option value="">Choose product</option>
            {FACTORY_PRODUCTS.filter((p) => !ids.includes(p.id)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <p className="muted small">
        Share this page URL to share your selection. No contact details are
        included.
      </p>
    </section>
  );
}
