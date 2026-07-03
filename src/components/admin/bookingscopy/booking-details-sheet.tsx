"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function formatDateTime(date?: string, time?: string) {
  if (!date) return "-";
  return `${date}${time ? ` ${time}` : ""}`;
}

function getStatusVariant(status?: string) {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-blue-100 text-primary hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
    case "completed":
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "cancelled":
      return "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400";
    case "pending":
    default:
      return "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
  }
}

export function BookingDetailsSheet({
  open,
  onOpenChange,
  booking,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any | null;
}) {
  if (!booking) return null;

  const pet = booking.petSnapshot || {};
  const service = booking.serviceSnapshot || {};
  const customer = booking.customerSnapshot || {};
  const addOns = Array.isArray(booking.addOns) ? booking.addOns : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-4xl p-4">
        <SheetHeader>
          <SheetTitle>Booking Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-500">
              ID
            </p>
            <p className="mt-2 font-mono font-medium">{booking.id}</p>
          </div>

          <div className="rounded-xl border border-cyan-200 bg-cyan-50/30 p-4 dark:border-cyan-900/30 dark:bg-cyan-900/10">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-600 dark:text-cyan-400">
              Scheduled For
            </p>
            <p className="mt-2 font-medium">
              {formatDateTime(booking.date, booking.startTime)}
            </p>
            <div className="mt-3">
              <Badge className={`capitalize shadow-none ${getStatusVariant(booking.status)}`}>
                {booking.status || "pending"}
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 dark:border-indigo-900/30 dark:bg-indigo-900/10">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-indigo-600 dark:text-indigo-400">
              Customer
            </p>
            <p className="mt-2 font-medium">{customer.name || "-"}</p>
            <p className="text-sm text-muted-foreground">{customer.phone || booking.customerId || "-"}</p>
          </div>

          <div className="rounded-xl border border-orange-200 bg-orange-50/30 p-4 dark:border-orange-900/30 dark:bg-orange-900/10">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-orange-600 dark:text-orange-400">
              Pet Profile
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {pet.name || "-"}</p>
              <p><span className="font-medium">Breed:</span> {pet.breed || "-"}</p>
              <p><span className="font-medium">Type:</span> {pet.type || "-"}</p>
              <p className="flex items-center gap-2 pt-1">
                <span className="font-medium">Vaccinated:</span>
                <Badge variant={pet.vaccinated ? "default" : "secondary"} className={pet.vaccinated ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                  {pet.vaccinated ? "Yes" : "No"}
                </Badge>
              </p>
              <p><span className="font-medium">Vaccination Date:</span> {pet.vaccinatedAt || pet.vaccinationDate || "-"}</p>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50/30 p-4 dark:border-purple-900/30 dark:bg-purple-900/10">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-purple-600 dark:text-purple-400">
              Payment & Service
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">Payment Method</p>
                <p className="text-muted-foreground">{booking.paymentMethod || "Cash / Store"}</p>
              </div>

              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">Status</p>
                <p className="text-muted-foreground capitalize">{booking.status || "-"}</p>
              </div>

              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">Service</p>
                <p className="text-muted-foreground">{service.name || booking.serviceId || "-"}</p>
              </div>

              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">Base Price</p>
                <p className="text-muted-foreground">${Number(service.basePrice || 0).toFixed(2)}</p>
              </div>

              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">Duration</p>
                <p className="text-muted-foreground">{booking.durationMinutes || service.durationMinutes || 0} minutes</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-sm text-purple-900 dark:text-purple-200">Add-ons</p>
              {addOns.length === 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">No add-ons</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {addOns.map((addOn: any, index: number) => (
                    <div
                      key={`${addOn.id || addOn.name || "addon"}-${index}`}
                      className="flex items-center justify-between rounded-lg border border-purple-100 bg-white/50 dark:bg-slate-900/50 dark:border-purple-900/30 px-3 py-2 text-sm"
                    >
                      <span className="font-medium">{addOn.name || "-"}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-medium">+${Number(addOn.price || 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 dark:border-emerald-900/50 dark:bg-emerald-900/20">
              <span className="font-medium text-emerald-900 dark:text-emerald-100">Total Amount</span>
              <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400">${Number(booking.totalPrice || 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/30">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-500">
              Extra Info
            </p>
            <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {booking.notes || booking.extraInfo || "No extra notes."}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}