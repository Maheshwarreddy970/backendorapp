import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BookingsTable } from "@/components/admin/bookings/bookings-table";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookingsSnap = await getDocs(
    query(collection(db, "bookings"), orderBy("createdAt", "desc"))
  );

  const bookings = bookingsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Bookings
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Manage bookings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View, filter, export, and update customer bookings.
        </p>
      </div>

      <BookingsTable bookings={bookings} />
    </div>
  );
}