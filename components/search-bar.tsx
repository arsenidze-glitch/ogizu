"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Minus,
  Plus,
  Search,
  Users,
  ArrowRight,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverTitle,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { destinations } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export type SearchValues = {
  destination?: string;
  checkin?: string;
  checkout?: string;
  adults?: string;
  children?: string;
  rooms?: string;
};

function validDate(value: string | undefined, fallback: Date) {
  if (!value) return fallback;
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

export function SearchBar({
  initial = {},
  compact = false,
}: {
  initial?: SearchValues;
  compact?: boolean;
}) {
  const router = useRouter();
  const id = useId();
  const [destination, setDestination] = useState(initial.destination || "");
  const [query, setQuery] = useState("");
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [dates, setDates] = useState<DateRange | undefined>({
    from: validDate(initial.checkin, new Date(2026, 10, 18)),
    to: validDate(initial.checkout, new Date(2026, 10, 25)),
  });
  const [adults, setAdults] = useState(
    Math.min(16, Math.max(1, Number(initial.adults) || 2)),
  );
  const [children, setChildren] = useState(
    Math.min(8, Math.max(0, Number(initial.children) || 0)),
  );
  const [rooms, setRooms] = useState(
    Math.min(8, Math.max(1, Number(initial.rooms) || 1)),
  );
  const filtered = destinations.filter((d) =>
    `${d.name} ${d.country}`.toLowerCase().includes(query.toLowerCase()),
  );
  const dateLabel = (date?: Date) =>
    date ? format(date, "d MMM", { locale: enUS }) : "Choose a date";
  const chooseDestination = (name: string) => {
    setDestination(name);
    setDestinationOpen(false);
    setQuery("");
  };

  function search(event: React.FormEvent) {
    event.preventDefault();
    if (!dates?.from || !dates?.to) {
      setDateOpen(true);
      return;
    }
    const params = new URLSearchParams({
      destination: destination || "Bali",
      checkin: format(dates.from, "yyyy-MM-dd"),
      checkout: format(dates.to, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={search}
      className={cn(
        "search-form",
        compact && "border border-border shadow-none",
      )}
      aria-label="Hotel search"
    >
      <FieldGroup className="search-fields">
        <Field className="search-field destination-field">
          <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
            <PopoverTrigger
              className="search-trigger"
              aria-label={`Destination: ${destination || "choose a place"}`}
            >
              <MapPin aria-hidden="true" />
              <span className="min-w-0">
                <span className="search-label">Where to?</span>
                <span className="search-value truncate">
                  {destination || "City, region, or hotel"}
                </span>
              </span>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[min(350px,calc(100vw-32px))] p-4"
              sideOffset={16}
            >
              <PopoverTitle>Find your kind of somewhere</PopoverTitle>
              <label htmlFor={`${id}-destination`} className="sr-only">
                City or region
              </label>
              <input
                id={`${id}-destination`}
                className="mt-2 w-full rounded-lg border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="City or region"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return;
                  if (e.key === "Enter") {
                    e.preventDefault();
                    chooseDestination(filtered[0]?.name || query);
                  }
                }}
              />
              <p className="mb-1 mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                {query ? "Destinations" : "Trending now"}
              </p>
              {filtered.map((d) => (
                <button
                  type="button"
                  key={d.name}
                  onClick={() => chooseDestination(d.name)}
                  className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                    <MapPin className="size-4" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <strong className="text-sm font-medium">{d.name}</strong>
                    <span className="text-xs text-muted-foreground">
                      {d.country}
                    </span>
                  </span>
                  <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                </button>
              ))}
              {query && !filtered.length && (
                <button
                  type="button"
                  className="rounded-lg bg-muted p-3 text-left text-sm"
                  onClick={() => chooseDestination(query)}
                >
                  Search for &ldquo;{query}&rdquo;
                </button>
              )}
            </PopoverContent>
          </Popover>
        </Field>
        <Field className="search-field dates-field">
          <Popover
            open={dateOpen}
            onOpenChange={(open) => {
              setDateOpen(open);
              setSelectingEnd(false);
            }}
          >
            <PopoverTrigger
              className="search-trigger"
              aria-label="Choose travel dates"
            >
              <CalendarDays aria-hidden="true" />
              <span className="date-columns">
                <span>
                  <span className="search-label">Check-in</span>
                  <span className="search-value">
                    {dateLabel(dates?.from)}
                    <span className="ml-1 text-muted-foreground">
                      {dates?.from
                        ? format(dates.from, "EEE", { locale: enUS })
                        : ""}
                    </span>
                  </span>
                </span>
                <span className="date-divider" />
                <span>
                  <span className="search-label">Check-out</span>
                  <span className="search-value">
                    {dateLabel(dates?.to)}
                    <span className="ml-1 text-muted-foreground">
                      {dates?.to
                        ? format(dates.to, "EEE", { locale: enUS })
                        : ""}
                    </span>
                  </span>
                </span>
              </span>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto max-w-[calc(100vw-20px)] p-3"
              sideOffset={16}
            >
              <PopoverTitle className="px-2 pt-1">
                When shall we go?
              </PopoverTitle>
              <Calendar
                mode="range"
                locale={enUS}
                selected={dates}
                onDayClick={(day, modifiers) => {
                  if (modifiers.disabled) return;
                  if (!selectingEnd || !dates?.from || day <= dates.from) {
                    setDates({ from: day, to: undefined });
                    setSelectingEnd(true);
                  } else {
                    setDates({ from: dates.from, to: day });
                    setSelectingEnd(false);
                  }
                }}
                defaultMonth={dates?.from}
                numberOfMonths={1}
                min={1}
                disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                className="[--cell-size:2.5rem]"
              />
              <Button
                type="button"
                className="h-10"
                disabled={!dates?.from || !dates?.to}
                onClick={() => setDateOpen(false)}
              >
                Done
              </Button>
            </PopoverContent>
          </Popover>
        </Field>
        <Field className="search-field guest-field">
          <Popover open={guestOpen} onOpenChange={setGuestOpen}>
            <PopoverTrigger
              className="search-trigger"
              aria-label="Number of guests and rooms"
            >
              <Users aria-hidden="true" />
              <span className="flex-1">
                <span className="search-label">Guests and rooms</span>
                <span className="search-value">
                  {adults + children}{" "}
                  {adults + children === 1 ? "guest" : "guests"} · {rooms}{" "}
                  {rooms === 1 ? "room" : "rooms"}
                </span>
              </span>
              <ChevronDown className="!size-3" aria-hidden="true" />
            </PopoverTrigger>
            <PopoverContent
              className="w-[300px] p-5"
              align="end"
              sideOffset={16}
            >
              <PopoverTitle>Who is coming along?</PopoverTitle>
              <div className="my-3 flex flex-col gap-5">
                <GuestCounter
                  label="Adults"
                  note="Ages 18 and over"
                  value={adults}
                  onChange={setAdults}
                  min={1}
                  max={16}
                />
                <GuestCounter
                  label="Children"
                  note="Ages 0–17"
                  value={children}
                  onChange={setChildren}
                  min={0}
                  max={8}
                />
                <GuestCounter
                  label="Rooms"
                  note="Space to feel at home"
                  value={rooms}
                  onChange={setRooms}
                  min={1}
                  max={8}
                />
              </div>
              <Button
                type="button"
                className="h-10 w-full"
                onClick={() => setGuestOpen(false)}
              >
                Done
              </Button>
            </PopoverContent>
          </Popover>
        </Field>
        <Button type="submit" className="search-submit">
          <Search data-icon="inline-start" />
          Find a stay
        </Button>
      </FieldGroup>
    </form>
  );
}

function GuestCounter({
  label,
  note,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  note: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{note}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => onChange(value - 1)}
        >
          <Minus />
        </Button>
        <span className="w-4 text-center text-sm" aria-live="polite">
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => onChange(value + 1)}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
