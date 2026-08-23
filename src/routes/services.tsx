import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ActionLink, Eyebrow, PageHeader, Shell } from "@/components/site/primitives";
import { services, type ServiceCategory } from "@/data/clinic";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Rehan Clinic" },
      {
        name: "description",
        content:
          "Primary care, diagnostics, imaging and specialist departments at Rehan Clinic, each explained in plain language with a direct way to book.",
      },
      { property: "og:title", content: "Services — Rehan Clinic" },
      { property: "og:description", content: "Primary care, diagnostics, imaging and specialist departments." },
    ],
  }),
  component: ServicesPage,
});

const categories: ServiceCategory[] = ["Primary Care", "Diagnostics", "Imaging", "Specialist Care"];

function ServicesPage() {
  const [category, setCategory] = useState<ServiceCategory>("Primary Care");
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(services[0].slug);

  const inCategory = services.filter((s) => s.category === category);
  const searched = query
    ? services.filter((s) => `${s.name} ${s.category} ${s.what}`.toLowerCase().includes(query.toLowerCase()))
    : inCategory;
  const active = services.find((s) => s.slug === activeSlug) ?? searched[0] ?? services[0];

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Care that is easy to <em className="italic text-primary">understand</em>.
          </>
        }
        intro="Every service explains what it is, who it is for, what you need to know, and how to access it."
      >
        <ActionLink to="/appointments">Book appointment</ActionLink>
        <ActionLink to="/doctors" variant="outline">
          Find a doctor
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <label className="block max-w-xl">
          <span className="eyebrow">Search services</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. blood test, X-Ray, pediatrics"
            className="mt-2 h-12 w-full border border-hairline bg-card px-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary"
          />
        </label>

        {/* Desktop: category rail + detail panel */}
        <div className="mt-10 hidden gap-px border border-hairline bg-hairline lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <div className="bg-background p-6">
            {!query && (
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCategory(c);
                      const first = services.find((s) => s.category === c);
                      if (first) setActiveSlug(first.slug);
                    }}
                    className={`h-9 rounded-full border px-4 text-xs transition-colors ${
                      c === category
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-hairline text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <ul className="mt-6 divide-y divide-hairline">
              {searched.map((s) => (
                <li key={s.slug}>
                  <button
                    id={s.slug}
                    onMouseEnter={() => setActiveSlug(s.slug)}
                    onFocus={() => setActiveSlug(s.slug)}
                    onClick={() => setActiveSlug(s.slug)}
                    aria-pressed={s.slug === active.slug}
                    className={`flex w-full items-center justify-between py-4 text-left text-base transition-colors ${
                      s.slug === active.slug ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="min-w-0 truncate pr-4">{s.name}</span>
                    <span aria-hidden className={s.slug === active.slug ? "text-primary" : ""}>
                      →
                    </span>
                  </button>
                </li>
              ))}
              {searched.length === 0 && (
                <li className="py-6 text-sm text-muted-foreground">No service matches “{query}”.</li>
              )}
            </ul>
          </div>

          <div className="bg-paper p-10">
            <Eyebrow>{active.category}</Eyebrow>
            <h2 className="display mt-4 text-5xl">{active.name}</h2>
            <dl className="mt-8 space-y-6 text-sm leading-relaxed">
              {[
                ["What it is", active.what],
                ["Who it is for", active.who],
                ["What to know", active.know],
                ["How to access it", active.access],
              ].map(([k, v]) => (
                <div key={k} className="rule-top pt-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink to="/appointments">Book appointment</ActionLink>
              <ActionLink to="/diagnostics" variant="outline">
                Related diagnostics
              </ActionLink>
            </div>
          </div>
        </div>

        {/* Mobile: accordion list */}
        <div className="mt-8 lg:hidden">
          <Accordion type="single" collapsible className="border-t border-hairline">
            {(query ? searched : services).map((s) => (
              <AccordionItem key={s.slug} value={s.slug} className="border-b border-hairline">
                <AccordionTrigger className="py-4 text-left text-base">
                  <span className="min-w-0 pr-3">
                    {s.name}
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">{s.category}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-6 text-sm text-muted-foreground">
                  <p>
                    <span className="eyebrow block">What it is</span>
                    {s.what}
                  </p>
                  <p>
                    <span className="eyebrow block">Who it is for</span>
                    {s.who}
                  </p>
                  <p>
                    <span className="eyebrow block">What to know</span>
                    {s.know}
                  </p>
                  <p>
                    <span className="eyebrow block">How to access it</span>
                    {s.access}
                  </p>
                  <ActionLink to="/appointments" size="sm">
                    Book appointment
                  </ActionLink>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Shell>
    </>
  );
}
