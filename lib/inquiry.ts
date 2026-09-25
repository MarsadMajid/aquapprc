export type QuoteLine = {
  key: string;
  productId: string;
  size: string;
  pressure: string;
  quantity: string;
  unit: string;
};
export type Customer = {
  name: string;
  phone: string;
  city: string;
  notes: string;
};
export function validateQuote(
  customer: Customer,
  lines: QuoteLine[],
  allowGeneral = false,
): string {
  if (!customer.name.trim() || !customer.city.trim())
    return "Please enter your name or company and delivery city.";
  const digits = customer.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15)
    return "Please enter a phone number with 10 to 15 digits, including your area or country code.";
  if (!lines.length && !(allowGeneral && customer.notes.trim()))
    return "Add at least one product to your inquiry.";
  if (
    lines.some(
      (l) =>
        !l.productId ||
        !l.size.trim() ||
        !l.pressure.trim() ||
        !l.unit ||
        !Number.isFinite(Number(l.quantity)) ||
        Number(l.quantity) <= 0 ||
        (l.unit === "pieces" && !Number.isInteger(Number(l.quantity))),
    )
  )
    return "Each item needs a product, size, pressure class and positive quantity. Pieces must be whole numbers.";
  return "";
}
export function buildQuote(
  customer: Customer,
  lines: QuoteLine[],
  names: Record<string, string>,
): string {
  return [
    "AQUA PPRC — FACTORY QUOTE REQUEST",
    `Customer / company: ${customer.name.trim()}`,
    `Contact: ${customer.phone.trim()}`,
    `Delivery city: ${customer.city.trim()}`,
    "",
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${names[l.productId] || l.productId} | Size: ${l.size.trim()} | Class: ${l.pressure.trim()} | Quantity: ${l.quantity} ${l.unit}`,
    ),
    "",
    `Notes / required documents: ${customer.notes.trim() || "None specified"}`,
    "Please confirm available sizes, approved specifications, pricing and dispatch timing.",
  ].join("\n");
}
export function whatsappUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return /^\d{10,15}$/.test(digits)
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : "";
}
