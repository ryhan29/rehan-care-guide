import { createFileRoute } from "@tanstack/react-router";

import consultImage from "@/assets/consult.jpg";
import labImage from "@/assets/lab.jpg";
import { Note, PageHeader, Shell } from "@/components/site/primitives";
import { posts } from "@/data/clinic";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Health Knowledge Centre — Rehan Clinic Blog" },
      {
        name: "description",
        content:
          "Articles on preventive care, diagnostics, nutrition, women's health, children's health and heart health from Rehan Clinic.",
      },
      { property: "og:title", content: "Health Knowledge Centre — Rehan Clinic" },
      { property: "og:description", content: "Preventive care, diagnostics and everyday health guidance." },
    ],
  }),
  component: BlogPage,
});

const images = [consultImage, labImage];

function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Health knowledge centre"
        title={
          <>
            Health writing without <em className="italic text-primary">the jargon</em>.
          </>
        }
      />

      <Shell className="py-12 sm:py-16">
        <article className="grid gap-8 border-b border-hairline pb-12 lg:grid-cols-2 lg:gap-16">
          <img
            src={images[0]}
            width={1200}
            height={900}
            loading="lazy"
            alt="Consulting room where routine reviews take place"
            className="aspect-[16/10] w-full border border-hairline object-cover"
          />
          <div className="min-w-0 self-center">
            <p className="eyebrow">{lead.category}</p>
            <h2 className="display mt-3 text-[2.2rem] leading-[1.05] sm:text-5xl">{lead.title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{lead.excerpt}</p>
            <p className="mt-6 text-xs text-muted-foreground">
              {lead.author} · {lead.date} · {lead.readingTime} read
            </p>
          </div>
        </article>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.slug} className="min-w-0">
              <img
                src={images[i % images.length]}
                width={1200}
                height={900}
                loading="lazy"
                alt=""
                className="aspect-[4/3] w-full border border-hairline object-cover"
              />
              <p className="eyebrow mt-4">{p.category}</p>
              <h3 className="mt-2 text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {p.author} · {p.date} · {p.readingTime} read
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-2xl">
          <Note>
            Articles are demonstration content with placeholder authors. Only verified clinicians will be credited
            once real articles are published.
          </Note>
        </div>
      </Shell>
    </>
  );
}
