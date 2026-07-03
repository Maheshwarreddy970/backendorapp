"use client";

import { useState } from "react";
import { Plus, TicketPercent, Pencil, Trash2, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { CouponForm } from "./coupon-form";
import { deleteCouponAction } from "@/actions/coupons";

export function CouponsClient({ initialCoupons }: { initialCoupons: any[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className=""
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      {initialCoupons.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <CardContent className="py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <TicketPercent className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold">No coupons yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first coupon for the storefront checkout.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {initialCoupons.map((coupon) => (
            <Card
              key={coupon.id}
              className="flex flex-col overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md dark:border-slate-800"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-3">
                <div className="space-y-1.5">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <Tag className="h-4 w-4 text-indigo-400" />
                    {coupon.code}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {coupon.type === "percent" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 border-none shadow-none">
                        {coupon.value}% OFF
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-primary hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-400 border-none shadow-none">
                        ${coupon.value} OFF
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {coupon.usageLimit.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className={`border shadow-sm text-xs px-2 py-0.5 rounded-full ${coupon.active
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-900/20"
                    : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900/50"
                    }`}
                >
                  {coupon.active ? "Active" : "Disabled"}
                </Badge>
              </CardHeader>

              {/* Pushes footer to the bottom */}
              <CardContent className="flex-1 pb-2" />

              <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 py-3 px-6 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-full border-blue-200 bg-white text-primary hover:bg-blue-50 hover:text-primary dark:border-blue-900/50 dark:bg-slate-950 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  onClick={() => {
                    setEditing(coupon);
                    setOpen(true);
                  }}
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Button>

                <form
                  action={deleteCouponAction as unknown as (formData: FormData) => Promise<void>}
                >
                  <input type="hidden" name="couponId" value={coupon.id} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-rose-200 bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-900/50 dark:bg-slate-950 dark:text-rose-400 dark:hover:bg-rose-900/20"
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2">
              <TicketPercent className="h-5 w-5 text-indigo-500" />
              {editing ? "Edit Coupon" : "Create Coupon"}
            </SheetTitle>
          </SheetHeader>

          <div>
            <CouponForm coupon={editing} onDone={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}