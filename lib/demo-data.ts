export type Destination = {
  name: string;
  country: string;
  image: string;
  price: number;
  moods: string[];
};

const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const destinations: Destination[] = [
  {
    name: "Bali",
    country: "Indonesia",
    image: photo("photo-1537996194471-e657df975ab4"),
    price: 6700,
    moods: ["sea", "nature"],
  },
  {
    name: "Istanbul",
    country: "Türkiye",
    image: photo("photo-1524231757912-21f4fe3a7200"),
    price: 8200,
    moods: ["city"],
  },
  {
    name: "Sochi",
    country: "Russia",
    image: photo("photo-1510414842594-a61c69b5ae57"),
    price: 4800,
    moods: ["sea", "nature"],
  },
  {
    name: "Dubai",
    country: "UAE",
    image: photo("photo-1512453979798-5ea266f8880c"),
    price: 6500,
    moods: ["sea", "city"],
  },
  {
    name: "St. Petersburg",
    country: "Russia",
    image: photo("photo-1556610961-2fecc5927173"),
    price: 6400,
    moods: ["city"],
  },
  {
    name: "Arkhyz",
    country: "Russia",
    image: photo("photo-1464822759023-fed622ff2c3b"),
    price: 9200,
    moods: ["nature"],
  },
];

export type Hotel = {
  id: string;
  name: string;
  destination: string;
  area: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  score: string;
  reviews: number;
  stars: number;
  category: string;
  tag?: string;
  amenities: string[];
  breakfast: boolean;
  cancellation: boolean;
  description: string;
};

const baliPool = "/images/bali-resort.png";
const room = "/images/bali-room.png";
const hotelPool = photo("photo-1571896349842-33c89424de2d");
const hotelInterior = photo("photo-1611892440504-42a792e24d32");
const beachResort = photo("photo-1573790387438-4da905039392");
const cityHotel = photo("photo-1566073771259-6a8506099945");

