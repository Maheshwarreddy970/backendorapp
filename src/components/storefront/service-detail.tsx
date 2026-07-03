"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Star, Ticket, Check, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReviewList } from "./review-list";

function getStartingPrice(service: any) {
    if (service.basePrice) return Number(service.basePrice);
    let prices: number[] = [];
    if (service.sizePricing) {
        prices = prices.concat(
            Object.values(service.sizePricing)
                .map(Number)
                .filter((v) => !Number.isNaN(v) && v > 0)
        );
    }
    if (service.weightTiers?.length) {
        prices = prices.concat(
            service.weightTiers.map((t: any) => Number(t.price)).filter((v: number) => !Number.isNaN(v) && v > 0)
        );
    }
    if (service.servicePrices?.length) {
        prices = prices.concat(
            service.servicePrices.map((sp: any) => Number(sp.price)).filter((v: number) => !Number.isNaN(v) && v > 0)
        );
    }
    return prices.length ? Math.min(...prices) : 0;
}

export function ServiceDetail({ service, reviews }: { service: any; reviews: any[] }) {
    const included = Array.isArray(service?.included) ? service.included : [];
    const addOns = Array.isArray(service?.addOns) ? service.addOns : [];

    const weightTiers = Array.isArray(service?.weightTiers)
        ? service.weightTiers.filter((t: any) => t.price !== "" && Number(t.price) > 0)
        : [];
    const sizeEntries = service?.sizePricing
        ? Object.entries(service.sizePricing).filter(([, v]) => v !== "" && !Number.isNaN(Number(v)) && Number(v) > 0)
        : [];

    const hasTiers = weightTiers.length > 0 || sizeEntries.length > 0;
    const startingPrice = getStartingPrice(service);
    const hasRating = Boolean(service.reviewsSummary?.count);

    // ---- interactive variant + add-on selection (ecommerce-style) ----
    const [selectedTierId, setSelectedTierId] = useState<string | null>(
        weightTiers[0]?.id ?? (sizeEntries[0]?.[0] as string) ?? null
    );
    const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

    const tierPrice = useMemo(() => {
        if (weightTiers.length) {
            const t = weightTiers.find((t: any) => t.id === selectedTierId);
            return t ? Number(t.price) : startingPrice;
        }
        if (sizeEntries.length) {
            const e = sizeEntries.find(([label]) => label === selectedTierId);
            return e ? Number(e[1]) : startingPrice;
        }
        return startingPrice;
    }, [selectedTierId, weightTiers, sizeEntries, startingPrice]);

    const addOnsTotal = addOns
        .filter((a: any) => selectedAddOns.has(a.id))
        .reduce((sum: number, a: any) => sum + Number(a.price || 0), 0);

    const total = tierPrice + addOnsTotal;

    function toggleAddOn(id: string) {
        setSelectedAddOns((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    return (
        <div className="mx-auto max-w-6xl pb-24 lg:pb-0">
            {/* Eyebrow */}
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Services {service.pricingModel === "WEIGHT_BASED" ? "· Priced by pet weight" : ""}
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
                {/* ============ LEFT: content ============ */}
                <div className="space-y-12">
                    {/* Title + price block */}
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            {service.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            {hasRating && (
                                <span className="flex items-center gap-1.5">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="font-medium text-foreground">
                                        {service.reviewsSummary?.avg || "0.0"}
                                    </span>
                                    <span>({service.reviewsSummary?.count || 0} reviews)</span>
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Clock3 className="h-4 w-4 text-sky-500" />
                                {service.durationMinutes || 0} min appointment
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users className="h-4 w-4 text-violet-500" />
                                {service.staffIds?.length || 0} providers available
                            </span>
                        </div>

                        <div className="mt-5 flex items-baseline gap-2">
                            <span className="text-xs uppercase tracking-wide text-muted-foreground">From</span>
                            <span className="text-3xl font-semibold text-foreground">
                                ${startingPrice.toFixed(0)}
                            </span>
                        </div>

                        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {service.description ||
                                "Premium full grooming service designed for comfort, hygiene, and style."}
                        </p>

                        {/* Compact booking summary — visible on mobile only, so users don't have to scroll to find it */}
                        <div className="mt-6 space-y-4 rounded-xl border border-border p-4 lg:hidden">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated total</p>
                                <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                                    ${total.toFixed(0)}
                                </div>
                                {addOnsTotal > 0 && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        ${tierPrice.toFixed(0)} service + ${addOnsTotal.toFixed(0)} add-ons
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock3 className="h-4 w-4 text-sky-500" />
                                    {service.durationMinutes || 0} minute appointment
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    Free rescheduling up to 24h before
                                </div>
                            </div>

                            <Link
                                href={`/booking?service=${service.slug || service.id}`}
                                className="flex items-center justify-between gap-2.5 rounded-full border-0 bg-[#FFC357] py-2 pl-5 pr-2 text-sm font-medium"
                            >
                                <span className="flex items-center gap-1.5 text-white">Book now</span>
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M.6 4.602h10m-4-4 4 4-4 4"
                                            stroke="#3f3f47"
                                            strokeWidth="1.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Link>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Ticket className="h-4 w-4 text-rose-400" />
                                <span>Coupon can be applied at checkout</span>
                            </div>
                        </div>
                    </div>

                    {/* What's included */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-foreground">What's included</h2>
                        {included.length ? (
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                {included.map((item: string) => (
                                    <div key={item} className="flex items-center gap-2.5 capitalize text-foreground">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                            <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No included items listed.</p>
                        )}
                    </section>

                    {/* Pricing by pet size/weight — cleaner, higher-contrast table */}
                    {hasTiers && (
                        <section className="space-y-3">
                            <h2 className="text-lg font-semibold text-foreground">
                                {weightTiers.length ? "Pricing by pet weight" : "Pricing by pet size"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Select your pet's {weightTiers.length ? "weight" : "size"} to see the exact price.
                            </p>

                            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                                            <TableHead className="w-10"></TableHead>
                                            <TableHead>Size</TableHead>
                                            {weightTiers.length > 0 && <TableHead>Weight</TableHead>}
                                            <TableHead className="text-right">Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {weightTiers.map((tier: any) => {
                                            const selected = selectedTierId === tier.id;
                                            return (
                                                <TableRow
                                                    key={tier.id}
                                                    onClick={() => setSelectedTierId(tier.id)}
                                                    className={`cursor-pointer transition-colors ${selected ? "bg-amber-50 hover:bg-amber-50" : "hover:bg-muted/40"
                                                        }`}
                                                >
                                                    <TableCell>
                                                        <span
                                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${selected
                                                                    ? "border-[#FFC357] bg-[#FFC357]"
                                                                    : "border-border bg-background"
                                                                }`}
                                                        >
                                                            {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-medium capitalize text-foreground">
                                                        {tier.label}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {tier.minKg}–{tier.maxKg} kg
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold text-foreground">
                                                        ${tier.price}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {sizeEntries.map(([label, price]) => {
                                            const selected = selectedTierId === label;
                                            return (
                                                <TableRow
                                                    key={label}
                                                    onClick={() => setSelectedTierId(label)}
                                                    className={`cursor-pointer transition-colors ${selected ? "bg-amber-50 hover:bg-amber-50" : "hover:bg-muted/40"
                                                        }`}
                                                >
                                                    <TableCell>
                                                        <span
                                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${selected
                                                                    ? "border-[#FFC357] bg-[#FFC357]"
                                                                    : "border-border bg-background"
                                                                }`}
                                                        >
                                                            {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="font-medium capitalize text-foreground">
                                                        {label}
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold text-foreground">
                                                        ${String(price)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>
                    )}

                    {/* Add-ons — toggleable, checkbox now correctly reflects selected state */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-foreground">Add-ons</h2>
                        {addOns.length ? (
                            <div className="grid gap-2 sm:grid-cols-2">
                                {addOns.map((addon: any) => {
                                    const checked = selectedAddOns.has(addon.id);
                                    return (
                                        <button
                                            key={addon.id}
                                            type="button"
                                            onClick={() => toggleAddOn(addon.id)}
                                            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${checked
                                                    ? "border-[#FFC357] bg-amber-50"
                                                    : "border-border hover:bg-muted/40"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${checked
                                                            ? "border-[#FFC357] bg-[#FFC357]"
                                                            : "border-border bg-background"
                                                        }`}
                                                >
                                                    {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{addon.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {addon.durationMinutes || 0} mins
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold text-foreground">+${addon.price || 0}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No add-ons available.</p>
                        )}
                    </section>

                    {/* Reviews */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-foreground">Recent reviews</h2>
                        <ReviewList reviews={reviews} />
                    </section>
                </div>

                {/* ============ RIGHT: buy panel ============ */}
                <div className="lg:border-l lg:border-border lg:pl-8 hidden lg:block">
                    <div className="sticky top-6 space-y-5">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated total</p>
                            <div className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                                ${total.toFixed(0)}
                            </div>
                            {addOnsTotal > 0 && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                    ${tierPrice.toFixed(0)} service + ${addOnsTotal.toFixed(0)} add-ons
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Clock3 className="h-4 w-4 text-sky-500" />
                                {service.durationMinutes || 0} minute appointment
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                Free rescheduling up to 24h before
                            </div>
                        </div>

                        <Link href={`/booking?service=${service.slug || service.id}`} className="flex items-center justify-between gap-2.5 bg-[#FFC357] text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer border-0">
                            <span className="flex items-center gap-1.5 text-white">
                                Book now
                            </span>
                            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                                <svg
                                    width="12"
                                    height="10"
                                    viewBox="0 0 12 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M.6 4.602h10m-4-4 4 4-4 4"
                                        stroke="#3f3f47"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Ticket className="h-4 w-4 text-rose-400" />
                            <span>Coupon can be applied at checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed mobile booking bar — keeps price + Book now reachable at all times, no scrolling needed */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Total</p>
                        <p className="text-lg font-semibold leading-tight text-foreground">${total.toFixed(0)}</p>
                    </div>
                    <Link
                        href={`/booking?service=${service.slug || service.id}`}
                        className="flex items-center justify-between gap-2.5 rounded-full border-0 bg-[#FFC357] py-2.5 pl-5 pr-2 text-sm font-medium"
                    >
                        <span className="flex items-center gap-1.5 text-white">Book now</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M.6 4.602h10m-4-4 4 4-4 4"
                                    stroke="#3f3f47"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}