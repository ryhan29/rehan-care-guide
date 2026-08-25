import { createFileRoute, notFound } from "@tanstack/react-router";

import consultImage from "@/assets/consult.jpg";
import labImage from "@/assets/lab.jpg";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ActionLink, Eyebrow, Note, Shell } from "@/components/site/primitives";
import { posts } from "@/data/clinic";

export const Route = createFileRoute("/blog/$postSlug")({
  loader: ({ params }) => {
    const index = posts.findIndex((p) => p.slug === params.postSlug);
    if (index === -1) throw notFound();
    return { post: posts[index]!, index };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable — Rehan Clinic" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    const url = `https://rehan-care-guide.lovable.app/blog/${params.postSlug}`;
    return {
      meta: [
        { title: `${post.title} — Rehan Clinic` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <Shell className="py-24 text-center">
      <h1 className="display text-4xl">Article not found</h1>
      <div className="mt-8 flex justify-center">
        <ActionLink to="/blog">All articles</ActionLink>
      </div>
    </Shell>
  ),
});

/** Demonstration body copy — replace with clinician-reviewed articles. */
const demoBody = [
  "[PLACEHOLDER PARAGRAPH] This article is demonstration content used to show the reading layout. Replace it with text written or reviewed by a named clinician.",
  "[PLACEHOLDER PARAGRAPH] Keep published guidance general. Anything specific to an individual — symptoms, dosages, results interpretation — belongs in a consultation, not on a public page.",
  "[PLACEHOLDER PARAGRAPH] A closing paragraph can point readers to the relevant service or to reception, without promising an outcome.",
];

function PostPage() {
  const { post, index } = Route.useLoaderData();
  const image = index % 2 === 0 ? consultImage : labImage;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]} />

      <Shell className="py-12 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="display mt-4 text-[2.4rem] leading-[1.05] sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xs text-muted-foreground">
            {post.author} · {post.date} · {post.readingTime} read
          </p>

          <img
            src={image}
            width={1200}
            height={800}
            loading="lazy"
            alt=""
            className="mt-8 aspect-[3/2] w-full border border-hairline object-cover"
          />

          <p className="mt-8 text-lg leading-relaxed">{post.excerpt}</p>

          <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
            {demoBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10">
            <Note>
              Educational demonstration content. It is not medical advice and does not describe an individual
              treatment plan. Speak to a clinician about your own health.
            </Note>
          </div>

          <div className="mt-10 rule-top pt-6">
            <Eyebrow>Author</Eyebrow>
            <p className="mt-2 text-sm text-muted-foreground">{post.author}</p>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="mx-auto mt-16 max-w-3xl">
            <Eyebrow>Related reading</Eyebrow>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {related.map((p) => (
                <li key={p.slug}>
                  <ActionLink
                    to="/blog/$postSlug"
                    params={{ postSlug: p.slug }}
                    variant="quiet"
                    className="h-auto w-full justify-between px-0 py-4 text-left text-base"
                  >
                    <span className="min-w-0 pr-3">{p.title}</span>
                    <span aria-hidden>→</span>
                  </ActionLink>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Shell>
    </>
  );
}
