"use client";

import Link from "next/link";
import { Heart, Star, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/lib/use-favorites";
import { type Hotel, hotelUrl, money } from "@/lib/demo-data";

export function FavoriteButton({
  hotel,
  className = "",
}: {
  hotel: Hotel;
  className?: string;
}) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.includes(hotel.id);
  return (
    <button
      type="button"
      className={`favorite-button ${className}`}
      data-active={active}
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Add"} ${hotel.name} ${active ? "from" : "to"} saved stays`}
      onClick={() => toggle(hotel.id)}
    >
      <Heart aria-hidden="true" />
    </button>
  );
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="hotel-card min-w-0">
      <div className="hotel-photo">
        <Link href={hotelUrl(hotel)} aria-label={`Explore ${hotel.name}`}>
          <img
            src={hotel.image}
            alt={`${hotel.name} — ${hotel.destination}`}
            loading="lazy"
          />
        </Link>
        <FavoriteButton hotel={hotel} />
        {hotel.tag && (
          <Badge
            variant="secondary"
            className="absolute bottom-3 left-3 h-6 gap-1 rounded-md px-2"
          >
            {hotel.tag === "Ogizu pick" && (
              <Sparkles data-icon="inline-start" />
            )}
            {hotel.tag}
          </Badge>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-[10px] text-muted-foreground">
          {hotel.destination} · {hotel.category}
        </p>
        <div className="flex gap-0.5" aria-label={`${hotel.stars} stars`}>
          {Array.from({ length: hotel.stars }, (_, i) => (
            <Star key={i} className="size-2 fill-current text-foreground/60" />
          ))}
        </div>
      </div>
      <h3 className="hotel-name mt-1.5">
        <Link href={hotelUrl(hotel)}>{hotel.name}</Link>
      </h3>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="rating-score">{hotel.score}</span>
        <span className="text-[10px] font-medium">Exceptional</span>
        <span className="text-[10px] text-muted-foreground">
          · {money(hotel.reviews)} reviews
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-1">
        <span className="text-[11px] text-muted-foreground">from</span>
        <strong className="text-[17px] font-semibold tracking-tight">
          {money(hotel.price)} ₽
        </strong>
        <span className="text-[11px] text-muted-foreground">/ night</span>
        {hotel.oldPrice && (
          <span className="ml-auto text-[10px] text-muted-foreground line-through">
            {money(hotel.oldPrice)} ₽
          </span>
        )}
      </div>
    </article>
  );
}
