"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { safeCatalogueReturn } from "@/lib/catalogue";
export default function ProductReturn() {
  const params = useSearchParams();
  return (
    <div className="product-return">
      <Link href={safeCatalogueReturn(params.get("returnTo"))}>
        <ArrowLeft size={17} /> Back to products
      </Link>
      <Link href="/quote">View quote list</Link>
    </div>
  );
}
