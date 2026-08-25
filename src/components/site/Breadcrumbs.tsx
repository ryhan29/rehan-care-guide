import { Link } from "@tanstack/react-router";

import { Shell } from "./primitives";

export interface Crumb {
  label: string;
  /** Absolute app path. Omit on the current page. */
  to?: string;
}

/**
 * Compact editorial breadcrumb trail used on detail pages.
 * The last item is rendered as the current page (not a link).
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-hairline bg-background">
      <Shell className="py-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-2">
                {item.to && !last ? (
                  <Link
                    to={item.to as never}
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "text-foreground" : undefined}>
                    {item.label}
                  </span>
                )}
                {!last ? (
                  <span aria-hidden className="text-hairline-strong">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </Shell>
    </nav>
  );
}
