"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Home, Package, ClipboardList, Menu } from "lucide-react";
import {
  HOME,
  QUOTE,
  NAVIGATION,
  matchesRoute,
  navigationHref,
} from "@/data/navigation";
import { useInquiry } from "./InquiryProvider";
import Modal from "./Modal";
export default function FactoryHeader() {
  const pathname = usePathname();
  const { lines, compared } = useInquiry();
  const [open, setOpen] = useState<string | null>(null),
    [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null),
    triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    function pointer(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(null);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(null);
        triggers.current[open]?.focus();
      }
    }
    document.addEventListener("pointerdown", pointer);
    document.addEventListener("keydown", escape);
    const media = matchMedia("(min-width:1100px)");
    const resize = () => {
      setOpen(null);
      setMobile(false);
    };
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", pointer);
      document.removeEventListener("keydown", escape);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  function close() {
    setOpen(null);
    setMobile(false);
  }
  const count =
    lines.length > 0 ? (
      <span
        className="count-badge"
        aria-label={`${lines.length} saved products`}
      >
        {lines.length}
      </span>
    ) : null;
  return (
    <>
      <header
        className="site-header guided-header"
        ref={header}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node))
            setOpen(null);
        }}
      >
        <div className="container header-row">
          <Link
            className="brand"
            href="/"
            onClick={close}
            aria-label="Galaxy PPRC home"
          >
            <span className="brand-mark">G</span>
            <span>
              GALAXY<span className="brand-sub">PPRC PIPES & FITTINGS</span>
            </span>
          </Link>
          <nav className="guided-desktop" aria-label="Main navigation">
            <Link
              href={HOME.href}
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={close}
            >
              Home
            </Link>
            {NAVIGATION.map((group) => (
              <div className="nav-group" key={group.id}>
                <button
                  ref={(el) => {
                    triggers.current[group.id] = el;
                  }}
                  aria-expanded={open === group.id}
                  aria-controls={`nav-${group.id}`}
                  className={
                    matchesRoute(group, pathname)
                      ? "nav-trigger current"
                      : "nav-trigger"
                  }
                  onClick={() => setOpen(open === group.id ? null : group.id)}
                >
                  {group.label}
                  <ChevronDown size={16} />
                </button>
                {open === group.id && (
                  <div className="nav-dropdown" id={`nav-${group.id}`}>
                    <p className="eyebrow">{group.description}</p>
                    {group.children?.map((item) => (
                      <Link
                        key={item.id}
                        href={navigationHref(item, compared)}
                        onClick={close}
                        aria-current={
                          item.href === pathname ? "page" : undefined
                        }
                      >
                        <strong>{item.label}</strong>
                        <span>{item.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link
            className="button primary desktop-quote"
            href={QUOTE.href}
            aria-current={pathname === "/quote" ? "page" : undefined}
            onClick={close}
          >
            Quote list {count}
          </Link>
          <span className="mobile-brand-note">FAISALABAD, PAKISTAN</span>
        </div>
      </header>
      <nav className="mobile-bottom-nav no-print" aria-label="Quick navigation">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={close}
        >
          <Home size={21} />
          <span>Home</span>
        </Link>
        <Link
          href="/products"
          aria-current={
            matchesRoute(NAVIGATION[0], pathname) ? "page" : undefined
          }
          onClick={close}
        >
          <Package size={21} />
          <span>Products</span>
        </Link>
        <Link
          href="/quote"
          aria-current={pathname === "/quote" ? "page" : undefined}
          onClick={close}
        >
          <span className="bottom-icon">
            <ClipboardList size={21} />
            {count}
          </span>
          <span>Quote list</span>
        </Link>
        <button
          aria-label="Open navigation menu"
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          onClick={() => setMobile(true)}
        >
          <Menu size={21} />
          <span>Menu</span>
        </button>
      </nav>
      {mobile && (
        <Modal
          title="Explore Galaxy"
          onClose={() => setMobile(false)}
          className="navigation-dialog"
        >
          <nav
            className="guided-mobile"
            id="mobile-menu"
            aria-label="All pages"
          >
            <div className="mobile-menu-intro">
              <p>Find products, build a quote request, or plan your visit.</p>
              <Link href="/" onClick={close}>
                Home
              </Link>
              <Link href="/quote" onClick={close}>
                Quote list {count}
              </Link>
            </div>
            {NAVIGATION.map((group) => (
              <section key={group.id}>
                <h3>{group.label}</h3>
                {group.children?.map((item) => (
                  <Link
                    key={item.id}
                    href={navigationHref(item, compared)}
                    onClick={close}
                    aria-current={item.href === pathname ? "page" : undefined}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </Link>
                ))}
              </section>
            ))}
          </nav>
        </Modal>
      )}
    </>
  );
}
