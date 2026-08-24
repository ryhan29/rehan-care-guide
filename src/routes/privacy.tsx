import { createFileRoute } from "@tanstack/react-router";

import { Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Rehan Clinic" },
      {
        name: "description",
        content: "How this Rehan Clinic website handles information, and what it deliberately does not collect.",
      },
      { property: "og:title", content: "Privacy — Rehan Clinic" },
      { property: "og:description", content: "How this website handles information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy" intro="What this website does and does not do with information." />
      <Shell className="py-12 sm:py-16">
        <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
          <Note>
            This website currently has no backend. Nothing entered into the booking or portal demonstration is
            transmitted, stored or processed anywhere.
          </Note>
          <p>
            No patient records, test results or medical information are held by this site. The patient portal is a
            visual demonstration only and does not authenticate anyone.
          </p>
          <p>
            Please do not enter sensitive medical details into any form on this site. To discuss your health,
            contact the clinic directly by phone.
          </p>
          <p>[PLACEHOLDER] A full privacy notice will be published once the clinic supplies its data policy.</p>
        </div>
      </Shell>
    </>
  );
}
