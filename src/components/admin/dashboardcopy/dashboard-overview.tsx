"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Users,
  IndianRupee,
  CalendarCheck2,
  Ban,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RecentBookingsTable } from "@/components/admin/dashboardcopy/recent-bookings-table";

type Props = {
  bookings: any[];
  customers: any[];
  servicesCount: number;
};

// ---- Yellow theme tokens -------------------------------------------------
const YELLOW = "#F5B300"; // primary accent
const YELLOW_SOFT = "#FBD34D"; // lighter accent
const YELLOW_DEEP = "#B8860B"; // darker accent for contrast
const AMBER_MUTED = "#8A6A00";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthKey(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-");
  return `${monthNames[Number(month) - 1]} ${year}`;
}

function percentChange(current: number, previous: number) {
  if (!previous && !current) return 0;
  if (!previous) return 100;
  return ((current - previous) / previous) * 100;
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function getTrendMeta(change: number) {
  const positive = change >= 0;
  return {
    positive,
    icon: positive ? TrendingUp : TrendingDown,
    text: `${positive ? "+" : ""}${change.toFixed(1)}%`,
  };
}

export function DashboardOverview({ bookings, customers, servicesCount }: Props) {
  const [range, setRange] = useState<"6m" | "12m">("6m");

  const metrics = useMemo(() => {
    const bookingMonthMap = new Map<string, any>();
    const customerMonthMap = new Map<string, number>();

    let totalRevenue = 0;
    let pendingNow = 0;

    for (const booking of bookings) {
      const key = getMonthKey(booking.date || booking.createdAt);
      const amount = Number(booking.totalPrice || 0);
      const status = String(booking.status || "").toLowerCase();

      totalRevenue += amount;

      if (status === "pending") pendingNow += 1;

      if (key) {
        if (!bookingMonthMap.has(key)) {
          bookingMonthMap.set(key, {
            key,
            revenue: 0,
            bookings: 0,
            completed: 0,
            cancelled: 0,
          });
        }

        const current = bookingMonthMap.get(key);
        current.bookings += 1;

        if (status === "completed") {
          current.completed += 1;
          current.revenue += amount;
        }

        if (status === "cancelled") {
          current.cancelled += 1;
        }
      }
    }

    for (const customer of customers) {
      const key = getMonthKey(customer.createdAt || customer.lastVisit);
      if (!key) continue;
      customerMonthMap.set(key, (customerMonthMap.get(key) || 0) + 1);
    }

    const allMonthKeys = Array.from(
      new Set([...bookingMonthMap.keys(), ...customerMonthMap.keys()])
    ).sort((a, b) => a.localeCompare(b));

    const filledMonths = allMonthKeys.map((key) => {
      const bookingData = bookingMonthMap.get(key) || {
        revenue: 0,
        bookings: 0,
        completed: 0,
        cancelled: 0,
      };

      return {
        key,
        label: monthLabel(key),
        revenue: bookingData.revenue,
        bookings: bookingData.bookings,
        completed: bookingData.completed,
        cancelled: bookingData.cancelled,
        customers: customerMonthMap.get(key) || 0,
      };
    });

    const months = range === "6m" ? filledMonths.slice(-6) : filledMonths.slice(-12);

    const currentMonth = months[months.length - 1] || {
      revenue: 0,
      customers: 0,
      completed: 0,
      cancelled: 0,
      bookings: 0,
    };

    const previousMonth = months[months.length - 2] || {
      revenue: 0,
      customers: 0,
      completed: 0,
      cancelled: 0,
      bookings: 0,
    };

    const recentRevenueMonths = months.slice(-3);
    const expectedNextMonthRevenue =
      recentRevenueMonths.length > 0
        ? recentRevenueMonths.reduce((sum, item) => sum + item.revenue, 0) / recentRevenueMonths.length
        : 0;

    const recentBookings = [...bookings]
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
      .slice(0, 6);

    return {
      months,
      totalRevenue,
      servicesCount,
      totalCustomers: customers.length,
      pendingNow,
      recentBookings,
      cards: {
        revenue: {
          value: currentMonth.revenue,
          change: percentChange(currentMonth.revenue, previousMonth.revenue),
        },
        customers: {
          value: currentMonth.customers,
          change: percentChange(currentMonth.customers, previousMonth.customers),
        },
        completed: {
          value: currentMonth.completed,
          change: percentChange(currentMonth.completed, previousMonth.completed),
        },
        cancelled: {
          value: currentMonth.cancelled,
          change: percentChange(currentMonth.cancelled, previousMonth.cancelled),
        },
        pending: {
          value: pendingNow,
          change: percentChange(currentMonth.bookings, previousMonth.bookings),
        },
        expectedRevenue: {
          value: expectedNextMonthRevenue,
          change: percentChange(expectedNextMonthRevenue, currentMonth.revenue),
        },
      },
    };
  }, [bookings, customers, servicesCount, range]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: AMBER_MUTED }}>
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Business overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Revenue, customer growth, booking performance, and business trends.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={range === "6m" ? "default" : "outline"}
            onClick={() => setRange("6m")}
            className={range === "6m" ? "" : ""}
            style={range === "6m" ? { backgroundColor: YELLOW, color: "#1a1400", borderColor: YELLOW } : {}}
          >
            Last 6 months
          </Button>
          <Button
            variant={range === "12m" ? "default" : "outline"}
            onClick={() => setRange("12m")}
            style={range === "12m" ? { backgroundColor: YELLOW, color: "#1a1400", borderColor: YELLOW } : {}}
          >
            Last 12 months
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.cards.revenue.value)}
          change={metrics.cards.revenue.change}
          description="Trending this month"
          icon={IndianRupee}
          highlight
        />

        <MetricCard
          title="New Customers"
          value={formatNumber(metrics.cards.customers.value)}
          change={metrics.cards.customers.change}
          description="Customer acquisition this month"
          icon={Users}
        />

        <MetricCard
          title="Completed Bookings"
          value={formatNumber(metrics.cards.completed.value)}
          change={metrics.cards.completed.change}
          description="Completed in the current month"
          icon={CalendarCheck2}
        />

        <MetricCard
          title="Cancelled Bookings"
          value={formatNumber(metrics.cards.cancelled.value)}
          change={metrics.cards.cancelled.change}
          description="Cancellations in the current month"
          icon={Ban}
        />

        <MetricCard
          title="Pending Bookings"
          value={formatNumber(metrics.cards.pending.value)}
          change={metrics.cards.pending.change}
          description="Bookings needing follow-up"
          icon={Clock3}
        />

        <MetricCard
          title="Expected Revenue"
          value={formatCurrency(metrics.cards.expectedRevenue.value)}
          change={metrics.cards.expectedRevenue.change}
          description="Estimated from recent months"
          icon={BriefcaseBusiness}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-2xl border overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>
              Monthly completed-booking revenue for the selected period.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.months}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={YELLOW} stopOpacity={0.55} />
                    <stop offset="100%" stopColor={YELLOW} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  formatter={(value: any) => formatCurrency(Number(value || 0))}
                  contentStyle={{ borderRadius: 12, borderColor: YELLOW_SOFT }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={YELLOW_DEEP}
                  strokeWidth={2.5}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 5, fill: YELLOW, stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border overflow-hidden">
          <CardHeader>
            <CardTitle>Customer growth</CardTitle>
            <CardDescription>
              New customers added across the selected period.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.months}>
                <defs>
                  <linearGradient id="customerFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={YELLOW_SOFT} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={YELLOW_SOFT} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: YELLOW_SOFT }} />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke={YELLOW}
                  fill="url(#customerFill)"
                  strokeWidth={2.5}
                  activeDot={{ r: 5, fill: YELLOW, stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <MiniTrendCard
          title="Bookings"
          description="Total monthly bookings"
          data={metrics.months}
          dataKey="bookings"
          variant="line"
          color={YELLOW}
        />

        <MiniTrendCard
          title="Completed"
          description="Completed bookings by month"
          data={metrics.months}
          dataKey="completed"
          variant="area"
          color={YELLOW_DEEP}
        />

        <MiniTrendCard
          title="Cancelled"
          description="Cancelled bookings by month"
          data={metrics.months}
          dataKey="cancelled"
          variant="bar"
          color="#dc2626"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <RecentBookingsTable bookings={metrics.recentBookings} />

        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle>Business summary</CardTitle>
            <CardDescription>
              Quick numbers across your current system.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <SummaryRow label="All-time revenue" value={formatCurrency(metrics.totalRevenue)} />
            <SummaryRow label="Total customers" value={formatNumber(metrics.totalCustomers)} />
            <SummaryRow label="Active services" value={formatNumber(metrics.servicesCount)} />
            <SummaryRow label="Pending now" value={formatNumber(metrics.pendingNow)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  highlight = false,
}: {
  title: string;
  value: string;
  change: number;
  description: string;
  icon: any;
  highlight?: boolean;
}) {
  const trend = getTrendMeta(change);
  const TrendIcon = trend.icon;

  return (
    <Card
      className="rounded-2xl border"
      style={
        highlight
          ? { borderColor: "rgba(245,179,0,0.35)", backgroundColor: "rgba(245,179,0,0.06)" }
          : {}
      }
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="mt-2 text-3xl font-semibold tracking-tight">
            {value}
          </CardTitle>
        </div>

        <div
          className="rounded-xl p-2"
          style={
            highlight
              ? { backgroundColor: YELLOW, color: "#1a1400" }
              : { backgroundColor: "rgba(245,179,0,0.12)", color: YELLOW_DEEP }
          }
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className={`flex items-center gap-2 text-sm ${trend.positive ? "text-green-600" : "text-red-600"}`}>
          <TrendIcon className="h-4 w-4" />
          <span>{trend.text}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function MiniTrendCard({
  title,
  description,
  data,
  dataKey,
  color,
  variant = "bar",
}: {
  title: string;
  description: string;
  data: any[];
  dataKey: string;
  color: string;
  variant?: "bar" | "line" | "area";
}) {
  return (
    <Card className="rounded-2xl border overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {variant === "line" ? (
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 3, fill: color }}
                activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          ) : variant === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`miniFill-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill={`url(#miniFill-${dataKey})`}
                strokeWidth={2.5}
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-3 py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}