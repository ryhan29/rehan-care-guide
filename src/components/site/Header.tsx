import { Link } from "@tanstack/react-router";
import { CalendarPlus, Menu, Search, Siren } from "lucide-react";
import { useEffect, useState } from "react";

import { EmergencyDialog } from "./EmergencyDialog";
import { SearchDialog } from "./SearchDialog";
import { Action, ActionLink, Shell } from "./primitives";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clinic } from "@/data/clinic";

const primaryNav = [
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Diagnostics", to: "/diagnostics" },
  { label: "Patient Resources", to: "/resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const mobileNav = [
  ...primaryNav.slice(0, 3),
  { label: "Appointments", to: "/appointments" },
  { label: "Patient Portal", to: "/portal" },
  { label: "Patient Resources", to: "/resources" },
  { label: "Insurance & Billing", to: "/insurance" },
  { label: "FAQ", to: "/faq" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ink-foreground"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ease-brand ${
          scrolled ? "border-hairline bg-background/92 backdrop-blur-md" : "border-transparent bg-background"
        }`}
      >
        <Shell>
          <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
            <Link to="/" className="min-w-0 text-[0.95rem] font-semibold uppercase tracking-[0.22em]">
              Rehan<span className="text-primary"> Clinic</span>
            </Link>

            <nav aria-label="Primary" className="hidden justify-center lg:flex">
              <ul className="flex items-center gap-7 text-sm">
                {primaryNav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeProps={{ className: "text-foreground after:scale-x-100" }}
                      inactiveProps={{ className: "text-muted-foreground" }}
                      className="relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-end gap-2">
              <Action
                variant="ghost"
                size="icon"
                aria-label="Search the site"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:inline-flex"
              >
                <Search className="size-4" aria-hidden />
              </Action>

              <EmergencyDialog>
                <Action variant="urgentSoft" size="sm" className="hidden sm:inline-flex">
                  <Siren className="size-4" aria-hidden />
                  Emergency
                </Action>
              </EmergencyDialog>

              <ActionLink to="/appointments" variant="primary" size="sm" className="hidden sm:inline-flex">
                Book appointment
              </ActionLink>

              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Action variant="outline" size="icon" aria-label="Open menu" className="lg:hidden">
                    <Menu className="size-5" aria-hidden />
                  </Action>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm overflow-y-auto bg-background p-0">
                  <SheetHeader className="border-b border-hairline px-6 py-5">
                    <SheetTitle className="text-left text-sm uppercase tracking-[0.22em]">Menu</SheetTitle>
                  </SheetHeader>

                  <div className="px-6 py-6">
                    <Action
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        setMenuOpen(false);
                        setSearchOpen(true);
                      }}
                    >
                      <Search className="size-4" aria-hidden />
                      Search doctors, tests, services
                    </Action>

                    <nav aria-label="Mobile" className="mt-6">
                      <ul className="divide-y divide-hairline">
                        {mobileNav.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.to}
                              onClick={() => setMenuOpen(false)}
                              className="flex min-h-12 items-center justify-between py-3 text-base"
                            >
                              {item.label}
                              <span aria-hidden className="text-muted-foreground">
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="mt-8 grid gap-3">
                      <ActionLink to="/appointments" size="lg" onClick={() => setMenuOpen(false)}>
                        <CalendarPlus className="size-4" aria-hidden />
                        Book appointment
                      </ActionLink>
                      <ActionLink to="/emergency" variant="urgent" size="lg" onClick={() => setMenuOpen(false)}>
                        <Siren className="size-4" aria-hidden />
                        Emergency information
                      </ActionLink>
                      <a
                        href={`tel:${clinic.phone}`}
                        className="text-center text-sm text-muted-foreground underline underline-offset-4"
                      >
                        Call reception — {clinic.phone}
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Shell>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

/** Persistent mobile action bar — emergency and booking always one tap away. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden">
      <div className="grid grid-cols-2 gap-2 px-4 py-3">
        <ActionLink to="/appointments" size="md" className="w-full">
          <CalendarPlus className="size-4" aria-hidden />
          Book
        </ActionLink>
        <EmergencyDialog>
          <Action variant="urgent" size="md" className="w-full">
            <Siren className="size-4" aria-hidden />
            Emergency
          </Action>
        </EmergencyDialog>
      </div>
    </div>
  );
}
