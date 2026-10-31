import type { Metadata } from "next";
import { SearchResults } from "@/components/search-results";
import { normalizeSearchParams } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Найдите своё место — поиск отелей | место",
  description:
    "Подберите отель по настроению, бюджету и вашим планам. Удобные фильтры и сравнение вариантов.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = normalizeSearchParams(await searchParams);
  return <SearchResults key={JSON.stringify(values)} initial={values} />;
}
