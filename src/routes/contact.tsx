import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { clinic, departments } from "@/data/clinic";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions — Rehan Clinic" },
      {
        name: "description",
        content:
          "Phone, email, opening hours, address and directions for Rehan Clinic, plus emergency contact and department information.",
      },
      { property: "og:title", content: "Contact & Directions — Rehan Clinic" },
      { property: "og:description", content: "Phone, email, hours, address and directions." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Reach us <em className="italic text-primary">without hunting</em>.
          </>
        }
        intro="Phone, email, hours, address and directions — all on one page."
      >
        <ActionLink to="/appointments">Book appointment</ActionLink>
        <ActionLink to="/emergency" variant="urgentSoft">
          Emergency information
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="min-w-0">
            <ul className="divide-y divide-hairline border-y border-hairline">
              {[
                { icon: Phone, label: "Reception", value: clinic.phone, href: `tel:${clinic.phone}` },
                { icon: Phone, label: "Emergency line", value: clinic.emergencyPhone, href: `tel:${clinic.emergencyPhone}` },
                { icon: MessageCircle, label: "WhatsApp", value: clinic.whatsapp },
                { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
                { icon: MapPin, label: "Address", value: clinic.address },
              ].map((row) => (
                <li key={row.label} className="flex gap-4 py-5">
                  <row.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <p className="eyebrow">{row.label}</p>
                    {row.href ? (
                      <a href={row.href} className="mt-1 block break-words text-sm underline underline-offset-4">
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-1 break-words text-sm">{row.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-10">Opening hours</h2>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline text-sm">
              {clinic.hours.map((h) => (
                <li key={h.day} className="flex flex-wrap justify-between gap-2 py-3">
                  <span>{h.day}</span>
                  <span className="text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>

            <h2 className="eyebrow mt-10">Departments</h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-xs">
              {departments.map((d) => (
                <li key={d} className="rounded-full border border-hairline px-3 py-1.5 text-muted-foreground">
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <Eyebrow>Location</Eyebrow>
            <div
              role="img"
              aria-label="Map placeholder — an interactive map will be added once the clinic address is confirmed"
              className="mt-4 grid aspect-[4/3] place-items-center border border-dashed border-hairline bg-secondary grid-lines"
            >
              <div className="px-6 text-center">
                <p className="eyebrow">Map placeholder</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  An interactive map with a marker, address and directions will appear here once verified
                  coordinates are provided.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-hairline p-5">
                <p className="eyebrow">Parking</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  [PLACEHOLDER] Parking capacity, cost and accessible bays to be confirmed.
                </p>
              </div>
              <div className="border border-hairline p-5">
                <p className="eyebrow">Public transport</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  [PLACEHOLDER] Nearest stops and routes to be confirmed.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Note>
                Contact details, hours and logistics on this page are placeholders until Rehan Clinic supplies
                verified information.
              </Note>
            </div>
          </div>
        </div>
      </Shell>
    </>
  );
}
