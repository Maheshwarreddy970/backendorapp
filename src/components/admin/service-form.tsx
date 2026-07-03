"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Scissors,
  Clock3,
  IndianRupee,
  Weight,
  Sparkles,
  ChevronDown,
  Tag,
  AlignLeft,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import { saveServiceAction, deleteServiceAction } from "@/actions/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";


type NoScrollNumberInputProps = React.ComponentProps<typeof Input>;

function NoScrollNumberInput({
  className,
  onKeyDown,
  onFocus,
  ...props
}: NoScrollNumberInputProps) {
  return (
    <Input
      type="number"
      {...props}
      inputMode="decimal"
      className={cn("no-spinner", className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
        }
        onKeyDown?.(e);
      }}
      onWheel={(e) => {
        e.currentTarget.blur();
      }}
      onFocus={(e) => {
        e.currentTarget.addEventListener(
          "wheel",
          (event) => event.preventDefault(),
          { passive: false }
        );
        onFocus?.(e);
      }}
    />
  );
}


type StaffMember = {
  id: string;
  name?: string;
  email?: string;
};

type ServiceFormProps = {
  service?: any;
  onDone: () => void;
  staff?: StaffMember[];
};

type AddOn = {
  id: string;
  name: string;
  price: string | number;
  durationMinutes: string | number;
  active: boolean;
};

type WeightTier = {
  id: string;
  label: string;
  minKg: string | number;
  maxKg: string | number;
  price: string | number;
};

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-border/40 bg-background transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  action,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-7 py-5 border-b border-border/40">
      <div className="flex items-center gap-3.5">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
            iconBg,
            iconColor
          )}
        >
          {icon}
        </span>
        <div>
          <p className="text-[15px] font-medium leading-tight text-foreground">
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

