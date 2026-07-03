import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { requireAdminSession } from "@/lib/auth";
import AdminCalendar from "@/components/admin/admin-calendar";

function toDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export default async function AdminCalendarPage() {
  const session = await requireAdminSession();
  const adminId = session.id;

  const staffRef = doc(db, "staff", adminId);
  const staffSnap = await getDoc(staffRef);

  if (!staffSnap.exists()) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Staff profile not found for this admin.
        </p>
      </div>
    );
  }

  const staff = { id: staffSnap.id, ...staffSnap.data() } as any;

  const bookingsQuery = query(
    collection(db, "bookings"),
    where("staffId", "==", adminId)
  );

  const bookingsSnap = await getDocs(bookingsQuery);
  const bookings = bookingsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  const bookingEvents = bookings.map((booking) => {
    const start = toDateTime(booking.date, booking.startTime);
    const end =
      booking.endTime
        ? toDateTime(booking.date, booking.endTime)
        : addMinutes(start, booking.serviceSnapshot?.durationMinutes || 60);

    const status = booking.status || "pending";

    const colorMap: Record<string, string> = {
      pending: "#a16207",
      confirmed: "#2563eb",
      completed: "#059669",
      cancelled: "#dc2626",
    };

    return {
      id: booking.id,
      title: `${booking.petSnapshot?.name || "Pet"} • ${booking.serviceSnapshot?.name || booking.serviceId}`,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: colorMap[status] || "#2563eb",
      borderColor: colorMap[status] || "#2563eb",
      extendedProps: {
        bookingId: booking.id,
        customerName: booking.customerSnapshot?.name || "",
        customerPhone: booking.customerSnapshot?.phone || "",
        petName: booking.petSnapshot?.name || "",
        petBreed: booking.petSnapshot?.breed || "",
        serviceName: booking.serviceSnapshot?.name || booking.serviceId || "",
        status,
        totalPrice: booking.totalPrice || 0,
        notes: booking.notes || "",
      },
    };
  });

  const dayOffEvents =
    (staff.daysOff || []).map((date: string) => ({
      id: `off-${date}`,
      title: "Day Off",
      start: date,
      end: addMinutes(new Date(`${date}T00:00:00`), 24 * 60).toISOString(),
      display: "background",
      backgroundColor: "rgba(220,38,38,0.12)",
      borderColor: "rgba(220,38,38,0.12)",
      extendedProps: {
        type: "dayOff",
      },
    })) || [];

  const calendarEvents = [...bookingEvents, ...dayOffEvents];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Schedule
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Calendar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your bookings, service slots, and off days.
        </p>
      </div>

      <AdminCalendar
        staff={staff}
        events={calendarEvents}
      />
    </div>
  );
}