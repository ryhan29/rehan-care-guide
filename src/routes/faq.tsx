import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ActionLink, PageHeader, Shell } from "@/components/site/primitives";
import { faqs } from "@/data/clinic";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Insurance, Parking & First Visit | Rehan Clinic" },
      {
        name: "description",
        content:
          "Answers about insurance, parking, first visits, appointments, diagnostics, billing and the patient portal at Rehan Clinic.",
      },
      { property: "og:title", content: "FAQ — Rehan Clinic" },
      { property: "og:description", content: "Insurance, parking, first visit, appointments and billing answers." },
    ],
  }),
  component: FaqPage,
});

const categories = Array.from(new Set(faqs.map((f) => f.category)));

function FaqPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = faqs.filter((f) => {
    const matchesQ = !query || `${f.q} ${f.a} ${f.category}`.toLowerCase().includes(query.toLowerCase());
    const matchesC = category === "All" || f.category === category;
    return matchesQ && matchesC;
  });

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Answers to the questions <em className="italic text-primary">patients actually ask</em>.
          </>
        }
      />

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <label className="block">
              <span className="eyebrow">Search questions</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. parking, insurance, fasting"
                className="mt-2 h-12 w-full border border-hairline bg-card px-3 text-base outline-none focus-visible:border-primary"
              />
            </label>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`h-9 rounded-full border px-4 text-xs transition-colors ${
                      category === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-hairline text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden lg:block">
              <ActionLink to="/contact" variant="outline" size="sm">
                Still unsure? Contact us
              </ActionLink>
            </div>
          </div>

          <div className="min-w-0">
            <p aria-live="polite" className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "question" : "questions"}
            </p>
            {results.length === 0 ? (
              <p className="mt-8 border border-dashed border-hairline p-8 text-sm text-muted-foreground">
                Nothing matches “{query}”. Reception can answer directly — see the contact page.
              </p>
            ) : (
              <Accordion type="single" collapsible className="mt-4 border-t border-hairline">
                {results.map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="border-b border-hairline">
                    <AccordionTrigger className="py-5 text-left text-base">
                      <span className="min-w-0 pr-3">
                        {f.q}
                        <span className="mt-1 block text-xs font-normal text-muted-foreground">{f.category}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </Shell>
    </>
  );
}