// ─── Field group ──────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-medium text-foreground">
          {label}
        </Label>
        {hint && (
          <span className="text-xs text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Pricing pill toggle ──────────────────────────────────────────────────────

function PricingToggle({
  value,
  onChange,
}: {
  value: "FIXED" | "WEIGHT_BASED";
  onChange: (v: "FIXED" | "WEIGHT_BASED") => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-border/40 bg-muted/30 p-1 gap-1">
      {(
        [
          { key: "FIXED", label: "Fixed price", icon: <IndianRupee className="h-3.5 w-3.5" /> },
          { key: "WEIGHT_BASED", label: "Weight-based", icon: <Weight className="h-3.5 w-3.5" /> },
        ] as const
      ).map(({ key, label, icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150",
            value === key
              ? "bg-background text-foreground shadow-sm border border-border/40"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Weight tier row ──────────────────────────────────────────────────────────

function WeightTierRow({
  tier,
  onChange,
  onRemove,
}: {
  tier: WeightTier;
  index: number;
  onChange: (key: keyof WeightTier, value: any) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
      <div className="flex flex-col gap-4">
        <Field label="Label">
          <Input
            value={tier.label}
            onChange={(e) => onChange("label", e.target.value)}
            placeholder="e.g. XXL"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Field label="Min kg">
          <NoScrollNumberInput
            min={0}
            value={tier.minKg}
            onChange={(e) => onChange("minKg", e.target.value)}
            placeholder="20"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Field label="Max kg">
          <NoScrollNumberInput
            min={0}
            value={tier.maxKg}
            onChange={(e) => onChange("maxKg", e.target.value)}
            placeholder="40"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Field label="Price ($)">
          <NoScrollNumberInput
            min={0}
            step="0.01"
            value={tier.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="999"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Button
          type="button"
          variant="outline"
          onClick={onRemove}
          className="w-full justify-center  text-red-500 border-red-500 border-2 bg-white hover:text-white hover:bg-red-500 "
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove tier
        </Button>
      </div>
    </div>
  );
}
// ─── Add-on row ───────────────────────────────────────────────────────────────
function AddOnRow({
  addon,
  onChange,
  onRemove,
}: {
  addon: AddOn;
  index: number;
  onChange: (key: keyof AddOn, value: any) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
      <div className="flex flex-col gap-4">
        <Field label="Name">
          <Input
            value={addon.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Teeth brushing"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Field label="Price ($)">
          <NoScrollNumberInput
            min={0}
            step="0.01"
            value={addon.price}
            onChange={(e) => onChange("price", e.target.value)}
            placeholder="150"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <Field label="Duration (mins)">
          <NoScrollNumberInput
            min={0}
            value={addon.durationMinutes}
            onChange={(e) => onChange("durationMinutes", e.target.value)}
            placeholder="15"
            className="h-10 rounded-xl border-border/50 bg-background text-sm"
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant={addon.active ? "default" : "outline"}
            onClick={() => onChange("active", !addon.active)}
            className="w-full rounded-xl sm:w-auto"
          >
            {addon.active ? "Active" : "Inactive"}
          </Button>

          <Button
            type="button"
            onClick={onRemove}
            className="w-full  text-red-500 border-red-500 border-2 bg-white hover:text-white hover:bg-red-500 sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove add-on
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/40 bg-muted/10 py-8">
      <p className="text-sm text-muted-foreground/60">{message}</p>
    </div>
  );
}

// ─── Add row button ───────────────────────────────────────────────────────────

function AddRowButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border/60 bg-transparent px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-border hover:bg-muted/20 hover:text-foreground"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function ServiceForm({
  service,
  onDone,
  staff = [],
}: ServiceFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(service?.active ?? true);


  const [pricingModel, setPricingModel] = useState<"FIXED" | "WEIGHT_BASED">(
    service?.pricingModel || "FIXED"
  );

  const [addOns, setAddOns] = useState<AddOn[]>(
    Array.isArray(service?.addOns) ? service.addOns : []
  );

  const [weightTiers, setWeightTiers] = useState<WeightTier[]>(
    Array.isArray(service?.weightTiers) ? service.weightTiers : []
  );

  const assignedStaff = useMemo(() => {
    const ids = Array.isArray(service?.staffIds) ? service.staffIds : [];
    return staff.filter((member) => ids.includes(member.id));
  }, [service?.staffIds, staff]);

  const addAddOn = () => {
    setAddOns((prev) => [
      ...prev,
      { id: createId("addon"), name: "", price: "", durationMinutes: "", active: true },
    ]);
  };

  const updateAddOn = (index: number, key: keyof AddOn, value: any) =>
    setAddOns((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );

  const removeAddOn = (index: number) =>
    setAddOns((prev) => prev.filter((_, i) => i !== index));

  const addWeightTier = () => {
    setWeightTiers((prev) => [
      ...prev,
      { id: createId("tier"), label: "", minKg: "", maxKg: "", price: "" },
    ]);
  };

  const updateWeightTier = (index: number, key: keyof WeightTier, value: any) =>
    setWeightTiers((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );

  const removeWeightTier = (index: number) =>
    setWeightTiers((prev) => prev.filter((_, i) => i !== index));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("pricingModel", pricingModel);
    formData.set("addonsJson", JSON.stringify(addOns));
    formData.set("weightTiersJson", JSON.stringify(weightTiers));

    startTransition(async () => {
      const res = await saveServiceAction(formData);
      if (res?.error) {
        setError(res.error);
        return;
      }
      onDone();
    });
  };

  const deleteCurrent = () => {
    if (!service?.id) return;
    const formData = new FormData();
    formData.set("serviceId", service.id);
    startTransition(async () => {
      await deleteServiceAction(formData);
      onDone();
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4 pb-10">
      {service?.id && (
        <input type="hidden" name="serviceId" value={service.id} />
      )}

      {/* ── Basic Information ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          icon={<Scissors className="h-4.5 w-4.5" />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          title="Basic Information"
          subtitle="Name, slug, and description"
        />
        <div className="space-y-5 p-7">
          <div className="grid gap-5 ">
            <Field label="Service name">
              <Input
                name="name"
                defaultValue={service?.name || ""}
                required
                placeholder="Full Service Grooming"
                className="h-10 rounded-xl border-border/40 bg-muted/20 text-sm focus:bg-background"
              />
            </Field>
            <Field label="Slug" hint="URL-friendly identifier">
              <Input
                name="slug"
                defaultValue={service?.slug || ""}
                placeholder="full-service-grooming"
                className="h-10 rounded-xl border-border/40 bg-muted/20 text-sm focus:bg-background"
              />
            </Field>
          </div>

          <Field label="Description">
            <Textarea
              name="description"
              defaultValue={service?.description || ""}
              placeholder="Describe what's included in this service…"
              rows={3}
              className="rounded-xl border-border/40 bg-muted/20 text-sm resize-none focus:bg-background"
            />
          </Field>

          <Field label="Included items" hint="Comma-separated">
            <Textarea
              name="included"
              defaultValue={
                Array.isArray(service?.included)
                  ? service.included.join(", ")
                  : ""
              }
              placeholder="Bath, nail trim, ear cleaning, blow dry…"
              rows={2}
              className="rounded-xl border-border/40 bg-muted/20 text-sm resize-none focus:bg-background"
            />
          </Field>
        </div>
      </Section>

      {/* ── Duration & Pricing ────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          icon={<Clock3 className="h-4.5 w-4.5" />}
          iconBg="bg-blue-50"
          iconColor="text-primary"
          title="Duration & Pricing"
          subtitle="How long it takes and what it costs"
        />
        <div className="space-y-6 p-7">
          <Field label="Duration" hint="minutes">
            <div className="relative w-40">
              <NoScrollNumberInput
                name="durationMinutes"
                min={5}
                defaultValue={service?.durationMinutes || 60}
                className="h-10 rounded-xl border-border/40 bg-muted/20 pr-14 text-sm focus:bg-background"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/60">
                mins
              </span>
            </div>
          </Field>

          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
              Pricing model
            </p>
            <PricingToggle value={pricingModel} onChange={setPricingModel} />
          </div>

          {pricingModel === "FIXED" ? (
            <Field label="Base price ($)">
              <div className="relative w-48">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
                <NoScrollNumberInput
                  name="basePrice"
                  min={0}
                  step="0.01"
                  defaultValue={service?.basePrice || 0}
                  className="h-10 rounded-xl border-border/40 bg-muted/20 pl-8 text-sm focus:bg-background"
                />
              </div>
            </Field>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                    Weight tiers
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground/50">
                    Price varies by pet weight range
                  </p>
                </div>
              </div>

              {weightTiers.length === 0 ? (
                <EmptyState message="No weight tiers yet — add one below" />
              ) : (
                <div className="space-y-2.5">
                  {weightTiers.map((tier, index) => (
                    <WeightTierRow
                      key={tier.id}
                      tier={tier}
                      index={index}
                      onChange={(key, value) => updateWeightTier(index, key, value)}
                      onRemove={() => removeWeightTier(index)}
                    />
                  ))}
                </div>
              )}

              <AddRowButton onClick={addWeightTier} label="Add weight tier" />
            </div>
          )}
        </div>
      </Section>

      {/* ── Add-ons ───────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          icon={<Sparkles className="h-4.5 w-4.5" />}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          title="Add-ons"
          subtitle="Optional extras customers can choose"
        />
        <div className="space-y-3 p-7">
          {addOns.length === 0 ? (
            <EmptyState message="No add-ons yet — add one below" />
          ) : (
            <div className="space-y-2.5">
              {addOns.map((addon, index) => (
                <AddOnRow
                  key={addon.id}
                  addon={addon}
                  index={index}
                  onChange={(key, value) => updateAddOn(index, key, value)}
                  onRemove={() => removeAddOn(index)}
                />
              ))}
            </div>
          )}

          <AddRowButton onClick={addAddOn} label="Add add-on" />
        </div>
      </Section>

      {/* ── Assigned Staff ────────────────────────────────────────────────── */}
      {service?.id && (
        <Section>
          <SectionHeader
            icon={<Users className="h-4.5 w-4.5" />}
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
            title="Assigned Staff"
            subtitle="Staff members who perform this service"
          />
          <div className="p-7">
            {assignedStaff.length === 0 ? (
              <EmptyState message="No staff assigned to this service yet" />
            ) : (
              <div className="flex flex-wrap gap-2">
                {assignedStaff.map((member, i) => {
                  const label = member.name || member.email || member.id;
                  const initials = label
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <span
                      key={member.id}
                      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/40 py-1 pl-1 pr-3 text-xs text-muted-foreground transition-colors hover:border-border/70"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[10px] font-semibold text-sky-700">
                        {initials}
                      </span>
                      {label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ── Status & Actions ──────────────────────────────────────────────── */}
      <Section>
        <div className="flex flex-col gap-4 p-7">
          <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
            <div className="flex items-start gap-3">
              <input
                id="active-service"
                name="active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />

              <div className="space-y-1">
                <Label
                  htmlFor="active-service"
                  className="text-sm font-medium text-foreground cursor-pointer"
                >
                  Active service
                </Label>
                <p className="text-sm text-muted-foreground">
                  Customers can book this service when enabled.
                </p>
                <p className="text-xs text-muted-foreground">
                  Current status: {isActive ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {service?.id && (
              <Button
                type="button"
                variant="outline"
                onClick={deleteCurrent}
                disabled={pending}
                className="w-full rounded-xl sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl sm:w-auto"
            >
              {pending ? "Saving..." : service?.id ? "Save changes" : "Create service"}
            </Button>
          </div>
        </div>
      </Section>
    </form>
  );
}