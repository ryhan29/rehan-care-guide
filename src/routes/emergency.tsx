import { createFileRoute } from "@tanstack/react-router";

import { ActionLink, Eyebrow, Note, Shell } from "@/components/site/primitives";
import { clinic } from "@/data/clinic";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Information — Rehan Clinic" },
      {
        name: "description",
        content:
          "Emergency contact, entrance and directions for Rehan Clinic. For life-threatening emergencies call your national emergency number.",
      },
      { property: "og:title", content: "Emergency Information — Rehan Clinic" },
      { property: "og:description", content: "Emergency contact, entrance and directions." },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <>
      <header className="border-b border-urgent/30 bg-urgent-soft">
        <Shell className="py-12 sm:py-16">
          <Eyebrow className="text-urgent">Emergency</Eyebrow>
          <h1 className="display mt-4 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-6xl">
            If this is life-threatening, call your national emergency number now.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${clinic.emergencyPhone}`}
              className="inline-flex h-13 items-center rounded-md bg-urgent px-7 text-sm font-medium text-urgent-foreground transition-opacity hover:opacity-90"
            >
              Call clinic emergency line
            </a>
            <ActionLink to="/contact" variant="outline" size="lg">
              Directions to the clinic
            </ActionLink>
          </div>
        </Shell>
      </header>

      <Shell className="py-12 sm:py-16">
        <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {[
            ["Emergency phone", clinic.emergencyPhone],
            ["Emergency entrance", clinic.address],
            ["Department information", "[PLACEHOLDER] Emergency department scope and staffing to be confirmed."],
            ["Operating hours", "[PLACEHOLDER] Emergency department hours to be confirmed."],
            [
              "Current estimated wait time",
              clinic.liveWaitTimeAvailable ? "—" : "Live wait time unavailable",
            ],
            ["Reception line", clinic.phone],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-6">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 text-sm">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 max-w-2xl">
          <Note>
            No live emergency data feed is connected to this website. Wait times, staffing and department hours
            will only be shown here once a verified data source exists.
          </Note>
        </div>
      </Shell>
    </>
  );
}
