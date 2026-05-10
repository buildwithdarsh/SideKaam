import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] text-muted-foreground">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground font-medium">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://sidekaam.in${item.href}`,
    })),
  };
}
