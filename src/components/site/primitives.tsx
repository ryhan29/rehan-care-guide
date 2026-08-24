import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const actionVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium tracking-tight transition-all duration-200 ease-brand disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ink-foreground hover:bg-primary shadow-soft",
        accent: "bg-primary text-primary-foreground hover:opacity-90 shadow-soft",
        outline: "border border-hairline bg-transparent text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        urgent: "bg-urgent text-urgent-foreground hover:opacity-92 shadow-soft",
        urgentSoft: "border border-urgent/35 bg-urgent-soft text-urgent hover:bg-urgent hover:text-urgent-foreground",
        quiet: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "h-9 px-3.5 min-w-11",
        md: "h-11 px-5",
        lg: "h-13 px-7 text-[0.95rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ActionProps = VariantProps<typeof actionVariants>;

export function Action({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & ActionProps) {
  return <button className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function ActionLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & ActionProps) {
  return <Link className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

/** Scroll reveal that degrades gracefully and respects reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Element = Tag as "div";

  return (
    <Element
      ref={ref as React.RefObject<HTMLDivElement>}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </Element>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[86rem] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-hairline bg-paper">
      <Shell className="py-14 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-5 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        ) : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </Shell>
    </header>
  );
}

/** Clearly-marked slot for real clinic photography. */
export function PhotoSlot({
  label,
  className,
  ratio = "aspect-[4/5]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Photography placeholder: ${label}`}
      className={cn(
        "relative grid place-items-center overflow-hidden border border-dashed border-hairline bg-secondary",
        ratio,
        className,
      )}
    >
      <div className="px-4 text-center">
        <span className="eyebrow block">Photo placeholder</span>
        <span className="mt-2 block text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-accent/60 bg-secondary/60 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
