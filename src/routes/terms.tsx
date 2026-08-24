import { createFileRoute } from "@tanstack/react-router";

import { Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Rehan Clinic" },
      { name: "description", content: "Terms of use for the Rehan Clinic website, including its demonstration features." },
      { property: "og:title", content: "Terms — Rehan Clinic" },
      { property: "og:description", content: "Terms of use for the Rehan Clinic website." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use" intro="How to read the content on this website." />
      <Shell className="py-12 sm:py-16">
        <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Note>
            Content marked [PLACEHOLDER] or “sample” is demonstration material and is not a verified statement
            about Rehan Clinic.
          </Note>
          <p>
            Information on this site is general and is not medical advice. It does not replace a consultation with
            a qualified clinician.
          </p>
          <p>
            Appointment booking on this site is a demonstration interface. No appointment is reserved until the
            clinic confirms it directly.
          </p>
          <p>[PLACEHOLDER] Full terms will be published once supplied by the clinic.</p>
        </div>
      </Shell>
    </>
  );
}
