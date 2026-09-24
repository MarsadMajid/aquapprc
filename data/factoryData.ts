export type ModelId = "pn20" | "fiber" | "elbow" | "tee" | "socket" | "valve";
export interface FactoryProduct {
  slug: string;
  model: { kind: "procedural"; id: ModelId } | { kind: "glb"; src: string };
  poster: string;
  modes: string[];
  features: { title: string; description: string }[];
  related: string[];
  verifiedSpecifications?: { label: string; value: string }[];
  documents?: { title: string; url: string }[];
  approvedPhotographs?: { src: string; alt: string }[];
  translations?: {
    ur?: {
      name: string;
      description: string;
      construction: string;
      connection: string;
    };
  };
  verification: "illustrative" | "factory-approved";
  id: string;
  name: string;
  category: "pipes" | "fittings" | "valves";
  image: string;
  label: string;
  description: string;
  construction: string;
  connection: string;
  requestedClass: string;
}

function publicUrl(value: string | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
}
export const FACTORY_INFO = {
  name: "Galaxy PPRC Pipes & Fittings",
  address: "Chak 117 JB, Millat Road, Faisalabad, Punjab, Pakistan",
  googleMapsUrl: "https://share.google/jY8iwa4y5t4W72Xaq",
  whatsapp: (
    process.env.NEXT_PUBLIC_FACTORY_WHATSAPP || "923216661900"
  ).replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_FACTORY_EMAIL || "sales@galaxypprc.com",
  siteUrl: publicUrl(process.env.NEXT_PUBLIC_SITE_URL),
  shopUrl: publicUrl(process.env.NEXT_PUBLIC_SHOP_URL),
  flagshipDepot: {
    name: "Asia Pipe Store",
    location: "Railway Road, Sadiq Market",
  },
};

export const FACTORY_PRODUCTS: FactoryProduct[] = [
  {
    id: "pn20",
    slug: "pprc-pn20-pipe",
    model: { kind: "procedural", id: "pn20" },
    poster: "/images/models/pn20-studio.png",
    modes: ["Whole", "Section"],
    related: ["fiber", "elbow", "tee"],
    features: [
      {
        title: "Hollow bore",
        description: "Inspect the open pipe bore in this illustrative model.",
      },
      {
        title: "Fusion connection",
        description: "Request the matching socket size with your inquiry.",
      },
    ],
    verification: "illustrative",
    name: "PPRC PN20 pipe",
    category: "pipes",
    image: "galaxy-pprc-pipe.jpg",
    label: "HOT & COLD WATER",
    description:
      "A practical starting point for your hot and cold water piping requirements.",
    construction: "PPRC pipe",
    connection: "Socket fusion",
    requestedClass: "PN20",
  },
  {
    id: "fiber",
    slug: "fiber-composite-pipe",
    model: { kind: "procedural", id: "fiber" },
    poster: "/images/models/fiber-studio.png",
    modes: ["Whole", "Section", "Layers"],
    related: ["pn20", "elbow", "valve"],
    features: [
      {
        title: "Outer layer",
        description: "The outer polymer layer is shown in Galaxy green.",
      },
      {
        title: "Reinforced middle",
        description:
          "A contrasting middle layer illustrates the composite construction.",
      },
      {
        title: "Inner layer",
        description: "The inner layer is visible in the sectional view.",
      },
    ],
    verification: "illustrative",
    name: "Fiber composite pipe",
    category: "pipes",
    image: "galaxy-fiber-pipe.jpg",
    label: "COMPOSITE SERIES",
    description:
      "Specify the reinforced pipe series for your next building or distribution project.",
    construction: "Three-layer fiber composite",
    connection: "Socket fusion",
    requestedClass: "PN25",
  },
  {
    id: "elbow",
    slug: "90-degree-fusion-elbow",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["pn20", "tee", "socket"],
    features: [
      {
        title: "Right-angle turn",
        description: "Two sockets illustrate a 90-degree change of direction.",
      },
      {
        title: "Socket openings",
        description: "Rotate the fitting to inspect both connection openings.",
      },
    ],
    verification: "illustrative",
    name: "90° fusion elbow",
    category: "fittings",
    image: "galaxy-pprc-elbow.jpg",
    label: "DIRECTIONAL FITTINGS",
    description: "A right-angle connection for routing your PPRC pipe system.",
    construction: "PPRC elbow",
    connection: "Socket fusion",
    requestedClass: "Confirm with factory",
  },
  {
    id: "tee",
    slug: "equal-fusion-tee",
    model: { kind: "procedural", id: "tee" },
    poster: "/images/models/tee-studio.png",
    modes: ["Whole"],
    related: ["pn20", "elbow", "valve"],
    features: [
      {
        title: "Three branches",
        description: "Three equal openings illustrate a branching connection.",
      },
      {
        title: "Fusion sockets",
        description: "Confirm connection dimensions with the factory.",
      },
    ],
    verification: "illustrative",
    name: "Equal fusion tee",
    category: "fittings",
    image: "galaxy-pprc-tee.jpg",
    label: "BRANCH CONNECTIONS",
    description:
      "Bring three equal pipe branches together in a single fitting.",
    construction: "PPRC equal tee",
    connection: "Socket fusion",
    requestedClass: "Confirm with factory",
  },
  {
    id: "socket",
    slug: "brass-threaded-socket",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole", "Exploded"],
    related: ["pn20", "elbow", "valve"],
    features: [
      {
        title: "Brass insert",
        description:
          "A threaded brass insert illustrates the metal transition.",
      },
      {
        title: "Polymer body",
        description: "Use the separated view to inspect the two components.",
      },
    ],
    verification: "illustrative",
    name: "Brass threaded socket",
    category: "fittings",
    image: "galaxy-brass-socket.jpg",
    label: "THREADED TRANSITIONS",
    description:
      "Connect PPRC pipework to threaded fixtures. Include your thread size in the inquiry.",
    construction: "PPRC body with brass insert",
    connection: "Fusion × female thread",
    requestedClass: "Confirm with factory",
  },
  {
    id: "valve",
    slug: "pprc-ball-valve",
    model: { kind: "procedural", id: "valve" },
    poster: "/images/models/valve-studio.png",
    modes: ["Whole", "Open", "Closed"],
    related: ["pn20", "fiber", "socket"],
    features: [
      {
        title: "Lever operation",
        description:
          "Toggle Open and Closed to demonstrate a quarter-turn lever.",
      },
      {
        title: "Brass core",
        description:
          "The illustrative brass core sits inside the polymer body.",
      },
    ],
    verification: "illustrative",
    name: "PPRC ball valve",
    category: "valves",
    image: "galaxy-ball-valve.jpg",
    label: "FLOW CONTROL",
    description: "A lever-operated isolation valve for your pipework schedule.",
    construction: "PPRC valve with brass core",
    connection: "Socket fusion",
    requestedClass: "Confirm with factory",
  },
];
export const TECHNICAL_NOTE =
  "Final sizes, pressure/temperature ratings, dimensions and compliance documents must be confirmed against the factory-approved datasheet before specification or installation.";
