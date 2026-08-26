import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { diagnosticTests, doctors, faqs, jobs, posts, services } from "@/data/clinic";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search — Rehan Clinic" },
      {
        name: "description",
        content:
          "Search Rehan Clinic doctors, services, diagnostic tests, patient resources, FAQs, articles and open roles.",
      },
      { property: "og:title", content: "Search — Rehan Clinic" },
      { property: "og:description", content: "Find doctors, services, tests, FAQs and articles." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rehan-care-guide.lovable.app/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://rehan-care-guide.lovable.app/search" }],
  }),
  component: SearchPage,
});

type Hit = { key: string; title: string; meta: string; to: string; params?: Record<string, string> };

function collect(q: string): { group: string; hits: Hit[] }[] {
  const n = q.trim().toLowerCase();
  const match = (...parts: string[]) => parts.join(" ").toLowerCase().includes(n);

  return [
    {
      group: "Doctors",
      hits: doctors
        .filter((d) => match(d.name, d.specialty, d.languages.join(" ")))
        .map((d) => ({
          key: d.id,
          title: d.name,
          meta: d.specialty,
          to: "/doctors/$doctorId",
          params: { doctorId: d.id },
        })),
    },
    {
      group: "Services & departments",
      hits: services
        .filter((s) => match(s.name, s.category, s.what))
        .map((s) => ({
          key: s.slug,
          title: s.name,
          meta: s.category,
          to: "/services/$serviceSlug",
          params: { serviceSlug: s.slug },
        })),
    },
    {
      group: "Diagnostics",
      hits: diagnosticTests
        .filter((t) => match(t.name, t.group, t.what))
        .map((t) => ({
          key: t.slug,
          title: t.name,
          meta: t.group,
          to: "/diagnostics/$testSlug",
          params: { testSlug: t.slug },
        })),
    },
    {
      group: "FAQs & resources",
      hits: faqs
        .filter((f) => match(f.q, f.a, f.category))
        .map((f) => ({ key: f.q, title: f.q, meta: f.category, to: "/faq" })),
    },
    {
      group: "Articles",
      hits: posts
        .filter((p) => match(p.title, p.category, p.excerpt))
        .map((p) => ({
          key: p.slug,
          title: p.title,
          meta: p.category,
          to: "/blog/$postSlug",
          params: { postSlug: p.slug },
        })),
    },
    {
      group: "Careers",
      hits: jobs
        .filter((j) => match(j.title, j.department, j.type))
        .map((j) => ({ key: j.id, title: j.title, meta: j.department, to: "/careers/$jobId", params: { jobId: j.id } })),
    },
  ].filter((g) => g.hits.length > 0);
}

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [value, setValue] = useState(q);

  const trimmed = q.trim();
  const groups = trimmed ? collect(trimmed) : [];
  const total = groups.reduce((sum, g) => sum + g.hits.length, 0);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />

      <PageHeader
        eyebrow="Search"
        title={
          <>
            Find it <em className="italic text-primary">quickly</em>.
          </>
        }
        intro="Doctors, services, diagnostic tests, FAQs, resources, articles and open roles."
      />

      <Shell className="py-12 sm:py-16">
        <form
          role="search"
          className="max-w-2xl"
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ to: ".", search: { q: value } });
          }}
        >
          <label htmlFor="site-search" className="eyebrow block">
            Search the site
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="site-search"
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. blood test, X-Ray, pediatrics, parking"
              className="h-12 w-full min-w-0 border border-hairline bg-card px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-md bg-ink px-5 text-sm font-medium text-ink-foreground"
            >
              Search
            </button>
          </div>
        </form>

        <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
          {trimmed
            ? `${total} ${total === 1 ? "result" : "results"} for “${trimmed}”`
            : "Enter a term above to search."}
        </p>

        {trimmed && total === 0 ? (
          <div className="mt-8 max-w-2xl">
            <Note>
              Nothing matched “{trimmed}”. Try a broader term, or browse{" "}
              <Link to="/services" className="underline underline-offset-4">
                services
              </Link>
              ,{" "}
              <Link to="/doctors" className="underline underline-offset-4">
                doctors
              </Link>{" "}
              or{" "}
              <Link to="/faq" className="underline underline-offset-4">
                FAQs
              </Link>
              .
            </Note>
          </div>
        ) : null}

        <div className="mt-10 space-y-12">
          {groups.map((g) => (
            <section key={g.group}>
              <Eyebrow>{g.group}</Eyebrow>
              <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                {g.hits.map((h) => (
                  <li key={`${g.group}-${h.key}`}>
                    <Link
                      to={h.to as never}
                      params={h.params as never}
                      className="flex min-h-14 items-center justify-between gap-4 py-4 text-base transition-colors hover:text-primary"
                    >
                      <span className="min-w-0">
                        <span className="block truncate">{h.title}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{h.meta}</span>
                      </span>
                      <span aria-hidden className="text-muted-foreground">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-14 max-w-2xl">
          <Note>
            Search covers public site content only. No patient information is indexed, stored or transmitted, and
            search terms are not sent anywhere — matching happens in your browser.
          </Note>
        </div>
      </Shell>
    </>
  );
}
