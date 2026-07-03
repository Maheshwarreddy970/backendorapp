"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import {
  CalendarDays,
  Download,
  Eye,
  Filter,
  FileText,
  Calendar as CalendarIcon,
  RotateCcw,
} from "lucide-react";
import { format, parseISO } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BookingDetailsSheet } from "./booking-details-sheet";

const statusOptions = ["all", "pending", "confirmed", "completed", "cancelled"];

function getStatusStyles(status: string) {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900";
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900";
    case "cancelled":
      return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900";
    case "pending":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900";
  }
}

function buildExportRows(rows: any[]) {
  return rows.map((booking) => ({
    ID: booking.id || "",
    Customer: booking.customerSnapshot?.name || "",
    Phone: booking.customerSnapshot?.phone || booking.customerId || "",
    Pet: booking.petSnapshot?.name || "",
    Breed: booking.petSnapshot?.breed || "",
    Vaccinated: booking.petSnapshot?.vaccinated ? "Yes" : "No",
    Service: booking.serviceSnapshot?.name || booking.serviceId || "",
    Staff: booking.staffSnapshot?.name || booking.staffId || "",
    Date: booking.date || "",
    StartTime: booking.startTime || "",
    EndTime: booking.endTime || "",
    Status: booking.status || "",
    Total: Number(booking.totalPrice || 0).toFixed(2),
    Notes: booking.notes || "",
  }));
}

