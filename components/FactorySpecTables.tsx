import AddToQuote from "./AddToQuote";
import { FACTORY_PRODUCTS, TECHNICAL_NOTE } from "@/data/factoryData";
export default function FactorySpecTables() {
  return (
    <section className="section" id="spec-tables">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / TECHNICAL DESK</p>
            <h2>Specify with clarity.</h2>
          </div>
          <p>
            A concise product reference for your quote request.
            <br />
            Request approved engineering data for final selection.
          </p>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Product specification reference"
        >
          <table className="spec-table">
            <caption>
              Galaxy product reference — dimensions and certified ratings
              available on confirmation
            </caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Construction</th>
                <th scope="col">Connection</th>
                <th scope="col">Requested series</th>
                <th scope="col">Technical data</th>
              </tr>
            </thead>
            <tbody>
              {FACTORY_PRODUCTS.map((p) => (
                <tr key={p.id}>
                  <th scope="row">{p.name}</th>
                  <td>{p.construction}</td>
                  <td>{p.connection}</td>
                  <td>{p.requestedClass}</td>
                  <td>
                    <AddToQuote
                      className="technical-link"
                      productId={p.id}
                      documentRequest
                    >
                      Request data
                    </AddToQuote>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="technical-callout">
          <strong>Need DIN 8077 / 8078 or ISO 15874 documentation?</strong>
          <p>
            Include the required standard and supporting documents in your
            inquiry. Standards references are not a claim of product
            certification.
          </p>
        </div>
        <p className="technical-note">{TECHNICAL_NOTE}</p>
      </div>
    </section>
  );
}
