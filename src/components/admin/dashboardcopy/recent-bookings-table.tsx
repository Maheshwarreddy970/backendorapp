import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function getStatusVariant(status?: string) {
  switch (status) {
    case "confirmed":
      return "default";
    case "completed":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

export function RecentBookingsTable({ bookings }: { bookings: any[] }) {
  return (
    <Card className="rounded-2xl border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent bookings</CardTitle>
          <CardDescription>
            Latest bookings across your storefront.
          </CardDescription>
        </div>

        <Link
          href="/admin/bookings"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Customer</th>
                <th className="py-3 pr-4 font-medium">Pet</th>
                <th className="py-3 pr-4 font-medium">Service</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Price</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-muted-foreground">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div>
                        <p className="font-medium">
                          {booking.customerSnapshot?.name || booking.customerId || "-"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.customerSnapshot?.phone || "-"}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 pr-4">
                      {booking.petSnapshot?.name || booking.petId || "-"}
                    </td>

                    <td className="py-3 pr-4">
                      {booking.serviceSnapshot?.name || booking.serviceId || "-"}
                    </td>

                    <td className="py-3 pr-4">{booking.date || "-"}</td>

                    <td className="py-3 pr-4">
                      <Badge variant={getStatusVariant(booking.status)} className="capitalize">
                        {booking.status || "-"}
                      </Badge>
                    </td>

                    <td className="py-3 pr-4 font-medium">
                      ${Number(booking.totalPrice || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}