function escapeXml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function downloadXml(filename: string, rows: any[]) {
  const xmlRows = rows
    .map((row) => {
      return `
  <booking>
    <id>${escapeXml(row.ID)}</id>
    <customer>${escapeXml(row.Customer)}</customer>
    <phone>${escapeXml(row.Phone)}</phone>
    <pet>${escapeXml(row.Pet)}</pet>
    <breed>${escapeXml(row.Breed)}</breed>
    <vaccinated>${escapeXml(row.Vaccinated)}</vaccinated>
    <service>${escapeXml(row.Service)}</service>
    <staff>${escapeXml(row.Staff)}</staff>
    <date>${escapeXml(row.Date)}</date>
    <startTime>${escapeXml(row.StartTime)}</startTime>
    <endTime>${escapeXml(row.EndTime)}</endTime>
    <status>${escapeXml(row.Status)}</status>
    <total>${escapeXml(row.Total)}</total>
    <notes>${escapeXml(row.Notes)}</notes>
  </booking>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bookings>${xmlRows}
</bookings>`;

  const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function formatBookingDate(date?: string) {
  if (!date) return "-";
  try {
    return format(parseISO(date), "dd MMM yyyy");
  } catch {
    return date;
  }
}

export function BookingsTable({ bookings }: { bookings: any[] }) {
  const [rows, setRows] = useState<any[]>(bookings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setRows(bookings);
  }, [bookings]);

  const filtered = useMemo(() => {
    const result = rows.filter((booking: any) => {
      const customerName = String(booking.customerSnapshot?.name || "").toLowerCase();
      const phone = String(booking.customerSnapshot?.phone || booking.customerId || "").toLowerCase();
      const petName = String(booking.petSnapshot?.name || "").toLowerCase();
      const breed = String(booking.petSnapshot?.breed || "").toLowerCase();
      const serviceName = String(booking.serviceSnapshot?.name || booking.serviceId || "").toLowerCase();
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        customerName.includes(searchValue) ||
        phone.includes(searchValue) ||
        petName.includes(searchValue) ||
        breed.includes(searchValue) ||
        serviceName.includes(searchValue);

      const matchesStatus = status === "all" || booking.status === status;
      const matchesDate = !dateFilter || booking.date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });

    result.sort((a: any, b: any) => {
      switch (sortBy) {
        case "price_asc":
          return Number(a.totalPrice || 0) - Number(b.totalPrice || 0);
        case "price_desc":
          return Number(b.totalPrice || 0) - Number(a.totalPrice || 0);
        case "date_asc":
          return String(a.date || "").localeCompare(String(b.date || ""));
        case "date_desc":
          return String(b.date || "").localeCompare(String(a.date || ""));
        case "customer_asc":
          return String(a.customerSnapshot?.name || "").localeCompare(
            String(b.customerSnapshot?.name || "")
          );
        case "status_asc":
          return String(a.status || "").localeCompare(String(b.status || ""));
        default:
          return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      }
    });

    return result;
  }, [rows, search, status, dateFilter, sortBy]);

  const exportRows = useMemo(() => buildExportRows(filtered), [filtered]);

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings-filtered.xlsx", { compression: true });
  };

  const handleXmlExport = () => {
    downloadXml("bookings-filtered.xml", exportRows);
  };

  const handleInstantStatusUpdate = (bookingId: string, newStatus: string) => {
    setRows((current) =>
      current.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );

    if (selectedBooking?.id === bookingId) {
      setSelectedBooking((prev: any) => (prev ? { ...prev, status: newStatus } : prev));
    }
  };

  const openDetails = (booking: any) => {
    setSelectedBooking(booking);
    setSheetOpen(true);
  };

  return (
    <>
      <Card className="rounded-2xl border-yellow-200/60 shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">All bookings</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Filter, export, and manage bookings from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={showFilters ? "secondary" : "outline"}
                onClick={() => setShowFilters((prev) => !prev)}
                className={showFilters ? "bg-yellow-100 text-yellow-900 border-yellow-200 font-medium" : ""}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <Button
                variant="outline"
                onClick={handleExcelExport}
                className="border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-600 hover:text-white dark:border-emerald-900 dark:text-emerald-400 dark:bg-emerald-950/20 transition-all duration-200"
              >
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>

              <Button
                variant="outline"
                onClick={handleXmlExport}
                className="border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-600 hover:text-white dark:border-indigo-900 dark:text-indigo-400 dark:bg-indigo-950/20 transition-all duration-200"
              >
                <FileText className="mr-2 h-4 w-4" />
                XML
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {statusOptions.map((item) => (
              <Button
                key={item}
                type="button"
                variant={status === item ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus(item)}
                className={cn(
                  "capitalize font-medium shadow-xs",
                  status === item ? "bg-yellow-500 text-black hover:bg-yellow-400" : ""
                )}
              >
                {item === "all" ? "All" : item}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <Input
              placeholder="Search by customer, phone, pet, breed, or service"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="lg:max-w-sm"
            />

            <div className="flex items-center gap-2 rounded-lg border border-yellow-100 bg-yellow-50/40 px-3 py-1.5 text-sm text-muted-foreground w-fit">
              <CalendarDays className="h-4 w-4 text-muted-foreground/80" />
              <span className="font-medium text-foreground/80">
                {filtered.length} bookings shown
              </span>
            </div>
          </div>

          {showFilters ? (
            <div className="grid items-end gap-4 rounded-xl border border-yellow-100 bg-yellow-50/20 p-4 animate-in fade-in duration-200 md:grid-cols-3">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Booking date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start bg-background text-left font-normal ${
                        !dateFilter ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      {dateFilter ? format(parseISO(dateFilter), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFilter ? parseISO(dateFilter) : undefined}
                      onSelect={(date) => setDateFilter(date ? format(date, "yyyy-MM-dd") : "")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Sort orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="createdAt_desc">Latest booking</SelectItem>
                      <SelectItem value="date_asc">Date: oldest first</SelectItem>
                      <SelectItem value="date_desc">Date: newest first</SelectItem>
                      <SelectItem value="price_asc">Price: low to high</SelectItem>
                      <SelectItem value="price_desc">Price: high to low</SelectItem>
                      <SelectItem value="customer_asc">Customer: A to Z</SelectItem>
                      <SelectItem value="status_asc">Status: A to Z</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setStatus("all");
                    setDateFilter("");
                    setSortBy("createdAt_desc");
                  }}
                  className="w-full border-rose-200 bg-rose-50/40 text-rose-700 transition-all hover:bg-rose-600 hover:text-white md:w-auto"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset filters
                </Button>
              </div>
            </div>
          ) : null}

          <div className="overflow-x-auto rounded-xl border border-yellow-100">
            <table className="w-full min-w-[1200px] text-sm">
              <thead>
                <tr className="border-b bg-yellow-50/30 text-left">
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Customer</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Pet Details</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Vaccinated</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Service Info</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Date & Time</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Total</th>
                  <th className="px-4 py-3.5 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-12 text-center font-medium text-muted-foreground"
                    >
                      No bookings found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((booking: any) => {
                    const pet = booking.petSnapshot || {};
                    const addOns = Array.isArray(booking.addOns) ? booking.addOns : [];

                    return (
                      <tr
                        key={booking.id}
                        className="border-b align-top last:border-0 hover:bg-yellow-50/20 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">
                              {booking.customerSnapshot?.name || "-"}
                            </p>
                            <p className="text-muted-foreground">
                              {booking.customerSnapshot?.phone || booking.customerId || "-"}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-0.5">
                            <p className="font-semibold text-foreground">{pet.name || "-"}</p>
                            <p className="text-muted-foreground">
                              {pet.type || "Pet"} {pet.breed ? `• ${pet.breed}` : ""}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <Badge
                              variant={pet.vaccinated ? "secondary" : "outline"}
                              className={cn(
                                "font-medium",
                                pet.vaccinated
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900"
                                  : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900"
                              )}
                            >
                              {pet.vaccinated ? "Vaccinated" : "Not vaccinated"}
                            </Badge>
                            <p className="pl-1 text-[11px] text-muted-foreground">
                              {pet.vaccinatedAt || pet.vaccinationDate || "-"}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-0.5">
                            <p className="font-medium text-foreground">
                              {booking.serviceSnapshot?.name || booking.serviceId || "-"}
                            </p>
                            {addOns.length > 0 ? (
                              <p className="text-muted-foreground">
                                Add-ons: {addOns.map((item: any) => item.name).filter(Boolean).join(", ")}
                              </p>
                            ) : (
                              <p className="text-muted-foreground/60">No add-ons</p>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="space-y-0.5">
                            <p className="font-medium text-foreground">
                              {formatBookingDate(booking.date)}
                            </p>
                            <p className="text-muted-foreground">
                              {booking.startTime && booking.endTime
                                ? `${booking.startTime} - ${booking.endTime}`
                                : booking.startTime || "-"}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="w-36">
                            <Select
                              value={booking.status || "pending"}
                              onValueChange={(value) => handleInstantStatusUpdate(booking.id, value)}
                            >
                              <SelectTrigger
                                className={`h-8 w-full rounded-lg border font-medium capitalize transition-all ${getStatusStyles(
                                  booking.status
                                )}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="pending" className="capitalize">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="confirmed" className="capitalize">
                                    Confirmed
                                  </SelectItem>
                                  <SelectItem value="completed" className="capitalize">
                                    Completed
                                  </SelectItem>
                                  <SelectItem value="cancelled" className="capitalize">
                                    Cancelled
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-foreground">
                            ₹{Number(booking.totalPrice || 0).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetails(booking)}
                            className="h-8 border-muted-foreground/20 font-medium shadow-xs"
                          >
                            <Eye className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        booking={selectedBooking}
      />
    </>
  );
}