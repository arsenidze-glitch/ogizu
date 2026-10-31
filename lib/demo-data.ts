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
    name: "Бали",
    country: "Индонезия",
    image: photo("photo-1537996194471-e657df975ab4"),
    price: 6700,
    moods: ["sea", "nature"],
  },
  {
    name: "Стамбул",
    country: "Турция",
    image: photo("photo-1524231757912-21f4fe3a7200"),
    price: 8200,
    moods: ["city"],
  },
  {
    name: "Сочи",
    country: "Россия",
    image: photo("photo-1510414842594-a61c69b5ae57"),
    price: 4800,
    moods: ["sea", "nature"],
  },
  {
    name: "Дубай",
    country: "ОАЭ",
    image: photo("photo-1512453979798-5ea266f8880c"),
    price: 6500,
    moods: ["sea", "city"],
  },
  {
    name: "Санкт-Петербург",
    country: "Россия",
    image: photo("photo-1556610961-2fecc5927173"),
    price: 6400,
    moods: ["city"],
  },
  {
    name: "Архыз",
    country: "Россия",
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
    destination: "Бали",
    area: "Убуд · 1,2 км от центра",
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
    score: "9,4",
    reviews: 1248,
    stars: 5,
    category: "Резорт",
    tag: "Выбор место",
    amenities: ["Бассейн", "Спа", "Wi-Fi", "Ресторан"],
    breakfast: true,
    cancellation: true,
    description:
      "Место, где время замедляется. Просыпайтесь среди тропической зелени, завтракайте с видом на рисовые террасы и провожайте день у бассейна. Камень, тёплое дерево и балийское гостеприимство — здесь всё продумано для вашего отдыха.",
  },
  {
    id: "the-kayon",
    name: "The Kayon Jungle Resort",
    destination: "Бали",
    area: "Пайанган · среди джунглей",
    image: "/images/jungle-resort.png",
    gallery: ["/images/jungle-resort.png", room, baliPool, hotelInterior],
    price: 14500,
    score: "9,7",
    reviews: 862,
    stars: 5,
    category: "Резорт",
    tag: "Особенное место",
    amenities: ["Бассейн", "Спа", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Тихий тропический оазис вдали от городской суеты. Панорамный бассейн, просторные виллы и завтраки с видом на джунгли.",
  },
  {
    id: "bambu-indah",
    name: "Bambu Indah",
    destination: "Бали",
    area: "Убуд · у реки Аюнг",
    image: photo("photo-1540541338287-41700207dee6"),
    gallery: [photo("photo-1540541338287-41700207dee6"), room, baliPool],
    price: 6700,
    score: "9,2",
    reviews: 534,
    stars: 4,
    category: "Эко-отель",
    tag: "Ближе к природе",
    amenities: ["Бассейн", "Wi-Fi", "Ресторан"],
    breakfast: false,
    cancellation: true,
    description:
      "Аутентичные дома, природные материалы и живописные тропические сады. Для тех, кому хочется быть немного ближе к природе.",
  },
  {
    id: "como-uma",
    name: "COMO Uma Canggu",
    destination: "Бали",
    area: "Чангу · первая линия",
    image: hotelPool,
    gallery: [hotelPool, room, beachResort],
    price: 18200,
    oldPrice: 21000,
    score: "9,5",
    reviews: 716,
    stars: 5,
    category: "Отель у моря",
    amenities: ["Бассейн", "Спа", "Wi-Fi", "Пляж"],
    breakfast: true,
    cancellation: false,
    description:
      "Сёрфинг по утрам, длинные прогулки по пляжу и закаты у океана. Современное пространство для неспешного отдыха.",
  },
  {
    id: "radisson-sochi",
    name: "Radisson Collection Paradise",
    destination: "Сочи",
    area: "Сириус · первая линия",
    image: hotelPool,
    gallery: [hotelPool, hotelInterior, beachResort],
    price: 12400,
    oldPrice: 14900,
    score: "9,3",
    reviews: 2146,
    stars: 5,
    category: "Отель у моря",
    tag: "Выбор место",
    amenities: ["Бассейн", "Спа", "Wi-Fi", "Пляж"],
    breakfast: true,
    cancellation: true,
    description:
      "Морской воздух, собственный пляж и горы на горизонте. Всё для красивого отдыха на побережье Чёрного моря.",
  },
  {
    id: "green-flow",
    name: "Green Flow",
    destination: "Сочи",
    area: "Роза Хутор · в горах",
    image: photo("photo-1455587734955-081b22074882"),
    gallery: [
      photo("photo-1455587734955-081b22074882"),
      hotelInterior,
      hotelPool,
    ],
    price: 7900,
    score: "9,1",
    reviews: 935,
    stars: 4,
    category: "Спа-отель",
    tag: "Перезагрузка",
    amenities: ["Бассейн", "Спа", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Горный воздух, тишина и открытый подогреваемый бассейн. Здесь легко оставить повседневные заботы за горизонтом.",
  },
  {
    id: "sochi-boutique",
    name: "Dolphin Resort Hotel",
    destination: "Сочи",
    area: "Сочи · 150 м до моря",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, hotelPool],
    price: 4800,
    score: "8,8",
    reviews: 643,
    stars: 4,
    category: "Бутик-отель",
    amenities: ["Wi-Fi", "Ресторан", "Пляж"],
    breakfast: false,
    cancellation: true,
    description:
      "Уютный небольшой отель у набережной. Зелёные прогулочные дорожки, морские закаты и любимые кафе совсем рядом.",
  },
  {
    id: "the-stay-bosphorus",
    name: "The Stay Bosphorus",
    destination: "Стамбул",
    area: "Ортакёй · у Босфора",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, hotelPool],
    price: 14800,
    score: "9,4",
    reviews: 587,
    stars: 5,
    category: "Бутик-отель",
    tag: "Вид, ради которого",
    amenities: ["Wi-Fi", "Ресторан"],
    breakfast: true,
    cancellation: true,
    description:
      "Исторический особняк на берегу Босфора. Неспешные завтраки с видом на пролив и любимые улочки Стамбула за порогом.",
  },
  {
    id: "vault-istanbul",
    name: "The Bank Hotel Istanbul",
    destination: "Стамбул",
    area: "Каракёй · 500 м до Галаты",
    image: hotelInterior,
    gallery: [hotelInterior, cityHotel, room],
    price: 8200,
    score: "9,2",
    reviews: 1103,
    stars: 5,
    category: "Дизайн-отель",
    amenities: ["Спа", "Wi-Fi", "Ресторан"],
    breakfast: false,
    cancellation: true,
    description:
      "Красивый отель с историей в самом творческом районе города. Искусство, архитектура и панорамная терраса.",
  },
  {
    id: "address-dubai",
    name: "Address Sky View",
    destination: "Дубай",
    area: "Даунтаун · вид на Бурдж-Халифу",
    image: hotelPool,
    gallery: [hotelPool, hotelInterior, cityHotel],
    price: 24500,
    score: "9,5",
    reviews: 1428,
    stars: 5,
    category: "Городской отель",
    tag: "Над городом",
    amenities: ["Бассейн", "Спа", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Город как на ладони. Панорамный бассейн, современная архитектура и лучший вид на сияющий Даунтаун.",
  },
  {
    id: "rover-dubai",
    name: "Rove La Mer Beach",
    destination: "Дубай",
    area: "Джумейра · первая линия",
    image: beachResort,
    gallery: [beachResort, hotelInterior, hotelPool],
    price: 6500,
    score: "9,0",
    reviews: 2346,
    stars: 4,
    category: "Отель у моря",
    amenities: ["Бассейн", "Wi-Fi", "Пляж"],
    breakfast: false,
    cancellation: true,
    description:
      "Лёгкое настроение, море в двух шагах и всё самое интересное рядом. Для путешественников, которые любят свободу.",
  },
  {
    id: "wynwood-petersburg",
    name: "WYNWOOD",
    destination: "Санкт-Петербург",
    area: "Центр · у Казанского собора",
    image: hotelInterior,
    gallery: [hotelInterior, cityHotel, room],
    price: 6400,
    score: "9,6",
    reviews: 978,
    stars: 4,
    category: "Дизайн-отель",
    tag: "Выбор место",
    amenities: ["Wi-Fi", "Ресторан"],
    breakfast: true,
    cancellation: true,
    description:
      "Современное искусство, авторский дизайн и Петербург за окном. Маленькая творческая вселенная в самом сердце города.",
  },
  {
    id: "domina-petersburg",
    name: "Domina St. Petersburg",
    destination: "Санкт-Петербург",
    area: "Набережная Мойки · центр",
    image: cityHotel,
    gallery: [cityHotel, hotelInterior, room],
    price: 8900,
    score: "9,3",
    reviews: 1540,
    stars: 5,
    category: "Бутик-отель",
    amenities: ["Спа", "Wi-Fi", "Ресторан"],
    breakfast: false,
    cancellation: true,
    description:
      "Петербургские набережные, уютные номера и архитектура с историей. Отправная точка для знакомства с городом.",
  },
  {
    id: "arkhyz-resort",
    name: "Arkhyz Royal Resort & Spa",
    destination: "Архыз",
    area: "Архыз · у горных склонов",
    image: photo("photo-1455587734955-081b22074882"),
    gallery: [
      photo("photo-1455587734955-081b22074882"),
      hotelInterior,
      hotelPool,
    ],
    price: 9200,
    score: "9,2",
    reviews: 627,
    stars: 5,
    category: "Горный отель",
    tag: "Ближе к природе",
    amenities: ["Бассейн", "Спа", "Wi-Fi"],
    breakfast: true,
    cancellation: true,
    description:
      "Просыпайтесь с видом на вершины Кавказа. Горные маршруты, чистый воздух и тёплый спа после насыщенного дня.",
  },
];

export const featuredHotels = [hotels[0], hotels[4], hotels[7], hotels[11]];
export const money = (amount: number) =>
  new Intl.NumberFormat("ru-RU").format(amount);
export const hotelUrl = (hotel: Hotel, params?: string) =>
  `/hotel/${hotel.id}${params ? `?${params}` : ""}`;
export const searchUrl = (destination: string) =>
  `/search?destination=${encodeURIComponent(destination)}`;
