import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HotelDetail } from "@/components/hotel-detail";
import { hotels } from "@/lib/demo-data";
import { normalizeSearchParams } from "@/lib/search-params";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = hotels.find((h) => h.id === slug);
  return {
    title: hotel
      ? `${hotel.name}, ${hotel.destination} — место`
      : "Отель не найден — место",
    description: hotel?.description,
  };
}

export default async function HotelPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const hotel = hotels.find((h) => h.id === slug);
  if (!hotel) notFound();
  return <HotelDetail hotel={hotel} initial={normalizeSearchParams(query)} />;
}
