import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Action, ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Patient Portal (Demo) — Rehan Clinic" },
      {
        name: "description",
        content:
          "A demonstration of the Rehan Clinic patient portal: appointments, results, prescriptions and billing. No accounts or patient data exist behind it.",
      },
      { property: "og:title", content: "Patient Portal (Demo) — Rehan Clinic" },
      { property: "og:description", content: "Demonstration interface only — no real patient data." },
    ],
  }),
  component: PortalPage,
});

const panels = [
  { title: "Upcoming appointments", body: "Sample entry — General consultation, date to be confirmed." },
  { title: "Test results", body: "Sample entry — Complete blood count, status: demo placeholder." },
  { title: "Prescriptions", body: "Sample entry — no real prescription data is stored." },
  { title: "Billing & payments", body: "Sample entry — invoices would appear here in a live portal." },
  { title: "Documents", body: "Sample entry — referral letters and reports." },
  { title: "Profile", body: "Sample entry — contact details and preferences." },
];

function PortalPage() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Patient portal"
        title={
          <>
            Your care, <em className="italic text-primary">in one place</em>.
          </>
        }
        intro="Appointments, results, prescriptions and billing designed as a single calm dashboard."
      />

      <Shell className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <Note>
            Demonstration only. There is no authentication, no database and no patient data behind this screen.
            Do not enter real personal or medical information anywhere on this page.
          </Note>
        </div>

        {!signedIn ? (
          <form
            className="mt-10 max-w-md border border-hairline bg-paper p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSignedIn(true);
            }}
          >
            <Eyebrow>Demo sign in</Eyebrow>
            <h2 className="display mt-3 text-3xl">Enter the demo dashboard</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              No credentials are required or stored. Selecting continue simply reveals the demo interface.
            </p>
            <Action type="submit" size="lg" className="mt-6 w-full">
              Continue to demo dashboard
            </Action>
          </form>
        ) : (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="display text-4xl">Demo dashboard</h2>
              <Action variant="outline" size="sm" onClick={() => setSignedIn(false)}>
                Exit demo
              </Action>
            </div>
            <ul className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {panels.map((p) => (
                <li key={p.title} className="bg-background p-6">
                  <p className="eyebrow">Sample data</p>
                  <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink to="/appointments">Book appointment</ActionLink>
              <ActionLink to="/contact" variant="outline">
                Contact reception
              </ActionLink>
            </div>
          </div>
        )}
      </Shell>
    </>
  );
}
