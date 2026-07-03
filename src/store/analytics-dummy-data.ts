export type DummyAnalyticsSession = {
  id: string;
  path: string;
  source: string;
  startedAt: string;
  location: {
    country: string;
    region: string;
    city: string;
  };
  device: {
    type: "mobile" | "tablet" | "desktop";
    browser: string;
    os: string;
  };
};

export type DummyAnalyticsVisitor = {
  id: string;
  phone?: string | null;
  firstSource: string;
  firstReferrerUrl?: string | null;
  totalVisits: number;
  totalPageViews: number;
  firstSeenAt: string;
  lastSeenAt: string;
  isPWAInstalled: boolean;
  visitsByMonth: Record<string, number>;
  location: {
    country: string;
    region: string;
    city: string;
  };
  device: {
    type: "mobile" | "tablet" | "desktop";
    browser: string;
    os: string;
  };
  sessions: DummyAnalyticsSession[];
};

export type DummyAnalyticsCustomer = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
};

export type DummyAnalyticsBooking = {
  id: string;
  status: "completed" | "confirmed" | "pending" | "cancelled";
  createdAt: string;
};

const NAMES = [
  "Aarav Sharma",
  "Priya Reddy",
  "Rohan Mehta",
  "Sneha Nair",
  "Vikram Rao",
  "Ananya Iyer",
  "Karan Malhotra",
  "Divya Pillai",
  "Arjun Kapoor",
  "Meera Joshi",
  "Ishaan Verma",
  "Kavya Menon",
  "Aditya Singh",
  "Riya Desai",
  "Nikhil Bhat",
  "Tanvi Kulkarni",
  "Siddharth Rao",
  "Pooja Agarwal",
  "Yash Chawla",
  "Neha Gupta",
];

const SOURCES = [
  "instagram",
  "facebook",
  "linkedin",
  "google",
  "youtube",
  "direct",
  "x",
];

const PATHS = [
  "/",
  "/services",
  "/pricing",
  "/book",
  "/book/full-grooming",
  "/book/bath-and-brush",
  "/contact",
  "/about",
];

const COUNTRIES = [
  { country: "India", region: "Andhra Pradesh", city: "Visakhapatnam" },
  { country: "India", region: "Telangana", city: "Hyderabad" },
  { country: "India", region: "Karnataka", city: "Bengaluru" },
  { country: "India", region: "Tamil Nadu", city: "Chennai" },
  { country: "India", region: "Maharashtra", city: "Pune" },
  { country: "UAE", region: "Dubai", city: "Dubai" },
  { country: "Singapore", region: "Central", city: "Singapore" },
];

const DEVICES = [
  { type: "mobile", browser: "Chrome", os: "Android" },
  { type: "mobile", browser: "Chrome", os: "iOS" },
  { type: "desktop", browser: "Chrome", os: "Windows" },
  { type: "desktop", browser: "Chrome", os: "macOS" },
  { type: "tablet", browser: "Chrome", os: "Android" },
] as const;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(73);

