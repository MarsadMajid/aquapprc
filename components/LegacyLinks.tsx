"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function LegacyLinks() {
  const router = useRouter();
  useEffect(() => {
    const map: Record<string, string> = {
      products: "/products",
      manufacturing: "/factory",
      "spec-tables": "/technical",
      dealership: "/dealership",
      "plant-location": "/locations",
      quote: "/quote",
    };
    const go = () => {
      const route = map[location.hash.slice(1)];
      if (route) router.replace(route);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [router]);
  return null;
}
