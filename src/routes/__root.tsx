import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, MobileActionBar } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-5xl">This page doesn’t exist</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page may have moved. You can return home or book an appointment directly.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-medium text-ink-foreground"
          >
            Go home
          </Link>
          <Link
            to="/appointments"
            className="inline-flex h-11 items-center rounded-md border border-hairline px-5 text-sm font-medium"
          >
            Book appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="display text-4xl">This page didn’t load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong. Try again, or call reception if you need help now.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center rounded-md bg-ink px-5 text-sm font-medium text-ink-foreground"
          >
            Try again
          </button>
          <a href="/" className="inline-flex h-11 items-center rounded-md border border-hairline px-5 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rehan Clinic — Advanced healthcare. Human care." },
      {
        name: "description",
        content:
          "Rehan Clinic: consultations, laboratory testing, imaging and specialist care. Book an appointment, find a doctor or access emergency information.",
      },
      { property: "og:title", content: "Rehan Clinic — Advanced healthcare. Human care." },
      {
        property: "og:description",
        content: "Consultations, diagnostics and specialist care in one clinic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300..700;1,400&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main id="main" className="pb-24 sm:pb-0">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <Toaster />
    </QueryClientProvider>
  );
}
