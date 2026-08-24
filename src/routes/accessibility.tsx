import { createFileRoute } from "@tanstack/react-router";

import { ActionLink, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Rehan Clinic" },
      {
        name: "description",
        content:
          "How the Rehan Clinic website supports keyboard use, screen readers, contrast and reduced motion, and how to report a barrier.",
      },
      { property: "og:title", content: "Accessibility — Rehan Clinic" },
      { property: "og:description", content: "Keyboard, screen reader, contrast and reduced-motion support." },
    ],
  }),
  component: AccessibilityPage,
});

const commitments = [
  ["Keyboard", "Every interactive element is reachable and operable by keyboard, with a visible focus ring."],
  ["Screen readers", "Semantic landmarks, labelled controls and descriptive alt text throughout."],
  ["Contrast", "Text and interface colours target WCAG 2.2 AA contrast."],
  ["Reduced motion", "Animation is disabled automatically when your system requests reduced motion."],
  ["Touch targets", "Primary actions are at least 44px tall on small screens."],
  ["No hover-only actions", "Nothing important is available only on hover."],
];

function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        title="Accessibility"
        intro="We aim for WCAG 2.2 AA across this website. If something blocks you, tell us and we will fix it."
      >
        <ActionLink to="/contact">Report a barrier</ActionLink>
      </PageHeader>
      <Shell className="py-12 sm:py-16">
        <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map(([k, v]) => (
            <div key={k} className="bg-background p-6">
              <dt className="text-base font-medium">{k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </Shell>
    </>
  );
}
