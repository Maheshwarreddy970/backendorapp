import { DashboardOverview } from "@/components/admin/dashboardcopy/dashboard-overview";
import { generateDummyData } from "@/store/dummy-data";
 
// Demo page — forget the database. Everything below is generated locally
// so the dashboard always renders full of realistic-looking numbers.
export const dynamic = "force-dynamic";
 
export default function AdminDashboardDemoPage() {
  const { bookings, customers, servicesCount } = generateDummyData(12);
 
  return (
    <DashboardOverview
      bookings={bookings}
      customers={customers}
      servicesCount={servicesCount}
    />
  );
}
 