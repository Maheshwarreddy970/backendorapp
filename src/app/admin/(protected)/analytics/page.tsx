import { AnalyticsDashboard } from "@/components/admin/analytics-dashboardcopy";
import { generateAnalyticsDummyData } from "@/store/analytics-dummy-data";


export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const data = generateAnalyticsDummyData(12);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-yellow-200/60 bg-gradient-to-br from-yellow-50/80 to-background p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Analytics
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Storefront analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visitors, sources, countries, devices, and booking conversion for public storefront traffic.
        </p>
      </div>

      <AnalyticsDashboard
        visitors={data.visitors}
        customers={data.customers}
        bookings={data.bookings}
      />
    </div>
  );
}