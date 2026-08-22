import { Link } from "@tanstack/react-router";
import { Ambulance, MapPin, Phone, Clock } from "lucide-react";
import type { ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { clinic } from "@/data/clinic";

export function EmergencyDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg border-hairline bg-card">
        <DialogHeader>
          <DialogTitle className="display text-3xl">Emergency information</DialogTitle>
          <DialogDescription>
            If this is a life-threatening emergency, call your national emergency number immediately.
          </DialogDescription>
        </DialogHeader>

        <ul className="mt-2 space-y-4 text-sm">
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-urgent" aria-hidden />
            <span>
              <span className="eyebrow block">Emergency line</span>
              <a className="font-medium underline underline-offset-4" href={`tel:${clinic.emergencyPhone}`}>
                {clinic.emergencyPhone}
              </a>
            </span>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-urgent" aria-hidden />
            <span>
              <span className="eyebrow block">Emergency entrance</span>
              {clinic.address}
            </span>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-urgent" aria-hidden />
            <span>
              <span className="eyebrow block">Estimated wait time</span>
              {clinic.liveWaitTimeAvailable ? "—" : "Live wait time unavailable"}
            </span>
          </li>
          <li className="flex gap-3">
            <Ambulance className="mt-0.5 size-4 shrink-0 text-urgent" aria-hidden />
            <span>
              <span className="eyebrow block">Department hours</span>
              [PLACEHOLDER] Emergency department hours to be confirmed by the clinic.
            </span>
          </li>
        </ul>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`tel:${clinic.emergencyPhone}`}
            className="inline-flex h-11 items-center justify-center rounded-md bg-urgent px-5 text-sm font-medium text-urgent-foreground transition-opacity hover:opacity-90"
          >
            Call emergency line
          </a>
          <Link
            to="/emergency"
            className="inline-flex h-11 items-center justify-center rounded-md border border-hairline px-5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Full emergency details
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
