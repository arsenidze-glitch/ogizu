"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  LifeBuoy,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { hotels, hotelUrl, money } from "@/lib/demo-data";
import { useFavorites } from "@/lib/use-favorites";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="место — на главную">
      место
      <Sparkles className="brand-flower" aria-hidden="true" />
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [modal, setModal] = useState<"favorites" | "help" | "locale" | null>(
    null,
  );
  const { favorites, toggle } = useFavorites();
  const saved = hotels.filter((h) => favorites.includes(h.id));
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:p-3"
      >
        К содержимому
      </a>
      <header className="page-container site-header">
        <Brand />
        <nav className="header-links" aria-label="Главная навигация">
          <Link
            href="/"
            className="header-link active"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Найти отель
          </Link>
          <Link href="/#destinations" className="header-link">
            Куда поехать
          </Link>
          <Link href="/#journal" className="header-link">
            Вдохновение
            <ArrowUpRight className="ml-1.5 size-3" />
          </Link>
        </nav>
        <div className="header-actions">
          <button
            className="header-currency flex items-center gap-1.5"
            onClick={() => setModal("locale")}
            aria-label="Язык и валюта"
          >
            RU <span className="mx-1 text-border">/</span> ₽{" "}
            <ChevronDown className="ml-1 size-3" />
          </button>
          <button
            className="header-help flex items-center gap-1.5"
            onClick={() => setModal("help")}
          >
            <LifeBuoy className="size-4" />
            Поддержка
          </button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-full px-4"
            onClick={() => setModal("favorites")}
          >
            <Heart data-icon="inline-start" />
            Избранное
            {favorites.length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px]">
                {favorites.length}
              </span>
            )}
          </Button>
        </div>
      </header>
      <Dialog
        open={modal !== null}
        onOpenChange={(open) => {
          if (!open) setModal(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {modal === "favorites"
                ? "Ваша коллекция мест"
                : modal === "locale"
                  ? "Язык и валюта"
                  : "Мы рядом"}
            </DialogTitle>
            <DialogDescription>
              {modal === "favorites"
                ? "Собирайте места, в которых хочется оказаться. В прототипе коллекция хранится до перезагрузки страницы."
                : modal === "locale"
                  ? "Настройки этого дизайн-прототипа."
                  : "Ответы на вопросы о работе портала."}
            </DialogDescription>
          </DialogHeader>
          {modal === "favorites" &&
            (saved.length ? (
              <div className="flex flex-col gap-4">
                {saved.map((h) => (
                  <div className="flex items-center gap-3" key={h.id}>
                    <Link href={hotelUrl(h)} onClick={() => setModal(null)}>
                      <img
                        src={h.image}
                        alt={h.name}
                        className="size-20 rounded-xl object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={hotelUrl(h)}
                        onClick={() => setModal(null)}
                        className="text-sm font-semibold"
                      >
                        {h.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {h.destination}
                      </p>
                      <p className="text-sm">от {money(h.price)} ₽</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggle(h.id)}
                      aria-label={`Убрать ${h.name} из избранного`}
                    >
                      <Heart className="fill-current" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-9 text-center">
                <Heart className="size-10 stroke-1 text-muted-foreground" />
                <p>Здесь будут ваши любимые отели</p>
                <p className="max-w-64 text-xs leading-relaxed text-muted-foreground">
                  Нажмите на сердечко на карточке отеля — и место попадёт в вашу
                  коллекцию.
                </p>
                <Button
                  className="mt-2 h-10 px-5"
                  onClick={() => setModal(null)}
                >
                  Отправиться на поиски
                </Button>
              </div>
            ))}
          {modal === "locale" && (
            <div className="flex flex-col gap-4 py-3">
              <div className="flex items-center justify-between rounded-xl bg-muted p-4">
                <span>Русский</span>
                <Check className="size-4" />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted p-4">
                <span>Российский рубль · ₽</span>
                <Check className="size-4" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Другие языки и валюты можно добавить на следующем этапе.
              </p>
            </div>
          )}
          {modal === "help" && (
            <div className="flex flex-col gap-5 py-3">
              {[
                [
                  "Можно забронировать отель?",
                  "Сейчас это интерактивный дизайн-прототип: можно искать отели, применять фильтры и выбирать номера. Реальное бронирование и оплата не подключены.",
                ],
                [
                  "Откуда берутся цены?",
                  "Каталог, оценки, отзывы и цены демонстрационные. Они показывают, как будет работать сервис, и не являются публичной офертой.",
                ],
                [
                  "Как работает избранное?",
                  "Нажимайте на сердечко на карточке отеля. Подборка доступна во время просмотра и сбросится при перезагрузке.",
                ],
              ].map(([q, a]) => (
                <div key={q}>
                  <h3 className="mb-2 font-medium">{q}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SiteFooter() {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <footer className="page-container pb-8 pt-8">
      <Separator />
      <div className="flex flex-col justify-between gap-7 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-6">
          <Brand />
          <span className="text-[11px] leading-relaxed text-muted-foreground">
            Мир большой.
            <br />
            Ваше место найдётся.
          </span>
        </div>
        <nav className="footer-links" aria-label="Навигация в подвале">
          <button onClick={() => setAboutOpen(true)}>О проекте</button>
          <Link href="/#destinations">Направления</Link>
          <Link href="/#journal">Журнал путешествий</Link>
        </nav>
      </div>
      <div className="flex flex-col justify-between gap-3 text-[10px] leading-relaxed text-muted-foreground sm:flex-row">
        <p>© 2026 место. Сделано для тех, кто любит открывать новое.</p>
        <p>Дизайн-прототип · отели, цены и отзывы демонстрационные</p>
      </div>
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle>Каждому путешествию — своё место</DialogTitle>
            <DialogDescription>
              «место» — концепция современного портала поиска отелей. Здесь
              привычные инструменты бронирования встречаются с вдохновением для
              новых путешествий.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Это интерактивный дизайн-прототип. Все цены, рейтинги, отзывы и
            предложения демонстрационные. Данные для бронирования не собираются.
          </p>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
