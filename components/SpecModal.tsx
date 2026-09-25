"use client";
import { Printer } from "lucide-react";
import {
  FACTORY_INFO,
  TECHNICAL_NOTE,
  type FactoryProduct,
} from "@/data/factoryData";
import Modal from "./Modal";
export default function SpecModal({
  product,
  onClose,
}: {
  product: FactoryProduct;
  onClose: () => void;
}) {
  return (
    <Modal
      title={`${product.name} — product sheet`}
      onClose={onClose}
      printable
    >
      <div className="modal-content">
        <p className="eyebrow">AQUA PPRC / PRODUCT INFORMATION</p>
        <h3 className="sheet-title">{product.name}</h3>
        <p>{product.description}</p>
        <table className="spec-table sheet-table">
          <caption>Product overview</caption>
          <tbody>
            {[
              ["Product family", product.category],
              ["Construction", product.construction],
              ["Connection", product.connection],
              ["Requested series", product.requestedClass],
              ["Sizes & dimensions", "Confirm with factory"],
              ["Approved technical datasheet", "Request with your inquiry"],
            ].map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="technical-note">{TECHNICAL_NOTE}</p>
        <p className="muted small">
          {FACTORY_INFO.name}
          <br />
          {FACTORY_INFO.address}
        </p>
        <button
          className="button secondary no-print"
          onClick={() => window.print()}
        >
          <Printer size={17} /> Print product sheet / save as PDF
        </button>
      </div>
    </Modal>
  );
}
