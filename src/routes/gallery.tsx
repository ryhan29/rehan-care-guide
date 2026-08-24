import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import clinicImage from "@/assets/clinic-hero.jpg";
import consultImage from "@/assets/consult.jpg";
import imagingImage from "@/assets/imaging.jpg";
import labImage from "@/assets/lab.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Note, PageHeader, PhotoSlot, Shell } from "@/components/site/primitives";
import { galleryCategories } from "@/data/clinic";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Inside Rehan Clinic" },
      {
        name: "description",
        content:
          "Photographs of the Rehan Clinic environment: consulting rooms, laboratory, imaging, waiting areas and facilities.",
      },
      { property: "og:title", content: "Gallery — Inside Rehan Clinic" },
      { property: "og:description", content: "Consulting rooms, laboratory, imaging and waiting areas." },
    ],
  }),
  component: GalleryPage,
});

type Item = { category: string; src?: string; alt: string };

const items: Item[] = [
  { category: "Clinic", src: clinicImage, alt: "Reception and waiting area with warm daylight" },
  { category: "Facilities", src: consultImage, alt: "Consulting room prepared for a patient" },
  { category: "Laboratory", src: labImage, alt: "Laboratory analysers and workstations" },
  { category: "Diagnostics", src: imagingImage, alt: "Imaging room used for X-Ray examinations" },
  { category: "Doctors", alt: "Doctor portrait" },
  { category: "Staff", alt: "Nursing and reception team" },
  { category: "Waiting Areas", alt: "Waiting area seating" },
  { category: "Technology", alt: "Diagnostic equipment detail" },
];

function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<Item | null>(null);
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            Inside the <em className="italic text-primary">clinic</em>.
          </>
        }
        intro="Environment photography, with reserved slots for authentic staff images."
      />

      <Shell className="py-12 sm:py-16">
        <ul className="flex flex-wrap gap-2">
          {["All", ...galleryCategories].map((c) => (
            <li key={c}>
              <button
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`h-9 rounded-full border px-4 text-xs transition-colors ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-hairline text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li key={`${item.category}-${i}`} className="min-w-0">
              {item.src ? (
                <button
                  onClick={() => setOpen(item)}
                  className="group block w-full overflow-hidden border border-hairline"
                  aria-label={`Open image: ${item.alt}`}
                >
                  <img
                    src={item.src}
                    width={1200}
                    height={900}
                    loading="lazy"
                    alt={item.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                  />
                </button>
              ) : (
                <PhotoSlot label={`${item.category} — ${item.alt}`} ratio="aspect-[4/3]" />
              )}
              <p className="mt-2 text-xs text-muted-foreground">{item.category}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-2xl">
          <Note>Dashed slots are reserved for real Rehan Clinic photography of staff and facilities.</Note>
        </div>
      </Shell>

      <Dialog open={Boolean(open)} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl border-hairline bg-card p-3">
          <DialogTitle className="sr-only">{open?.alt ?? "Image"}</DialogTitle>
          {open?.src ? (
            <img src={open.src} alt={open.alt} className="max-h-[78vh] w-full object-contain" />
          ) : null}
          <p className="px-1 pb-1 text-xs text-muted-foreground">{open?.alt}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
