"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import Link from "next/link";
import { FACTORY_PRODUCTS } from "@/data/factoryData";
import type { QuoteLine, Customer } from "@/lib/inquiry";
import { DRAFT_KEY, restoreDraft } from "@/lib/draft";
type Notice = { message: string; action?: { label: string; href: string } };
type Store = {
  lines: QuoteLine[];
  setLines: Dispatch<SetStateAction<QuoteLine[]>>;
  customer: Customer;
  setCustomer: Dispatch<SetStateAction<Customer>>;
  add: (id: string, patch?: Partial<QuoteLine>) => void;
  compared: string[];
  setCompared: Dispatch<SetStateAction<string[]>>;
  toggleCompare: (id: string) => void;
  notice: Notice | null;
  ready: boolean;
};
const Context = createContext<Store | null>(null);
export function makeLine(
  id = FACTORY_PRODUCTS[0].id,
  patch: Partial<QuoteLine> = {},
): QuoteLine {
  const p = FACTORY_PRODUCTS.find((p) => p.id === id)!;
  return {
    productId: id,
    size: "",
    pressure: p.requestedClass,
    quantity: "",
    unit: p.category === "pipes" ? "metres" : "pieces",
    ...patch,
    key: crypto.randomUUID(),
  };
}
export default function InquiryProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([]),
    [customer, setCustomer] = useState<Customer>({
      name: "",
      phone: "",
      city: "",
      notes: "",
    }),
    [compared, setCompared] = useState<string[]>([]),
    [notice, setNotice] = useState<Notice | null>(null),
    [ready, setReady] = useState(false);
  useEffect(() => {
    const load = () => {
      try {
        const restored = restoreDraft(
          localStorage.getItem(DRAFT_KEY),
          FACTORY_PRODUCTS.map((p) => p.id),
        );
        setLines(restored.lines);
        setNotice(restored.notice ? { message: restored.notice } : null);
      } catch {
        setNotice({
          message:
            "Browser storage is unavailable. Your quote list will remain available while this page is open.",
        });
      }
      setReady(true);
    };
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, lines }));
      } catch {
        /* In-memory state remains usable. */
      }
    }
  }, [lines, ready]);
  function add(id: string, patch?: Partial<QuoteLine>) {
    if (!ready) return;
    setLines((prev) => [...prev, makeLine(id, patch)]);
    setNotice({
      message: `Added to your quote list: ${FACTORY_PRODUCTS.find((p) => p.id === id)!.name}.`,
      action: { label: "View quote list", href: "/quote" },
    });
  }
  function toggleCompare(id: string) {
    if (compared.includes(id))
      setCompared((prev) => prev.filter((x) => x !== id));
    else if (compared.length < 3) setCompared((prev) => [...prev, id]);
    else
      setNotice({
        message:
          "Compare up to three products. Remove one before adding another.",
        action: {
          label: "View comparison",
          href: `/compare?ids=${compared.join(",")}`,
        },
      });
  }
  return (
    <Context.Provider
      value={{
        lines,
        setLines,
        customer,
        setCustomer,
        add,
        compared,
        setCompared,
        toggleCompare,
        notice,
        ready,
      }}
    >
      {children}
      {notice && (
        <div className="toast no-print" role="status">
          <span>{notice.message}</span>
          {notice.action && (
            <Link href={notice.action.href}>{notice.action.label}</Link>
          )}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice(null)}
          >
            ×
          </button>
        </div>
      )}
    </Context.Provider>
  );
}
export function useInquiry() {
  const value = useContext(Context);
  if (!value) throw new Error("InquiryProvider missing");
  return value;
}
