// dummy-data.ts
// Realistic-looking mock data for the demo dashboard.
// No Firebase, no network calls — everything is generated locally so the
// dashboard always renders "full" with sensible numbers.

export type DummyBooking = {
  id: string;
  customerId: string;
  petId: string;
  serviceId: string;
  customerSnapshot: { name: string; phone: string };
  petSnapshot: { name: string };
  serviceSnapshot: { name: string };
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO
  status: "completed" | "confirmed" | "pending" | "cancelled";
  totalPrice: number;
};

export type DummyCustomer = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
};

const CUSTOMER_NAMES = [
  "Aarav Sharma", "Priya Nair", "Rohan Mehta", "Sneha Reddy", "Vikram Rao",
  "Ananya Iyer", "Karan Malhotra", "Divya Pillai", "Arjun Kapoor", "Meera Joshi",
  "Ishaan Verma", "Kavya Menon", "Aditya Singh", "Riya Desai", "Nikhil Bhat",
  "Tanvi Kulkarni", "Siddharth Rao", "Pooja Agarwal", "Yash Chawla", "Neha Gupta",
];

const PET_NAMES = [
  "Bruno", "Simba", "Coco", "Milo", "Luna", "Rocky", "Chintu", "Bella",
  "Leo", "Choco", "Tommy", "Sheru", "Daisy", "Max", "Whiskey", "Pepper",
];

const SERVICE_NAMES = [
  "Full Grooming Package",
  "Bath & Brush",
  "Nail Trim & Ear Clean",
  "Deshedding Treatment",
  "Spa & Aromatherapy",
];

const SERVICE_PRICE: Record<string, [number, number]> = {
  "Full Grooming Package": [1400, 2600],
  "Bath & Brush": [500, 900],
  "Nail Trim & Ear Clean": [250, 450],
  "Deshedding Treatment": [900, 1500],
  "Spa & Aromatherapy": [1200, 2200],
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Build the last `count` months ending at `anchor` (default: this month).
function lastMonths(count: number, anchor = new Date()) {
  const months: { year: number; month: number }[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(anchor.getFullYear(), anchor.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  return months;
}

export function generateDummyData(monthsBack = 12) {
  const months = lastMonths(monthsBack);
  const bookings: DummyBooking[] = [];
  const customers: DummyCustomer[] = [];

  let bookingCounter = 1;
  let customerCounter = 1;

  // Growth curve: business ramps up steadily toward the current month.
  months.forEach((m, idx) => {
    const growth = 0.55 + (idx / (months.length - 1)) * 0.9; // 0.55 -> 1.45
    const bookingsThisMonth = Math.round(randInt(14, 22) * growth);
    const newCustomersThisMonth = Math.round(randInt(3, 8) * growth);

    const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();

    for (let i = 0; i < newCustomersThisMonth; i++) {
      const day = randInt(1, daysInMonth);
      customers.push({
        id: `cust_${String(customerCounter).padStart(4, "0")}`,
        name: pick(CUSTOMER_NAMES),
        phone: `9${randInt(100000000, 999999999)}`,
        createdAt: `${m.year}-${pad(m.month + 1)}-${pad(day)}T${pad(randInt(9, 19))}:00:00.000Z`,
      });
      customerCounter++;
    }

    for (let i = 0; i < bookingsThisMonth; i++) {
      const day = randInt(1, daysInMonth);
      const service = pick(SERVICE_NAMES);
      const [min, max] = SERVICE_PRICE[service];

      // Status distribution shifts realistically: most months are mostly
      // completed, with a smaller cancelled/pending share; the most recent
      // month naturally has more pending/confirmed since it's still ongoing.
      const isCurrentMonth = idx === months.length - 1;
      const roll = rand();
      let status: DummyBooking["status"];
      if (isCurrentMonth) {
        if (roll < 0.45) status = "completed";
        else if (roll < 0.72) status = "confirmed";
        else if (roll < 0.9) status = "pending";
        else status = "cancelled";
      } else {
        if (roll < 0.74) status = "completed";
        else if (roll < 0.85) status = "confirmed";
        else if (roll < 0.9) status = "pending";
        else status = "cancelled";
      }

      const price = status === "cancelled" ? 0 : randInt(min, max);

      bookings.push({
        id: `bkg_${String(bookingCounter).padStart(4, "0")}`,
        customerId: `cust_${String(randInt(1, Math.max(customerCounter - 1, 1))).padStart(4, "0")}`,
        petId: `pet_${String(bookingCounter).padStart(4, "0")}`,
        serviceId: service.toLowerCase().replace(/[^a-z]+/g, "-"),
        customerSnapshot: { name: pick(CUSTOMER_NAMES), phone: `9${randInt(100000000, 999999999)}` },
        petSnapshot: { name: pick(PET_NAMES) },
        serviceSnapshot: { name: service },
        date: `${m.year}-${pad(m.month + 1)}-${pad(day)}`,
        createdAt: `${m.year}-${pad(m.month + 1)}-${pad(day)}T${pad(randInt(9, 19))}:${pad(randInt(0, 59))}:00.000Z`,
        status,
        totalPrice: status === "completed" ? price : status === "confirmed" ? price : status === "pending" ? price : 0,
      });
      bookingCounter++;
    }
  });

  // Sort recent-first for convenience where needed.
  bookings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return {
    bookings,
    customers,
    servicesCount: SERVICE_NAMES.length,
  };
}