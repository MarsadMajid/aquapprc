import type { QuoteLine } from "./inquiry";
export const DRAFT_KEY = "galaxy-inquiry-v1";
export function restoreDraft(
  raw: string | null,
  validIds: string[],
): { lines: QuoteLine[]; notice: string } {
  if (!raw) return { lines: [], notice: "" };
  try {
    const data = JSON.parse(raw);
    if (data.version !== 1 || !Array.isArray(data.lines))
      throw new Error("format");
    const seen = new Set<string>();
    const lines = data.lines
      .filter((l: QuoteLine) => {
        if (
          !l ||
          typeof l.key !== "string" ||
          seen.has(l.key) ||
          !validIds.includes(l.productId) ||
          !["size", "pressure", "quantity", "unit"].every(
            (k) => typeof l[k as keyof QuoteLine] === "string",
          ) ||
          !["metres", "pieces", "tonnes"].includes(l.unit)
        )
          return false;
        seen.add(l.key);
        return true;
      })
      .map((l: QuoteLine) => ({
        key: l.key,
        productId: l.productId,
        size: l.size.slice(0, 80),
        pressure: l.pressure.slice(0, 80),
        quantity: l.quantity.slice(0, 20),
        unit: l.unit,
      }));
    return {
      lines,
      notice:
        lines.length !== data.lines.length
          ? "Some unavailable or invalid items could not be restored."
          : "",
    };
  } catch {
    return {
      lines: [],
      notice:
        "Your saved inquiry could not be restored. Start a new product list.",
    };
  }
}
export function comparisonIds(raw: string, validIds: string[]) {
  return [...new Set(raw.split(","))]
    .filter((id) => validIds.includes(id))
    .slice(0, 3);
}
