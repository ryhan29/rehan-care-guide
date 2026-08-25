import { createFileRoute, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { diagnosticTests, services } from "@/data/clinic";

export const Route = createFileRoute("/services/$serviceSlug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.serviceSlug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable — Rehan Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    const url = `https://rehan-care-guide.lovable.app/services/${params.serviceSlug}`;
    return {
      meta: [
        { title: `${service.name} — Services | Rehan Clinic` },
        { name: "description", content: service.what },
        { property: "og:title", content: `${service.name} — Rehan Clinic` },
        { property: "og:description", content: service.what },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ServiceDetailPage,
  notFoundComponent: () => (
    <Shell className="py-24 text-center">
      <h1 className="display text-4xl">Service not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">This service is not listed. Browse the full directory.</p>
      <div className="mt-8 flex justify-center">
        <ActionLink to="/services">All services</ActionLink>
      </div>
    </Shell>
  ),
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData();

  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 4);
  const relatedTests = diagnosticTests
    .filter((t) => service.category === "Diagnostics" || service.category === "Imaging")
    .slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.name }]}
      />

      <PageHeader eyebrow={service.category} title={service.name} intro={service.what}>
        <ActionLink to="/appointments">Request an appointment</ActionLink>
        <ActionLink to="/contact" variant="outline">
          Ask reception
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <dl className="space-y-6 text-sm leading-relaxed">
              {[
                ["Who it is for", service.who],
                ["What to know", service.know],
                ["How to access it", service.access],
              ].map(([k, v]) => (
                <div key={k} className="rule-top pt-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 max-w-2xl">
              <Note>
                General information only — not medical advice, and not a description of an individual treatment
                plan. Details such as duration, preparation and cost are confirmed by the clinic at booking.
              </Note>
            </div>
          </div>

          <aside className="min-w-0">
            {related.length > 0 ? (
              <section>
                <Eyebrow>More in {service.category}</Eyebrow>
                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <ActionLink
                        to="/services/$serviceSlug"
                        params={{ serviceSlug: s.slug }}
                        variant="quiet"
                        className="h-auto w-full justify-between px-0 py-4 text-left text-base"
                      >
                        <span className="min-w-0 truncate pr-3">{s.name}</span>
                        <span aria-hidden>→</span>
                      </ActionLink>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {relatedTests.length > 0 ? (
              <section className="mt-10">
                <Eyebrow>Related tests</Eyebrow>
                <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
                  {relatedTests.map((t) => (
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
              </section>
            ) : null}
          </aside>
        </div>
      </Shell>
    </>
  );
}
