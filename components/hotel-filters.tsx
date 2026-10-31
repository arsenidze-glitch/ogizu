"use client";

import { Sparkles, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { money } from "@/lib/demo-data";

export type HotelFilterProps = {
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  breakfast: boolean;
  setBreakfast: (value: boolean) => void;
  cancellation: boolean;
  setCancellation: (value: boolean) => void;
  pool: boolean;
  setPool: (value: boolean) => void;
  stars: number[];
  toggleStar: (star: number, checked: boolean) => void;
  filterCount: number;
  reset: () => void;
};

export function HotelFilters({
  prefix,
  maxPrice,
  setMaxPrice,
  breakfast,
  setBreakfast,
  cancellation,
  setCancellation,
  pool,
  setPool,
  stars,
  toggleStar,
  filterCount,
  reset,
}: HotelFilterProps & { prefix: string }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Your kind of stay</h2>
        {filterCount > 0 && (
          <button
            onClick={reset}
            className="text-[10px] text-muted-foreground underline underline-offset-4"
          >
            Reset
          </button>
        )}
      </div>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${prefix}-budget`}>Nightly budget</FieldLabel>
          <p className="mb-4 text-[11px] text-muted-foreground">Per room</p>
          <Slider
            id={`${prefix}-budget`}
            aria-label="Maximum nightly price"
            value={[maxPrice]}
            min={3000}
            max={30000}
            step={500}
            onValueChange={(v) => setMaxPrice(Array.isArray(v) ? v[0] : v)}
          />
          <div className="mt-3 flex justify-between text-[11px]">
            <span className="text-muted-foreground">From 3,000 ₽</span>
            <span>To {money(maxPrice)} ₽</span>
          </div>
        </Field>
        <Separator />
        <FieldSet>
          <FieldLegend>The little essentials</FieldLegend>
          <FieldGroup className="gap-4">
            <FilterCheck
              id={`${prefix}-cancel`}
              checked={cancellation}
              onChange={setCancellation}
            >
              Free cancellation
            </FilterCheck>
            <FilterCheck
              id={`${prefix}-breakfast`}
              checked={breakfast}
              onChange={setBreakfast}
            >
              Breakfast included
            </FilterCheck>
            <FilterCheck
              id={`${prefix}-pool`}
              checked={pool}
              onChange={setPool}
            >
              Pool
            </FilterCheck>
          </FieldGroup>
        </FieldSet>
        <Separator />
        <FieldSet>
          <FieldLegend>Star rating</FieldLegend>
          <FieldGroup className="gap-4">
            {[5, 4].map((s) => (
              <FilterCheck
                key={s}
                id={`${prefix}-stars-${s}`}
                checked={stars.includes(s)}
                onChange={(checked) => toggleStar(s, checked)}
              >
                <span className="flex items-center gap-1">
                  {s}
                  <Star className="size-3 fill-current" />
                  <span className="ml-1 text-muted-foreground">
                    {s === 5 ? "A little luxury" : "Comfort and style"}
                  </span>
                </span>
              </FilterCheck>
            ))}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <div className="rounded-xl bg-secondary p-4">
        <Sparkles className="mb-2 size-5 stroke-[1.4]" />
        <h3 className="text-xs font-medium">Good places are worth keeping.</h3>
        <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
          Take your time. Save the stays you love and compare them when you are
          ready.
        </p>
      </div>
    </div>
  );
}

function FilterCheck({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Field orientation="horizontal" className="gap-3">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <FieldLabel htmlFor={id} className="filter-label">
        {children}
      </FieldLabel>
    </Field>
  );
}
