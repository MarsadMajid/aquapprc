export function catalogueUrl(category = "all", query = "") {
  const params = new URLSearchParams();
  if (["pipes", "fittings", "valves"].includes(category))
    params.set("category", category);
  if (query.trim()) params.set("q", query.slice(0, 100));
  return `/products${params.size ? `?${params}` : ""}`;
}
export function safeCatalogueReturn(value: string | null | undefined) {
  if (!value || !value.startsWith("/products") || value.startsWith("//"))
    return "/products";
  try {
    const url = new URL(value, "https://galaxy.invalid");
    if (url.origin !== "https://galaxy.invalid" || url.pathname !== "/products")
      return "/products";
    return catalogueUrl(
      url.searchParams.get("category") || "all",
      url.searchParams.get("q") || "",
    );
  } catch {
    return "/products";
  }
}
