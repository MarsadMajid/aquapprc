"use client";
import { GitCompareArrows } from "lucide-react";
import { useInquiry } from "./InquiryProvider";
export default function CompareButton({ id }: { id: string }) {
  const { compared, toggleCompare } = useInquiry();
  return (
    <button
      className="compare-button"
      aria-pressed={compared.includes(id)}
      onClick={() => toggleCompare(id)}
    >
      <GitCompareArrows size={16} />
      {compared.includes(id) ? "Selected" : "Compare"}
    </button>
  );
}
