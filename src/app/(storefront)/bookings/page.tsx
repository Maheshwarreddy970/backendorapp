import Link from "next/link";
import { getCustomerBookingsAction } from "@/actions/customer-portal";

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function BookingsPage() {
  const bookings = await getCustomerBookingsAction();

  return (
    <section className="space-y-6 px-3 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-20 ">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-900">My bookings</h2>
          <p className="mt-1 text-sm text-zinc-600">
            View all your scheduled, completed, and upcoming appointments.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit items-center rounded-full bg-[#FFC357] px-5 py-2.5 text-sm font-medium text-zinc-900"
        >
          Book a service
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
          <h3 className="text-lg font-medium text-zinc-900">No bookings yet</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Once you book a grooming or care service, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-zinc-900">{booking.serviceName}</h3>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600">
                    {formatDate(booking.date)} · {booking.startTime || "—"} to {booking.endTime || "—"}
                  </p>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900">${booking.totalPrice}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Pet</p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">{booking.petName}</p>
                  <p className="mt-1 text-xs text-zinc-600">{booking.petBreed}</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Staff</p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">{booking.staffName}</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Service ID</p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">{booking.serviceId || "—"}</p>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Updated</p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">{formatDate(booking.updatedAt || "")}</p>
                </div>
              </div>

              {booking.addOns.length > 0 ? (
                <div className="mt-5 rounded-2xl border border-zinc-200 p-4">
                  <p className="text-sm font-medium text-zinc-900">Add-ons</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {booking.addOns.map((addon) => (
                      <span key={addon.id} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
                        {addon.name} · ${addon.price}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {booking.notes ? (
                <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-sm font-medium text-zinc-900">Notes</p>
                  <p className="mt-2 text-sm text-zinc-600">{booking.notes}</p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}