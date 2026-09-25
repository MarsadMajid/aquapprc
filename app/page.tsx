import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import FactoryHero from "@/components/FactoryHero";
import PlantLocation from "@/components/PlantLocation";
import LegacyLinks from "@/components/LegacyLinks";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "PPRC pipes, fittings & possibilities",
  "/",
  "Explore Aqua PPRC in 3D. Compare pipes and fittings, build a factory inquiry and find our Faisalabad locations.",
);
export default function Page() {
  return (
    <>
      <LegacyLinks />
      <FactoryHero />
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE AQUA PPRC COLLECTION</p>
            <h2>
              Different parts.
              <br />A complete perspective.
            </h2>
          </div>
          <Link href="/products" className="text-button">
            View all products <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="family-grid">
          {[
            {
              name: "Pipes",
              id: "fiber",
              category: "pipes",
              text: "The starting point of your system.",
            },
            {
              name: "Fittings",
              id: "elbow",
              category: "fittings",
              text: "Give your project direction.",
            },
            {
              name: "Valves",
              id: "valve",
              category: "valves",
              text: "Put flow in your hands.",
            },
          ].map((x, i) => (
            <Link
              key={x.id}
              href={`/products?category=${x.category}`}
              className="family-card"
            >
              <div className="family-image">
                <Image
                  src={`/images/models/${x.id}-studio.png`}
                  alt={`${x.name} illustrative model`}
                  fill
                  sizes="(max-width:700px) 100vw, 33vw"
                />
                <span className="mono">0{i + 1} / AQUA PPRC</span>
              </div>
              <div>
                <h3>
                  {x.name}
                  <ArrowUpRight size={24} />
                </h3>
                <p>{x.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="inside-section">
        <div className="container inside-grid">
          <div className="inside-image">
            <Image
              src="/images/models/fiber-layers-studio.png"
              alt="Illustrative separated layers of a fiber composite pipe"
              fill
              sizes="(max-width:800px) 100vw, 55vw"
            />
          </div>
          <div>
            <p className="eyebrow">MORE THAN MEETS THE EYE</p>
            <h2>
              Get to know
              <br />
              what’s inside.
            </h2>
            <p>
              Explore the layers of a composite pipe. Our interactive product
              views turn a catalogue into a closer look at construction and
              connection.
            </p>
            <Link
              className="button secondary"
              href="/products/single-layer-pprc-pipe"
            >
              Explore PPRC pipes <ArrowRight size={18} />
            </Link>
            <span className="small muted">
              Illustrative construction. Not an engineering drawing.
            </span>
          </div>
        </div>
      </section>
      <section className="section container story-grid">
        <div>
          <p className="eyebrow">FROM FAISALABAD</p>
          <h2>
            The people behind
            <br />
            your next order.
          </h2>
          <p>
            Start a conversation about product requirements, manufacturing
            information and the documents your project needs.
          </p>
          <Link className="technical-link" href="/factory">
            Meet the factory <ArrowUpRight size={17} />
          </Link>
        </div>
        <figure>
          <Image
            src="/images/products/galaxy-factory-plant.jpg"
            width={1376}
            height={768}
            alt="Illustrative pipe extrusion facility"
            sizes="(max-width:800px) 100vw, 50vw"
          />
          <figcaption>Illustrative facility visual</figcaption>
        </figure>
      </section>
      <section className="partner-strip">
        <div className="container">
          <div>
            <p className="eyebrow light">GROW WITH AQUA PPRC</p>
            <h2>
              Local knowledge.
              <br />
              Shared ambition.
            </h2>
          </div>
          <div>
            <p>
              Retailer, stockist or distributor?
              <br />
              Let’s discuss what comes next.
            </p>
            <Link className="button primary" href="/dealership">
              Become a dealer <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <PlantLocation />
    </>
  );
}
