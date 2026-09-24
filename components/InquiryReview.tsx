"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Pencil,
  Mail,
  Printer,
  Download,
} from "lucide-react";
import { FACTORY_INFO } from "@/data/factoryData";
import Modal from "./Modal";
import { whatsappUrl } from "@/lib/inquiry";
export default function InquiryReview({
  message,
  onEdit,
}: {
  message: string;
  onEdit: () => void;
}) {
  const [printOpen, setPrintOpen] = useState(false);
  function download() {
    const url = URL.createObjectURL(
      new Blob([message], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "galaxy-inquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const [copyStatus, setCopyStatus] = useState("");
  const url = whatsappUrl(FACTORY_INFO.whatsapp, message);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Message copied.");
    } catch {
      setCopyStatus("Select the message below and copy it manually.");
    }
  }
  return (
    <div className="review">
      <p className="eyebrow">READY FOR YOUR REVIEW</p>
      <h3>Your request, in one place.</h3>
      <p>Check the details below. You choose when to send.</p>
      <label className="field">
        Request message
        <textarea
          className="review-message"
          readOnly
          value={message}
          rows={12}
        />
      </label>
      <div className="actions">
        {url && (
          <a
            className="button primary"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue to WhatsApp <ArrowUpRight size={18} />
          </a>
        )}
        <button className="button secondary" onClick={copy}>
          {copyStatus === "Message copied." ? (
            <Check size={17} />
          ) : (
            <Copy size={17} />
          )}
          Copy message
        </button>
        <button className="text-button" onClick={onEdit}>
          <Pencil size={16} /> Edit details
        </button>
      </div>
      <div className="actions no-print">
        <a
          className="button secondary"
          href={`mailto:${FACTORY_INFO.email}?subject=${encodeURIComponent("Galaxy PPRC inquiry")}&body=${encodeURIComponent(message)}`}
        >
          <Mail size={17} /> Email draft
        </a>
        <button className="button secondary" onClick={() => setPrintOpen(true)}>
          <Printer size={17} /> Print request
        </button>
        <button className="button secondary" onClick={download}>
          <Download size={17} /> Download text
        </button>
      </div>
      {printOpen && (
        <Modal
          title="Galaxy PPRC inquiry"
          onClose={() => setPrintOpen(false)}
          printable
        >
          <div className="modal-content">
            <pre className="print-message">{message}</pre>
            <button
              className="button secondary no-print"
              onClick={() => window.print()}
            >
              Print / save as PDF
            </button>
          </div>
        </Modal>
      )}
      <p role="status" className="small">
        {copyStatus}
      </p>
      <p className="muted small">
        {url
          ? "WhatsApp opens a draft. Your quote request is only sent after you press Send in WhatsApp."
          : "Copy your quote request to share with your Galaxy PPRC representative. Direct WhatsApp contact will be available once the factory number is confirmed."}
      </p>
      <p className="muted small">
        Product selections are saved in this browser. Contact details stay in
        memory and clear on reload. Nothing is submitted by this website.
      </p>
    </div>
  );
}
