import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, PageHeader, PhotoSlot, Shell } from "@/components/site/primitives";
import { clinic } from "@/data/clinic";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Locations & Directions — Rehan Clinic" },
      {
        name: "description",
        content:
          "Where to find Rehan Clinic: address, opening hours, entrances, parking and accessibility notes for each site.",
      },
      { property: "og:title", content: "Locations & Directions — Rehan Clinic" },
      { property: "og:description", content: "Address, hours, entrances, parking and accessibility notes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rehan-care-guide.lovable.app/locations" },
    ],
    links: [{ rel: "canonical", href: "https://rehan-care-guide.lovable.app/locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Locations" }]} />

      <PageHeader
        eyebrow="Locations"
        title={
          <>
            Finding us should be <em className="italic text-primary">the easy part</em>.
          </>
        }
        intro="Site details, entrances and travel notes. All values below are placeholders until the clinic confirms them."
      >
        <ActionLink to="/contact">Contact & directions</ActionLink>
        <ActionLink to="/emergency" variant="urgentSoft">
          Emergency information
        </ActionLink>
      </PageHeader>

      <Shell className="py-12 sm:py-16">
        <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>Main clinic</Eyebrow>
            <h2 className="display mt-3 text-4xl">{clinic.name}</h2>

            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              <li className="flex gap-4 py-5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="eyebrow">Address</p>
                  <p className="mt-1 break-words text-sm text-muted-foreground">{clinic.address}</p>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="eyebrow">Reception</p>
                  <a href={`tel:${clinic.phone}`} className="mt-1 block break-words text-sm underline underline-offset-4">
                    {clinic.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0">
                  <p className="eyebrow">Opening hours</p>
                  <dl className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {clinic.hours.map((h) => (
                      <div key={h.day} className="flex flex-wrap justify-between gap-x-6">
                        <dt>{h.day}</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>

            <section className="mt-10">
              <Eyebrow>Getting here</Eyebrow>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>— [PLACEHOLDER] Nearest landmark and approach road.</li>
                <li>— [PLACEHOLDER] Parking capacity, cost and entrance.</li>
                <li>— [PLACEHOLDER] Public transport options.</li>
                <li>— [PLACEHOLDER] Step-free access and accessible parking details.</li>
              </ul>
            </section>

            <div className="mt-10 max-w-2xl">
              <Note>
                No map embed is loaded, and no third-party location service is contacted from this page. A map can be
                added once the verified address is supplied.
              </Note>
            </div>
          </div>

          <div className="min-w-0">
            <PhotoSlot label="Clinic exterior and main entrance" ratio="aspect-[4/3]" />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <PhotoSlot label="Reception desk" ratio="aspect-square" />
              <PhotoSlot label="Accessible entrance" ratio="aspect-square" />
            </div>
          </div>
        </article>
      </Shell>
    </>
  );
}
