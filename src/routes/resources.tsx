import { createFileRoute } from "@tanstack/react-router";

import { ActionLink, Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Patient Resources — Before, During & After Your Visit | Rehan Clinic" },
      {
        name: "description",
        content:
          "What to bring, how to prepare for diagnostics, what to expect at the clinic, and how to access results and follow-up after your visit.",
      },
      { property: "og:title", content: "Patient Resources — Rehan Clinic" },
      { property: "og:description", content: "Before, during and after your visit — in plain language." },
    ],
  }),
  component: ResourcesPage,
});

const sections = [
  {
    title: "Before your visit",
    items: [
      ["What to bring", "Photo ID, insurance details if applicable, current medication list, previous reports or scans."],
      ["Required documents", "A referral letter if your plan or specialist requires one."],
      ["Appointment preparation", "Note your symptoms, when they started, and any questions you want answered."],
      ["Diagnostic preparation", "Some blood tests require 8–12 hours of fasting. Ultrasound may require fasting or a full bladder."],
    ],
  },
  {
    title: "At the clinic",
    items: [
      ["Arrival", "Arrive 10–15 minutes early so reception can complete registration."],
      ["Reception", "Check in at the main desk; staff will direct you to the right floor."],
      ["Parking", "[PLACEHOLDER] Parking details to be confirmed by the clinic."],
      ["Accessibility", "[PLACEHOLDER] Step-free access, lifts and accessible facilities to be confirmed."],
      ["Visiting hours", "[PLACEHOLDER] Visiting hours to be confirmed."],
    ],
  },
  {
    title: "After your visit",
    items: [
      ["Test results", "Results are released through the patient portal or at a follow-up appointment."],
      ["Follow-up", "Your clinician will tell you whether a follow-up is needed and when to book it."],
      ["Billing", "Invoices and payment options are explained on the insurance and billing page."],
      ["Questions", "Reception can answer administrative questions; clinical questions go to your doctor."],
    ],
  },
];

function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient resources"
        title={
          <>
            Know exactly <em className="italic text-primary">what to expect</em>.
          </>
        }
        intro="Short, scannable guidance for the three stages of any clinic visit."
      >
        <ActionLink to="/appointments">Book appointment</ActionLink>
        <ActionLink to="/faq" variant="outline">
          Read the FAQ
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {sections.map((section) => (
            <section key={section.title} className="min-w-0">
              <h2 className="display text-3xl">{section.title}</h2>
              <dl className="mt-6 border-t border-hairline">
                {section.items.map(([k, v]) => (
                  <div key={k} className="border-b border-hairline py-5">
                    <dt className="text-sm font-medium">{k}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-12 max-w-2xl">
          <Note>
            Items marked [PLACEHOLDER] await confirmed clinic information and should not be relied on yet.
          </Note>
        </div>
      </Shell>
    </>
  );
}