function pick<T>(arr: readonly T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function maybe(chance: number) {
  return rand() < chance;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function lastMonths(count: number, anchor = new Date()) {
  const months: { year: number; month: number; key: string }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(anchor.getFullYear(), anchor.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
    months.push({ year: d.getFullYear(), month: d.getMonth(), key });
  }
  return months;
}

function isoDate(year: number, month: number, day: number, hour = 10, minute = 0) {
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00.000Z`;
}

function sourceReferrer(source: string) {
  switch (source) {
    case "instagram":
      return "https://instagram.com/";
    case "facebook":
      return "https://facebook.com/";
    case "linkedin":
      return "https://linkedin.com/";
    case "google":
      return "https://google.com/search";
    case "youtube":
      return "https://youtube.com/";
    case "x":
      return "https://x.com/";
    default:
      return null;
  }
}

export function generateAnalyticsDummyData(monthsBack = 12) {
  const months = lastMonths(monthsBack);
  const visitors: DummyAnalyticsVisitor[] = [];
  const customers: DummyAnalyticsCustomer[] = [];
  const bookings: DummyAnalyticsBooking[] = [];

  let visitorCounter = 1;
  let customerCounter = 1;
  let bookingCounter = 1;
  let sessionCounter = 1;

  months.forEach((month, monthIndex) => {
    const growth = 0.7 + (monthIndex / Math.max(months.length - 1, 1)) * 1.1;
    const visitorsThisMonth = Math.round(randInt(22, 34) * growth);
    const customerRate = 0.22 + monthIndex * 0.01;
    const bookingRate = 0.3 + monthIndex * 0.012;

    for (let i = 0; i < visitorsThisMonth; i++) {
      const day = randInt(1, 28);
      const personName = pick(NAMES);
      const firstSource = pick(SOURCES);
      const location = pick(COUNTRIES);
      const device = pick(DEVICES);
      const totalVisits = randInt(1, 6);
      const totalPageViews = totalVisits * randInt(2, 5);
      const withPhone = maybe(0.42);

      const visitsByMonth: Record<string, number> = {};
      for (let j = Math.max(0, monthIndex - randInt(0, 2)); j <= monthIndex; j++) {
        if (maybe(0.78)) {
          visitsByMonth[months[j].key] = randInt(1, 4);
        }
      }
      if (!visitsByMonth[month.key]) {
        visitsByMonth[month.key] = randInt(1, 3);
      }

      const firstSeenAt = isoDate(month.year, month.month, day, randInt(9, 18), randInt(0, 59));
      const lastSeenAt = isoDate(month.year, month.month, Math.min(day + randInt(0, 2), 28), randInt(9, 21), randInt(0, 59));

      const sessions: DummyAnalyticsSession[] = Array.from({ length: totalVisits }).map((_, idx) => ({
        id: `sess_${String(sessionCounter++).padStart(5, "0")}`,
        path: pick(PATHS),
        source: firstSource,
        startedAt: isoDate(
          month.year,
          month.month,
          Math.min(day + idx, 28),
          randInt(8, 21),
          randInt(0, 59)
        ),
        location,
        device: {
          type: device.type,
          browser: device.browser,
          os: device.os,
        },
      }));

      visitors.push({
        id: `vis_${String(visitorCounter).padStart(5, "0")}`,
        phone: withPhone ? `9${randInt(100000000, 999999999)}` : null,
        firstSource,
        firstReferrerUrl: sourceReferrer(firstSource),
        totalVisits,
        totalPageViews,
        firstSeenAt,
        lastSeenAt,
        isPWAInstalled: maybe(0.18),
        visitsByMonth,
        location,
        device: {
          type: device.type,
          browser: device.browser,
          os: device.os,
        },
        sessions,
      });

      if (maybe(customerRate)) {
        customers.push({
          id: `cust_${String(customerCounter).padStart(5, "0")}`,
          name: personName,
          phone: `9${randInt(100000000, 999999999)}`,
          createdAt: isoDate(month.year, month.month, Math.min(day + randInt(0, 3), 28), randInt(10, 19), randInt(0, 59)),
        });
        customerCounter++;
      }

      if (maybe(bookingRate)) {
        const roll = rand();
        let status: DummyAnalyticsBooking["status"];

        if (monthIndex === months.length - 1) {
          if (roll < 0.42) status = "completed";
          else if (roll < 0.68) status = "confirmed";
          else if (roll < 0.9) status = "pending";
          else status = "cancelled";
        } else {
          if (roll < 0.7) status = "completed";
          else if (roll < 0.83) status = "confirmed";
          else if (roll < 0.92) status = "pending";
          else status = "cancelled";
        }

        bookings.push({
          id: `book_${String(bookingCounter).padStart(5, "0")}`,
          status,
          createdAt: isoDate(month.year, month.month, Math.min(day + randInt(0, 4), 28), randInt(9, 20), randInt(0, 59)),
        });
        bookingCounter++;
      }

      visitorCounter++;
    }
  });

  visitors.sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt));
  customers.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return {
    visitors,
    customers,
    bookings,
  };
}