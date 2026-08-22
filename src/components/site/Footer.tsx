import { Link } from "@tanstack/react-router";

import { Shell } from "./primitives";
import { clinic } from "@/data/clinic";

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Care",
    links: [
      { label: "Services", to: "/services" },
      { label: "Doctors", to: "/doctors" },
      { label: "Diagnostics", to: "/diagnostics" },
      { label: "Appointments", to: "/appointments" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Patient portal", to: "/portal" },
      { label: "Patient resources", to: "/resources" },
      { label: "Insurance & billing", to: "/insurance" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "About", to: "/about" },
      { label: "Gallery", to: "/gallery" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Reach us",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Location & directions", to: "/contact" },
      { label: "Emergency", to: "/emergency" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-ink text-ink-foreground">
      <Shell className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div className="min-w-0">
            <p className="display text-4xl sm:text-5xl">Rehan Clinic</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
              {clinic.tagline} Comprehensive consultations, laboratory testing and imaging under one roof.
            </p>
            <address className="mt-8 space-y-1 text-sm not-italic text-ink-foreground/70">
              <p>{clinic.address}</p>
              <p>
                <a className="underline underline-offset-4" href={`tel:${clinic.phone}`}>
                  {clinic.phone}
                </a>
              </p>
              <p>
                <a className="underline underline-offset-4" href={`mailto:${clinic.email}`}>
                  {clinic.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="eyebrow text-ink-foreground/50">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-ink-foreground/80 underline-offset-4 transition-colors hover:text-ink-foreground hover:underline"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="display mt-16 max-w-4xl text-[2rem] leading-[1.05] text-ink-foreground/90 sm:text-5xl">
          Advanced healthcare. Human care.
        </p>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rehan Clinic. Demonstration website — content marked [PLACEHOLDER] is not verified.</p>
          <ul className="flex flex-wrap gap-5">
            <li>
              <Link to="/privacy" className="underline-offset-4 hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="underline-offset-4 hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/accessibility" className="underline-offset-4 hover:underline">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </Shell>
    </footer>
  );
}
