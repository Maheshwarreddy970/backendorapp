export type DummyBooking = {
  id: string;
  customerId: string;
  petId: string;
  serviceId: string;
  staffId: string;
  customerSnapshot: {
    name: string;
    phone: string;
  };
  petSnapshot: {
    name: string;
    type: string;
    breed: string;
    vaccinated: boolean;
    vaccinatedAt?: string;
    vaccinationDate?: string;
  };
  serviceSnapshot: {
    name: string;
  };
  staffSnapshot: {
    name: string;
  };
  addOns: { name: string }[];
  date: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  notes: string;
};

const CUSTOMER_NAMES = [
  "Aarav Sharma",
  "Priya Nair",
  "Rohan Mehta",
  "Sneha Reddy",
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

const PET_NAMES = [
  "Bruno",
  "Simba",
  "Coco",
  "Milo",
  "Luna",
  "Rocky",
  "Bella",
  "Leo",
  "Daisy",
  "Max",
  "Chintu",
  "Pepper",
  "Snowy",
  "Oscar",
  "Mochi",
  "Toffee",
];

const PET_TYPES = ["Dog", "Cat"];
const BREEDS = [
  "Golden Retriever",
  "Shih Tzu",
  "Labrador",
  "Persian Cat",
  "Beagle",
  "Pug",
  "Lhasa Apso",
  "German Shepherd",
  "Pomeranian",
  "Dachshund",
  "Indie",
  "Siberian Husky",
];

const SERVICES = [
  { name: "Full Grooming Package", price: [1400, 2600] },
  { name: "Bath & Brush", price: [500, 900] },
  { name: "Nail Trim & Ear Clean", price: [250, 450] },
  { name: "Deshedding Treatment", price: [900, 1500] },
  { name: "Spa & Aromatherapy", price: [1200, 2200] },
];

const ADD_ONS = [
  { name: "Teeth Cleaning", price: 250 },
  { name: "Paw Balm", price: 150 },
  { name: "Anti Tick Treatment", price: 350 },
  { name: "Premium Shampoo", price: 200 },
];

const STAFF = [
  "Rahul",
  "Sandeep",
  "Naveen",
  "Akhila",
  "Meghana",
  "Vamsi",
];

const NOTES = [
  "Handle gently, first-time appointment.",
  "Customer prefers evening slot.",
  "Pet is nervous around dryers.",
  "Use hypoallergenic products.",
  "Call customer before pickup.",
  "Repeat grooming customer.",
  "Add coat conditioning if time permits.",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(91);

function pick<T>(arr: T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function maybe(chance: number) {
  return rand() < chance;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function randomTimeSlot() {
  const slots = [
    ["09:00 AM", "10:00 AM"],
    ["10:30 AM", "11:30 AM"],
    ["12:00 PM", "01:00 PM"],
    ["02:00 PM", "03:00 PM"],
    ["03:30 PM", "04:30 PM"],
    ["05:00 PM", "06:00 PM"],
  ];
  return pick(slots);
}

function isoDate(year: number, month: number, day: number, hour = 10, minute = 0) {
  return `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00.000Z`;
}

export function generateBookingsDummyData(count = 80) {
  const bookings: DummyBooking[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - randInt(0, 75) + randInt(0, 18));

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const customerName = pick(CUSTOMER_NAMES);
    const petName = pick(PET_NAMES);
    const petType = pick(PET_TYPES);
    const breed = pick(BREEDS);
    const service = pick(SERVICES);
    const staffName = pick(STAFF);
    const vaccinated = maybe(0.76);

    const addOns = ADD_ONS.filter(() => maybe(0.22)).slice(0, randInt(0, 2));
    const addOnTotal = addOns.reduce((sum, item) => sum + item.price, 0);
    const [minPrice, maxPrice] = service.price;
    const basePrice = randInt(minPrice, maxPrice);

    const bookingDate = `${year}-${pad(month + 1)}-${pad(day)}`;
    const createdAt = isoDate(year, month, Math.max(1, day - randInt(0, 5)), randInt(8, 20), randInt(0, 59));
    const [startTime, endTime] = randomTimeSlot();

    let status: DummyBooking["status"];
    const roll = rand();
    const isFuture = new Date(bookingDate) > new Date(new Date().toDateString());

    if (isFuture) {
      if (roll < 0.48) status = "confirmed";
      else if (roll < 0.82) status = "pending";
      else status = "cancelled";
    } else {
      if (roll < 0.62) status = "completed";
      else if (roll < 0.8) status = "confirmed";
      else if (roll < 0.92) status = "pending";
      else status = "cancelled";
    }

    const totalPrice = status === "cancelled" ? 0 : basePrice + addOnTotal;

    bookings.push({
      id: `bkg_${String(i + 1).padStart(4, "0")}`,
      customerId: `cust_${String(i + 1).padStart(4, "0")}`,
      petId: `pet_${String(i + 1).padStart(4, "0")}`,
      serviceId: service.name.toLowerCase().replace(/[^a-z]+/g, "-"),
      staffId: `staff_${String(randInt(1, STAFF.length)).padStart(3, "0")}`,
      customerSnapshot: {
        name: customerName,
        phone: `9${randInt(100000000, 999999999)}`,
      },
      petSnapshot: {
        name: petName,
        type: petType,
        breed,
        vaccinated,
        vaccinatedAt: vaccinated ? `${year - randInt(0, 1)}-${pad(randInt(1, 12))}-${pad(randInt(1, 28))}` : "",
        vaccinationDate: vaccinated ? `${year - randInt(0, 1)}-${pad(randInt(1, 12))}-${pad(randInt(1, 28))}` : "",
      },
      serviceSnapshot: {
        name: service.name,
      },
      staffSnapshot: {
        name: staffName,
      },
      addOns,
      date: bookingDate,
      createdAt,
      startTime,
      endTime,
      status,
      totalPrice,
      notes: pick(NOTES),
    });
  }

  bookings.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

  return { bookings };
}