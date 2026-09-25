export type ModelId = "pn20" | "fiber" | "elbow" | "tee" | "socket" | "valve";

export interface AvailableSize {
  label: string;
  detail?: string;
}

export interface FactoryProduct {
  id: string;
  slug: string;
  name: string;
  category: "pipes" | "fittings" | "valves";
  label: string;
  description: string;
  construction: string;
  connection: string;
  requestedClass: string;
  model: { kind: "procedural"; id: ModelId } | { kind: "glb"; src: string };
  poster: string;
  image: string;
  modes: string[];
  features: { title: string; description: string }[];
  related: string[];
  sizes?: string[];
  verifiedSpecifications?: { label: string; value: string }[];
  documents?: { title: string; url: string }[];
  verification: "illustrative" | "factory-approved";
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

export const FACTORY_CONTACTS = [
  {
    role: "Owner & Executive Sales",
    name: "Factory Direct",
    phone: "+92 300 6661900",
    whatsapp: "923006661900",
    description: "Direct factory inquiries, bulk specifications & executive orders",
  },
  {
    role: "Sales Manager & Co-Owner",
    name: "Management & Sales",
    phone: "+92 300 2828860",
    whatsapp: "923002828860",
    description: "Dealer onboarding, B2B quotes & trade account inquiries",
  },
  {
    role: "Distributor & Wholesale Outlet",
    name: "Asia Pipe Store (Shop)",
    phone: "+92 308 7500960",
    whatsapp: "923087500960",
    description: "Wholesale distribution, shop stockists & immediate retail collection",
  },
  {
    role: "Online & Retail Support",
    name: "Sales & Web Inquiries",
    phone: "+92 300 6606097",
    whatsapp: "923006606097",
    description: "Online catalog support, quote assistance & general product guidance",
  },
];

export const FACTORY_INFO = {
  name: "Aqua PPRC Pipes & Fittings",
  shortName: "Aqua PPRC",
  address: "Chak 117 JB, Millat Road, Faisalabad, Punjab, Pakistan",
  googleMapsUrl: "https://share.google/jY8iwa4y5t4W72Xaq",
  whatsapp: (
    process.env.NEXT_PUBLIC_FACTORY_WHATSAPP || "923006661900"
  ).replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_FACTORY_EMAIL || "sales@aquapprc.com",
  siteUrl: publicUrl(process.env.NEXT_PUBLIC_SITE_URL),
  shopUrl: publicUrl(process.env.NEXT_PUBLIC_SHOP_URL),
  flagshipDepot: {
    name: "Asia Pipe Store",
    location: "Railway Road, Sadiq Market, Faisalabad",
    phone: "+92 308 7500960",
  },
  contacts: FACTORY_CONTACTS,
};

export const FACTORY_PRODUCTS: FactoryProduct[] = [
  {
    id: "pn20",
    slug: "single-layer-pprc-pipe",
    model: { kind: "procedural", id: "pn20" },
    poster: "/images/models/pn20-studio.png",
    modes: ["Whole", "Section"],
    related: ["double-layer", "elbow", "tee", "socket"],
    features: [
      {
        title: "Single-layer PPRC construction",
        description: "Pure PPRC raw material engineered for durable water distribution.",
      },
      {
        title: "PN20 & PN25 pressure classes",
        description: "Available in PN20 and PN25 pressure ratings to match project specs.",
      },
    ],
    verification: "factory-approved",
    name: "Single-Layer PPRC Pipe",
    category: "pipes",
    image: "aqua-pprc-pipe.jpg",
    label: "HOT & COLD WATER PIPES",
    description: "High-grade single-layer PPRC pipe engineered for hot and cold water distribution systems.",
    construction: "Single-layer high-density PPRC",
    connection: "Socket fusion",
    requestedClass: "PN20 / PN25",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "double-layer",
    slug: "double-layer-pprc-pipe",
    model: { kind: "procedural", id: "fiber" },
    poster: "/images/models/fiber-studio.png",
    modes: ["Whole", "Section", "Layers"],
    related: ["pn20", "elbow", "valve"],
    features: [
      {
        title: "2-Layer co-extruded structure",
        description: "Dual-layer polymer design for enhanced strength and thermal efficiency.",
      },
      {
        title: "PN20 & PN25 rating options",
        description: "Specify PN20 or PN25 pressure resistance for demanding installations.",
      },
    ],
    verification: "factory-approved",
    name: "Double-Layer (2-Layer) PPRC Pipe",
    category: "pipes",
    image: "aqua-double-layer-pipe.jpg",
    label: "DUAL-LAYER PIPES",
    description: "Reinforced 2-layer PPRC piping designed for high-durability plumbing applications.",
    construction: "2-Layer co-extruded PPRC polymer",
    connection: "Socket fusion",
    requestedClass: "PN20 / PN25",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "socket",
    slug: "pprc-socket",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole"],
    related: ["socket-female", "socket-reduce", "elbow"],
    features: [
      {
        title: "Fusion jointing",
        description: "Straight line coupler for joining two PPRC pipe segments.",
      },
    ],
    verification: "factory-approved",
    name: "PPRC Socket",
    category: "fittings",
    image: "aqua-socket.jpg",
    label: "STRAIGHT COUPLERS",
    description: "Standard straight socket coupler for joining PPRC pipes of equal diameter.",
    construction: "PPRC body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "socket-female",
    slug: "female-threaded-socket",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole", "Exploded"],
    related: ["socket", "socket-male", "elbow-female"],
    features: [
      {
        title: "Brass female thread insert",
        description: "Precision threaded brass insert for sanitary fixtures and valves.",
      },
    ],
    verification: "factory-approved",
    name: "Female Threaded Socket",
    category: "fittings",
    image: "aqua-female-socket.jpg",
    label: "THREADED TRANSITIONS",
    description: "PPRC socket with high-grade female brass insert for connecting to threaded valves and fixtures.",
    construction: "PPRC body with brass female insert",
    connection: "Fusion × female thread",
    requestedClass: "Confirm with factory",
    sizes: [
      "25 × 1/2\"", "25 × 3/4\"", "32 × 1/2\"", "32 × 3/4\"", "32 × 1\"",
      "40 × 1\"", "40 × 1 1/4\"", "50 × 1 1/2\"", "63 × 2\""
    ],
  },
  {
    id: "socket-reduce",
    slug: "reducing-socket",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole"],
    related: ["socket", "elbow-reduce", "tee-reduce"],
    features: [
      {
        title: "Step-down reducer",
        description: "Smooth reduction coupler for transitioning between different pipe sizes.",
      },
    ],
    verification: "factory-approved",
    name: "Reducing Socket",
    category: "fittings",
    image: "aqua-reducing-socket.jpg",
    label: "REDUCING FITTINGS",
    description: "PPRC reducer socket for connecting larger diameter mainlines to smaller branch lines.",
    construction: "PPRC reducer body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: [
      "32 × 25", "40 × 25", "40 × 32", "50 × 25", "50 × 32",
      "50 × 40", "63 × 25", "63 × 32", "63 × 40", "63 × 50"
    ],
  },
  {
    id: "socket-male",
    slug: "male-threaded-socket",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole", "Exploded"],
    related: ["socket-female", "socket"],
    features: [
      {
        title: "Brass male thread insert",
        description: "Heavy-duty male threaded brass core for direct equipment connection.",
      },
    ],
    verification: "factory-approved",
    name: "Male Threaded Socket",
    category: "fittings",
    image: "aqua-male-socket.jpg",
    label: "THREADED TRANSITIONS",
    description: "PPRC coupler with brass male thread for connecting to female threaded equipment.",
    construction: "PPRC body with brass male insert",
    connection: "Fusion × male thread",
    requestedClass: "Confirm with factory",
    sizes: [
      "25 × 1/2\"", "25 × 3/4\"", "32 × 3/4\"", "32 × 1\"",
      "40 × 1\"", "40 × 1 1/4\"", "50 × 1 1/2\"", "63 × 2\""
    ],
  },
  {
    id: "elbow",
    slug: "90-degree-fusion-elbow",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["elbow-female", "elbow-reduce", "tee"],
    features: [
      {
        title: "90-degree turn",
        description: "Smooth internal radius for low head loss during direction changes.",
      },
    ],
    verification: "factory-approved",
    name: "90° Fusion Elbow",
    category: "fittings",
    image: "aqua-elbow.jpg",
    label: "DIRECTIONAL FITTINGS",
    description: "Standard 90-degree elbow fitting for routing PPRC piping around corners.",
    construction: "PPRC elbow body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "elbow-female",
    slug: "female-threaded-elbow",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["elbow", "socket-female", "elbow-mixer"],
    features: [
      {
        title: "90° female brass transition",
        description: "Allows wall-mounted taps and mixers to connect at a 90° angle.",
      },
    ],
    verification: "factory-approved",
    name: "Female Threaded Elbow",
    category: "fittings",
    image: "aqua-female-elbow.jpg",
    label: "THREADED DIRECTIONAL",
    description: "90-degree elbow featuring a female brass thread for faucet and fixture connection.",
    construction: "PPRC body with female brass insert",
    connection: "Fusion × female thread",
    requestedClass: "Confirm with factory",
    sizes: [
      "25 × 1/2\"", "25 × 3/4\"", "32 × 1/2\"", "32 × 3/4\"", "32 × 1\"",
      "40 × 1\"", "40 × 1 1/4\"", "50 × 1 1/2\"", "63 × 2\""
    ],
  },
  {
    id: "elbow-reduce",
    slug: "reducing-elbow",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["elbow", "socket-reduce"],
    features: [
      {
        title: "Combined bend & reducer",
        description: "Changes direction by 90 degrees while reducing pipe size.",
      },
    ],
    verification: "factory-approved",
    name: "Reducing Elbow",
    category: "fittings",
    image: "aqua-reducing-elbow.jpg",
    label: "REDUCING DIRECTIONAL",
    description: "90-degree elbow with unequal socket diameters for simultaneously turning and reducing pipe diameter.",
    construction: "PPRC reducing elbow body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: [
      "32 × 25", "40 × 25", "40 × 32", "50 × 25", "50 × 32",
      "50 × 40", "63 × 25", "63 × 32", "63 × 40", "63 × 50"
    ],
  },
  {
    id: "elbow-mixer",
    slug: "mixer-elbow",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["elbow-female", "elbow"],
    features: [
      {
        title: "Dual brass outlets",
        description: "Fixed distance dual-female thread elbow designed specifically for bathroom shower mixers.",
      },
    ],
    verification: "factory-approved",
    name: "Mixer Elbow",
    category: "fittings",
    image: "aqua-mixer-elbow.jpg",
    label: "WALL MIXER FITTING",
    description: "Specialized double-elbow with fixed brass female threads for mounting wall shower mixers.",
    construction: "PPRC body with twin brass female inserts",
    connection: "Fusion × female thread",
    requestedClass: "Standard",
    sizes: ["25 × 1/2\""],
  },
  {
    id: "tee",
    slug: "equal-fusion-tee",
    model: { kind: "procedural", id: "tee" },
    poster: "/images/models/tee-studio.png",
    modes: ["Whole"],
    related: ["tee-female", "tee-reduce", "elbow"],
    features: [
      {
        title: "3-Way branch connection",
        description: "Equal-diameter three-way tee fitting for splitting or combining fluid flow.",
      },
    ],
    verification: "factory-approved",
    name: "Equal Fusion Tee",
    category: "fittings",
    image: "aqua-tee.jpg",
    label: "BRANCH CONNECTIONS",
    description: "Three-way equal tee for branching pipeline runs in residential and commercial plumbing.",
    construction: "PPRC equal tee body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "tee-female",
    slug: "female-threaded-tee",
    model: { kind: "procedural", id: "tee" },
    poster: "/images/models/tee-studio.png",
    modes: ["Whole"],
    related: ["tee", "socket-female", "elbow-female"],
    features: [
      {
        title: "Center branch brass thread",
        description: "Branch leg includes a brass female insert for gauge or valve takeoff.",
      },
    ],
    verification: "factory-approved",
    name: "Female Threaded Tee",
    category: "fittings",
    image: "aqua-female-tee.jpg",
    label: "THREADED BRANCH",
    description: "Three-way tee with female brass thread on the branch leg for takeoff connections.",
    construction: "PPRC body with brass female branch insert",
    connection: "Fusion × female thread",
    requestedClass: "Confirm with factory",
    sizes: [
      "25 × 1/2\"", "25 × 3/4\"", "32 × 1/2\"", "32 × 3/4\"", "32 × 1\"",
      "40 × 1\"", "40 × 1 1/4\"", "50 × 1 1/2\"", "63 × 2\""
    ],
  },
  {
    id: "tee-reduce",
    slug: "reducing-tee",
    model: { kind: "procedural", id: "tee" },
    poster: "/images/models/tee-studio.png",
    modes: ["Whole"],
    related: ["tee", "socket-reduce", "elbow-reduce"],
    features: [
      {
        title: "Reduced branch leg",
        description: "Branches off a smaller pipe diameter from the main run.",
      },
    ],
    verification: "factory-approved",
    name: "Reducing Tee",
    category: "fittings",
    image: "aqua-reducing-tee.jpg",
    label: "REDUCING BRANCH",
    description: "Three-way tee with a smaller branch outlet diameter for feeding secondary lines.",
    construction: "PPRC reducing tee body",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: [
      "32 × 25", "40 × 25", "40 × 32", "50 × 25", "50 × 32",
      "50 × 40", "63 × 25", "63 × 32", "63 × 40", "63 × 50"
    ],
  },
  {
    id: "gate-valve",
    slug: "pprc-gate-valve",
    model: { kind: "procedural", id: "valve" },
    poster: "/images/models/valve-studio.png",
    modes: ["Whole", "Open", "Closed"],
    related: ["gate-valve-full-bore", "fancy-gate-valve", "valve"],
    features: [
      {
        title: "Multi-turn wheel control",
        description: "Smooth multi-turn gate valve for precise flow control and complete shut-off.",
      },
    ],
    verification: "factory-approved",
    name: "PPRC Gate Valve",
    category: "valves",
    image: "aqua-gate-valve.jpg",
    label: "LINE CONTROL VALVES",
    description: "PPRC gate valve featuring a handwheel operated isolation wedge for main water control.",
    construction: "PPRC body with brass gate mechanism",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "gate-valve-full-bore",
    slug: "gate-valve-full-bore",
    model: { kind: "procedural", id: "valve" },
    poster: "/images/models/valve-studio.png",
    modes: ["Whole", "Open", "Closed"],
    related: ["gate-valve", "fancy-gate-valve"],
    features: [
      {
        title: "Unrestricted internal bore",
        description: "Full-bore internal waterway ensures maximum flow rate with minimal pressure drop.",
      },
    ],
    verification: "factory-approved",
    name: "Gate Valve (Full Bore)",
    category: "valves",
    image: "aqua-gate-valve-fullbore.jpg",
    label: "FULL FLOW CONTROL",
    description: "Full bore PPRC gate valve designed for maximum fluid flow efficiency and zero restriction.",
    construction: "PPRC body with full-bore internal valve mechanism",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm"],
  },
  {
    id: "fancy-gate-valve",
    slug: "fancy-gate-valve",
    model: { kind: "procedural", id: "valve" },
    poster: "/images/models/valve-studio.png",
    modes: ["Whole", "Open", "Closed"],
    related: ["gate-valve", "valve"],
    features: [
      {
        title: "Decorative chrome handle",
        description: "Premium finish handle designed for exposed bathroom and kitchen installations.",
      },
    ],
    verification: "factory-approved",
    name: "Fancy Gate Valve",
    category: "valves",
    image: "aqua-fancy-gate-valve.jpg",
    label: "DECORATIVE VALVES",
    description: "Aesthetically styled PPRC gate valve with chrome finish handle for visible indoor plumbing.",
    construction: "PPRC body with decorative chrome valve handle",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm"],
  },
  {
    id: "valve",
    slug: "pprc-ball-valve",
    model: { kind: "procedural", id: "valve" },
    poster: "/images/models/valve-studio.png",
    modes: ["Whole", "Open", "Closed"],
    related: ["gate-valve", "socket", "pn20"],
    features: [
      {
        title: "Quarter-turn lever handle",
        description: "Quick quarter-turn action for instant isolation of pipe sections.",
      },
    ],
    verification: "factory-approved",
    name: "PPRC Ball Valve",
    category: "valves",
    image: "aqua-ball-valve.jpg",
    label: "QUICK ISOLATION VALVES",
    description: "Lever-operated PPRC ball valve for rapid quarter-turn flow shut-off.",
    construction: "PPRC body with internal brass ball core",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "union",
    slug: "plastic-union",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole", "Exploded"],
    related: ["socket", "valve"],
    features: [
      {
        title: "Demountable joint",
        description: "Allows piping sections or pumps to be disconnected easily for maintenance.",
      },
    ],
    verification: "factory-approved",
    name: "Plastic Union",
    category: "fittings",
    image: "aqua-plastic-union.jpg",
    label: "DISCONNECTABLE FITTINGS",
    description: "Three-piece PPRC union fitting enabling easy disassembly of equipment without cutting pipes.",
    construction: "PPRC 3-piece union with sealing ring",
    connection: "Socket fusion × threaded union ring",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "over-cross",
    slug: "over-cross",
    model: { kind: "procedural", id: "elbow" },
    poster: "/images/models/elbow-studio.png",
    modes: ["Whole"],
    related: ["elbow", "socket"],
    features: [
      {
        title: "Crossover bridge design",
        description: "Specially curved pipe bridge allowing one pipeline to cross over another in wall channels.",
      },
    ],
    verification: "factory-approved",
    name: "Over Cross",
    category: "fittings",
    image: "aqua-over-cross.jpg",
    label: "PIPE CROSSOVER BRIDGES",
    description: "Pre-formed PPRC crossover bridge fitting for bypassing intersecting pipe runs in tight spaces.",
    construction: "Single-piece curved PPRC bridge",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm"],
  },
  {
    id: "end-cap",
    slug: "end-cap",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole"],
    related: ["plug", "socket"],
    features: [
      {
        title: "Permanent end seal",
        description: "Used to permanently close off pipeline ends or pressure testing points.",
      },
    ],
    verification: "factory-approved",
    name: "End Cap",
    category: "fittings",
    image: "aqua-end-cap.jpg",
    label: "PIPELINE TERMINATION",
    description: "Domed PPRC end cap for permanently sealing pipe ends in fusion installations.",
    construction: "PPRC solid cap",
    connection: "Socket fusion",
    requestedClass: "Standard",
    sizes: ["25 mm", "32 mm", "40 mm", "50 mm", "63 mm"],
  },
  {
    id: "plug",
    slug: "threaded-plug",
    model: { kind: "procedural", id: "socket" },
    poster: "/images/models/socket-studio.png",
    modes: ["Whole"],
    related: ["end-cap", "socket-female"],
    features: [
      {
        title: "Temporary or test plug",
        description: "Threaded plug for temporarily sealing female threaded fittings during pressure testing.",
      },
    ],
    verification: "factory-approved",
    name: "Threaded Plug",
    category: "fittings",
    image: "aqua-threaded-plug.jpg",
    label: "TEST & SEAL PLUGS",
    description: "Threaded PPRC plug for sealing brass female socket or elbow openings during pressure testing.",
    construction: "PPRC threaded plug body",
    connection: "Male thread",
    requestedClass: "Standard",
    sizes: ["1/2\"", "3/4\"", "1\""],
  },
];

export const TECHNICAL_NOTE =
  "Sizes, pressure ratings, dimensions and compliance documents must be confirmed against factory datasheets before specification or installation.";