export const hotels: Hotel[] = [
  {
    id: "alaya-ubud",
    name: "Alaya Resort Ubud",
    destination: "Bali",
    area: "Ubud · 1.2 km from the center",
    image: baliPool,
    gallery: [
      baliPool,
      room,
      photo("photo-1540541338287-41700207dee6"),
      hotelInterior,
      beachResort,
    ],
    price: 8900,
    oldPrice: 11200,
    score: "9.4",
    reviews: 1248,
    stars: 5,
    category: "Resort",
    tag: "Ogizu pick",
    amenities: ["Pool", "Spa", "Wi-Fi", "Restaurant"],
    breakfast: true,
    cancellation: true,
    description:
      "A place where time slows down. Wake up surrounded by tropical greenery, enjoy breakfast overlooking rice terraces, and end the day by the pool. Natural stone, warm wood, and Balinese hospitality make every detail feel effortless.",
  },
  {
    id: "the-kayon",
    name: "The Kayon Jungle Resort",
    destination: "Bali",
    area: "Payangan · surrounded by jungle",
    image: "/images/jungle-resort.png",
    gallery: ["/images/jungle-resort.png", room, baliPool, hotelInterior],
    price: 14500,
    score: "9.7",
    reviews: 862,
    stars: 5,
    category: "Resort",
    tag: "Something special",
    amenities: ["Pool", "Spa", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "A peaceful tropical hideaway far from the everyday. Think infinity pools, spacious villas, and long breakfasts with a jungle view.",
  },
  {
    id: "bambu-indah",
    name: "Bambu Indah",
    destination: "Bali",
    area: "Ubud · by the Ayung River",
    image: photo("photo-1540541338287-41700207dee6"),
    gallery: [photo("photo-1540541338287-41700207dee6"), room, baliPool],
    price: 6700,
    score: "9.2",
    reviews: 534,
    stars: 4,
    category: "Eco hotel",
    tag: "Closer to nature",
    amenities: ["Pool", "Wi-Fi", "Restaurant"],
    breakfast: false,
    cancellation: true,
    description:
      "Characterful homes, natural materials, and lush tropical gardens. A little closer to nature, a little further from the ordinary.",
  },
  {
    id: "como-uma",
    name: "COMO Uma Canggu",
    destination: "Bali",
    area: "Canggu · beachfront",
    image: hotelPool,
    gallery: [hotelPool, room, beachResort],
    price: 18200,
    oldPrice: 21000,
    score: "9.5",
    reviews: 716,
    stars: 5,
    category: "Beach hotel",
    amenities: ["Pool", "Spa", "Wi-Fi", "Beach"],
    breakfast: true,
    cancellation: false,
    description:
      "Morning surf, long beach walks, and sunsets by the ocean. A contemporary retreat made for taking your time.",
  },
  {
    id: "radisson-sochi",
    name: "Radisson Collection Paradise",
    destination: "Sochi",
    area: "Sirius · beachfront",
    image: hotelPool,
    gallery: [hotelPool, hotelInterior, beachResort],
    price: 12400,
    oldPrice: 14900,
    score: "9.3",
    reviews: 2146,
    stars: 5,
    category: "Beach hotel",
    tag: "Ogizu pick",
    amenities: ["Pool", "Spa", "Wi-Fi", "Beach"],
    breakfast: true,
    cancellation: true,
    description:
      "Sea air, a private beach, and mountains on the horizon. Everything you need for a beautiful escape on the Black Sea coast.",
  },
  {
    id: "green-flow",
    name: "Green Flow",
    destination: "Sochi",
    area: "Rosa Khutor · in the mountains",
    image: photo("photo-1455587734955-081b22074882"),
    gallery: [
      photo("photo-1455587734955-081b22074882"),
      hotelInterior,
      hotelPool,
    ],
    price: 7900,
    score: "9.1",
    reviews: 935,
    stars: 4,
    category: "Spa hotel",
    tag: "Time to reset",
    amenities: ["Pool", "Spa", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Mountain air, quiet moments, and a heated outdoor pool. Leave your everyday worries somewhere beyond the horizon.",
  },
  {
    id: "sochi-boutique",
    name: "Dolphin Resort Hotel",
    destination: "Sochi",
    area: "Sochi · 150 m from the sea",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, hotelPool],
    price: 4800,
    score: "8.8",
    reviews: 643,
    stars: 4,
    category: "Boutique hotel",
    amenities: ["Wi-Fi", "Restaurant", "Beach"],
    breakfast: false,
    cancellation: true,
    description:
      "A welcoming little hotel near the promenade. Leafy paths, seaside sunsets, and your next favorite café, all just around the corner.",
  },
  {
    id: "the-stay-bosphorus",
    name: "The Stay Bosphorus",
    destination: "Istanbul",
    area: "Ortaköy · on the Bosphorus",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, hotelPool],
    price: 14800,
    score: "9.4",
    reviews: 587,
    stars: 5,
    category: "Boutique hotel",
    tag: "Worth the view",
    amenities: ["Wi-Fi", "Restaurant"],
    breakfast: true,
    cancellation: true,
    description:
      "A historic mansion on the Bosphorus. Slow breakfasts overlooking the water, with the charming streets of Istanbul right outside your door.",
  },
  {
    id: "vault-istanbul",
    name: "The Bank Hotel Istanbul",
    destination: "Istanbul",
    area: "Karaköy · 500 m from Galata",
    image: hotelInterior,
    gallery: [hotelInterior, cityHotel, room],
    price: 8200,
    score: "9.2",
    reviews: 1103,
    stars: 5,
    category: "Design hotel",
    amenities: ["Spa", "Wi-Fi", "Restaurant"],
    breakfast: false,
    cancellation: true,
    description:
      "A storied hotel in the creative heart of the city. Discover art, striking architecture, and a rooftop terrace with a view to remember.",
  },
  {
    id: "address-dubai",
    name: "Address Sky View",
    destination: "Dubai",
    area: "Downtown · Burj Khalifa views",
    image: hotelPool,
    gallery: [hotelPool, hotelInterior, cityHotel],
    price: 24500,
    score: "9.5",
    reviews: 1428,
    stars: 5,
    category: "City hotel",
    tag: "Above the city",
    amenities: ["Pool", "Spa", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "The city at your feet. An infinity pool, contemporary architecture, and a front-row seat to the glittering Downtown skyline.",
  },
  {
    id: "rover-dubai",
    name: "Rove La Mer Beach",
    destination: "Dubai",
    area: "Jumeirah · beachfront",
    image: beachResort,
    gallery: [beachResort, hotelInterior, hotelPool],
    price: 6500,
    score: "9.0",
    reviews: 2346,
    stars: 4,
    category: "Beach hotel",
    amenities: ["Pool", "Wi-Fi", "Beach"],
    breakfast: false,
    cancellation: true,
    description:
      "Easygoing days, the sea a few steps away, and plenty to explore. For travelers who like to follow their own rhythm.",
  },
  {
    id: "wynwood-petersburg",
    name: "WYNWOOD",
    destination: "St. Petersburg",
    area: "City center · near Kazan Cathedral",
    image: hotelInterior,
    gallery: [hotelInterior, cityHotel, room],
    price: 6400,
    score: "9.6",
    reviews: 978,
    stars: 4,
    category: "Design hotel",
    tag: "Ogizu pick",
    amenities: ["Wi-Fi", "Restaurant"],
    breakfast: true,
    cancellation: true,
    description:
      "Contemporary art, thoughtful design, and St. Petersburg outside your window. A little creative universe in the heart of the city.",
  },
  {
    id: "domina-petersburg",
    name: "Domina St. Petersburg",
    destination: "St. Petersburg",
    area: "Moika embankment · city center",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, room],
    price: 8900,
    score: "9.3",
    reviews: 1540,
    stars: 5,
    category: "Boutique hotel",
    amenities: ["Spa", "Wi-Fi", "Restaurant"],
    breakfast: false,
    cancellation: true,
    description:
      "Riverside walks, inviting rooms, and architecture with a story. Your starting point for getting to know the city.",
  },
  {
    id: "arkhyz-resort",
    name: "Arkhyz Royal Resort & Spa",
    destination: "Arkhyz",
    area: "Arkhyz · by the mountain slopes",
    image: photo("photo-1455587734955-081b22074882"),
    gallery: [
      photo("photo-1455587734955-081b22074882"),
      hotelInterior,
      hotelPool,
    ],
    price: 9200,
    score: "9.2",
    reviews: 627,
    stars: 5,
    category: "Mountain hotel",
    tag: "Closer to nature",
    amenities: ["Pool", "Spa", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Wake up to the peaks of the Caucasus. Mountain trails, fresh air, and a warm spa after a day of exploring.",
  },
];

export const featuredHotels = [hotels[0], hotels[4], hotels[7], hotels[11]];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-US").format(amount);
export const hotelUrl = (hotel: Hotel, params?: string) =>
  `/hotel/${hotel.id}${params ? `?${params}` : ""}`;
export const searchUrl = (destination: string) =>
  `/search?destination=${encodeURIComponent(destination)}`;
