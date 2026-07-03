"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createBookingAction } from "@/actions/bookings";
import { applyCouponAction } from "@/actions/coupons-public";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBookingStore } from "@/store/booking-store";
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  Clock,
  Copy,
  CreditCard,
  Loader2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { getAvailableCouponsAction } from "@/actions/coupons";

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

export function Step5Summary() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [couponPending, startCouponTransition] = useTransition();

  const [error, setError] = useState("");
  const [couponError, setCouponError] = useState("");
  const [staffName, setStaffName] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [couponListLoading, setCouponListLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");

  const {
    service,
    customer,
    selectedPet,
    selectedAddOns,
    selectedStaffId,
    selectedDate,
    selectedTime,
    couponCode,
    couponDiscount,
    notes,
    totalPrice,
    servicePrice,
    matchedWeightTier,
    setCouponCode,
    setCouponDiscount,
    calculateTotal,
    prevStep,
    resetBooking,
    hasHydrated,
  } = useBookingStore();

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce(
      (sum, addon) => sum + Number(addon?.price || 0),
      0
    );
  }, [selectedAddOns]);

  const subtotalBeforeCoupon = useMemo(() => {
    return Number(servicePrice || 0) + addOnsTotal;
  }, [servicePrice, addOnsTotal]);

  const formattedDate = selectedDate
    ? format(new Date(`${selectedDate}T00:00:00`), "EEEE, MMMM d, yyyy")
    : "-";

  useEffect(() => {
    async function loadStaffName() {
      if (!selectedStaffId) {
        setStaffName("");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "staff", selectedStaffId));
        if (snap.exists()) {
          setStaffName(String(snap.data()?.name || ""));
        } else {
          setStaffName("");
        }
      } catch (err) {
        console.error("Failed to load staff name", err);
        setStaffName("");
      }
    }

    loadStaffName();
  }, [selectedStaffId]);

  useEffect(() => {
    if (hasHydrated) {
      calculateTotal();
    }
  }, [hasHydrated, calculateTotal, servicePrice, addOnsTotal, couponDiscount]);

  useEffect(() => {
    async function loadCoupons() {
      if (!customer.phone) {
        setAvailableCoupons([]);
        return;
      }

      try {
        setCouponListLoading(true);
        const result = await getAvailableCouponsAction(customer.phone);
        setAvailableCoupons(Array.isArray(result?.coupons) ? result.coupons : []);
      } catch (err) {
        console.error("Failed to load coupons", err);
        setAvailableCoupons([]);
      } finally {
        setCouponListLoading(false);
      }
    }

    loadCoupons();
  }, [customer.phone]);

  const applyCoupon = (codeFromClick?: string) => {
    setCouponError("");

    const finalCode = (codeFromClick || couponCode || "").trim().toUpperCase();

    if (!finalCode) {
      setCouponError("Enter or select a coupon code.");
      return;
    }

    setCouponCode(finalCode);

    const formData = new FormData();
    formData.set("code", finalCode);
    formData.set("customerId", customer.phone || "");
    formData.set("basePrice", String(subtotalBeforeCoupon));

    startCouponTransition(async () => {
      const result = await applyCouponAction(formData);

      if (result?.error) {
        setCouponError(result.error);
        setCouponDiscount(0);
        return;
      }

      setCouponDiscount(Number(result?.discount || 0));
    });
  };

  const handleCopyCoupon = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setCouponCode(code);
      setCouponError("");

      setTimeout(() => {
        setCopiedCode("");
      }, 1500);
    } catch (err) {
      console.error("Failed to copy coupon", err);
      setCouponError("Could not copy coupon code.");
    }
  };

  const createBooking = () => {
    setError("");

    if (!selectedPet?.id) {
      setError("Please select a pet.");
      return;
    }

    if (!service?.id && !service?.slug) {
      setError("Please select a service.");
      return;
    }

    const formData = new FormData();
    formData.set("customerId", customer.phone || "");
    formData.set("petId", selectedPet.id);
    formData.set("serviceId", service.id || service.slug);
    formData.set("staffId", selectedStaffId || "");
    formData.set("date", selectedDate || "");
    formData.set("startTime", selectedTime || "");
    formData.set("endTime", selectedTime || "");
    formData.set("couponCode", couponCode || "");
    formData.set("totalPrice", String(totalPrice || 0));
    formData.set("notes", notes || selectedPet.behaviorNotes || "");
    formData.set("addOnsJson", JSON.stringify(selectedAddOns || []));

    startTransition(async () => {
      const result = await createBookingAction(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      resetBooking();
      router.push("/booking/success");
    });
  };

  if (!hasHydrated) {
    return (
      <div className="rounded-2xl border border-border/60 bg-background p-6">
        <p className="text-sm text-muted-foreground">Loading booking summary...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-background">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Review & confirm
        </h2>
        <p className="text-sm text-muted-foreground">
          Check your booking details and confirm your appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 shrink-0 border border-border sm:h-16 sm:w-16">
              <AvatarImage
                src={selectedPet?.photoThumbBase64 || undefined}
                alt={selectedPet?.name || "Pet"}
              />
              <AvatarFallback>
                {getInitials(selectedPet?.name || "Pet")}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                {selectedPet?.name || "Pet"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedPet?.breed || "Unknown breed"}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {selectedPet?.size && (
                  <Badge variant="outline" className="rounded-full text-xs sm:text-sm">
                    {selectedPet.size}
                  </Badge>
                )}

                {selectedPet?.weight && (
                  <Badge variant="outline" className="rounded-full text-xs sm:text-sm">
                    {selectedPet.weight} kg
                  </Badge>
                )}

                {matchedWeightTier?.label && (
                  <Badge variant="outline" className="rounded-full text-xs sm:text-sm">
                    {matchedWeightTier.label} tier
                  </Badge>
                )}

                <Badge variant="outline" className="rounded-full text-xs sm:text-sm">
                  {staffName || "Provider assigned"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-3 text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <CalendarIcon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{selectedTime || "-"}</span>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                <UserRound className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">
                {staffName || "Assigned at booking"}
              </span>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-foreground sm:text-base">
                Promo code
              </h4>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Promo Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="h-11 bg-background uppercase tracking-wide font-medium"
              />
              <Button
                variant="default"
                onClick={() => applyCoupon()}
                disabled={couponPending}
                className="h-11 rounded-xl px-5 bg-foreground text-background hover:bg-foreground/95 transition-all font-medium shrink-0"
              >
                {couponPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>

            {couponError && <p className="text-sm text-destructive">{couponError}</p>}

            {couponListLoading && (
              <p className="text-xs text-muted-foreground animate-pulse">Loading available offers...</p>
            )}

            {!couponListLoading && availableCoupons.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Available offers
                </p>

                <div className="space-y-2">
                  {availableCoupons.map((coupon) => {
                    const code = String(coupon.code || "").toUpperCase();
                    const isCopied = copiedCode === code;
                    const discountText =
                      coupon.type === "percent"
                        ? `${coupon.value}% OFF`
                        : `$${coupon.value} OFF`;

                    return (
                      <div
                        key={coupon.id || code}
                        className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/30 p-3.5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary hover:bg-primary/10 px-2.5 py-0.5 text-xs font-semibold">
                              {discountText}
                            </Badge>
                            <code className="rounded-md border border-border bg-background px-2 py-0.5 text-xs font-bold text-foreground tracking-wider">
                              {code}
                            </code>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {coupon.description || "Apply this coupon code to save on your booking."}
                          </p>
                        </div>

                        <div className="flex gap-2 sm:shrink-0">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => handleCopyCoupon(code)}
                            className={`h-8 rounded-lg text-xs font-medium px-3 flex items-center gap-1.5 transition-all border ${isCopied
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10"
                                : "bg-background text-muted-foreground hover:bg-muted border-border/40"
                              }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!couponListLoading && availableCoupons.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 p-3">
                <p className="text-xs text-muted-foreground">
                  No available coupon codes right now.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border/60 bg-background p-4 shadow-sm sm:p-6">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground sm:text-base">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-4 w-4" />
            </div>
            Payment Summary
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-muted-foreground">
              <span>Service</span>
              <span className="font-medium text-foreground text-right">
                {service?.name || "-"}
              </span>
            </div>

            {matchedWeightTier && (
              <>
                <div className="flex justify-between gap-4 text-muted-foreground">
                  <span>Pet size</span>
                  <span className="font-medium text-foreground">
                    {selectedPet?.size || matchedWeightTier.label}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-muted-foreground">
                  <span>Weight tier</span>
                  <span className="font-medium text-foreground">
                    {matchedWeightTier.label}
                  </span>
                </div>
              </>
            )}

            <div className="flex justify-between gap-4 text-muted-foreground">
              <span>Service price</span>
              <span className="font-medium text-foreground">${servicePrice}</span>
            </div>

            <div className="flex justify-between gap-4 text-muted-foreground">
              <span>Add-ons ({selectedAddOns.length})</span>
              <span className="font-medium text-foreground">${addOnsTotal}</span>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="space-y-2 rounded-xl bg-muted/30 p-3">
                {selectedAddOns.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{addon.name}</span>
                    <span className="font-medium text-foreground">
                      ${Number(addon.price || 0)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between gap-4 text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                ${subtotalBeforeCoupon}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-muted-foreground">
              <span>Coupon discount</span>
              <span className="font-medium text-emerald-600 font-semibold">
                -${couponDiscount}
              </span>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between gap-4 text-lg font-semibold text-foreground">
              <span>Total</span>
              <span className="text-primary text-xl font-bold">${totalPrice}</span>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <div className="mt-6">
            <Button
              onClick={createBooking}
              disabled={pending}
              className="h-12 w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.99] transition-all"
            >
              {pending ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Booking your slot...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-start border-t border-border pt-4">
        <Button
          onClick={prevStep}
          className=" bg-transparent text-primary border border-primary hover:bg-primary/5  shadow  "
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Button>
      </div>
    </div>
  );
}