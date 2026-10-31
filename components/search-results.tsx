"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Coffee,
  MapPin,
  SearchX,
  SlidersHorizontal,
  Sparkles,
  Star,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { SearchBar, type SearchValues } from "@/components/search-bar";
import { FavoriteButton } from "@/components/hotel-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HotelFilters } from "@/components/hotel-filters";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hotels, hotelUrl, money, type Hotel } from "@/lib/demo-data";
import { nightWord, searchQuery, stayDetails } from "@/lib/search-params";
import { cn } from "@/lib/utils";

const sorts = [
  { value: "recommended", label: "Сначала рекомендуемые" },
  { value: "price", label: "Сначала дешевле" },
  { value: "rating", label: "По оценке гостей" },
];

export function SearchResults({ initial }: { initial: SearchValues }) {
  const destination = initial.destination || "Бали";
  const [maxPrice, setMaxPrice] = useState(30000);
  const [breakfast, setBreakfast] = useState(false);
  const [cancellation, setCancellation] = useState(false);
  const [pool, setPool] = useState(false);
  const [stars, setStars] = useState<number[]>([]);
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const stay = stayDetails(initial);
  const params = searchQuery({ ...initial, destination });
  const baseHotels = useMemo(
    () =>
      hotels.filter(
        (h) =>
          destination === "Все направления" ||
          h.destination.toLowerCase().includes(destination.toLowerCase()) ||
          h.name.toLowerCase().includes(destination.toLowerCase()),
      ),
    [destination],
  );
  const results = useMemo(
    () =>
      baseHotels
        .filter(
          (h) =>
            h.price <= maxPrice &&
            (!breakfast || h.breakfast) &&
            (!cancellation || h.cancellation) &&
            (!pool || h.amenities.includes("Бассейн")) &&
            (!stars.length || stars.includes(h.stars)),
        )
        .sort((a, b) =>
          sort === "price"
            ? a.price - b.price
            : sort === "rating"
              ? Number(b.score.replace(",", ".")) -
                Number(a.score.replace(",", "."))
              : Number(Boolean(b.tag)) - Number(Boolean(a.tag)),
        ),
    [baseHotels, maxPrice, breakfast, cancellation, pool, stars, sort],
  );
  const filterCount =
    Number(breakfast) +
    Number(cancellation) +
    Number(pool) +
    stars.length +
    Number(maxPrice < 30000);
  const reset = () => {
    setMaxPrice(30000);
    setBreakfast(false);
    setCancellation(false);
    setPool(false);
    setStars([]);
  };
  const toggleStar = (star: number, checked: boolean) =>
    setStars((current) =>
      checked ? [...current, star] : current.filter((s) => s !== star),
    );
  const filterProps = {
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
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="border-y border-border bg-secondary/40 py-5">
          <div className="page-container">
            <SearchBar initial={initial} compact />
          </div>
        </div>
        <div className="page-container pb-12 pt-6">
          <nav
            aria-label="Хлебные крошки"
            className="mb-7 flex items-center gap-2 text-[11px] text-muted-foreground"
          >
            <Link href="/">Главная</Link>
            <ChevronRight className="size-3" />
            <span aria-current="page">Отели · {destination}</span>
          </nav>
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[1.6px] text-muted-foreground">
                <Sparkles className="size-3" />
                ПУТЕШЕСТВИЕ УЖЕ БЛИЗКО
              </div>
              <h1 className="section-title">
                {destination === "Все направления"
                  ? "Мир полон хороших мест"
                  : `${destination}: найдите своё место`}
              </h1>
              <p className="section-subtitle">
                {baseHotels.length} вариантов в демонстрационной подборке ·{" "}
                {stay.nights} {nightWord(stay.nights)} ·{" "}
                {stay.adults + stay.children} гостя
              </p>
            </div>
            <Link href="/#destinations" className="text-link">
              <ArrowLeft />
              Другие направления
            </Link>
          </div>
          <div className="results-layout">
            <aside className="results-sidebar" aria-label="Фильтры отелей">
              <div className="sticky top-6">
                <HotelFilters prefix="desktop" {...filterProps} />
              </div>
            </aside>
            <section aria-label="Результаты поиска" className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground" aria-live="polite">
                  Найдено:{" "}
                  <span className="font-semibold text-foreground">
                    {results.length}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-9 sm:hidden"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    aria-expanded={filtersOpen}
                  >
                    <SlidersHorizontal data-icon="inline-start" />
                    Фильтры{filterCount > 0 && ` (${filterCount})`}
                  </Button>
                  <Select
                    value={sort}
                    onValueChange={(value) => value && setSort(value)}
                    items={sorts}
                  >
                    <SelectTrigger
                      aria-label="Сортировка отелей"
                      className="h-9"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sorts.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {filterCount > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {[
                    [breakfast, "Завтрак", () => setBreakfast(false)],
                    [
                      cancellation,
                      "Бесплатная отмена",
                      () => setCancellation(false),
                    ],
                    [pool, "Бассейн", () => setPool(false)],
                    [
                      maxPrice < 30000,
                      `До ${money(maxPrice)} ₽`,
                      () => setMaxPrice(30000),
                    ],
                  ].map(([active, label, remove], i) =>
                    active ? (
                      <button
                        key={i}
                        className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[10px]"
                        onClick={remove as () => void}
                      >
                        {label as string}
                        <X className="size-3" />
                      </button>
                    ) : null,
                  )}
                </div>
              )}
              <div className="flex flex-col gap-5">
                {results.map((hotel) => (
                  <ResultCard
                    hotel={hotel}
                    key={hotel.id}
                    params={params}
                    nights={stay.nights}
                    rooms={stay.rooms}
                  />
                ))}
              </div>
              {!results.length && (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border px-6 py-20 text-center">
                  <SearchX className="size-10 stroke-1 text-muted-foreground" />
                  <h2 className="text-xl font-medium">
                    Пока не нашли такое место
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {baseHotels.length
                      ? "Попробуйте увеличить бюджет или убрать несколько фильтров."
                      : "В прототипе есть отели на Бали, в Сочи, Стамбуле, Дубае, Санкт-Петербурге и Архызе."}
                  </p>
                  {baseHotels.length ? (
                    <Button className="mt-2 h-10 px-5" onClick={reset}>
                      Сбросить фильтры
                    </Button>
                  ) : (
                    <Link
                      href="/search?destination=Все%20направления"
                      className={buttonVariants({ size: "lg" })}
                    >
                      Посмотреть все направления
                    </Link>
                  )}
                </div>
              )}
              <p className="mt-7 text-center text-[10px] leading-relaxed text-muted-foreground">
                Цены за номер, включая демонстрационные налоги и сборы.
                <br />
                Это дизайн-прототип. Доступность номеров не проверяется.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
      <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:max-w-md">
          <DialogHeader className="px-1 pt-1">
            <DialogTitle>Настройте свой отдых</DialogTitle>
            <DialogDescription>
              Оставьте только то, что важно для вас.
            </DialogDescription>
          </DialogHeader>
          <HotelFilters prefix="mobile" {...filterProps} />
          <Button className="h-11 w-full" onClick={() => setFiltersOpen(false)}>
            Показать варианты: {results.length}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ResultCard({
  hotel,
  params,
  nights,
  rooms,
}: {
  hotel: Hotel;
  params: string;
  nights: number;
  rooms: number;
}) {
  return (
    <article className="result-card">
      <div className="result-photo">
        <Link
          href={hotelUrl(hotel, params)}
          aria-label={`Открыть ${hotel.name}`}
        >
          <img src={hotel.image} alt={hotel.name} loading="lazy" />
        </Link>
        <FavoriteButton hotel={hotel} />
        {hotel.tag && (
          <Badge
            variant="secondary"
            className="absolute bottom-3 left-3 h-6 rounded-md"
          >
            {hotel.tag}
          </Badge>
        )}
      </div>
      <div className="flex min-w-0 flex-col p-5">
        <div
          className="mb-1.5 flex items-center gap-0.5"
          aria-label={`${hotel.stars} звёзд`}
        >
          {Array.from({ length: hotel.stars }, (_, i) => (
            <Star key={i} className="size-2.5 fill-current text-forest" />
          ))}
          <span className="ml-2 text-[10px] text-muted-foreground">
            {hotel.category}
          </span>
        </div>
        <h2 className="hotel-name">
          <Link href={hotelUrl(hotel, params)}>{hotel.name}</Link>
        </h2>
        <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          {hotel.destination} · {hotel.area}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="rating-score">{hotel.score}</span>
          <span className="text-[10px] font-medium">Превосходно</span>
          <span className="text-[10px] text-muted-foreground">
            {money(hotel.reviews)} отзывов
          </span>
        </div>
        <div className="my-4 flex flex-wrap gap-x-3 gap-y-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Wifi className="size-3" />
            Wi-Fi
          </span>
          {hotel.amenities.includes("Бассейн") && (
            <span className="flex items-center gap-1">
              <Waves className="size-3" />
              Бассейн
            </span>
          )}
          {hotel.breakfast && (
            <span className="flex items-center gap-1">
              <Coffee className="size-3" />
              Завтрак
            </span>
          )}
        </div>
        {hotel.cancellation && (
          <p className="mt-auto flex items-center gap-1 text-[10px] text-forest">
            <Check className="size-3" />
            Бесплатная отмена
          </p>
        )}
      </div>
      <div className="result-price">
        <div className="text-right">
          {hotel.oldPrice && (
            <p className="mb-1 text-[10px] text-muted-foreground line-through">
              {money(hotel.oldPrice)} ₽
            </p>
          )}
          <p className="whitespace-nowrap text-xl font-semibold tracking-tight">
            {money(hotel.price)} ₽
            <span className="ml-1 text-[10px] font-normal text-muted-foreground">
              / ночь
            </span>
          </p>
          <p className="mt-1.5 text-[10px] text-muted-foreground">
            {money(hotel.price * nights * rooms)} ₽ за {nights}{" "}
            {nightWord(nights)}
            {rooms > 1 && ` · ${rooms} номера`}
          </p>
          <p className="mt-1 text-[9px] text-muted-foreground">
            Налоги и сборы включены
          </p>
        </div>
        <Link
          href={hotelUrl(hotel, params)}
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-3 h-10 w-full gap-2 px-4 sm:w-auto lg:w-full",
          )}
        >
          Выбрать номер
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
