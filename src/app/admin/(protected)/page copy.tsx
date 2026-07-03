import { collection, getDocs, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DashboardOverview } from "@/components/admin/dashboardcopy/dashboard-overview";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookingsSnap, customersSnap, servicesCountSnap] = await Promise.all([
    getDocs(collection(db, "bookings")),
    getDocs(collection(db, "customers")),
    getCountFromServer(collection(db, "services")),
  ]);

  const bookings = bookingsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const customers = customersSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <DashboardOverview
      bookings={bookings}
      customers={customers}
      servicesCount={servicesCountSnap.data().count}
    />
  );
}