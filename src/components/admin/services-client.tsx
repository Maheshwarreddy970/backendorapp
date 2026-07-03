"use client";

import { useState, useRef } from "react";
import {
    ChevronDown,
    Clock3,
    IndianRupee,
    Layers,
    Plus,
    Scissors,
    Sparkles,
    Users,
    Weight,
    Pencil,
    UserPlus,
    UserMinus,
    Droplets,
    CheckCircle2,
    CircleDot,
    UserCheck,
    PawPrint,
    X,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ServiceForm } from "./service-form";
import { toggleMyAssignmentAction } from "@/actions/services";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

type StaffMember = {
    id: string;
    name?: string;
    email?: string;
};

type ServicesClientProps = {
    initialServices: any[];
    staff: StaffMember[];
    currentUserId?: string;
};

type FilterType = "all" | "active" | "inactive" | "assigned" | "weight";

// ─── Utilities ───────────────────────────────────────────────────────────────

function getInitials(label: string): string {
    return label
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

const AVATAR_COLORS = [
    "bg-blue-50 text-blue-800",
    "bg-violet-50 text-violet-800",
    "bg-amber-50 text-amber-800",
    "bg-rose-50 text-rose-800",
];

function avatarColor(index: number) {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

// ─── Service icon ─────────────────────────────────────────────────────────────

function ServiceIcon({ service }: { service: any }) {
    const name: string = (service.name ?? "").toLowerCase();
    if (name.includes("bath") || name.includes("spa")) {
        return (
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <Droplets className="h-6 w-6" />
            </span>
        );
    }
    if (name.includes("nail")) {
        return (
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Scissors className="h-6 w-6" />
            </span>
        );
    }
    if (name.includes("puppy") || name.includes("kitten")) {
        return (
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <PawPrint className="h-6 w-6" />
            </span>
        );
    }
    return (
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
            <Sparkles className="h-6 w-6" />
        </span>
    );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────


// ─── Filter chips ─────────────────────────────────────────────────────────────

const FILTERS: { key: FilterType; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: "All", icon: <Scissors className="h-3.5 w-3.5" /> },
    { key: "active", label: "Active", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    { key: "inactive", label: "Inactive", icon: <CircleDot className="h-3.5 w-3.5" /> },
    { key: "assigned", label: "Assigned to me", icon: <UserCheck className="h-3.5 w-3.5" /> },
    { key: "weight", label: "Weight-based", icon: <Weight className="h-3.5 w-3.5" /> },
];

// ─── Expandable details ───────────────────────────────────────────────────────

function ExpandDetails({
    service,
    assignedStaff,
}: {
    service: any;
    assignedStaff: StaffMember[];
}) {
    const [open, setOpen] = useState(false);
    const hasIncluded = Array.isArray(service.included) && service.included.length > 0;
    const hasTiers =
        service.pricingModel === "WEIGHT_BASED" &&
        Array.isArray(service.weightTiers) &&
        service.weightTiers.length > 0;
    const hasStaff = assignedStaff.length > 0;

    if (!hasIncluded && !hasTiers && !hasStaff) return null;

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 transition-colors hover:text-muted-foreground"
                aria-expanded={open}
            >
                <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
                />
                {open ? "Hide details" : "Show details"}
            </button>

            <div
                className={cn(
                    "mt-4 flex flex-col gap-4 overflow-hidden transition-all duration-200",
                    open ? "opacity-100" : "pointer-events-none h-0 opacity-0"
                )}
            >
                {hasTiers && (
                    <div>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                            Weight tiers
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.weightTiers.map((tier: any, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/70"
                                >
                                    {tier.label || `Tier ${i + 1}`}
                                    {tier.price != null && (
                                        <span className="ml-1.5 font-medium text-foreground">
                                            ${tier.price}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {hasIncluded && (
                    <div>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                            Included
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.included.map((item: string, index: number) => (
                                <span
                                    key={`${item}-${index}`}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/70"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {hasStaff && (
                    <div>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                            Staff
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {assignedStaff.map((member, i) => {
                                const label = member.name || member.email || member.id;
                                return (
                                    <span
                                        key={member.id}
                                        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/40 py-1 pl-1 pr-3 text-xs text-muted-foreground transition-colors hover:border-border/70"
                                    >
                                        <span
                                            className={cn(
                                                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium",
                                                avatarColor(i)
                                            )}
                                        >
                                            {getInitials(label)}
                                        </span>
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({
    service,
    isAssigned,
    assignedStaff,
    onEdit,
    onToggle,
}: {
    service: any;
    isAssigned: boolean;
    assignedStaff: StaffMember[];
    onEdit: () => void;
    onToggle: (mode: "assign" | "unassign") => void;
}) {
    return (
        <div
            className={cn(
                "group rounded-[20px] border border-border/40 bg-background transition-all duration-200 hover:-translate-y-px hover:border-border/80",
                !service.active && " border-red-500 hover:border-red-600"
            )}
        >
            <div className="p-7">
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    {/* Identity */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                        <ServiceIcon service={service} />
                        <div className="min-w-0 flex-1">
                            <h3 className="text-[19px] font-medium leading-tight  text-foreground">
                                {service.name}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2 max-w-md">
                                {service.description || "No description provided."}
                            </p>
                            {/* Badges */}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                                        service.active
                                            ? "bg-blue-50 "
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            service.active ? "bg-primary" : "bg-muted-foreground/50"
                                        )}
                                    />
                                    {service.active ? "Active" : "Inactive"}
                                </span>

                                {isAssigned && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-800">
                                        <UserCheck className="h-3 w-3" />
                                        Assigned
                                    </span>
                                )}

                                {service.pricingModel === "WEIGHT_BASED" && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">
                                        <Weight className="h-3 w-3" />
                                        Weight-based
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">


                        <button
                            type="button"
                            onClick={onEdit}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-transparent px-4 py-2 text-sm text-foreground transition-all hover:bg-muted/60 active:scale-95"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                        </button>

                        {service.id && (
                            isAssigned ? (
                                <button
                                    type="button"
                                    onClick={() => onToggle("unassign")}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-transparent px-4 py-2 text-sm text-red-600 transition-all hover:bg-red-50 active:scale-95"
                                >
                                    <UserMinus className="h-3.5 w-3.5" />
                                    Unassign
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onToggle("assign")}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-transparent px-4 py-2 text-sm text-primary transition-all hover:bg-blue-50 active:scale-95"
                                >
                                    <UserPlus className="h-3.5 w-3.5" />
                                    Assign me
                                </button>
                            )
                        )}

                        {
                            !service.active && <div

                                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-transparent px-4 py-2 text-sm text-red-600 transition-all hover:bg-red-50 active:scale-95"
                            >
                                <X className="h-3.5 w-3.5" />
                                Service is Inavtive
                            </div>
                        }
                    </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-border/40" />

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        {service.durationMinutes || 0} mins
                    </span>

                    {service.pricingModel === "WEIGHT_BASED" ? (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Weight className="h-4 w-4" />
                            {service.weightTiers?.length || 0} weight tiers
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Fixed
                            <span className="ml-0.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                ${service.basePrice || 0}
                            </span>
                        </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Layers className="h-4 w-4" />
                        {service.addOns?.length || 0} add-ons
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {service.staffIds?.length || 0} staff
                    </span>
                </div>

                {/* Expandable details */}
                <ExpandDetails service={service} assignedStaff={assignedStaff} />
            </div>
        </div>
    );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onCreate }: { onCreate: () => void }) {
    return (
        <div className="rounded-[20px] border border-dashed border-border/50 bg-muted/20 py-24 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                <Scissors className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No services yet</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Add your first grooming service to start accepting bookings.
            </p>
            <button
                type="button"
                onClick={onCreate}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-800 active:scale-95"
            >
                <Plus className="h-4 w-4" />
                Add first service
            </button>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ServicesClient({
    initialServices,
    staff,
    currentUserId,
}: ServicesClientProps) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<any | null>(null);
    const [filter, setFilter] = useState<FilterType>("all");

    const openCreate = () => { setEditing(null); setOpen(true); };
    const openEdit = (service: any) => { setEditing(service); setOpen(true); };

    const resolveAssignedStaff = (staffIds: string[] = []) =>
        staff.filter((m) => staffIds.includes(m.id));

    const handleToggleAssignment = async (serviceId: string, mode: "assign" | "unassign") => {
        const formData = new FormData();
        formData.set("serviceId", serviceId);
        formData.set("mode", mode);
        await toggleMyAssignmentAction(formData);
    };

    const filteredServices = initialServices.filter((s) => {
        const isAssigned =
            !!currentUserId &&
            Array.isArray(s.staffIds) &&
            s.staffIds.map(String).includes(String(currentUserId));
        if (filter === "active") return !!s.active;
        if (filter === "inactive") return !s.active;
        if (filter === "assigned") return isAssigned;
        if (filter === "weight") return s.pricingModel === "WEIGHT_BASED";
        return true;
    });

    return (
        <div>
            {/* Page header */}
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground/60">
                        Service catalog
                    </p>
                    <h1 className="text-[32px] font-medium leading-none  text-foreground">
                        Grooming services
                    </h1>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                        Manage what you offer, how it's priced, and who delivers it.
                    </p>
                </div>
                <Button
                    type="button"
                    onClick={openCreate}
                >
                    <Plus className="h-4 w-4" />
                    New service
                </Button>
            </div>


            {/* Filter chips */}
            {initialServices.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {FILTERS.map(({ key, label, icon }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setFilter(key)}
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-all active:scale-95",
                                filter === key
                                    ? "border-blue-600 bg-primary text-white"
                                    : "border-border/50 bg-transparent text-muted-foreground hover:border-border/80 hover:bg-muted/50"
                            )}
                        >
                            {icon}
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {/* Service cards */}
            {initialServices.length === 0 ? (
                <EmptyState onCreate={openCreate} />
            ) : filteredServices.length === 0 ? (
                <div className="rounded-[20px] border border-dashed border-border/50 bg-muted/20 py-16 text-center">
                    <p className="text-sm text-muted-foreground">No services match this filter.</p>
                    <button
                        type="button"
                        className="mt-3 text-sm text-primary underline-offset-2 hover:underline"
                        onClick={() => setFilter("all")}
                    >
                        Clear filter
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {filteredServices.map((service) => {
                        const isAssigned =
                            !!currentUserId &&
                            Array.isArray(service.staffIds) &&
                            service.staffIds.map(String).includes(String(currentUserId));

                        return (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isAssigned={isAssigned}
                                assignedStaff={resolveAssignedStaff(service.staffIds ?? [])}
                                onEdit={() => openEdit(service)}
                                onToggle={(mode) => handleToggleAssignment(service.id, mode)}
                            />
                        );
                    })}
                </div>
            )}

            {/* Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent className="w-full overflow-y-auto sm:max-w-4xl p-2">
                    <SheetHeader>
                        <SheetTitle>{editing ? "Edit service" : "New service"}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <ServiceForm
                            service={editing}
                            onDone={() => setOpen(false)}
                            staff={staff}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}