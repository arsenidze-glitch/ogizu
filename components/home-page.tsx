"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Mountain,
  Palmtree,
  SearchCheck,
  Sparkles,
  Building2,
  Sun,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { SearchBar } from "@/components/search-bar";
import { HotelCard } from "@/components/hotel-card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  destinations,
  featuredHotels,
  money,
  searchUrl,
} from "@/lib/demo-data";

const moods = [
  { value: "all", label: "Сейчас в тренде", icon: Sparkles },
  { value: "sea", label: "К морю", icon: Palmtree },
  { value: "city", label: "В большой город", icon: Building2 },
  { value: "nature", label: "Ближе к природе", icon: Mountain },
];

const stories = [
  {
    title: "Бали без спешки: остров, который умеет замедлять",
    category: "МЕСТО ВДОХНОВЕНИЯ",
    image: "/images/bali-resort.png",
    destination: "Бали",
    text: "Начните утро с прогулки по рисовым террасам Убуда. Оставьте день для маленьких галерей, местного кофе и бассейна с видом на джунгли. А к вечеру отправляйтесь к океану: на Бали закаты — отдельный вид искусства.",
  },
  {
    title: "Стамбул: между двумя берегами и тысячей историй",
    category: "ГОРОД В ДЕТАЛЯХ",
    image: destinations[1].image,
    destination: "Стамбул",
    text: "Переезжайте Босфор на пароме, пробуйте симит на набережной и сворачивайте с шумных проспектов в маленькие переулки. Лучший способ познакомиться со Стамбулом — позволить городу самому предложить маршрут.",
  },
  {
    title: "Маленький отпуск: когда на море всего три дня",
    category: "ИДЕЯ ДЛЯ ВЫХОДНЫХ",
    image: destinations[2].image,
    destination: "Сочи",
    text: "Для перезагрузки не всегда нужна большая поездка. Забронируйте отель у моря, оставьте ноутбук дома и разрешите себе ничего не планировать. Завтрак на террасе, прогулка по набережной и морской воздух сделают остальное.",
  },
];

