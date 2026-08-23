import { createFileRoute } from "@tanstack/react-router";

import consultImage from "@/assets/consult.jpg";
import heroImage from "@/assets/clinic-hero.jpg";
import { ActionLink, Eyebrow, Note, PageHeader, PhotoSlot, Reveal, Shell } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Rehan Clinic — Our Philosophy of Care" },
      {
        name: "description",
        content:
          "The story, mission, values and medical philosophy behind Rehan Clinic, a multi-specialty clinic combining consultations, diagnostics and imaging.",
      },
      { property: "og:title", content: "About Rehan Clinic" },
      { property: "og:description", content: "Our story, mission, values and medical philosophy." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  ["Chapter one", "[PLACEHOLDER] Founding year and the reason the clinic was started."],
  ["Chapter two", "[PLACEHOLDER] Expansion of laboratory and imaging services."],
  ["Chapter three", "[PLACEHOLDER] Addition of specialist departments."],
  ["Today", "[PLACEHOLDER] Current scope of care across consultation, diagnostics and imaging."],
];

const values = [
  ["Clarity", "We explain what a test is, what it costs and what happens next — before you agree to it."],
  ["Continuity", "Consultation, testing and follow-up stay within one clinic and one record."],
  ["Respect", "Time, privacy and dignity are part of the clinical standard, not an extra."],
  ["Precision", "Careful diagnostics, careful reporting, careful language."],
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A clinic built around <em className="italic text-primary">the patient’s day</em>.
          </>
        }
        intro="Rehan Clinic exists to shorten the distance between a health question and a clear answer."
      />

      <Shell className="py-14 sm:py-20">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <img
              src={heroImage}
              width={1600}
              height={1200}
              loading="lazy"
              alt="Clinic reception and waiting area"
              className="aspect-[4/3] w-full border border-hairline object-cover"
            />
            <div className="min-w-0 self-center">
              <Eyebrow>Mission</Eyebrow>
              <p className="display mt-4 text-[2rem] leading-[1.1] sm:text-4xl">
                Comprehensive care, delivered calmly, without sending patients across the city for every step.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                From routine consultations and preventive checkups to laboratory testing, imaging and specialist
                review, our aim is a single, understandable pathway through care.
              </p>
            </div>
          </div>
        </Reveal>

        <section className="mt-20">
          <Eyebrow>Our story</Eyebrow>
          <ol className="mt-8 border-t border-hairline">
            {timeline.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 70}>
                <div className="grid gap-4 border-b border-hairline py-8 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)]">
                  <p className="display text-2xl">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Values</Eyebrow>
            <h2 className="display mt-4 text-4xl sm:text-5xl">What we hold to.</h2>
            <img
              src={consultImage}
              width={1200}
              height={900}
              loading="lazy"
              alt="A quiet consultation room"
              className="mt-8 aspect-[4/3] w-full border border-hairline object-cover"
            />
          </div>
          <ul className="grid gap-px self-start border border-hairline bg-hairline sm:grid-cols-2">
            {values.map(([title, body]) => (
              <li key={title} className="bg-background p-6">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <Eyebrow>Leadership &amp; team</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">Real people, real photographs.</h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Every slot below is reserved for authentic photography of Rehan Clinic staff. We do not present
            generated or stock people as clinic employees.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Leadership", "Doctors", "Nursing team", "Laboratory", "Radiology", "Reception", "Facility staff", "Clinic environment"].map(
              (slot) => (
                <li key={slot}>
                  <PhotoSlot label={slot} ratio="aspect-[4/5]" />
                  <p className="mt-3 text-sm">{slot}</p>
                </li>
              ),
            )}
          </ul>
          <div className="mt-10 max-w-2xl">
            <Note>
              Leadership names, credentials and history are placeholders. Nothing on this page should be read as a
              verified claim until the clinic supplies the content.
            </Note>
          </div>
        </section>

        <div className="mt-16 flex flex-wrap gap-3">
          <ActionLink to="/doctors">Meet our clinicians</ActionLink>
          <ActionLink to="/careers" variant="outline">
            Work with us
          </ActionLink>
        </div>
      </Shell>
    </>
  );
}
