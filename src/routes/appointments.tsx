import { createFileRoute } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

import { Action, ActionLink, Eyebrow, Note, PageHeader, Shell } from "@/components/site/primitives";
import { departments, doctors, services } from "@/data/clinic";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Rehan Clinic" },
      {
        name: "description",
        content:
          "Choose a doctor, department or service, pick a date and time, and review your details. Demonstration booking interface for Rehan Clinic.",
      },
      { property: "og:title", content: "Book an Appointment — Rehan Clinic" },
      { property: "og:description", content: "A five-step booking flow: who, when, what time, your details, review." },
    ],
  }),
  component: AppointmentsPage,
});

const steps = ["Care", "Date", "Time", "Details", "Review"];
const times = ["09:00", "09:30", "10:00", "11:15", "13:00", "14:30", "15:45", "16:30"];

function nextDays(count: number) {
  const out: { iso: string; label: string; weekday: string }[] = [];
  const start = new Date();
  for (let i = 1; out.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, { day: "numeric", month: "short" }),
      weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }
  return out;
}

function AppointmentsPage() {
  const [step, setStep] = useState(0);
  const [care, setCare] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const days = nextDays(8);

  const canContinue = [Boolean(care), Boolean(date), Boolean(time), true, true][step];

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (form.phone.trim().length < 6) e.phone = "Please enter a contact number we can reach you on.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Please check the email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 900);
  };

  const optionClass = (selected: boolean) =>
    `min-h-12 border px-4 py-3 text-left text-sm transition-all duration-200 ease-brand ${
      selected ? "border-primary bg-primary text-primary-foreground" : "border-hairline hover:border-foreground"
    }`;

  const fieldClass = (invalid?: boolean) =>
    `mt-2 h-12 w-full border bg-card px-3 text-base outline-none transition-colors focus-visible:border-primary ${
      invalid ? "border-urgent" : "border-hairline"
    }`;

  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title={
          <>
            Book in <em className="italic text-primary">five short steps</em>.
          </>
        }
        intro="Choose the care you need, pick a time that suits you, and leave your contact details. We only ask for what reception needs."
      />

      <Shell className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <Note>
            This booking interface is a demonstration. No backend is connected, so no appointment is actually
            reserved and nothing is sent to the clinic. To book for real, call reception.
          </Note>
        </div>

        <ol className="mt-10 grid grid-cols-5 gap-2" aria-label="Booking progress">
          {steps.map((s, i) => (
            <li key={s} className="min-w-0">
              <div className={`h-0.5 w-full ${i <= step ? "bg-primary" : "bg-hairline"}`} />
              <p className={`mt-2 truncate text-xs ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                {i + 1}. {s}
              </p>
            </li>
          ))}
        </ol>

        {status === "done" ? (
          <div className="mt-12 max-w-2xl border border-hairline bg-paper p-8 sm:p-12">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-5" aria-hidden />
            </span>
            <h2 className="display mt-6 text-4xl">Demo request captured</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              In a live version, this screen would confirm your appointment for <strong>{care}</strong> on{" "}
              <strong>{date}</strong> at <strong>{time}</strong>. Nothing has been booked — this interface is a
              demonstration only.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Action
                variant="outline"
                onClick={() => {
                  setStatus("idle");
                  setStep(0);
                  setCare("");
                  setDate("");
                  setTime("");
                }}
              >
                Start over
              </Action>
              <ActionLink to="/contact">Contact reception</ActionLink>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
            <div className="min-w-0">
              {step === 0 && (
                <fieldset>
                  <legend className="eyebrow">Step 1 — What do you need?</legend>
                  <div className="mt-5 space-y-8">
                    <div>
                      <p className="text-sm font-medium">Doctor</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {doctors.map((d) => (
                          <button key={d.id} onClick={() => setCare(d.name)} className={optionClass(care === d.name)}>
                            {d.name}
                            <span className="mt-0.5 block text-xs opacity-70">{d.specialty}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Department</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {departments.map((d) => (
                          <button key={d} onClick={() => setCare(d)} className={optionClass(care === d)}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Service or test</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {services
                          .filter((s) => s.category !== "Specialist Care")
                          .map((s) => (
                            <button key={s.slug} onClick={() => setCare(s.name)} className={optionClass(care === s.name)}>
                              {s.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset>
                  <legend className="eyebrow">Step 2 — Choose a date</legend>
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {days.map((d) => (
                      <button key={d.iso} onClick={() => setDate(d.iso)} className={optionClass(date === d.iso)}>
                        <span className="block text-xs opacity-70">{d.weekday}</span>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="eyebrow">Step 3 — Choose a time</legend>
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {times.map((t) => (
                      <button key={t} onClick={() => setTime(t)} className={optionClass(time === t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Times shown are sample slots, not live availability.
                  </p>
                </fieldset>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="eyebrow">Step 4 — Your details</legend>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="text-sm font-medium">Full name</span>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        className={fieldClass(Boolean(errors.name))}
                      />
                      {errors.name && (
                        <span id="err-name" role="alert" className="mt-1 block text-xs text-urgent">
                          {errors.name}
                        </span>
                      )}
                    </label>
                    <label>
                      <span className="text-sm font-medium">Phone</span>
                      <input
                        value={form.phone}
                        inputMode="tel"
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                        className={fieldClass(Boolean(errors.phone))}
                      />
                      {errors.phone && (
                        <span id="err-phone" role="alert" className="mt-1 block text-xs text-urgent">
                          {errors.phone}
                        </span>
                      )}
                    </label>
                    <label>
                      <span className="text-sm font-medium">Email (optional)</span>
                      <input
                        value={form.email}
                        inputMode="email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        aria-invalid={Boolean(errors.email)}
                        className={fieldClass(Boolean(errors.email))}
                      />
                      {errors.email && (
                        <span role="alert" className="mt-1 block text-xs text-urgent">
                          {errors.email}
                        </span>
                      )}
                    </label>
                    <label className="sm:col-span-2">
                      <span className="text-sm font-medium">Reason for visit (optional, keep it brief)</span>
                      <textarea
                        value={form.reason}
                        rows={3}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                        className="mt-2 w-full border border-hairline bg-card px-3 py-2 text-base outline-none focus-visible:border-primary"
                      />
                      <span className="mt-1 block text-xs text-muted-foreground">
                        Please do not include sensitive medical details here.
                      </span>
                    </label>
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <div>
                  <p className="eyebrow">Step 5 — Review</p>
                  <dl className="mt-5 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                    {[
                      ["Care", care || "—"],
                      ["Date", date || "—"],
                      ["Time", time || "—"],
                      ["Name", form.name || "—"],
                      ["Phone", form.phone || "—"],
                      ["Email", form.email || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-background p-5">
                        <dt className="eyebrow">{k}</dt>
                        <dd className="mt-1 text-sm">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                {step > 0 && (
                  <Action variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Action>
                )}
                {step < 4 ? (
                  <Action
                    disabled={!canContinue}
                    onClick={() => {
                      if (step === 3 && !validate()) return;
                      setStep(step + 1);
                    }}
                  >
                    Continue
                  </Action>
                ) : (
                  <Action onClick={submit} disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden /> Submitting
                      </>
                    ) : (
                      "Submit demo request"
                    )}
                  </Action>
                )}
              </div>
            </div>

            <aside className="min-w-0 self-start border border-hairline bg-paper p-6 lg:sticky lg:top-28">
              <Eyebrow>Your selection</Eyebrow>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Care</span>
                  <span className="min-w-0 truncate text-right">{care || "Not chosen"}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Date</span>
                  <span>{date || "Not chosen"}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Time</span>
                  <span>{time || "Not chosen"}</span>
                </li>
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Prefer to speak to someone? Reception can book on your behalf and answer questions about
                preparation or insurance.
              </p>
              <ActionLink to="/contact" variant="outline" size="sm" className="mt-4 w-full">
                Contact reception
              </ActionLink>
            </aside>
          </div>
        )}
      </Shell>
    </>
  );
}
