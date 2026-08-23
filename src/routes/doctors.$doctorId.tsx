import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ActionLink, Eyebrow, Note, PhotoSlot, Shell } from "@/components/site/primitives";
import { doctors } from "@/data/clinic";

export const Route = createFileRoute("/doctors/$doctorId")({
  loader: ({ params }) => {
    const doctor = doctors.find((d) => d.id === params.doctorId);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Doctor not found — Rehan Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.doctor.name} — ${loaderData.doctor.specialty} at Rehan Clinic`;
    const description = `Profile, consultation days and booking for ${loaderData.doctor.name}, ${loaderData.doctor.specialty} at Rehan Clinic.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: DoctorProfile,
});

function DoctorProfile() {
  const { doctor } = Route.useLoaderData();

  return (
    <>
      <Shell className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/doctors" className="underline underline-offset-4">
            Doctors
          </Link>
          <span aria-hidden> / </span>
          <span>{doctor.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="min-w-0">
            <PhotoSlot label={`${doctor.name} — replace with real portrait`} ratio="aspect-[4/5]" />
          </div>

          <div className="min-w-0">
            <Eyebrow>{doctor.specialty}</Eyebrow>
            <h1 className="display mt-4 text-[2.6rem] leading-[1.02] sm:text-6xl">{doctor.name}</h1>

            <div className="mt-8">
              <Note>
                Credentials shown here are placeholders. Rehan Clinic does not publish qualifications until they
                have been verified.
              </Note>
            </div>

            <dl className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {[
                ["Qualifications", doctor.qualifications],
                ["Experience", doctor.experience],
                ["Languages", doctor.languages.join(", ")],
                ["Consultation days", doctor.days],
                ["Consultation hours", doctor.hours],
                ["Location", doctor.location],
                ["Availability", doctor.availability],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1.5 text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="sticky bottom-24 mt-8 flex flex-wrap gap-3 sm:bottom-6">
              <ActionLink to="/appointments" size="lg">
                Book appointment
              </ActionLink>
              <ActionLink to="/contact" variant="outline" size="lg">
                Ask a question
              </ActionLink>
            </div>
          </div>
        </div>
      </Shell>

      <Shell className="pb-20">
        <h2 className="eyebrow rule-top pt-6">Other clinicians</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors
            .filter((d) => d.id !== doctor.id)
            .slice(0, 4)
            .map((d) => (
              <li key={d.id} className="min-w-0">
                <Link to="/doctors/$doctorId" params={{ doctorId: d.id }} className="group block">
                  <PhotoSlot label={`${d.specialty} — real staff photo`} ratio="aspect-[4/3]" />
                  <p className="mt-3 text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.specialty}</p>
                </Link>
              </li>
            ))}
        </ul>
      </Shell>
    </>
  );
}
