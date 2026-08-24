import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  CalendarPlus,
  FlaskConical,
  Microscope,
  ScanLine,
  Siren,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import heroImage from "@/assets/clinic-hero.jpg";
import labImage from "@/assets/lab.jpg";
import consultImage from "@/assets/consult.jpg";
import { EmergencyDialog } from "@/components/site/EmergencyDialog";
import { Action, ActionLink, Eyebrow, Note, PhotoSlot, Reveal, Shell } from "@/components/site/primitives";
import { clinic, departments, doctors, testimonials } from "@/data/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rehan Clinic — Advanced healthcare. Human care." },
      {
        name: "description",
        content:
          "Book an appointment, find a doctor, or explore diagnostics at Rehan Clinic — consultations, laboratory testing, imaging and specialist care in one place.",
      },
      { property: "og:title", content: "Rehan Clinic — Advanced healthcare. Human care." },
      {
        property: "og:description",
        content: "Consultations, laboratory testing, imaging and specialist care in one clinic.",
      },
    ],
  }),
  component: Home,
});

const journeys = [
  { label: "I need a doctor", to: "/doctors", icon: UserRound },
  { label: "I need a test", to: "/diagnostics", icon: FlaskConical },
  { label: "I need an appointment", to: "/appointments", icon: CalendarPlus },
  { label: "I am an existing patient", to: "/portal", icon: Activity },
];

