import { createFileRoute, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { diagnosticTests } from "@/data/clinic";

export const Route = createFileRoute("/diagnostics/$testSlug")({
  loader: ({ params }) => {
    const test = diagnosticTests.find((t) => t.slug === params.testSlug);
    if (!test) throw notFound();
    return { test };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Test unavailable — Rehan Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const { test } = loaderData;
    const url = `https://rehan-care-guide.lovable.app/diagnostics/${params.testSlug}`;
    return {
      meta: [
        { title: `${test.name} — Diagnostics | Rehan Clinic` },
        { name: "description", content: test.what },
        { property: "og:title", content: `${test.name} — Rehan Clinic` },
        { property: "og:description", content: test.what },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TestDetailPage,
  notFoundComponent: () => (
    <Shell className="py-24 text-center">
      <h1 className="display text-4xl">Test not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">This test is not listed. Browse the diagnostics directory.</p>
      <div className="mt-8 flex justify-center">
        <ActionLink to="/diagnostics">All diagnostics</ActionLink>
      </div>
    </Shell>
  ),
});

function TestDetailPage() {
  const { test } = Route.useLoaderData();
  const related = diagnosticTests.filter((t) => t.group === test.group && t.slug !== test.slug).slice(0, 5);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Diagnostics", to: "/diagnostics" }, { label: test.name }]}
      />

      <PageHeader eyebrow={test.group} title={test.name} intro={test.what}>
        <ActionLink to="/appointments">Request this test</ActionLink>
        <ActionLink to="/resources" variant="outline">
          Preparation guidance
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <dl className="space-y-6 text-sm leading-relaxed">
              {[
                ["Who it is usually for", test.who],
                ["How to prepare", test.prep],
              ].map(([k, v]) => (
                <div key={k} className="rule-top pt-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-muted-foreground">{v}</dd>
                </div>
              ))}
              <div className="rule-top pt-4">
                <dt className="eyebrow">Turnaround & cost</dt>
                <dd className="mt-2 text-muted-foreground">
                  [PLACEHOLDER] Result turnaround and pricing are confirmed by the clinic at booking.
                </dd>
              </div>
            </dl>

            <div className="mt-10 max-w-2xl">
              <Note>
                General information only — not medical advice. Whether a test is appropriate for you is a decision
                for a clinician.
              </Note>
            </div>
          </div>

          <aside className="min-w-0">
            <Eyebrow>More in {test.group}</Eyebrow>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {related.map((t) => (
                <li key={t.slug}>
                  <ActionLink
                    to="/diagnostics/$testSlug"
                    params={{ testSlug: t.slug }}
                    variant="quiet"
                    className="h-auto w-full justify-between px-0 py-4 text-left text-base"
                  >
                    <span className="min-w-0 truncate pr-3">{t.name}</span>
                    <span aria-hidden>→</span>
                  </ActionLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Shell>
    </>
  );
}
