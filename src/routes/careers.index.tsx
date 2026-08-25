import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ActionLink, Note, PageHeader, Shell } from "@/components/site/primitives";
import { jobs } from "@/data/clinic";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — Work at Rehan Clinic" },
      {
        name: "description",
        content:
          "Open roles across doctors, nursing, laboratory, radiology, administration and reception at Rehan Clinic.",
      },
      { property: "og:title", content: "Careers — Rehan Clinic" },
      { property: "og:description", content: "Clinical and administrative roles at Rehan Clinic." },
    ],
  }),
  component: CareersPage,
});

const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];

function CareersPage() {
  const [dept, setDept] = useState("All");
  const list = dept === "All" ? jobs : jobs.filter((j) => j.department === dept);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Build careful medicine <em className="italic text-primary">with us</em>.
          </>
        }
        intro="Roles across clinical, diagnostic and front-of-house teams."
      />

      <Shell className="py-12 sm:py-16">
        <ul className="flex flex-wrap gap-2">
          {departments.map((d) => (
            <li key={d}>
              <button
                onClick={() => setDept(d)}
                aria-pressed={dept === d}
                className={`h-9 rounded-full border px-4 text-xs transition-colors ${
                  dept === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-hairline text-muted-foreground hover:text-foreground"
                }`}
              >
                {d}
              </button>
            </li>
          ))}
        </ul>

        <ul className="mt-10 border-t border-hairline">
          {list.map((job) => (
            <li key={job.id} className="grid gap-4 border-b border-hairline py-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-center">
              <div className="min-w-0">
                <h2 className="text-xl font-medium">{job.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.department} · {job.location} · {job.type}
                </p>
              </div>
              <ul className="min-w-0 text-sm text-muted-foreground">
                {job.requirements.map((r) => (
                  <li key={r}>— {r}</li>
                ))}
              </ul>
              <ActionLink to="/contact" variant="outline" size="sm">
                Apply
              </ActionLink>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-2xl">
          <Note>Listings are placeholders and will be replaced with real vacancies as they open.</Note>
        </div>
      </Shell>
    </>
  );
}
