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
  { value: "all", label: "Trending now", icon: Sparkles },
  { value: "sea", label: "By the sea", icon: Palmtree },
  { value: "city", label: "City escapes", icon: Building2 },
  { value: "nature", label: "Into the wild", icon: Mountain },
];

const stories = [
  {
    title: "Bali, slowly: an island that knows how to pause",
    category: "A LITTLE INSPIRATION",
    image: "/images/bali-resort.png",
    destination: "Bali",
    text: "Start your morning among the rice terraces of Ubud. Leave the afternoon for little galleries, local coffee, and a pool overlooking the jungle. Then make your way to the ocean: in Bali, sunsets are an art form all their own.",
  },
  {
    title: "Istanbul: two shores, a thousand stories",
    category: "THE CITY, UP CLOSE",
    image: destinations[1].image,
    destination: "Istanbul",
    text: "Cross the Bosphorus by ferry, try a warm simit by the waterfront, and wander off the busy avenues into quiet side streets. The best way to discover Istanbul is to let the city choose the route.",
  },
  {
    title: "A little escape: three days by the sea",
    category: "YOUR WEEKEND, REIMAGINED",
    image: destinations[2].image,
    destination: "Sochi",
    text: "A proper reset does not always need a long journey. Find a hotel by the sea, leave your laptop at home, and give yourself permission to make no plans. Breakfast on the terrace, a walk along the promenade, and a little sea air will do the rest.",
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
            alt="Infinity pool above the sunlit Mediterranean coast"
            className="hero-image"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="hero-eyebrow">
              A WORLD OF PLACES. ONE THAT FEELS LIKE YOU.
            </p>
            <h1 id="hero-title" className="hero-title">
              Somewhere good.
              <br />
              Something unforgettable.
            </h1>
            <p className="hero-subtitle">
              Find stays worth coming back to.
              <br className="sm:hidden" /> At prices worth getting away for.
            </p>
            <div className="hero-search">
              <SearchBar />
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-white/90">
              <BadgeCheck className="size-3.5" />
              No hidden fees. Just room for better plans.
            </p>
          </div>
          <div className="hero-location">
            <MapPin className="size-3.5" />
            Amalfi Coast, Italy
          </div>
          <span className="hero-note">Where will your next story begin? ↗</span>
        </section>
        <section
          className="page-container grid grid-cols-1 gap-5 border-b border-border py-7 sm:grid-cols-3 sm:gap-8 sm:py-8"
          aria-label="Why Ogizu"
        >
          {[
            {
              icon: SearchCheck,
              title: "Less searching. More discovering.",
              text: "Hotels and apartments, all in one place",
            },
            {
              icon: BadgeCheck,
              title: "Good prices. No surprises.",
              text: "Clear from the very first look",
            },
            {
              icon: Compass,
              title: "Not just a stay. Your kind of place.",
              text: "Thoughtfully picked, fondly remembered",
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
              <h2 className="section-title">Where feels right, right now?</h2>
              <p className="section-subtitle">
                Chase the sun, find a new flavor, or simply change the scenery.
              </p>
            </div>
            <Link
              href={searchUrl("All destinations")}
              className="text-link"
              aria-label="All destinations"
            >
              All destinations
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
              aria-label="Travel mood"
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
                    <span className="mx-1.5 opacity-50">·</span>from{" "}
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
                  THE OGIZU EDIT
                </div>
                <h2 className="section-title">Easy to love. Hard to leave.</h2>
                <p className="section-subtitle">
                  That view. That feeling. That one hotel.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Previous hotels"
                  onClick={() => setOffset((offset + 3) % 4)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  aria-label="Next hotels"
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
                <Sun data-icon="inline-start" />A little escape is calling
              </Badge>
              <h2 className="text-3xl font-medium leading-tight tracking-[-1px] sm:text-[38px]">
                Sometimes, all you need
                <br />
                is a different somewhere.
              </h2>
              <p className="mt-4 max-w-sm text-xs leading-6 text-white/70">
                The sound of waves. A breakfast without a clock. A city you have
                yet to meet. Find your new here.
              </p>
              <Link
                href={searchUrl("All destinations")}
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white underline decoration-white/40 underline-offset-4"
              >
                Find a place to reset
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative hidden w-[350px] shrink-0 md:block">
              <img
                src="/images/bali-room.png"
                alt="Inviting room overlooking a tropical garden"
                className="h-52 w-full -rotate-3 rounded-xl object-cover"
                loading="lazy"
              />
              <span className="escape-note absolute -bottom-3 -left-5 rotate-[-7deg] rounded-sm px-5 py-3 text-xs shadow-sm">
                Weekend plans: a little more living.
              </span>
            </div>
          </div>
        </section>
        <section className="page-container pb-12" id="journal">
          <div className="section-topline">
            <div>
              <h2 className="section-title">
                Every journey starts with a little curiosity.
              </h2>
              <p className="section-subtitle">
                Stories, places, and the occasional reason to pack a bag.
              </p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">
              The Ogizu journal
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
                  Read the story
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
                Find a stay in {stories[story].destination}
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
