import type { Metadata } from "next";
import { SearchResults } from "@/components/search-results";
import { normalizeSearchParams } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Find your kind of stay — Hotel search | Ogizu",
  description:
    "Discover hotels to match your mood, budget, and plans. Filter your favorites and compare places with Ogizu.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = normalizeSearchParams(await searchParams);
  return <SearchResults key={JSON.stringify(values)} initial={values} />;
}
