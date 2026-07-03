import AdminCalendar from "@/components/admin/admin-calendarcopy";
import { generateAdminCalendarDummyData } from "@/store/admin-calendar-dummy-data";

export const dynamic = "force-dynamic";

export default function AdminCalendarPage() {
  const { staff, events } = generateAdminCalendarDummyData();

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-yellow-200/60 bg-gradient-to-br from-yellow-50/70 to-background p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Schedule
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Calendar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your bookings, service slots, and off days.
        </p>
      </div>

      <AdminCalendar staff={staff} events={events} />
    </div>
  );
}