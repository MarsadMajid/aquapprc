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

export const HOME = entry("home", "Home", "/", "Start with Aqua PPRC");
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
        "Single-layer & 2-layer PPRC pipes",
      ),
      entry(
        "fittings",
        "Fittings",
        "/products?category=fittings",
        "Sockets, elbows, tees & threaded fittings",
      ),
      entry(
        "valves",
        "Valves",
        "/products?category=valves",
        "Gate valves, ball valves & flow control",
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
    ...entry("about", "About Aqua PPRC", "/factory", "Meet the business", [
      "/factory",
      "/dealership",
    ]),
    children: [
      entry(
        "factory",
        "Our factory",
        "/factory",
        "Manufacturing information and quality assurance",
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
        "Choose the factory or retail outlet",
      ),
      entry(
        "plant",
        "Aqua PPRC factory",
        "/locations/factory",
        "Millat Road — commercial & factory direct",
      ),
      entry(
        "shop",
        "Asia Pipe Store",
        "/locations/asia-pipe-store",
        "Railway Road — retail outlet & wholesale depot",
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
