"use client";

import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import { useMemo, useState } from "react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Clock,
  User,
  Phone,
  Scissors,
  AlignLeft,
  CalendarDays,
  Info,
  Sparkles,
  PawPrint,
} from "lucide-react";

type AdminCalendarProps = {
  staff: any;
  events: any[];
};

function weekdayMap() {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
}

function statusBadgeVariant(status?: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "confirmed":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "pending":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export default function AdminCalendar({ staff, events }: AdminCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const businessHours = useMemo(() => {
    const keys = weekdayMap();

    return keys
      .map((key, index) => {
        const slot = staff?.availability?.[key];
        if (!slot?.active || !slot?.start || !slot?.end) return null;

        return {
          daysOfWeek: [index],
          startTime: slot.start,
          endTime: slot.end,
        };
      })
      .filter(Boolean);
  }, [staff]);

  const handleEventClick = (info: EventClickArg) => {
    const event = info.event;
    if (event.extendedProps?.type === "dayOff") return;

    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      ...event.extendedProps,
    });
  };

  const getEventColors = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-500 text-white border-emerald-600";
      case "confirmed":
        return "bg-blue-500 text-white border-blue-600";
      case "pending":
        return "bg-amber-500 text-white border-amber-600";
      case "cancelled":
        return "bg-rose-500 text-white border-rose-600";
      default:
        return "bg-yellow-500 text-black border-yellow-600";
    }
  };

  const renderEventContent = (info: EventContentArg) => {
    const isDayOff = info.event.extendedProps?.type === "dayOff";

    if (isDayOff) {
      return (
        <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-rose-300 bg-rose-50/60 p-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600">
            Day Off
          </span>
        </div>
      );
    }

    const colors = getEventColors(info.event.extendedProps?.status);

    return (
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-md border px-1.5 py-1 shadow-sm transition-opacity hover:opacity-95 ${colors}`}
      >
        <p className="truncate text-[11px] font-semibold leading-tight">
          {info.event.title}
        </p>
        <p className="truncate text-[10px] font-medium opacity-90">
          {info.timeText}
        </p>
        {info.event.extendedProps?.customerName && (
          <p className="mt-0.5 truncate text-[9px] opacity-80">
            {info.event.extendedProps.customerName}
          </p>
        )}
      </div>
    );
  };

  const minTime = "06:00:00";
  const maxTime = "22:00:00";

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-yellow-200/60 shadow-sm">
        <CardContent className="p-0 sm:p-4">
          <div className="fc-theme-standard [&_.fc-button-primary]:bg-yellow-500 [&_.fc-button-primary]:border-yellow-500 [&_.fc-button-primary]:text-black [&_.fc-button-primary:hover]:bg-yellow-400 [&_.fc-button-primary:focus]:ring-yellow-300 [&_.fc-scrollgrid]:border-border [&_.fc-theme-standard_td]:border-border [&_.fc-theme-standard_th]:border-border [&_.fc-toolbar-title]:text-lg [&_.fc-toolbar-title]:font-semibold [&_td]:border-border [&_th]:border-border">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              events={events}
              businessHours={businessHours}
              nowIndicator
              editable={false}
              selectable={false}
              allDaySlot={false}
              firstDay={1}
              slotMinTime={minTime}
              slotMaxTime={maxTime}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              height="72vh"
              displayEventEnd
              eventClassNames="border-none bg-transparent shadow-none"
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="border-yellow-200/60 shadow-sm md:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              Availability
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border border-yellow-100 bg-yellow-50/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{staff?.name || "Staff member"}</p>
                  <p className="text-xs text-muted-foreground">
                    {staff?.role || "Senior Groomer"}
                  </p>
                </div>
                <div className="rounded-full bg-yellow-100 p-2 text-yellow-700">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => {
                const slot = staff?.availability?.[day];
                const isOff = !slot?.active;

                return (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg border border-yellow-100 px-3 py-2 text-sm"
                  >
                    <span className="w-10 font-medium capitalize text-foreground">
                      {day}
                    </span>
                    {isOff ? (
                      <Badge variant="secondary" className="text-muted-foreground">
                        Off
                      </Badge>
                    ) : (
                      <span className="font-medium text-muted-foreground">
                        {slot.start} - {slot.end}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col border-yellow-200/60 shadow-sm md:col-span-8">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <Info className="h-4 w-4" />
              Booking Details
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            {!selectedEvent ? (
              <div className="flex min-h-[220px] h-full flex-col items-center justify-center text-center text-muted-foreground opacity-70">
                <CalendarDays className="mb-2 h-10 w-10 stroke-[1.5]" />
                <p className="text-sm">
                  Click on an event to view full booking details.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {selectedEvent.serviceName}
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-yellow-700">
                      ₹{Number(selectedEvent.totalPrice || 0).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={`px-3 py-1 text-sm capitalize ${statusBadgeVariant(selectedEvent.status)}`}
                  >
                    {selectedEvent.status}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <PawPrint className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Pet Details</p>
                        <p className="text-muted-foreground">
                          {selectedEvent.petName} ({selectedEvent.petBreed || "Mixed"})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Customer</p>
                        <p className="text-muted-foreground">
                          {selectedEvent.customerName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Contact</p>
                        <p className="text-muted-foreground">
                          {selectedEvent.customerPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-muted-foreground">
                          {selectedEvent.start ? format(selectedEvent.start, "h:mm a") : "-"} -{" "}
                          {selectedEvent.end ? format(selectedEvent.end, "h:mm a") : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                    Service note
                  </div>
                  <ScrollArea className="h-24 w-full rounded-md border border-yellow-100 bg-yellow-50/20 p-3 text-sm">
                    {selectedEvent.notes ? (
                      <span className="text-foreground">{selectedEvent.notes}</span>
                    ) : (
                      <span className="italic text-muted-foreground">
                        No additional notes provided for this booking.
                      </span>
                    )}
                  </ScrollArea>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlignLeft className="h-4 w-4 text-muted-foreground" />
                    Summary
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-yellow-100 px-3 py-2 text-sm">
                      <p className="text-muted-foreground">Booking ID</p>
                      <p className="font-medium">{selectedEvent.bookingId || selectedEvent.id}</p>
                    </div>
                    <div className="rounded-lg border border-yellow-100 px-3 py-2 text-sm">
                      <p className="text-muted-foreground">Service</p>
                      <p className="font-medium">{selectedEvent.serviceName || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}