import { differenceInCalendarDays, isValid, parseISO } from "date-fns";
import type { SearchValues } from "@/components/search-bar";

export function normalizeSearchParams(
  params: Record<string, string | string[] | undefined>,
): SearchValues {
  return Object.fromEntries(
    [
      "destination",
      "checkin",
      "checkout",
      "adults",
      "children",
      "rooms",
    ].flatMap((key) =>
      typeof params[key] === "string" ? [[key, params[key]]] : [],
    ),
  );
}

export function stayDetails(values: SearchValues) {
  const from = values.checkin
    ? parseISO(values.checkin)
    : new Date(2026, 10, 18);
  const to = values.checkout
    ? parseISO(values.checkout)
    : new Date(2026, 10, 25);
  const nights =
    isValid(from) && isValid(to)
      ? Math.max(1, Math.min(365, differenceInCalendarDays(to, from)))
      : 7;
  const rooms = Math.min(8, Math.max(1, Number(values.rooms) || 1));
  const adults = Math.min(16, Math.max(1, Number(values.adults) || 2));
  const children = Math.min(8, Math.max(0, Number(values.children) || 0));
  return { nights, rooms, adults, children, from, to };
}

export function searchQuery(values: SearchValues) {
  return new URLSearchParams(
    Object.entries(values).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  ).toString();
}

export function nightWord(n: number) {
  return n === 1 ? "night" : "nights";
}
