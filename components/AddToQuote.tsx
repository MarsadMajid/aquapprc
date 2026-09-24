"use client";
import { Plus } from "lucide-react";
import { useInquiry } from "./InquiryProvider";
export default function AddToQuote({
  productId,
  children = "Add to quote",
  className = "quote-link",
  documentRequest = false,
}: {
  productId: string;
  children?: React.ReactNode;
  className?: string;
  documentRequest?: boolean;
}) {
  const { add, ready, setCustomer } = useInquiry();
  return (
    <button
      disabled={!ready}
      className={className}
      onClick={() => {
        add(productId);
        if (documentRequest)
          setCustomer((prev) => ({
            ...prev,
            notes: [
              prev.notes,
              `Please provide approved technical documents for product reference ${productId}.`,
            ]
              .filter(Boolean)
              .join("\n"),
          }));
      }}
    >
      {children}
      <Plus size={16} />
    </button>
  );
}
