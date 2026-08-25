import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/portal/results")({
  head: () => ({
    meta: [
      { title: "Results view (Demo) — Patient Portal | Rehan Clinic" },
      {
        name: "description",
        content:
          "Design demonstration of how test results would be presented in a future Rehan Clinic patient portal. No accounts, records or medical data exist behind it.",
      },
      { property: "og:title", content: "Results view (Demo) — Rehan Clinic" },
      { property: "og:description", content: "Demonstration interface only — no real patient data." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultsPage,
});

/** Layout-only rows. Deliberately contains no clinical values. */
const rows = [
  { name: "Sample laboratory panel A", requested: "—", status: "Demo placeholder" },
  { name: "Sample laboratory panel B", requested: "—", status: "Demo placeholder" },
  { name: "Sample imaging report", requested: "—", status: "Demo placeholder" },
];

function ResultsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Patient portal", to: "/portal" }, { label: "Results" }]}
      />

      <PageHeader
        eyebrow="Patient portal · demo"
        title={
          <>
            Results, presented <em className="italic text-primary">plainly</em>.
          </>
        }
        intro="A layout demonstration of how results would be listed once a secure backend exists."
      />

      <Shell className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <Note>
            Demonstration only. There is no authentication, no database and no result data behind this screen. No
            measurements, reference ranges or interpretations are shown, because none exist. Do not enter real
            personal or medical information anywhere on this site.
          </Note>
        </div>

        <div className="mt-10 overflow-x-auto border border-hairline">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">Demonstration list of result placeholders</caption>
            <thead className="bg-paper">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Item
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Requested
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row" className="px-5 py-4 font-normal">
                    {r.name}
                  </th>
                  <td className="px-5 py-4 text-muted-foreground">{r.requested}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-12 max-w-2xl">
          <Eyebrow>What a live version would require</Eyebrow>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>— Authenticated accounts with verified patient identity.</li>
            <li>— A secure backend holding records under the clinic&rsquo;s legal obligations.</li>
            <li>— Clinician release of results before a patient can view them.</li>
            <li>— An audit trail of every access.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink to="/portal" variant="outline">
              Back to portal demo
            </ActionLink>
            <ActionLink to="/contact">Contact reception</ActionLink>
          </div>
        </section>
      </Shell>
    </>
  );
}
