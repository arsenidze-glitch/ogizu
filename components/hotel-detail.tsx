"use client";

import Link from "next/link";
import { useState } from "react";
import { format, isValid } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Expand,
  Flower2,
  Grid2X2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Square,
  Star,
  Users,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { SearchBar, type SearchValues } from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Hotel, money } from "@/lib/demo-data";
import { nightWord, searchQuery, stayDetails } from "@/lib/search-params";
import { useFavorites } from "@/lib/use-favorites";
import { cn } from "@/lib/utils";

type Room = {
  name: string;
  size: number;
  price: number;
  image: string;
  detail: string;
};
const amenityIcons: Record<string, typeof Wifi> = {
  Pool: Waves,
  Spa: Flower2,
  "Wi-Fi": Wifi,
  Restaurant: Utensils,
  Beach: Waves,
};

export function HotelDetail({
  hotel,
  initial,
}: {
  hotel: Hotel;
  initial: SearchValues;
}) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [supplier, setSupplier] = useState("Ogizu");
  const { favorites, toggle } = useFavorites();
  const saved = favorites.includes(hotel.id);
  const stay = stayDetails(initial);
  const query = searchQuery({
    ...initial,
    destination: initial.destination || hotel.destination,
  });
  const supplierDelta =
    supplier === "Hotel website" ? 600 : supplier === "Ostrovok" ? 900 : 0;
  const rooms: Room[] = [
    {
      name:
        hotel.destination === "Bali"
          ? "Deluxe with garden view"
          : "Deluxe room",
      size: 38,
      price: hotel.price + supplierDelta,
      image: hotel.gallery[1] || hotel.image,
      detail: "Large double bed · balcony",
    },
    {
      name:
        hotel.destination === "Bali"
          ? "Suite with private terrace"
          : "Panoramic suite",
      size: 56,
      price: hotel.price + 4200 + supplierDelta,
      image: hotel.gallery[3] || hotel.gallery[1] || hotel.image,
      detail: "King-size bed · separate living room",
    },
  ];
  const readableDate = (date: Date) =>
    isValid(date)
      ? format(date, "d MMMM", { locale: enUS })
      : "No dates selected";
  const showRooms = () =>
    document
      .getElementById("rooms")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="border-y border-border bg-secondary/40 py-4">
          <div className="page-container">
            <SearchBar
              compact
              initial={{ ...initial, destination: hotel.destination }}
            />
          </div>
        </div>
        <div className="page-container pt-6">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <ChevronRight className="size-3" />
            <Link href={`/search?${query}`}>Hotels · {hotel.destination}</Link>
            <ChevronRight className="size-3" />
            <span aria-current="page">{hotel.name}</span>
          </nav>
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="flex gap-0.5"
                  aria-label={`${hotel.stars} stars`}
                >
                  {Array.from({ length: hotel.stars }, (_, i) => (
                    <Star key={i} className="size-3 fill-current text-forest" />
                  ))}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {hotel.category}
                </span>
                {hotel.tag && (
                  <Badge
                    variant="secondary"
                    className="ml-2 hidden sm:inline-flex"
                  >
                    <Sparkles data-icon="inline-start" />
                    {hotel.tag}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-medium tracking-[-1px] sm:text-4xl">
                {hotel.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" />
                {hotel.destination} · {hotel.area}
              </p>
            </div>
            <Button
              variant="outline"
              className="h-10 rounded-full px-4"
              onClick={() => toggle(hotel.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved stays" : "Save this stay"}
            >
              <Heart
                data-icon="inline-start"
                className={cn(saved && "fill-current")}
              />
              <span className="hidden sm:inline">
                {saved ? "Saved" : "Save this stay"}
              </span>
            </Button>
          </div>
          <div className="detail-gallery">
            {[...hotel.gallery, ...hotel.gallery]
              .slice(0, 5)
              .map((image, i) => (
                <button
                  onClick={() => setGalleryIndex(i % hotel.gallery.length)}
                  key={i}
                  aria-label={`Open photo ${i + 1} of ${hotel.name}`}
                >
                  <img
                    src={image}
                    alt={
                      i === 0
                        ? `${hotel.name}: hotel grounds`
                        : i === 1
                          ? "Room interior"
                          : `Hotel photo ${i + 1}`
                    }
                    loading={i > 2 ? "lazy" : "eager"}
                  />
                  {i === 4 && (
                    <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-card px-4 py-2.5 text-[11px] text-foreground shadow">
                      <Grid2X2 className="size-3.5" />
                      All photos
                    </span>
                  )}
                  {i === 0 && (
                    <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-foreground/30 px-3 py-2 text-[10px] text-white backdrop-blur-sm">
                      <Expand className="size-3" />
                      Take a closer look
                    </span>
                  )}
                </button>
              ))}
          </div>
          <nav
            aria-label="Hotel sections"
            className="mt-3 flex gap-7 overflow-x-auto border-b border-border text-xs sm:gap-9"
          >
            {[
              ["about", "About the hotel"],
              ["rooms", "Rooms and rates"],
              ["reviews", "Guest reviews"],
              ["conditions", "Good to know"],
            ].map(([id, label], i) => (
              <a
                href={`#${id}`}
                key={id}
                className={cn(
                  "whitespace-nowrap border-b-2 py-5",
                  i === 0
                    ? "border-forest font-medium"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="detail-content py-9">
            <div className="min-w-0">
              <section id="about">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rating-score !px-2.5 !py-2 !text-base">
                    {hotel.score}
                  </span>
                  <div>
                    <h2 className="text-sm font-medium">Exceptional</h2>
                    <a
                      href="#reviews"
                      className="mt-1 block text-[10px] text-muted-foreground underline underline-offset-2"
                    >
                      {money(hotel.reviews)} traveler reviews
                    </a>
                  </div>
                  <span className="ml-auto hidden text-[10px] text-muted-foreground sm:inline">
                    Your kind of getaway starts here.
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-medium tracking-tight">
                  Somewhere you can feel at home
                </h2>
                <p className="text-[13px] leading-7 text-muted-foreground">
                  {hotel.description}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {hotel.amenities.map((name) => {
                    const Icon = amenityIcons[name] || Check;
                    return (
                      <div key={name} className="flex items-center gap-2.5">
                        <Icon className="size-5 stroke-[1.4]" />
                        <span className="text-[11px]">
                          {name === "Wi-Fi" ? "Free Wi-Fi" : name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-7 flex items-start gap-3 rounded-xl bg-secondary/60 p-4">
                  <Sparkles className="mt-0.5 size-5 shrink-0 stroke-[1.4]" />
                  <div>
                    <p className="text-xs font-medium">
                      Why this place made our list
                    </p>
                    <p className="mt-2 text-[11px] leading-6 text-muted-foreground">
                      The atmosphere, the thoughtful details, and that lovely
                      feeling of having nowhere else to be.
                    </p>
                  </div>
                </div>
              </section>
              <Separator className="my-8" />
              <section id="rooms">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-medium tracking-tight">
                    A little room to unwind
                  </h2>
                  <span className="text-[10px] text-muted-foreground">
                    2 room types · {supplier}
                  </span>
                </div>
                <p className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {readableDate(stay.from)} — {readableDate(stay.to)} ·{" "}
                  {stay.nights} {nightWord(stay.nights)}
                </p>
                <div className="flex flex-col gap-5">
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.name}
                      room={room}
                      hotel={hotel}
                      nights={stay.nights}
                      roomCount={stay.rooms}
                      onSelect={() => setSelectedRoom(room)}
                    />
                  ))}
                </div>
                <p className="mt-4 text-[10px] leading-5 text-muted-foreground">
                  Sample rooms and prices. Availability and occupancy are not
                  checked in real time.
                </p>
              </section>
              <Separator className="my-8" />
              <section id="reviews">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-medium tracking-tight">
                    Stories from our guests
                  </h2>
                  <Badge variant="outline">Sample reviews</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      name: "Anna",
                      date: "October 2026",
                      text: "Such a beautiful, peaceful place. We especially loved the breakfasts and the thoughtful team. Exactly the getaway we had imagined.",
                    },
                    {
                      name: "Michael",
                      date: "September 2026",
                      text: "We wished we could stay a few more days. A comfortable room, a lovely atmosphere, and so many little details to appreciate. We would happily come back.",
                    },
                  ].map((r) => (
                    <article
                      key={r.name}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm">
                          {r.name[0]}
                        </span>
                        <div>
                          <h3 className="text-xs font-medium">{r.name}</h3>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {r.date}
                          </p>
                        </div>
                        <span className="rating-score ml-auto">10</span>
                      </div>
                      <p className="mt-4 text-[12px] leading-6 text-muted-foreground">
                        {r.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
              <Separator className="my-8" />
              <section id="conditions">
                <h2 className="mb-5 text-2xl font-medium tracking-tight">
                  A few things to know
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-xl bg-muted p-5">
                    <h3 className="text-xs font-medium">
                      Check-in and check-out
                    </h3>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Check-in from 14:00 · check-out by 12:00
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted p-5">
                    <h3 className="text-xs font-medium">Cancellation policy</h3>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      {hotel.cancellation
                        ? "Free cancellation is included in this sample rate."
                        : "Cancellation terms depend on your selected rate."}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-[10px] leading-5 text-muted-foreground">
                  These policies illustrate the interface and are not the actual
                  terms of the hotel.
                </p>
              </section>
            </div>
            <aside className="detail-booking">
              <div className="sticky top-6 rounded-2xl border border-border bg-card p-6 shadow-[0_8px_30px_#1d304705]">
                <Badge variant="secondary" className="mb-4 h-6 rounded-md">
                  <Sparkles data-icon="inline-start" />A good place. A good
                  price.
                </Badge>
                <p className="mb-1 text-[10px] text-muted-foreground">
                  Your escape, from
                </p>
                <div className="flex items-baseline gap-1.5">
                  <strong className="text-3xl font-semibold tracking-tight">
                    {money(hotel.price)} ₽
                  </strong>
                  <span className="text-[11px] text-muted-foreground">
                    / night
                  </span>
                  {hotel.oldPrice && (
                    <span className="ml-auto text-[11px] text-muted-foreground line-through">
                      {money(hotel.oldPrice)} ₽
                    </span>
                  )}
                </div>
                <div className="my-5 flex flex-col gap-3 rounded-xl border border-border p-4">
                  <p className="flex items-center gap-2 text-xs">
                    <CalendarDays className="size-3.5" />
                    {readableDate(stay.from)} — {readableDate(stay.to)}
                  </p>
                  <p className="flex items-center gap-2 text-xs">
                    <Users className="size-3.5" />
                    {stay.adults} {stay.adults === 1 ? "adult" : "adults"}
                    {stay.children > 0 &&
                      `, ${stay.children} ${stay.children === 1 ? "child" : "children"}`}{" "}
                    · {stay.rooms} {stay.rooms === 1 ? "room" : "rooms"}
                  </p>
                </div>
                <Button className="h-11 w-full" onClick={showRooms}>
                  Choose a room
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <div className="my-5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {stay.nights} {nightWord(stay.nights)} ×{" "}
                    {money(hotel.price)} ₽{stay.rooms > 1 && ` × ${stay.rooms}`}
                  </span>
                  <strong className="font-semibold">
                    {money(hotel.price * stay.nights * stay.rooms)} ₽
                  </strong>
                </div>
                <p className="text-center text-[10px] text-muted-foreground">
                  Including taxes and fees
                </p>
                <Separator className="my-5" />
                <h3 className="mb-4 text-xs font-medium">Compare offers</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Ogizu", price: hotel.price },
                    { name: "Hotel website", price: hotel.price + 600 },
                    { name: "Ostrovok", price: hotel.price + 900 },
                  ].map((offer) => (
                    <button
                      key={offer.name}
                      className="flex items-center justify-between text-left text-[11px]"
                      onClick={() => {
                        setSupplier(offer.name);
                        showRooms();
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        {offer.name}
                        {offer.name === "Ogizu" && (
                          <Check className="size-3 text-forest" />
                        )}
                      </span>
                      <span className="flex items-center gap-2">
                        {money(offer.price)} ₽<ArrowUpRightIcon />
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-[9px] leading-5 text-muted-foreground">
                  Illustrative comparison. Live partner offers are not
                  connected.
                </p>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-forest">
                  <ShieldCheck className="size-3.5" />A little peace of mind for
                  your plans
                </div>
              </div>
            </aside>
          </div>
          <Link href={`/search?${query}`} className="text-link mb-6">
            <ArrowLeft />
            Back to your search
          </Link>
        </div>
      </main>
      <SiteFooter />
      <Dialog
        open={galleryIndex !== null}
        onOpenChange={(open) => {
          if (!open) setGalleryIndex(null);
        }}
      >
        <DialogContent className="p-4 sm:max-w-4xl">
          <DialogHeader className="px-2 pt-1">
            <DialogTitle>{hotel.name}</DialogTitle>
            <DialogDescription>
              Hotel photos · {galleryIndex !== null ? galleryIndex + 1 : 1} of{" "}
              {hotel.gallery.length}
            </DialogDescription>
          </DialogHeader>
          {galleryIndex !== null && (
            <div className="relative">
              <img
                src={hotel.gallery[galleryIndex]}
                alt={`Photo ${galleryIndex + 1} — ${hotel.name}`}
                className="max-h-[65vh] min-h-48 w-full rounded-xl object-contain"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
                aria-label="Previous photo"
                onClick={() =>
                  setGalleryIndex(
                    (galleryIndex + hotel.gallery.length - 1) %
                      hotel.gallery.length,
                  )
                }
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                aria-label="Next photo"
                onClick={() =>
                  setGalleryIndex((galleryIndex + 1) % hotel.gallery.length)
                }
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={selectedRoom !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedRoom(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-md">
          <DialogHeader>
            <Badge variant="secondary" className="mb-2">
              BOOKING PREVIEW
            </Badge>
            <DialogTitle>Your next good place</DialogTitle>
            <DialogDescription>
              A little preview of the stay you have chosen.
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <>
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="aspect-[2] w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="text-base font-semibold">{hotel.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {selectedRoom.name}
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl bg-muted p-4 text-xs">
                <p>
                  {readableDate(stay.from)} — {readableDate(stay.to)} ·{" "}
                  {stay.nights} {nightWord(stay.nights)}
                </p>
                <p>
                  {stay.adults + stay.children}{" "}
                  {stay.adults + stay.children === 1 ? "guest" : "guests"} ·{" "}
                  {stay.rooms} {stay.rooms === 1 ? "room" : "rooms"} · offered
                  by {supplier}
                </p>
                <Separator />
                <div className="flex justify-between">
                  <span>Total, including fees</span>
                  <strong>
                    {money(selectedRoom.price * stay.nights * stay.rooms)} ₽
                  </strong>
                </div>
              </div>
              <p className="text-[11px] leading-6 text-muted-foreground">
                This is a design prototype. Booking and payments are not
                connected. No room will be reserved and you will not be charged.
              </p>
              <Button className="h-11" onClick={() => setSelectedRoom(null)}>
                Keep exploring this hotel
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ArrowUpRightIcon() {
  return <ArrowRight className="size-3 -rotate-45" />;
}

function RoomCard({
  room,
  hotel,
  nights,
  roomCount,
  onSelect,
}: {
  room: Room;
  hotel: Hotel;
  nights: number;
  roomCount: number;
  onSelect: () => void;
}) {
  return (
    <article className="room-card bg-card">
      <img src={room.image} alt={room.name} loading="lazy" />
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-sm font-semibold">{room.name}</h3>
        <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Square className="size-3" />
          {room.size} m²
          <Users className="ml-3 size-3" />
          Up to 3 guests
        </p>
        <p className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <BedDouble className="size-3" />
          {room.detail}
        </p>
        {hotel.breakfast && (
          <p className="flex items-center gap-1.5 text-[10px] text-forest">
            <Coffee className="size-3" />
            Breakfast included
          </p>
        )}
        {hotel.cancellation && (
          <p className="flex items-center gap-1.5 text-[10px] text-forest">
            <Check className="size-3" />
            Free cancellation
          </p>
        )}
      </div>
      <div className="room-price flex flex-col items-end justify-end gap-2 p-5">
        <strong className="whitespace-nowrap text-xl font-semibold tracking-tight">
          {money(room.price)} ₽
        </strong>
        <span className="text-[10px] text-muted-foreground">
          per room / night
        </span>
        <span className="whitespace-nowrap text-[9px] text-muted-foreground">
          {money(room.price * nights * roomCount)} ₽ for {nights}{" "}
          {nightWord(nights)}
        </span>
        <Button className="mt-2 h-9 w-full px-5" onClick={onSelect}>
          Select
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </article>
  );
}
