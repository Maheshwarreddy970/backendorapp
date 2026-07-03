function toDateTime(date: string, time: string) {
  const normalized = convert12HourTo24Hour(time);
  return new Date(`${date}T${normalized}:00`);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function convert12HourTo24Hour(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return time;

  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();

  if (meridiem === "AM" && hours === 12) hours = 0;
  if (meridiem === "PM" && hours !== 12) hours += 12;

  return `${pad(hours)}:${minutes}`;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(119);

function pick<T>(arr: T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

const PETS = [
  { name: "Bruno", breed: "Golden Retriever" },
  { name: "Milo", breed: "Shih Tzu" },
  { name: "Luna", breed: "Labrador" },
  { name: "Simba", breed: "Persian Cat" },
  { name: "Coco", breed: "Beagle" },
  { name: "Rocky", breed: "Pug" },
  { name: "Bella", breed: "Lhasa Apso" },
  { name: "Leo", breed: "German Shepherd" },
  { name: "Mochi", breed: "Pomeranian" },
  { name: "Toffee", breed: "Dachshund" },
];

const CUSTOMERS = [
  { name: "Aarav Sharma", phone: "+91 98765 12001" },
  { name: "Priya Reddy", phone: "+91 98765 12002" },
  { name: "Karthik Varma", phone: "+91 98765 12003" },
  { name: "Sneha Nair", phone: "+91 98765 12004" },
  { name: "Rohit Kumar", phone: "+91 98765 12005" },
  { name: "Divya Patel", phone: "+91 98765 12006" },
  { name: "Ananya Das", phone: "+91 98765 12007" },
  { name: "Vikram Singh", phone: "+91 98765 12008" },
];

const SERVICES = [
  { name: "Full Grooming", durationMinutes: 90, price: 1499 },
  { name: "Bath & Blow Dry", durationMinutes: 60, price: 999 },
  { name: "Tick Treatment", durationMinutes: 75, price: 1299 },
  { name: "Nail Trim & Ear Clean", durationMinutes: 45, price: 499 },
  { name: "Spa Package", durationMinutes: 90, price: 1899 },
];

const NOTES = [
  "Customer requested gentle handling around ears.",
  "Pet is active, allow settling time before service.",
  "Use premium shampoo and light fragrance.",
  "Please call customer 15 minutes before pickup.",
  "Avoid loud dryer setting; pet is anxious.",
  "Returning pet, prefers same groomer.",
];

const STATUS_COLORS: Record<string, string> = {
  pending: "#a16207",
  confirmed: "#2563eb",
  completed: "#059669",
  cancelled: "#dc2626",
};

export function generateAdminCalendarDummyData() {
  const today = new Date();

  const staff = {
    id: "staff_001",
    name: "Akhila Reddy",
    role: "Senior Groomer",
    daysOff: [
      formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)),
    ],
    availability: {
      mon: { active: true, start: "09:00", end: "18:00" },
      tue: { active: true, start: "09:00", end: "18:00" },
      wed: { active: true, start: "09:00", end: "18:00" },
      thu: { active: true, start: "10:00", end: "19:00" },
      fri: { active: true, start: "09:00", end: "18:00" },
      sat: { active: true, start: "09:00", end: "16:00" },
      sun: { active: false, start: "", end: "" },
    },
  };

  const bookings = Array.from({ length: 18 }).map((_, index) => {
    const pet = pick(PETS);
    const customer = pick(CUSTOMERS);
    const service = pick(SERVICES);
    const dayOffset = randInt(-5, 10);
    const slotHour = pick([9, 10, 11, 12, 14, 15, 16, 17]);
    const slotMinute = pick([0, 30]);
    const bookingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset);

    const date = formatDate(bookingDate);
    const start = new Date(bookingDate);
    start.setHours(slotHour, slotMinute, 0, 0);

    const end = addMinutes(start, service.durationMinutes);

    let status = "pending";
    const roll = rand();

    if (dayOffset < 0) {
      if (roll < 0.65) status = "completed";
      else if (roll < 0.85) status = "confirmed";
      else status = "cancelled";
    } else if (dayOffset <= 2) {
      if (roll < 0.45) status = "confirmed";
      else if (roll < 0.8) status = "pending";
      else status = "cancelled";
    } else {
      if (roll < 0.58) status = "confirmed";
      else if (roll < 0.92) status = "pending";
      else status = "cancelled";
    }

    return {
      id: `booking_${String(index + 1).padStart(4, "0")}`,
      title: `${pet.name} • ${service.name}`,
      start: start.toISOString(),
      end: end.toISOString(),
      backgroundColor: STATUS_COLORS[status] || "#2563eb",
      borderColor: STATUS_COLORS[status] || "#2563eb",
      extendedProps: {
        bookingId: `booking_${String(index + 1).padStart(4, "0")}`,
        customerName: customer.name,
        customerPhone: customer.phone,
        petName: pet.name,
        petBreed: pet.breed,
        serviceName: service.name,
        status,
        totalPrice: service.price,
        notes: pick(NOTES),
      },
    };
  });

  const dayOffEvents =
    (staff.daysOff || []).map((date: string) => ({
      id: `off-${date}`,
      title: "Day Off",
      start: date,
      end: addMinutes(new Date(`${date}T00:00:00`), 24 * 60).toISOString(),
      display: "background",
      backgroundColor: "rgba(220,38,38,0.12)",
      borderColor: "rgba(220,38,38,0.12)",
      extendedProps: {
        type: "dayOff",
      },
    })) || [];

  return {
    staff,
    events: [...bookings, ...dayOffEvents],
  };
}