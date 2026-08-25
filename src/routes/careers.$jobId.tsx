import { createFileRoute, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { jobs } from "@/data/clinic";

export const Route = createFileRoute("/careers/$jobId")({
  loader: ({ params }) => {
    const job = jobs.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Role unavailable — Rehan Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const { job } = loaderData;
    const url = `https://rehan-care-guide.lovable.app/careers/${params.jobId}`;
    const description = `${job.title} — ${job.department}, ${job.type} at Rehan Clinic. Placeholder listing pending clinic confirmation.`;
    return {
      meta: [
        { title: `${job.title} — Careers | Rehan Clinic` },
        { name: "description", content: description },
        { property: "og:title", content: `${job.title} — Rehan Clinic` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: JobPage,
  notFoundComponent: () => (
    <Shell className="py-24 text-center">
      <h1 className="display text-4xl">Role not found</h1>
      <div className="mt-8 flex justify-center">
        <ActionLink to="/careers">All open roles</ActionLink>
      </div>
    </Shell>
  ),
});

function JobPage() {
  const { job } = Route.useLoaderData();
  const others = jobs.filter((j) => j.id !== job.id).slice(0, 4);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]} />

      <PageHeader
        eyebrow={job.department}
        title={job.title}
        intro={`${job.location} · ${job.type}`}
      >
        <ActionLink to="/contact">Apply via reception</ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="min-w-0">
            <section className="rule-top pt-4">
              <Eyebrow>Requirements</Eyebrow>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {job.requirements.map((r) => (
                  <li key={r}>— {r}</li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rule-top pt-4">
              <Eyebrow>About the role</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                [PLACEHOLDER] Responsibilities, reporting line, working pattern and compensation are to be confirmed
                by the clinic. No salary or benefit is stated until verified.
              </p>
            </section>

            <section className="mt-8 rule-top pt-4">
              <Eyebrow>How to apply</Eyebrow>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Applications are handled by reception until a hiring inbox is configured. Use the contact page to get
                in touch; do not send medical or sensitive personal documents through this website.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ActionLink to="/contact">Contact reception</ActionLink>
                <ActionLink to="/careers" variant="outline">
                  Back to all roles
                </ActionLink>
              </div>
            </section>

            <div className="mt-10 max-w-2xl">
              <Note>This listing is placeholder content and does not represent a confirmed vacancy.</Note>
            </div>
          </div>

          <aside className="min-w-0">
            <Eyebrow>Other roles</Eyebrow>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {others.map((j) => (
                <li key={j.id}>
                  <ActionLink
                    to="/careers/$jobId"
                    params={{ jobId: j.id }}
                    variant="quiet"
                    className="h-auto w-full justify-between px-0 py-4 text-left text-base"
                  >
                    <span className="min-w-0 truncate pr-3">{j.title}</span>
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
