import { routeLabel } from "@/data/navigation";
import Link from "next/link";
export default function PageIntro({
  eyebrow,
  title,
  description,
  crumbs = [],
  path,
  breadcrumbLabel,
}: {
  path?: string;
  breadcrumbLabel?: string;
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <div className="page-intro container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {crumbs.map((c) => (
          <span key={c.href}>
            /<Link href={c.href}>{c.label}</Link>
          </span>
        ))}
        <span>/</span>
        <span aria-current="page">
          {breadcrumbLabel || (path && routeLabel(path)) || title}
        </span>
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </div>
  );
}