function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (media.matches || !fine.matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setOffset({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <Shell className="pt-12 pb-14 sm:pt-20 sm:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Multi-specialty clinic · Diagnostics · Imaging</Eyebrow>
            <h1 className="display mt-6 text-[3rem] leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
              Healthcare,
              <br />
              designed <em className="italic text-primary">around you.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Consultations, blood and urine testing, imaging such as X-Ray, and specialist care — organised
              so you always know what happens next.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ActionLink to="/appointments" size="lg">
                <CalendarPlus className="size-4" aria-hidden />
                Book appointment
              </ActionLink>
              <ActionLink to="/doctors" variant="outline" size="lg">
                Find a doctor
              </ActionLink>
              <EmergencyDialog>
                <Action variant="urgentSoft" size="lg">
                  <Siren className="size-4" aria-hidden />
                  Emergency information
                </Action>
              </EmergencyDialog>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              {clinic.liveStatusAvailable
                ? "Open today"
                : "Live opening status unavailable — see published hours on the contact page."}
            </p>
          </div>

          <div ref={frameRef} className="relative min-w-0">
            <div className="overflow-hidden border border-hairline bg-secondary">
              <img
                src={heroImage}
                width={1600}
                height={1200}
                alt="Reception and waiting area of a modern clinic with warm daylight"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-brand"
                style={{ transform: `scale(1.04) translate3d(${offset.x}px, ${offset.y}px, 0)` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>Clinic photography placeholder — replace with real Rehan Clinic images.</span>
              <Link to="/gallery" className="underline underline-offset-4">
                View gallery
              </Link>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Journeys() {
  return (
    <section aria-labelledby="journeys" className="border-b border-hairline bg-paper">
      <Shell className="py-10 sm:py-12">
        <h2 id="journeys" className="eyebrow">
          Where would you like to start?
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j) => (
            <li key={j.to}>
              <Link
                to={j.to}
                className="group flex min-h-16 items-center gap-4 border border-hairline bg-card px-5 py-4 transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
              >
                <j.icon className="size-5 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0 flex-1 text-sm font-medium">{j.label}</span>
                <span aria-hidden className="text-muted-foreground transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

const quickActions = [
  { label: "Book appointment", to: "/appointments", icon: CalendarPlus, note: "5 steps, under a minute" },
  { label: "Find a doctor", to: "/doctors", icon: Stethoscope, note: "Filter by specialty & language" },
  { label: "Diagnostic tests", to: "/diagnostics", icon: Microscope, note: "Lab, imaging & packages" },
  { label: "Patient portal", to: "/portal", icon: Activity, note: "Demo interface" },
  { label: "Emergency", to: "/emergency", icon: Siren, note: "Phone, address, directions" },
  { label: "Patient resources", to: "/resources", icon: Stethoscope, note: "Before, during & after" },
];

function QuickActions() {
  return (
    <Shell className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div className="min-w-0">
          <Eyebrow>Quick actions</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">Everything within three clicks.</h2>
        </div>
        <ul className="grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((a) => (
            <li key={a.to} className="bg-background">
              <Link
                to={a.to}
                className="group flex h-full min-h-32 flex-col justify-between gap-6 p-6 transition-colors hover:bg-secondary"
              >
                <a.icon className="size-5 text-primary" aria-hidden />
                <span>
                  <span className="block text-base font-medium">{a.label}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{a.note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

function Trust() {
  return (
    <section className="border-y border-hairline bg-paper">
      <Shell className="py-20 sm:py-28">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div className="min-w-0">
              <Eyebrow>Why patients choose us</Eyebrow>
              <h2 className="display mt-5 text-[2.5rem] leading-[1.02] sm:text-6xl">
                One clinic for the consultation, the test and the answer.
              </h2>
              <p className="mt-7 max-w-xl leading-relaxed text-muted-foreground">
                Rehan Clinic brings routine care, preventive checkups, laboratory diagnostics and imaging together
                under one roof, so you are not sent from place to place to complete a single question about your health.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
                {[
                  ["Doctors", "[Placeholder]"],
                  ["Departments", `${departments.length}`],
                  ["Diagnostic tests", "[Placeholder]"],
                  ["Years of care", "[Placeholder]"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-paper p-5">
                    <dt className="eyebrow">{label}</dt>
                    <dd className="display mt-2 text-3xl">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <Note>
                  Figures marked [Placeholder] are unverified. They will be replaced once the clinic supplies
                  confirmed numbers.
                </Note>
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-4 self-start">
              <img
                src={consultImage}
                width={1200}
                height={900}
                loading="lazy"
                alt="Consultation room with daylight, an examination table and plants"
                className="col-span-2 aspect-[16/10] w-full border border-hairline object-cover"
              />
              <PhotoSlot label="Doctor portrait — real staff photo" ratio="aspect-[4/5]" />
              <PhotoSlot label="Nursing team — real staff photo" ratio="aspect-[4/5]" />
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

function CareLines() {
  const lines = [
    {
      title: "Primary care",
      copy: "General consultations, routine checkups, preventive care and health screening.",
      to: "/services",
      image: consultImage,
      alt: "Consultation room prepared for a patient visit",
    },
    {
      title: "Diagnostics",
      copy: "Blood and urine testing, pathology, hematology, biochemistry and microbiology.",
      to: "/diagnostics",
      image: labImage,
      alt: "Clinic laboratory with analyser equipment",
    },
    {
      title: "Specialist care",
      copy: `${departments.length} departments including ${departments.slice(0, 3).join(", ")} and more.`,
      to: "/doctors",
      image: heroImage,
      alt: "Clinic interior corridor leading to consulting rooms",
    },
  ];

  return (
    <Shell className="py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          <Eyebrow>Care lines</Eyebrow>
          <h2 className="display mt-4 text-4xl sm:text-5xl">What we treat and test.</h2>
        </div>
        <ActionLink to="/services" variant="outline" size="sm">
          All services
        </ActionLink>
      </div>

      <ul className="mt-12 grid gap-8 lg:grid-cols-3">
        {lines.map((line, i) => (
          <Reveal as="li" key={line.title} delay={i * 90} className="min-w-0">
            <Link to={line.to} className="group block">
              <div className="overflow-hidden border border-hairline">
                <img
                  src={line.image}
                  width={1200}
                  height={900}
                  loading="lazy"
                  alt={line.alt}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 text-xl font-medium">{line.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{line.copy}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                Explore
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Shell>
  );
}

function DoctorsPreview() {
  return (
    <section className="border-y border-hairline bg-paper">
      <Shell className="py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <Eyebrow>Our clinicians</Eyebrow>
            <h2 className="display mt-4 text-4xl sm:text-5xl">Find the right doctor.</h2>
          </div>
          <ActionLink to="/doctors" variant="outline" size="sm">
            Full directory
          </ActionLink>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.slice(0, 4).map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 80} className="min-w-0">
              <Link to="/doctors/$doctorId" params={{ doctorId: d.id }} className="group block">
                <PhotoSlot label={`${d.specialty} — real staff photo`} />
                <p className="mt-4 text-base font-medium">{d.name}</p>
                <p className="text-sm text-muted-foreground">{d.specialty}</p>
                <span className="mt-3 inline-block text-sm text-primary underline-offset-4 group-hover:underline">
                  View profile
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function DiagnosticsStrip() {
  return (
    <Shell className="py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0 overflow-hidden border border-hairline">
          <img
            src={labImage}
            width={1200}
            height={900}
            loading="lazy"
            alt="Laboratory workstation with diagnostic analysers"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <Eyebrow>Diagnostics</Eyebrow>
          <h2 className="display mt-4 text-[2.4rem] leading-[1.03] sm:text-5xl">
            Precise testing, plainly explained.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Every test page tells you what it is, who it is for, whether preparation such as fasting is required,
            and how to book it. No jargon, no guesswork.
          </p>
          <ul className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {[
              ["Blood & urine testing", FlaskConical],
              ["Pathology & microbiology", Microscope],
              ["X-Ray & ultrasound", ScanLine],
              ["Health checkup packages", Activity],
            ].map(([label, Icon]) => {
              const I = Icon as typeof Activity;
              return (
                <li key={label as string} className="flex items-center gap-3 bg-background p-5 text-sm">
                  <I className="size-4 shrink-0 text-primary" aria-hidden />
                  {label as string}
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink to="/diagnostics">Explore diagnostics</ActionLink>
            <ActionLink to="/appointments" variant="outline">
              Book a test
            </ActionLink>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Testimonials() {
  return (
    <section className="border-y border-hairline bg-ink text-ink-foreground">
      <Shell className="py-20 sm:py-28">
        <Eyebrow className="text-ink-foreground/50">Patient voices</Eyebrow>
        <p className="mt-4 max-w-2xl text-sm text-ink-foreground/70">
          The quotes below are placeholders shown to demonstrate layout. They are not real patient reviews and
          will be replaced with verified feedback.
        </p>
        <ul className="mt-12 grid gap-px bg-ink-foreground/15 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.initial} className="bg-ink p-8">
              <p className="eyebrow text-accent">Sample testimonial</p>
              <blockquote className="display mt-5 text-2xl leading-tight">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm text-ink-foreground/60">
                {t.initial} · {t.service} · {t.date}
              </p>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}

function ClosingCta() {
  return (
    <Shell className="py-20 sm:py-28">
      <div className="grid gap-10 border border-hairline bg-paper p-8 sm:p-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="min-w-0">
          <h2 className="display text-[2.4rem] leading-[1.02] sm:text-5xl">
            Ready when you are.
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Book a consultation, a diagnostic test or a checkup. If you are unsure which is right, reception can
            guide you.
          </p>
        </div>
        <div className="grid gap-3">
          <ActionLink to="/appointments" size="lg">
            Book appointment
          </ActionLink>
          <ActionLink to="/contact" variant="outline" size="lg">
            Contact the clinic
          </ActionLink>
        </div>
      </div>
    </Shell>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Journeys />
      <QuickActions />
      <Trust />
      <CareLines />
      <DoctorsPreview />
      <DiagnosticsStrip />
      <Testimonials />
      <ClosingCta />
    </>
  );
}
