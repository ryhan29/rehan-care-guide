import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { diagnosticTests, doctors, faqs, posts, services } from "@/data/clinic";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string, hash?: string) => {
    onOpenChange(false);
    setQuery("");
    void navigate({ to, hash });
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Rehan Clinic"
      description="Search doctors, services, diagnostics, resources and articles"
    >
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search doctors, services, tests, FAQs…"
      />
      <CommandList>
        <CommandEmpty>
          No matches. Try “blood test”, “X-Ray”, “parking” or a specialty.
        </CommandEmpty>

        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/appointments")}>Book an appointment</CommandItem>
          <CommandItem onSelect={() => go("/doctors")}>Find a doctor</CommandItem>
          <CommandItem onSelect={() => go("/emergency")}>Emergency information</CommandItem>
          <CommandItem onSelect={() => go("/contact")}>Contact &amp; directions</CommandItem>
        </CommandGroup>

        <CommandGroup heading="Doctors">
          {doctors.map((d) => (
            <CommandItem key={d.id} value={`${d.name} ${d.specialty}`} onSelect={() => go(`/doctors/${d.id}`)}>
              {d.name} <span className="ml-2 text-muted-foreground">{d.specialty}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Services">
          {services.map((s) => (
            <CommandItem key={s.slug} value={`${s.name} ${s.category}`} onSelect={() => go("/services", s.slug)}>
              {s.name} <span className="ml-2 text-muted-foreground">{s.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Diagnostics">
          {diagnosticTests.map((t) => (
            <CommandItem key={t.slug} value={`${t.name} ${t.group}`} onSelect={() => go("/diagnostics", t.slug)}>
              {t.name} <span className="ml-2 text-muted-foreground">{t.group}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="FAQs &amp; resources">
          {faqs.map((f) => (
            <CommandItem key={f.q} value={`${f.q} ${f.category}`} onSelect={() => go("/faq")}>
              {f.q}
            </CommandItem>
          ))}
          <CommandItem value="what to bring before your visit" onSelect={() => go("/resources")}>
            Before your visit — what to bring
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Articles">
          {posts.map((p) => (
            <CommandItem key={p.slug} value={`${p.title} ${p.category}`} onSelect={() => go("/blog")}>
              {p.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
