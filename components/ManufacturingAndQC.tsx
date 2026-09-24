import Image from "next/image";
import { ArrowUpRight, Layers, Ruler, ClipboardCheck } from "lucide-react";
const stages = [
  {
    icon: Layers,
    title: "Material & construction",
    text: "Discuss the pipe series, material specification and fitting construction for your application.",
  },
  {
    icon: Ruler,
    title: "Dimensions & compatibility",
    text: "Confirm outside diameter, wall thickness, socket dimensions and connection compatibility.",
  },
  {
    icon: ClipboardCheck,
    title: "Testing & documentation",
    text: "Request applicable hydrostatic test records, batch information and compliance documents with your order.",
  },
];
export default function ManufacturingAndQC() {
  return (
    <section className="section manufacturing" id="manufacturing">
      <div className="container manufacturing-grid">
        <div>
          <p className="eyebrow light">02 / BEHIND THE PRODUCT</p>
          <h2>
            Know what goes
            <br />
            into your next order.
          </h2>
          <p className="manufacturing-intro">
            Good procurement starts with the right questions. Our factory
            inquiry process brings product requirements and documentation
            together.
          </p>
          <figure className="process-figure">
            <Image
              src="/images/products/galaxy-factory-plant.jpg"
              alt="Illustrative pipe extrusion production line"
              width={1376}
              height={768}
              sizes="(max-width: 800px) 100vw, 45vw"
            />
            <figcaption>
              Illustrative extrusion facility · actual plant photography to
              follow
            </figcaption>
          </figure>
        </div>
        <div className="process-list">
          {stages.map((s, i) => (
            <article key={s.title}>
              <span className="process-number">0{i + 1}</span>
              <div>
                <s.icon size={24} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
          <a className="technical-link" href="/quote">
            Discuss your technical requirements <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
