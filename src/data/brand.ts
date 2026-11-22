import { listingsByBrand, type Listing } from "@/data/listings";

export const JACKSON_COMMONS_ID = "jackson-commons";

export type BrandReview = {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  home: string;
};

export type SharedSpacePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export const jacksonCommons = {
  id: JACKSON_COMMONS_ID,
  name: "Jackson Commons",
  slug: "jackson-commons",
  tagline: "16 Culver City stays on and around the historic Jackson Market grounds.",
  pitch:
    "A sub-brand lets one host gather a whole neighborhood portfolio under one name, one standard, and one combined reputation — without leaving the marketplace.",
  host: "Fawaz",
  hostAvatar: "/photos/jackson-commons/fawaz-avatar.jpg",
  hostProfileUrl: "https://www.airbnb.com/users/profile/1465311339602795353",
  hostSince: 2019,
  superhostSince: 2019,
  yearsHosting: 7,
  languages: "Arabic, English, French, and Italian",
  hostBio:
    "World traveler, citizen of the world, and food is my passion. Please pass by and grab a bite on us at Jackson Market.",
  location: "Culver City, California",
  hero: "/photos/jackson-market-patio.jpg",
  heroAlt: "String-lit shared garden patio at Jackson Market in Culver City",
  marketMapUrl: "https://maps.app.goo.gl/vjuubvtsJpjRNzVD7?g_st=ic",
  sharedSpacePhotos: [
    {
      src: "/photos/jackson-market-front.jpg",
      alt: "Jackson Market and Deli storefront with wooden planters and umbrella seating on Jackson Ave",
      caption: "Jackson Market right on Jackson Ave — espresso, deli sandwiches, and groceries since 1925.",
    },
    {
      src: "/photos/jackson-market-breezeway.jpg",
      alt: "Vine-covered pergola walkway with hanging lanterns beside Jackson Market",
      caption: "The vine-covered lantern walkway connecting the market to the back garden.",
    },
    {
      src: "/photos/jackson-market-patio.jpg",
      alt: "String-lit shared backyard garden patio with tables and fireplace at dusk",
      caption: "The shared courtyard patio behind Jackson Market with fire-pit tables, koi pond, and waterfalls.",
    },
    {
      src: "/photos/jackson-market-deli.jpg",
      alt: "Inside Jackson Market and Deli with espresso counter and chalkboard menu",
      caption: "Morning coffee, pastries, wood-fired pizza, and neighborhood staples steps from your door.",
    },
  ] satisfies SharedSpacePhoto[],
  story: [
    "It started with a 1922 Culver City bungalow whose owner opened Jackson Market next door in 1925. Today, Fawaz hosts 16 distinct stays right on and around the Jackson Market grounds — from koi-pond studios and sunlit courtyard one-bedrooms to a three-floor rooftop loft and family-ready two-bedroom bungalows, all a five-minute walk from downtown Culver City and Sony Pictures Studios.",
    "Tiled pathways connect the units straight into Jackson Market's shared outdoor world: a century-old neighborhood deli and café, wood-fired pizza oven, shade trees, waterfalls, a pond with koi and turtles, and string-lit fire-pit tables where guests linger with morning espresso or evening wine.",
    "Jackson Commons is a concept sub-brand showing what Fawaz's real 16-property Culver City portfolio looks like when unified inside a marketplace: one recognizable name on every card, one combined 4.94 rating across 898 reviews, and one home page for the whole collection.",
  ],
  standards: [
    {
      title: "Shared Jackson Market grounds",
      detail:
        "Tiled paths open onto the koi pond, waterfalls, fire-pit tables, café, deli, and wood-fired pizza oven — right downstairs or a short stroll down the block.",
    },
    {
      title: "Walkable Culver City core",
      detail:
        "Five minutes on foot to downtown Culver City restaurants, bars, and Sony Pictures Studios, with easy neighborhood parking.",
    },
    {
      title: "Private outdoor space",
      detail:
        "From fenced waterfall backyards and rooftop fire-pit terraces to sunlit patios and shared BBQ courtyards, every stay leans into indoor-outdoor living.",
    },
    {
      title: "Work-ready & fast wifi",
      detail:
        "Dedicated desks, fast wifi, central air, and smart TVs loaded with streaming apps — built for studio shoots, work trips, and multi-week stays.",
    },
    {
      title: "Easy keypad check-in",
      detail: "Self check-in by keypad after 3pm across every unit, with consistent arrival instructions.",
    },
    {
      title: "Thoughtful kitchens & baths",
      detail:
        "Well-equipped kitchens (from gas ranges to chef islands), plush king beds, and spa-style touches like heated tile floors in the boutique building.",
    },
    {
      title: "16 layouts, one host",
      detail:
        "Book a solo studio, a boutique patio room, or a two-bedroom bungalow with the same Superhost — Fawaz — behind every door.",
    },
    {
      title: "Built for repeat stays",
      detail:
        "Guests return across different units as their trips change, knowing the market, the patios, and the hosting stay just as warm.",
    },
  ],
};

export function jacksonCommonsHomes(): Listing[] {
  return listingsByBrand(JACKSON_COMMONS_ID).sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });
}

export function jacksonCommonsStats(homes: Listing[] = jacksonCommonsHomes()) {
  const reviews = homes.reduce((sum, home) => sum + home.reviewCount, 0);
  const rating =
    reviews === 0
      ? 0
      : homes.reduce((sum, home) => sum + home.rating * home.reviewCount, 0) / reviews;
  return {
    homes: homes.length,
    reviews,
    rating,
  };
}

export const brandReviews: BrandReview[] = [
  {
    id: "r1",
    author: "Sandy",
    date: "Recent stay",
    rating: 5,
    text: "As former residents of Culver City, it was a pleasure to stay at Fawaz's place. Great location, so convenient to have the famous Jackson Market downstairs, beautiful patio to enjoy.",
    home: "Jackson Market Courtyard",
  },
  {
    id: "r2",
    author: "Steve",
    date: "Recent stay",
    rating: 5,
    text: "The rooms at Jackson Market are well-curated. The Market itself is central to all of the Culver City staples. There is ample parking nearby, and the whole area is walkable.",
    home: "Boutique Building at Jackson Market",
  },
  {
    id: "r3",
    author: "Deborah",
    date: "Recent stay",
    rating: 5,
    text: "Had a wonderful stay and would highly recommend these apartments. In fact so good we have rebooked again for 3 more visits over the next few months. Jackson Market is a beautiful and very special place and we spent many of our mornings relaxing outside in the gardens.",
    home: "Jackson Market Apartments",
  },
  {
    id: "r4",
    author: "Rebecca",
    date: "Recent stay",
    rating: 5,
    text: "Perfect stay, wonderful place. Great onsite pizza restaurant and delicatessen, and the owners are incredibly friendly and helpful. Will be back!",
    home: "Jackson Market Grounds",
  },
];
