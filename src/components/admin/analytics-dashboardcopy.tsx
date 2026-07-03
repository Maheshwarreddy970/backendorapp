"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Globe,
  Search,
  Monitor,
  Smartphone,
  Tablet,
  Globe2,
  MapPin,
  ArrowUpRight,
  Users,
  CalendarCheck2,
  BadgeCheck,
  MousePointerClick,
} from "lucide-react";
import {
  FaInstagram,
  FaChrome,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type VisitorSession = {
  id: string;
  path: string;
  source: string;
  startedAt: string;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  device?: {
    type?: string;
    browser?: string;
    os?: string;
  };
};

type Visitor = {
  id: string;
  phone?: string | null;
  firstSource?: string;
  firstReferrerUrl?: string | null;
  totalVisits?: number;
  totalPageViews?: number;
  firstSeenAt?: string;
  lastSeenAt?: string;
  isPWAInstalled?: boolean;
  visitsByMonth?: Record<string, number>;
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
  device?: {
    type?: string;
    browser?: string;
    os?: string;
  };
  sessions?: VisitorSession[];
};

type Customer = {
  id: string;
  name: string;
  phone?: string;
  createdAt: string;
};

type Booking = {
  id: string;
  status: string;
  createdAt: string;
};

const YELLOW = "#F5B300";
const YELLOW_SOFT = "#FBD34D";
const YELLOW_DEEP = "#B8860B";

function percent(value: number, total: number) {
  if (!total) return "0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

function sourceMeta(source: string) {
  switch ((source || "").toLowerCase()) {
    case "instagram":
      return { label: "Instagram", icon: FaInstagram, color: "#E4405F" };
    case "facebook":
      return { label: "Facebook", icon: FaFacebook, color: "#1877F2" };
    case "linkedin":
      return { label: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" };
    case "twitter":
    case "x":
      return { label: "X", icon: FaXTwitter, color: "#111111" };
    case "youtube":
      return { label: "YouTube", icon: FaYoutube, color: "#FF0000" };
    case "google":
      return { label: "Google", icon: Search, color: "#C58A00" };
    default:
      return { label: "Direct", icon: Globe, color: "#6B7280" };
  }
}

function deviceIcon(type: string) {
  switch ((type || "").toLowerCase()) {
    case "mobile":
      return Smartphone;
    case "tablet":
      return Tablet;
    default:
      return Monitor;
  }
}

function browserIcon(browser: string) {
  switch ((browser || "").toLowerCase()) {
    case "chrome":
      return { icon: FaChrome, color: "#F4B400" };
    default:
      return { icon: Globe2, color: "#6B7280" };
  }
}

function prettyMonth(month: string) {
  const [year, m] = month.split("-");
  const date = new Date(Number(year), Number(m) - 1, 1);
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-yellow-200 bg-background px-3 py-2 shadow-sm">
      <p className="text-xs text-muted-foreground">{prettyMonth(label)}</p>
      <p className="mt-1 text-sm font-medium text-foreground">
        {payload[0].value.toLocaleString("en-IN")} visits
      </p>
    </div>
  );
}

export function AnalyticsDashboard({
  visitors,
  customers,
  bookings,
}: {
  visitors: Visitor[];
  customers: Customer[];
  bookings: Booking[];
}) {
  const [selectedVisitor, setSelectedVisitor] = useState<any | null>(null);

  const analytics = useMemo(() => {
    const totalVisitors = visitors.length;
    const totalCustomers = customers.length;
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === "completed").length;

    const monthMap = new Map<string, number>();
    const sourceMap = new Map<string, number>();
    const countryMap = new Map<string, number>();
    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();
    const osMap = new Map<string, number>();
    const peopleMap = new Map<string, any>();

    visitors.forEach((visitor) => {
      Object.entries(visitor.visitsByMonth || {}).forEach(([month, count]) => {
        monthMap.set(month, (monthMap.get(month) || 0) + Number(count || 0));
      });

      const source = visitor.firstSource || "direct";
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);

      const country = visitor.location?.country || "Unknown";
      countryMap.set(country, (countryMap.get(country) || 0) + 1);

      const device = visitor.device?.type || "desktop";
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);

      const browser = visitor.device?.browser || "Unknown";
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);

      const os = visitor.device?.os || "Unknown";
      osMap.set(os, (osMap.get(os) || 0) + 1);

      const identityKey = visitor.phone?.trim()
        ? `phone:${visitor.phone.trim()}`
        : `visitor:${visitor.id}`;

      const existingPerson = peopleMap.get(identityKey);

      if (!existingPerson) {
        peopleMap.set(identityKey, {
          id: identityKey,
          originalVisitorId: visitor.id,
          phone: visitor.phone || null,
          displayName: visitor.phone || visitor.id,
          identityType: visitor.phone ? "phone" : "visitor",
          firstSource: visitor.firstSource || "direct",
          firstReferrerUrl: visitor.firstReferrerUrl || null,
          location: visitor.location || null,
          totalVisits: Number(visitor.totalVisits || 0),
          totalPageViews: Number(visitor.totalPageViews || 0),
          firstSeenAt: visitor.firstSeenAt || null,
          lastSeenAt: visitor.lastSeenAt || null,
          isPWAInstalled: visitor.isPWAInstalled || false,
          device: visitor.device || null,
          devices: visitor.device?.type ? [visitor.device.type] : [],
          rawVisitors: [visitor.id],
          sessions: visitor.sessions || [],
        });
      } else {
        existingPerson.totalVisits += Number(visitor.totalVisits || 0);
        existingPerson.totalPageViews += Number(visitor.totalPageViews || 0);
        existingPerson.rawVisitors.push(visitor.id);
        existingPerson.sessions = [...existingPerson.sessions, ...(visitor.sessions || [])];

        if (visitor.device?.type && !existingPerson.devices.includes(visitor.device.type)) {
          existingPerson.devices.push(visitor.device.type);
        }

        const oldLastSeen = existingPerson.lastSeenAt || "";
        const newLastSeen = visitor.lastSeenAt || "";

        if (newLastSeen > oldLastSeen) {
          existingPerson.lastSeenAt = newLastSeen;
          existingPerson.location = visitor.location || existingPerson.location;
          existingPerson.firstSource = visitor.firstSource || existingPerson.firstSource;
          existingPerson.firstReferrerUrl = visitor.firstReferrerUrl || existingPerson.firstReferrerUrl;
          existingPerson.originalVisitorId = visitor.id;
          existingPerson.device = visitor.device || existingPerson.device;
          existingPerson.firstSeenAt = visitor.firstSeenAt || existingPerson.firstSeenAt;
          existingPerson.isPWAInstalled = visitor.isPWAInstalled ?? existingPerson.isPWAInstalled;
        }
      }
    });

    const visitsOverTime = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, visits]) => ({
        month,
        shortMonth: prettyMonth(month),
        visits,
      }));

    const topSources = Array.from(sourceMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        share: percent(value, totalVisitors),
      }));

    const topCountries = Array.from(countryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        share: percent(value, totalVisitors),
      }));

    const topDevices = Array.from(deviceMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        share: percent(value, totalVisitors),
      }));

    const topBrowsers = Array.from(browserMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        share: percent(value, totalVisitors),
      }));

    const topOs = Array.from(osMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({
        name,
        value,
        share: percent(value, totalVisitors),
      }));

    const people = Array.from(peopleMap.values()).sort((a, b) =>
      String(b.lastSeenAt || "").localeCompare(String(a.lastSeenAt || ""))
    );

    return {
      totalVisitors,
      totalCustomers,
      totalBookings,
      completedBookings,
      conversionRate: percent(totalBookings, totalVisitors),
      identifiedRate: percent(totalCustomers, totalVisitors),
      visitsOverTime,
      topSources,
      topCountries,
      topDevices,
      topBrowsers,
      topOs,
      people,
    };
  }, [visitors, customers, bookings]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Visitors" value={analytics.totalVisitors} sublabel="Storefront only" icon={Users} />
        <MetricCard label="Customers" value={analytics.totalCustomers} sublabel={analytics.identifiedRate} icon={BadgeCheck} />
        <MetricCard label="Bookings" value={analytics.totalBookings} sublabel="Captured intent" icon={CalendarCheck2} />
        <MetricCard label="Completed" value={analytics.completedBookings} sublabel="Completed services" icon={ArrowUpRight} />
        <MetricCard label="Conversion" value={analytics.conversionRate} sublabel="Bookings / visitors" icon={MousePointerClick} />
        <MetricCard label="Sources" value={analytics.topSources.length} sublabel="Tracked referrers" icon={Globe} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <Card className="rounded-2xl border border-yellow-200/60 shadow-sm">
          <CardHeader className="pb-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Traffic
            </p>
            <CardTitle className="text-base font-medium">Visits over time</CardTitle>
          </CardHeader>

          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.visitsOverTime}>
                <defs>
                  <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={YELLOW} stopOpacity={0.32} />
                    <stop offset="100%" stopColor={YELLOW_SOFT} stopOpacity={0.03} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3e3a2" />
                <XAxis dataKey="month" tickFormatter={prettyMonth} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke={YELLOW_DEEP}
                  strokeWidth={2.2}
                  fill="url(#visitsFill)"
                  activeDot={{ r: 5, fill: YELLOW, stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <BreakdownCard title="Referrers" label="Sources" rows={analytics.topSources} type="source" />
          <BreakdownCard title="Countries" label="Location" rows={analytics.topCountries} type="country" />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <BreakdownCard title="Devices" label="Hardware" rows={analytics.topDevices} type="device" />
        <BreakdownCard title="Browsers" label="Client" rows={analytics.topBrowsers} type="browser" />
        <BreakdownCard title="Operating systems" label="Platform" rows={analytics.topOs} type="os" />
      </div>

      <Card className="rounded-2xl border border-yellow-200/60">
        <CardHeader className="pb-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            People
          </p>
          <CardTitle className="text-base font-medium">Recent visitors</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {analytics.people.length === 0 ? (
            <p className="text-sm text-muted-foreground">No visitors found.</p>
          ) : (
            analytics.people.slice(0, 20).map((person) => {
              const source = sourceMeta(person.firstSource);
              const SourceIcon = source.icon as any;
              const DeviceIcon =
                person.devices.includes("mobile")
                  ? Smartphone
                  : person.devices.includes("tablet")
                    ? Tablet
                    : Monitor;

              return (
                <button
                  key={person.id}
                  onClick={() => setSelectedVisitor(person)}
                  className="flex w-full items-center justify-between rounded-xl border border-yellow-100 px-4 py-3 text-left transition hover:bg-yellow-50/40"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full p-2"
                      style={{ backgroundColor: `${source.color}18`, color: source.color }}
                    >
                      <SourceIcon className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">{person.displayName}</p>
                      <p className="text-xs text-muted-foreground">
                        {person.location?.country || "Unknown"} • {source.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden text-right md:block">
                      <p className="text-sm">{person.totalVisits || 0} visits</p>
                      <p className="text-xs text-muted-foreground">
                        {person.lastSeenAt
                          ? new Date(person.lastSeenAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </p>
                    </div>
                    <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              );
            })
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selectedVisitor} onOpenChange={(open) => !open && setSelectedVisitor(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Visitor details</SheetTitle>
          </SheetHeader>

          {selectedVisitor ? (
            <div className="mt-6 space-y-6">
              <InfoBlock
                title="Identity"
                rows={[
                  ["Visitor ID", selectedVisitor.id],
                  ["Phone", selectedVisitor.phone || "-"],
                  ["Source", selectedVisitor.firstSource || "direct"],
                  ["Referrer", selectedVisitor.firstReferrerUrl || "-"],
                ]}
              />

              <InfoBlock
                title="Location"
                rows={[
                  ["Country", selectedVisitor.location?.country || "-"],
                  ["Region", selectedVisitor.location?.region || "-"],
                  ["City", selectedVisitor.location?.city || "-"],
                ]}
              />

              <InfoBlock
                title="Device"
                rows={[
                  ["Type", selectedVisitor.device?.type || "-"],
                  ["Browser", selectedVisitor.device?.browser || "-"],
                  ["OS", selectedVisitor.device?.os || "-"],
                  ["PWA Installed", selectedVisitor.isPWAInstalled ? "Yes" : "No"],
                ]}
              />

              <InfoBlock
                title="Activity"
                rows={[
                  ["Total Visits", String(selectedVisitor.totalVisits || 0)],
                  ["Total Page Views", String(selectedVisitor.totalPageViews || 0)],
                  ["First Seen", selectedVisitor.firstSeenAt || "-"],
                  ["Last Seen", selectedVisitor.lastSeenAt || "-"],
                ]}
              />

              <Card className="rounded-2xl border border-yellow-200/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Sessions</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  {selectedVisitor.sessions?.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No sessions found.</p>
                  ) : (
                    (selectedVisitor.sessions || []).map((session: VisitorSession) => (
                      <div
                        key={session.id}
                        className="rounded-xl border border-yellow-100 p-3"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium">{session.path}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.source || "direct"}
                          </p>
                        </div>

                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                          <p>
                            {session.location?.country || "Unknown"} • {session.device?.type || "-"}
                          </p>
                          <p>{session.startedAt || "-"}</p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MetricCard({
  label,
  value,
  sublabel,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sublabel: string;
  icon: any;
}) {
  return (
    <Card className="rounded-2xl border border-yellow-200/60 bg-background">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
          </div>

          <div className="rounded-xl bg-yellow-100 p-2 text-yellow-700">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BreakdownCard({
  title,
  label,
  rows,
  type,
}: {
  title: string;
  label: string;
  rows: { name: string; value: number; share: string }[];
  type: "source" | "country" | "device" | "browser" | "os";
}) {
  return (
    <Card className="rounded-2xl border border-yellow-200/60">
      <CardHeader className="pb-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data available.</p>
        ) : (
          rows.slice(0, 6).map((row) => {
            let Icon: any = Globe;
            let iconColor = "#6B7280";

            if (type === "source") {
              const meta = sourceMeta(row.name);
              Icon = meta.icon;
              iconColor = meta.color;
            }

            if (type === "device") Icon = deviceIcon(row.name);

            if (type === "browser") {
              const meta = browserIcon(row.name);
              Icon = meta.icon;
              iconColor = meta.color;
            }

            if (type === "country") Icon = MapPin;

            return (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-xl border border-yellow-100 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: type === "source" || type === "browser" ? `${iconColor}18` : "#f8f4df",
                      color: type === "source" || type === "browser" ? iconColor : YELLOW_DEEP,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{row.name}</span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">{row.value}</p>
                  <p className="text-xs text-muted-foreground">{row.share}</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

function InfoBlock({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <Card className="rounded-2xl border border-yellow-200/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-right text-sm">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}