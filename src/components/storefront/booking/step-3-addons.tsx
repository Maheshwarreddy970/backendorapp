"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/store/booking-store";
import { ArrowLeft, Check } from "lucide-react";

export function Step3Addons({ service }: { service: any }) {
  const selectedAddOns = useBookingStore((state) => state.selectedAddOns);
  const toggleAddOn = useBookingStore((state) => state.toggleAddOn);
  const nextStep = useBookingStore((state) => state.nextStep);
  const prevStep = useBookingStore((state) => state.prevStep);

  const addOns = Array.isArray(service?.addOns) ? service.addOns : [];

  const uniqueAddOns = addOns.filter(
    (addon: any, index: number, arr: any[]) =>
      arr.findIndex((item) => item.id === addon.id) === index
  );

  const selectedTotal = selectedAddOns.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <div className="space-y-6 bg-background">
      <div className="px-1">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Extras & Add-ons
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select optional services to pamper your pet.
        </p>
      </div>

      <div className="space-y-3">
        {uniqueAddOns.length > 0 ? (
          uniqueAddOns.map((addon: any) => {
            const isSelected = selectedAddOns.some((item) => item.id === addon.id);

            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddOn(addon)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all sm:p-5 ${isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-background hover:border-primary/40"
                  }`}
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors sm:h-6 sm:w-6 ${isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background"
                      }`}
                  >
                    {isSelected ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : null}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-foreground sm:text-lg">
                      {addon.name}
                    </p>
                    {addon.description ? (
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                        {addon.description}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        +${addon.price} • {addon.durationMinutes || 0} mins
                      </p>
                    )}
                  </div>
                </div>

                <Badge
                  className={`ml-4 shrink-0 px-3 py-1 text-xs sm:text-sm ${isSelected
                      ? "bg-primary text-primary-foreground hover:bg-primary"
                      : "bg-muted text-foreground hover:bg-muted"
                    }`}
                >
                  +${addon.price}
                </Badge>
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-border bg-background py-12">
            <p className="text-sm font-medium text-muted-foreground">
              No additional add-ons available.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between  gap-3 border-t pt-4 sm:pt-6">
        <Button onClick={prevStep} className=" bg-transparent text-primary border border-primary hover:bg-primary/5  shadow  "
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button onClick={nextStep} className="min-w-[160px] rounded-xl px-6">
          {selectedAddOns.length > 0
            ? `Continue ($${selectedTotal} added)`
            : "Skip Add-ons"}
        </Button>
      </div>
    </div>
  );
}