import { createFileRoute } from "@tanstack/react-router";

import { ActionLink, Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Insurance & Billing — Rehan Clinic" },
      {
        name: "description",
        content:
          "How billing works at Rehan Clinic, what to bring for an insured visit, payment options and where to get help with an invoice.",
      },
      { property: "og:title", content: "Insurance & Billing — Rehan Clinic" },
      { property: "og:description", content: "Billing process, payment options and insurance documentation." },
    ],
  }),
  component: InsurancePage,
});

const blocks = [
  ["Accepted insurance", "[PLACEHOLDER] No insurer is listed here yet. We publish a plan only after the clinic confirms it in writing."],
  ["Payment methods", "[PLACEHOLDER] Accepted payment methods to be confirmed."],
  ["Billing support", "Reception can explain any line on an invoice and issue documentation for reimbursement."],
  ["Insurance documents", "Bring your insurance card or policy number, a photo ID, and a referral letter if your plan requires one."],
  ["Payment process", "Charges are confirmed before a service is carried out wherever possible, so there are no surprises."],
  ["Disputes & questions", "Contact reception with your invoice number and we will review it with you."],
];

function InsurancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Insurance & billing"
        title={
          <>
            No surprises on the <em className="italic text-primary">invoice</em>.
          </>
        }
        intro="How billing works, what to bring, and who to ask when something is unclear."
      >
        <ActionLink to="/contact">Ask about billing</ActionLink>
        <ActionLink to="/faq" variant="outline">
          Insurance FAQ
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([k, v]) => (
            <div key={k} className="bg-background p-6">
              <dt className="text-base font-medium">{k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 max-w-2xl">
          <Note>
            Rehan Clinic does not claim acceptance of any specific insurer on this site until that relationship is
            verified. Please call reception to check your plan.
          </Note>
        </div>
      </Shell>
    </>
  );
}
