import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ActionLink, PageHeader, PhotoSlot, Shell } from "@/components/site/primitives";
import { departments, doctors } from "@/data/clinic";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    meta: [
      { title: "Find a Doctor — Rehan Clinic" },
      {
        name: "description",
        content:
          "Search Rehan Clinic doctors by name, specialty, language and availability, then book directly from a profile.",
      },
      { property: "og:title", content: "Find a Doctor — Rehan Clinic" },
      { property: "og:description", content: "Search by specialty, language and availability." },
    ],
  }),
  component: DoctorsPage,
});

const languages = Array.from(new Set(doctors.flatMap((d) => d.languages)));

function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [language, setLanguage] = useState("All");
  const [availability, setAvailability] = useState("All");

  const results = useMemo(
    () =>
      doctors.filter((d) => {
        const q = query.trim().toLowerCase();
        const matchQ = !q || `${d.name} ${d.specialty} ${d.location}`.toLowerCase().includes(q);
        const matchS = specialty === "All" || d.specialty === specialty;
        const matchL = language === "All" || d.languages.includes(language);
        const matchA = availability === "All" || d.availability === availability;
        return matchQ && matchS && matchL && matchA;
      }),
    [query, specialty, language, availability],
  );

  const selectClass =
    "h-11 w-full border border-hairline bg-card px-3 text-sm outline-none transition-colors focus-visible:border-primary";

  return (
    <>
      <PageHeader
        eyebrow="Doctors"
        title={
          <>
            Find the clinician <em className="italic text-primary">you need</em>.
          </>
        }
        intro="Search by name or specialty, then filter by language and availability. Profiles list placeholder details until verified credentials are supplied."
      />

      <Shell className="py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="sm:col-span-2">
            <span className="eyebrow">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Doctor name, specialty or location"
              className="mt-2 h-11 w-full border border-hairline bg-card px-3 text-sm outline-none focus-visible:border-primary"
            />
          </label>
          <label>
            <span className="eyebrow">Specialty</span>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={`mt-2 ${selectClass}`}>
              <option>All</option>
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="eyebrow">Language</span>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className={`mt-2 ${selectClass}`}>
                <option>All</option>
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="eyebrow">Availability</span>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className={`mt-2 ${selectClass}`}
              >
                <option>All</option>
                <option>This week</option>
                <option>Next week</option>
              </select>
            </label>
          </div>
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "doctor" : "doctors"} shown
        </p>

        {results.length === 0 ? (
          <div className="mt-10 border border-dashed border-hairline p-10 text-center">
            <p className="text-base">No doctors match these filters.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Clear a filter, or contact reception and we will help you find the right clinician.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <ActionLink to="/contact" variant="outline" size="sm">
                Contact reception
              </ActionLink>
            </div>
          </div>
        ) : (
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((d) => (
              <li key={d.id} className="min-w-0">
                <Link to="/doctors/$doctorId" params={{ doctorId: d.id }} className="group block">
                  <PhotoSlot label={`${d.specialty} — real staff photo`} />
                  <p className="mt-4 text-base font-medium">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.specialty}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {d.languages.join(", ")} · {d.availability}
                  </p>
                  <span className="mt-3 inline-block text-sm text-primary underline-offset-4 group-hover:underline">
                    View profile
                  </span>
                </Link>
                <ActionLink
                  to="/appointments"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full"
                >
                  Book appointment
                </ActionLink>
              </li>
            ))}
          </ul>
        )}
      </Shell>
    </>
  );
}
