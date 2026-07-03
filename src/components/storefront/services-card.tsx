"use client";

import Link from "next/link";
import { Clock3, Star, Scale, Layers, ArrowRight, PawPrint } from "lucide-react";

function getStartingPrice(service: any) {
    if (service.basePrice) return Number(service.basePrice);

    let prices: number[] = [];

    if (service.sizePricing) {
        const sizePrices = Object.values(service.sizePricing)
            .map(Number)
            .filter((value) => !Number.isNaN(value) && value > 0);
        prices = [...prices, ...sizePrices];
    }

    if (service.weightTiers?.length) {
        const weightPrices = service.weightTiers
            .map((tier: any) => Number(tier.price))
            .filter((value: number) => !Number.isNaN(value) && value > 0);
        prices = [...prices, ...weightPrices];
    }

    if (service.servicePrices?.length) {
        const servicePrices = service.servicePrices
            .map((sp: any) => Number(sp.price))
            .filter((value: number) => !Number.isNaN(value) && value > 0);
        prices = [...prices, ...servicePrices];
    }

    if (prices.length > 0) return Math.min(...prices);
    return 0;
}

function getOptionsCount(service: any) {
    if (service.pricingModel === "WEIGHT_BASED" && service.weightTiers) {
        return service.weightTiers.filter(
            (tier: any) => tier.price !== "" && !Number.isNaN(Number(tier.price)) && Number(tier.price) > 0
        ).length;
    }

    if (service.sizePricing) {
        return Object.values(service.sizePricing).filter(
            (v) => v !== "" && !Number.isNaN(Number(v)) && Number(v) > 0
        ).length;
    }

    if (service.servicePrices?.length) {
        return service.servicePrices.length;
    }

    return 0;
}

function getDuration(service: any) {
    return service.durationMinutes || service.duration || 0;
}

// Each card gets a full accent identity — background tint, text color, and a
// matching solid CTA button color — picked deterministically from the
// service name so the grid reads as varied but never random/clashing.
const ACCENTS = [
    {
        soft: "bg-[#FFF4E0]",
        fg: "text-[#9C6B1E]",
        ring: "ring-[#FFC357]/40",
        cta: "bg-[#FFC357] hover:bg-[#F5B73F]",
        ctaText: "text-[#3f3018]",
    },
    {
        soft: "bg-[#E9F3FF]",
        fg: "text-[#2F5E8C]",
        ring: "ring-[#7FB1E8]/40",
        cta: "bg-[#7FB1E8] hover:bg-[#6BA3E0]",
        ctaText: "text-[#10283f]",
    },
    {
        soft: "bg-[#F1EAFF]",
        fg: "text-[#6646A8]",
        ring: "ring-[#B79CF0]/40",
        cta: "bg-[#B79CF0] hover:bg-[#A988EA]",
        ctaText: "text-[#241740]",
    },
    {
        soft: "bg-[#E8F7EE]",
        fg: "text-[#327350]",
        ring: "ring-[#8FD3A8]/40",
        cta: "bg-[#8FD3A8] hover:bg-[#7BC899]",
        ctaText: "text-[#14301f]",
    },
    {
        soft: "bg-[#FFE9EC]",
        fg: "text-[#B14B5E]",
        ring: "ring-[#F2A3B1]/40",
        cta: "bg-[#F2A3B1] hover:bg-[#EC8FA0]",
        ctaText: "text-[#3f1620]",
    },
];

function getAccent(name: string) {
    const hash = (name || "").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return ACCENTS[hash % ACCENTS.length];
}

export function ServicesCard({ service }: { service: any }) {
    const detailHref = `/services/${service.slug || service.id}`;
    const startingPrice = getStartingPrice(service);
    const optionsCount = getOptionsCount(service);
    const duration = getDuration(service);
    const isWeightBased = service.pricingModel === "WEIGHT_BASED";
    const hasOptions = optionsCount > 0;
    const hasRating = Boolean(service.reviewsSummary?.count);
    const accent = getAccent(service.name);

    return (
        <div className="group relative flex h-full flex-col rounded-[28px] border border-border/60 bg-background p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-transparent hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.2)]">

            <Link href={detailHref} className="flex flex-1 flex-col">
                {/* Rating badge */}
                {hasRating && (
                    <div className="absolute right-7 top-7 flex items-center gap-1 rounded-full bg-muted/70 px-2.5 py-1 text-xs font-semibold text-foreground">
                        <Star className="h-3.5 w-3.5 fill-[#FFC357] text-[#FFC357]" />
                        {service.reviewsSummary.avg || "0.0"}
                    </div>
                )}

                {/* Icon avatar in the card's own accent color */}
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.soft} ring-1 ${accent.ring}`}
                >
                    <PawPrint className={`h-6 w-6 ${accent.fg}`} strokeWidth={2.25} />
                </div>

                {/* Title + description */}
                <div className="mt-5 pr-12">
                    <h2 className="text-[22px] font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:opacity-80">
                        {service.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {service.description || "Professional pet care service"}
                    </p>
                </div>

                {/* Included chips */}
                {service.included && service.included.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {service.included.slice(0, 4).map((item: string, idx: number) => (
                            <span
                                key={idx}
                                className="rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex-1" />

                {/* Meta row */}
                <div className="mt-5 flex items-center gap-3 text-xs font-medium text-muted-foreground/80">
                    {duration > 0 && (
                        <span className="flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5 opacity-70" />
                            {duration} min
                        </span>
                    )}
                    {hasOptions && (
                        <span className="flex items-center gap-1">
                            {isWeightBased ? (
                                <Scale className="h-3.5 w-3.5 opacity-70" />
                            ) : (
                                <Layers className="h-3.5 w-3.5 opacity-70" />
                            )}
                            {optionsCount} {isWeightBased ? "weight tiers" : "sizes"}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="mt-4  flex  items-baseline justify-end gap-2 border-y border-dashed border-border/60 py-4">
                    <span className="text-xs font-medium text-muted-foreground/70">from</span>
                    <span className="text-3xl font-semibold  leading-none tracking-tight text-foreground">
                        ${startingPrice.toFixed(0)}
                    </span>

                </div>
            </Link>

            {/* CTA — colored to match this card's accent, full width, big tap target */}
            <Link
                href={detailHref}
                className={`mt-5 flex items-center justify-between gap-3 rounded-full ${accent.cta} ${accent.ctaText} pl-6 pr-2 py-2 text-[15px] font-semibold transition-colors duration-200`}
            >
                Book your visit
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4 text-foreground" strokeWidth={2.25} />
                </span>
            </Link>
        </div>
    );
}