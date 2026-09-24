export type NavigationEntry = {
  id: string;
  label: string;
  href: string;
  description: string;
  match: string[];
  children?: NavigationEntry[];
};
const entry = (
  id: string,
  label: string,
  href: string,
  description: string,
  match = [href.split("?")[0]],
): NavigationEntry => ({ id, label, href, description, match });
export const HOME = entry("home", "Home", "/", "Start with Galaxy");
export const QUOTE = entry(
  "quote",
  "Quote list",
  "/quote",
  "Review your saved products and share a request",
);
export const NAVIGATION: NavigationEntry[] = [
  {
    ...entry("products", "Products", "/products", "Find the right connection", [
      "/products",
      "/product-finder",
      "/compare",
      "/technical",
    ]),
    children: [
      entry(
        "all",
        "All products",
        "/products",
        "Browse the complete piping range",
      ),
      entry(
        "pipes",
        "Pipes",
        "/products?category=pipes",
        "PN20 and fiber composite pipes",
      ),
      entry(
        "fittings",
        "Fittings",
        "/products?category=fittings",
        "Elbows, tees and threaded connections",
      ),
      entry(
        "valves",
        "Valves",
        "/products?category=valves",
        "Explore flow-control products",
      ),
      entry(
        "finder",
        "Help me choose",
        "/product-finder",
        "A few questions about your project",
      ),
      entry(
        "compare",
        "Compare products",
        "/compare",
        "See up to three products side by side",
      ),
      entry(
        "technical",
        "Specifications & documents",
        "/technical",
        "Product references and document requests",
      ),
    ],
  },
  {
    ...entry("about", "About Galaxy", "/factory", "Meet the business", [
      "/factory",
      "/dealership",
    ]),
    children: [
      entry(
        "factory",
        "Our factory",
        "/factory",
        "Manufacturing information and our story",
      ),
      entry(
        "dealer",
        "Become a dealer",
        "/dealership",
        "Discuss distribution and partnership",
      ),
    ],
  },
  {
    ...entry("visit", "Visit & Contact", "/locations", "Find the right place", [
      "/locations",
    ]),
    children: [
      entry(
        "locations",
        "Locations & contact",
        "/locations",
        "Choose the factory or the retail shop",
      ),
      entry(
        "plant",
        "Galaxy factory",
        "/locations/factory",
        "Millat Road — commercial inquiries",
      ),
      entry(
        "shop",
        "Asia Pipe Store",
        "/locations/asia-pipe-store",
        "Railway Road — local retail and collection",
      ),
    ],
  },
];
export function matchesRoute(item: NavigationEntry, pathname: string) {
  return item.match.some((path) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`),
  );
}
export function navigationHref(item: NavigationEntry, compared: string[] = []) {
  return item.id === "compare" && compared.length
    ? `/compare?ids=${compared.join(",")}`
    : item.href;
}
export function routeLabel(pathname: string) {
  return (
    [HOME, QUOTE, ...NAVIGATION.flatMap((group) => group.children || [])].find(
      (item) => item.href === pathname,
    )?.label || ""
  );
}
