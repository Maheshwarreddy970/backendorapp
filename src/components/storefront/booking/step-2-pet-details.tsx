"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useBookingStore } from "@/store/booking-store";
import {
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Weight,
  HeartPulse,
  FileText,
} from "lucide-react";

function getInitials(name: string) {
  return (
    name
      ?.trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join("") || "PT"
  );
}

function formatWeightValue(value: string | number) {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return Number.isInteger(num) ? String(num) : String(num);
}

type WeightTier = {
  label: string;
  minKg?: number | string;
  maxKg?: number | string;
};

export function Step2PetDetails() {
  const service = useBookingStore((state) => state.service);
  const matchedWeightTier = useBookingStore((state) => state.matchedWeightTier);
  const servicePrice = useBookingStore((state) => state.servicePrice);

  const selectedPet = useBookingStore((state) => state.selectedPet);
  const updateSelectedPet = useBookingStore((state) => state.updateSelectedPet);
  const nextStep = useBookingStore((state) => state.nextStep);
  const prevStep = useBookingStore((state) => state.prevStep);
  const calculateTotal = useBookingStore((state) => state.calculateTotal);

  const petSizes = [
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "Extra Large",
  ];

  if (!selectedPet) {
    return (
      <div className="rounded-3xl border border-dashed bg-muted/20 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">No pet selected</h3>
            <p className="text-sm text-muted-foreground">
              Please select a pet first before continuing to pet details.
            </p>
          </div>
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  const sizeToTierMap = new Map<string, WeightTier>(
    ((service?.weightTiers || []) as WeightTier[]).map((tier) => [tier.label, tier])
  );

  const handleSizeSelect = (size: string) => {
    const tier = sizeToTierMap.get(size);

    if (service?.pricingModel === "WEIGHT_BASED" && tier) {
      const minKg = Number(tier.minKg ?? 0);
      const maxKg = Number(tier.maxKg ?? minKg);
      const autoWeight = ((minKg + maxKg) / 2).toFixed(
        Number.isInteger((minKg + maxKg) / 2) ? 0 : 1
      );

      updateSelectedPet({
        size,
        weight: formatWeightValue(autoWeight),
      });

      setTimeout(() => calculateTotal(), 0);
      return;
    }

    updateSelectedPet({ size });
    setTimeout(() => calculateTotal(), 0);
  };

  const handleWeightChange = (value: string) => {
    updateSelectedPet({ weight: value });
    setTimeout(() => calculateTotal(), 0);
  };

  const canNext =
    !!selectedPet.size &&
    !!selectedPet.weight &&
    typeof selectedPet.vaccinated === "boolean";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-muted/30 to-background p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 rounded-2xl border bg-background shadow-sm">
              <AvatarImage
                src={selectedPet.photoThumbBase64 || undefined}
                alt={selectedPet.name || "Pet"}
                className="object-cover"
              />
              <AvatarFallback className="rounded-2xl text-sm font-semibold">
                {getInitials(selectedPet.name || "Pet")}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {selectedPet.name}
                </h2>
                <Badge variant="secondary" className="rounded-full px-3">
                  Pet profile
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {selectedPet.breed || "Unknown breed"} • {selectedPet.size || "Size not selected"}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedPet.age ? (
                  <Badge variant="outline" className="rounded-full">
                    Age: {selectedPet.age}
                  </Badge>
                ) : null}
                {selectedPet.weight ? (
                  <Badge variant="outline" className="rounded-full">
                    Weight: {selectedPet.weight} kg
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-2xl border bg-background px-3 py-2 text-sm text-muted-foreground shadow-sm">
            <Sparkles className="size-4 text-primary" />
            Grooming details
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Weight className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Size & pricing
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose size and weight to match the correct price.
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {petSizes.map((size) => {
                  const active = selectedPet.size === size;
                  const tier = sizeToTierMap.get(size);

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeSelect(size)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${active
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border/60 bg-background hover:bg-muted/30"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{size}</p>
                          {service?.pricingModel === "WEIGHT_BASED" && tier ? (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {(tier as any).minKg}kg - {(tier as any).maxKg}kg
                            </p>
                          ) : null}
                        </div>

                        {active ? <CheckCircle2 className="size-4 shrink-0 text-primary" /> : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="space-y-2">
                  <Label htmlFor="petWeight" className="text-sm font-medium">
                    Pet weight
                  </Label>
                  <div className="relative">
                    <Input
                      id="petWeight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={selectedPet.weight || ""}
                      onChange={(e) => handleWeightChange(e.target.value)}
                      placeholder="Enter weight"
                      className="h-11 rounded-2xl border-border/60 bg-muted/20 pr-12"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                      kg
                    </span>
                  </div>
                </div>

                {service?.pricingModel === "WEIGHT_BASED" ? (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Matched tier</Label>
                    <div className="flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {matchedWeightTier
                            ? `${matchedWeightTier.label} • ${matchedWeightTier.minKg}kg - ${matchedWeightTier.maxKg}kg`
                            : "Enter valid weight to match tier"}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-lg font-semibold text-primary">
                          ${servicePrice || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {service?.pricingModel === "WEIGHT_BASED" ? (
                <p className="text-xs text-muted-foreground">
                  Selecting a size auto-fills a matching weight range.
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <HeartPulse className="size-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Vaccination
                </h3>
                <p className="text-sm text-muted-foreground">
                  Required before proceeding with booking.
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => updateSelectedPet({ vaccinated: true })}
                className={`rounded-2xl border p-4 text-left transition ${selectedPet.vaccinated === true
                  ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200"
                  : "border-border/60 bg-background hover:bg-muted/30"
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`size-4 ${selectedPet.vaccinated === true
                          ? "text-emerald-600"
                          : "text-muted-foreground"
                          }`}
                      />
                      <span className="font-medium text-foreground">Yes</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pet is vaccinated and ready for service.
                    </p>
                  </div>

                  {selectedPet.vaccinated === true ? (
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  ) : null}
                </div>
              </button>

              <button
                type="button"
                onClick={() => updateSelectedPet({ vaccinated: false })}
                className={`rounded-2xl border p-4 text-left transition ${selectedPet.vaccinated === false
                  ? "border-amber-500 bg-amber-50 ring-1 ring-amber-200"
                  : "border-border/60 bg-background hover:bg-muted/30"
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert
                        className={`size-4 ${selectedPet.vaccinated === false
                          ? "text-amber-600"
                          : "text-muted-foreground"
                          }`}
                      />
                      <span className="font-medium text-foreground">No</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pet is not vaccinated yet.
                    </p>
                  </div>

                  {selectedPet.vaccinated === false ? (
                    <CheckCircle2 className="size-5 text-amber-600" />
                  ) : null}
                </div>
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-border/60 bg-background p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">
                <FileText className="size-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Care notes
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add notes only if needed.
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="behaviorNotes" className="text-sm font-medium">
                  Behavior notes
                </Label>
                <Textarea
                  id="behaviorNotes"
                  value={selectedPet.behaviorNotes || ""}
                  onChange={(e) =>
                    updateSelectedPet({ behaviorNotes: e.target.value })
                  }
                  placeholder="Sensitive paws, anxious with dryer..."
                  className="min-h-[110px] resize-none rounded-2xl border-border/60 bg-muted/20 px-4 py-3 shadow-none focus-visible:ring-1"
                />
                <p className="text-xs text-muted-foreground">Optional</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stylePreference" className="text-sm font-medium">
                  Style preference
                </Label>
                <Textarea
                  id="stylePreference"
                  value={selectedPet.stylePreference || ""}
                  onChange={(e) =>
                    updateSelectedPet({ stylePreference: e.target.value })
                  }
                  placeholder="Short trim, neat face, fluffy tail..."
                  className="min-h-[110px] resize-none rounded-2xl border-border/60 bg-muted/20 px-4 py-3 shadow-none focus-visible:ring-1"
                />
                <p className="text-xs text-muted-foreground">Optional</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-border/60 bg-muted/20 p-5">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Quick check</h3>
            <p className="text-xs text-muted-foreground">
              Complete the required details to continue.
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Size</span>
              <span className="font-medium text-foreground">
                {selectedPet.size || "Required"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Weight</span>
              <span className="font-medium text-foreground">
                {selectedPet.weight ? `${selectedPet.weight} kg` : "Required"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium text-foreground">${servicePrice || 0}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Vaccination</span>
              <span className="font-medium text-foreground">
                {selectedPet.vaccinated === true
                  ? "Confirmed"
                  : selectedPet.vaccinated === false
                    ? "Not vaccinated"
                    : "Required"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Behavior notes</span>
              <span className="font-medium text-foreground">
                {selectedPet.behaviorNotes?.trim() ? "Added" : "Optional"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Style</span>
              <span className="font-medium text-foreground">
                {selectedPet.stylePreference?.trim() ? "Added" : "Optional"}
              </span>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Button onClick={prevStep} className=" bg-transparent text-primary border border-primary hover:bg-primary/5  shadow  "
        >
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Button>

        <Button onClick={nextStep} disabled={!canNext} className="rounded-xl px-6">
          Next
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
}