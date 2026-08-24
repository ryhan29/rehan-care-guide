import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import imagingImage from "@/assets/imaging.jpg";
import labImage from "@/assets/lab.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { diagnosticTests } from "@/data/clinic";

export const Route = createFileRoute("/diagnostics")({
  head: () => ({
    meta: [
      { title: "Diagnostics — Blood, Urine & Imaging | Rehan Clinic" },
      {
        name: "description",
        content:
          "Laboratory testing, pathology, microbiology, X-Ray and ultrasound at Rehan Clinic — what each test is, who it is for and how to prepare.",
      },
      { property: "og:title", content: "Diagnostics — Rehan Clinic" },
      { property: "og:description", content: "Laboratory testing, imaging and health checkup packages." },
    ],
  }),
  component: DiagnosticsPage,
});

const groups = ["Laboratory", "Imaging", "Packages"] as const;

function DiagnosticsPage() {
  const [group, setGroup] = useState<(typeof groups)[number]>("Laboratory");
  const [activeSlug, setActiveSlug] = useState(diagnosticTests[0]!.slug);
  const list = diagnosticTests.filter((t) => t.group === group);
  const active = diagnosticTests.find((t) => t.slug === activeSlug) ?? list[0] ?? diagnosticTests[0]!;

  return (
    <>
      <PageHeader
        eyebrow="Diagnostics"
        title={
          <>
            Testing that explains <em className="italic text-primary">itself</em>.
          </>
        }
        intro="Blood and urine testing, pathology, hematology, biochemistry, microbiology, X-Ray, ultrasound and checkup packages."
      >
        <ActionLink to="/appointments">Book a test</ActionLink>
        <ActionLink to="/resources" variant="outline">
          Preparation guidance
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          <img
            src={labImage}
            width={1200}
            height={900}
            loading="lazy"
            alt="Laboratory analysers used for blood and urine testing"
            className="aspect-[4/3] w-full border border-hairline object-cover sm:col-span-2"
          />
          <img
            src={imagingImage}
            width={1200}
            height={900}
            loading="lazy"
            alt="Imaging room used for X-Ray examinations"
            className="aspect-[4/3] w-full border border-hairline object-cover"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => {
                setGroup(g);
                const first = diagnosticTests.find((t) => t.group === g);
                if (first) setActiveSlug(first.slug);
              }}
              className={`h-10 rounded-full border px-5 text-xs transition-colors ${
                g === group
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-hairline text-muted-foreground hover:text-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Desktop explorer */}
        <div className="mt-8 hidden gap-px border border-hairline bg-hairline lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
          <ul className="divide-y divide-hairline bg-background p-6">
            {list.map((t) => (
              <li key={t.slug}>
                <button
                  id={t.slug}
                  onMouseEnter={() => setActiveSlug(t.slug)}
                  onFocus={() => setActiveSlug(t.slug)}
                  onClick={() => setActiveSlug(t.slug)}
                  aria-pressed={t.slug === active.slug}
                  className={`flex w-full items-center justify-between py-4 text-left ${
                    t.slug === active.slug ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="min-w-0 truncate pr-4">{t.name}</span>
                  <span aria-hidden>→</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="bg-paper p-10">
            <Eyebrow>{active.group}</Eyebrow>
            <h2 className="display mt-4 text-5xl">{active.name}</h2>
            <dl className="mt-8 space-y-6 text-sm leading-relaxed">
              {[
                ["What is this test?", active.what],
                ["Who may need it?", active.who],
                ["Preparation", active.prep],
                ["How to book", "Book online, or add it to an existing appointment at reception."],
              ].map(([k, v]) => (
                <div key={k} className="rule-top pt-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <ActionLink to="/appointments">Book this test</ActionLink>
            </div>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="mt-8 lg:hidden">
          <Accordion type="single" collapsible className="border-t border-hairline">
            {list.map((t) => (
              <AccordionItem key={t.slug} value={t.slug} className="border-b border-hairline">
                <AccordionTrigger className="py-4 text-left text-base">{t.name}</AccordionTrigger>
                <AccordionContent className="space-y-4 pb-6 text-sm text-muted-foreground">
                  <p>
                    <span className="eyebrow block">What is this test?</span>
                    {t.what}
                  </p>
                  <p>
                    <span className="eyebrow block">Who may need it?</span>
                    {t.who}
                  </p>
                  <p>
                    <span className="eyebrow block">Preparation</span>
                    {t.prep}
                  </p>
                  <ActionLink to="/appointments" size="sm">
                    Book this test
                  </ActionLink>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 max-w-2xl">
          <Note>
            Test descriptions are general information, not medical advice. Your clinician decides which tests are
            appropriate for you.
          </Note>
        </div>
      </Shell>
    </>
  );
}
