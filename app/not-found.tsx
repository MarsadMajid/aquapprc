import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section container empty-state">
      <p className="eyebrow">404 / CONNECTION NOT FOUND</p>
      <h1>This page isn’t in our range.</h1>
      <p>Explore the catalogue or return to the Galaxy homepage.</p>
      <div className="actions">
        <Link className="button primary" href="/products">
          Explore products
        </Link>
        <Link className="button secondary" href="/">
          Home
        </Link>
      </div>
    </section>
  );
}