export function HomePage() {
  const [mood, setMood] = useState("all");
  const [offset, setOffset] = useState(0);
  const [story, setStory] = useState<number | null>(null);
  const visibleDestinations =
    mood === "all"
      ? destinations.slice(0, 5)
      : destinations.filter((d) => d.moods.includes(mood));
  const cards = [
    ...featuredHotels.slice(offset),
    ...featuredHotels.slice(0, offset),
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-shell" aria-labelledby="hero-title">
          <img
            src="/images/coast-hero.png"
            alt="Панорамный бассейн и солнечное побережье Средиземного моря"
            className="hero-image"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-eyebrow">МИР БОЛЬШОЙ. ВАШЕ МЕСТО НАЙДЁТСЯ.</p>
            <h1 id="hero-title" className="hero-title">
              Хорошее место.
              <br />
              Для ваших историй.
            </h1>
            <p className="hero-subtitle">
              Находите отели, в которые хочется вернуться.
              <br className="sm:hidden" /> По ценам, с которыми хочется уехать.
            </p>
            <div className="hero-search">
              <SearchBar />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-white/90">
              <BadgeCheck className="size-3.5" />
              Без скрытых платежей. С заботой о ваших планах.
            </p>
          </div>
          <div className="hero-location">
            <MapPin className="size-3.5" />
            Амальфитанское побережье, Италия
          </div>
          <span className="hero-note">
            А где начнётся ваша следующая история? ↗
          </span>
        </section>

        <section
          className="page-container grid grid-cols-1 gap-5 border-b border-border py-7 sm:grid-cols-3 sm:gap-8 sm:py-8"
          aria-label="Почему место"
        >
          {[
            {
              icon: SearchCheck,
              title: "Меньше поиска, больше выбора",
              text: "Отели и апартаменты в одном месте",
            },
            {
              icon: BadgeCheck,
              title: "Всё честно с первого взгляда",
              text: "Понятные цены и никаких сюрпризов",
            },
            {
              icon: Compass,
              title: "Не просто отель — ваше место",
              text: "Отбираем то, что запомнится",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              className="flex items-center gap-3.5 sm:justify-center"
              key={title}
            >
              <Icon className="size-7 shrink-0 stroke-[1.35] text-forest" />
              <div>
                <h2 className="text-[12px] font-medium">{title}</h2>
                <p className="mt-1.5 text-[10px] text-muted-foreground">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section
          id="destinations"
          className="page-container pb-14 pt-12 sm:pb-16 sm:pt-14"
        >
          <div className="section-topline">
            <div>
              <h2 className="section-title">Куда хочется прямо сейчас?</h2>
              <p className="section-subtitle">
                За солнцем, новыми вкусами или просто сменить картинку.
              </p>
            </div>
            <Link
              href="/search?destination=Все%20направления"
              className="text-link"
              aria-label="Все направления"
            >
              Все направления
              <ArrowUpRight />
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto pb-1">
            <ToggleGroup
              variant="pill"
              size="pill"
              value={[mood]}
              onValueChange={(value) => {
                if (value.length) setMood(value[0]);
              }}
              className="mood-group"
              aria-label="Настроение путешествия"
            >
              {moods.map(({ value, label, icon: Icon }) => (
                <ToggleGroupItem
                  value={value}
                  key={value}
                  className="mood-pill"
                >
                  <Icon data-icon="inline-start" />
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="destination-grid">
            {visibleDestinations.map((d) => (
              <Link
                href={searchUrl(d.name)}
                key={d.name}
                className="destination-card"
              >
                <img
                  src={d.image}
                  alt={`${d.name}, ${d.country}`}
                  loading="lazy"
                />
                <ArrowUpRight
                  className="destination-arrow"
                  aria-hidden="true"
                />
                <div className="destination-copy">
                  <h3>{d.name}</h3>
                  <p>
                    {d.country}
                    <span className="mx-1.5 opacity-50">·</span>от{" "}
                    {money(d.price)} ₽
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="border-y border-border bg-secondary/35 py-12 sm:py-14"
          id="handpicked"
        >
          <div className="page-container">
            <div className="section-topline">
              <div>
                <div className="mb-3 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[1.7px] text-forest">
                  <Sparkles className="size-3.5" />
                  ОТОБРАНО С ЗАБОТОЙ
                </div>
                <h2 className="section-title">Места, в которые влюбляются</h2>
                <p className="section-subtitle">
                  Тот самый вид. Та самая атмосфера. Тот самый отель.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Предыдущие отели"
                  onClick={() => setOffset((offset + 3) % 4)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Следующие отели"
                  onClick={() => setOffset((offset + 1) % 4)}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
            <div className="hotel-grid mt-7">
              {cards.map((h) => (
                <HotelCard hotel={h} key={h.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="page-container py-14 sm:py-18">
          <div className="relative flex min-h-64 flex-col items-start justify-center gap-5 overflow-hidden rounded-2xl bg-forest px-7 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="relative max-w-lg">
              <Badge className="mb-4" variant="default">
                <Sun data-icon="inline-start" />
                Время для маленького побега
              </Badge>
              <h2 className="text-3xl font-medium leading-tight tracking-[-1px] sm:text-[38px]">
                Иногда нужно просто
                <br />
                сменить «где».
              </h2>
              <p className="mt-4 max-w-sm text-xs leading-6 text-white/70">
                На шум волн. На завтрак без спешки. На город, в котором вы ещё
                не были. Найдите своё новое «здесь».
              </p>
              <Link
                href="/search?destination=Все%20направления"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-primary"
              >
                Найти место для перезагрузки
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative hidden w-[350px] shrink-0 md:block">
              <img
                src="/images/bali-room.png"
                alt="Уютный номер с видом на тропический сад"
                className="h-52 w-full -rotate-3 rounded-xl object-cover"
                loading="lazy"
              />
              <span className="absolute -bottom-3 -left-5 rotate-[-7deg] rounded-sm bg-primary px-5 py-3 text-xs text-primary-foreground shadow-sm">
                Планы на выходные: жить.
              </span>
            </div>
          </div>
        </section>

        <section className="page-container pb-12" id="journal">
          <div className="section-topline">
            <div>
              <h2 className="section-title">Путешествие начинается с идеи</h2>
              <p className="section-subtitle">
                Истории и маршруты, после которых хочется собрать чемодан.
              </p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Журнал место
            </span>
          </div>
          <div className="mt-7 grid gap-7 sm:grid-cols-3">
            {stories.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setStory(i)}
                className="group text-left"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={s.image}
                    alt=""
                    className="aspect-[1.65] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mb-2 mt-4 text-[9px] tracking-widest text-muted-foreground">
                  {s.category}
                </p>
                <h3 className="max-w-sm text-lg font-medium leading-snug tracking-[-.4px]">
                  {s.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                  Читать историю
                  <ArrowUpRight className="size-3.5" />
                </p>
              </button>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <Dialog
        open={story !== null}
        onOpenChange={(open) => {
          if (!open) setStory(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-xl">
          {story !== null && (
            <>
              <img
                src={stories[story].image}
                alt={stories[story].destination}
                className="mb-2 aspect-video w-full rounded-xl object-cover"
              />
              <DialogHeader>
                <DialogTitle>{stories[story].title}</DialogTitle>
                <DialogDescription>{stories[story].category}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-7 text-muted-foreground">
                {stories[story].text}
              </p>
              <Link
                href={searchUrl(stories[story].destination)}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium"
              >
                Найти отель: {stories[story].destination}
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
