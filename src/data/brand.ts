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
  tagline: "Culver City homes kept to one standard — several right next to Jackson Market.",
  pitch:
    "A sub-brand lets one host gather several homes under a name, a standard, and a shared reputation — without leaving the marketplace.",
  host: "Tony",
  hostSince: 2018,
  superhostSince: 2019,
  location: "Culver City, California",
  hero: "/photos/jackson-market-patio.jpg",
  heroAlt: "String-lit shared garden patio next to Jackson Market in Culver City",
  marketMapUrl: "https://maps.app.goo.gl/vjuubvtsJpjRNzVD7?g_st=ic",
  sharedSpacePhotos: [
    {
      src: "/photos/jackson-market-front.jpg",
      alt: "Jackson Market and Deli storefront with wooden planters and umbrella seating on Jackson Ave",
      caption: "Jackson Market right next door on Jackson Ave — espresso, sandwiches, and groceries.",
    },
    {
      src: "/photos/jackson-market-breezeway.jpg",
      alt: "Vine-covered pergola walkway with hanging lanterns beside Jackson Market",
      caption: "The vine-covered lantern walkway connecting the market to the back garden.",
    },
    {
      src: "/photos/jackson-market-patio.jpg",
      alt: "String-lit shared backyard garden patio with tables and fireplace at dusk",
      caption: "The lovely shared patio space behind Jackson Market, lit up after dark.",
    },
    {
      src: "/photos/jackson-market-deli.jpg",
      alt: "Inside Jackson Market and Deli with espresso counter and chalkboard menu",
      caption: "Morning coffee and deli staples a two-minute walk from the Jackson Ave doors.",
    },
  ] satisfies SharedSpacePhoto[],
  story: [
    "Tony has hosted in Culver City since 2018. A number of the Airbnb units sit right next to Jackson Market on Jackson Ave, opening onto a lovely shared outdoor space — a vine-covered lantern walkway and a shaded, string-lit garden patio where guests grab coffee, sandwiches, or groceries next door and linger outside.",
    "The homes are different shapes — cottages beside Jackson Market, a Hayden Tract loft, a Blair Hills suite — but the stay is meant to feel like the same house. Same linen weight. Same eight things in the kitchen. Same check-in note. Same quiet hours. Guests who liked Fig & Fern can book Willow Walk next time without starting from a blank search.",
    "Jackson Commons is fictional (though Jackson Market is very real). It is here so the idea is obvious: the brand is a layer on top of ordinary listings, not a separate website.",
  ],
  standards: [
    {
      title: "Hotel-weight linens",
      detail: "Two sets, the same white, at every home. Towels refresh on stays of five nights or more.",
    },
    {
      title: "The kitchen kit",
      detail: "Oil, salt, coffee, filters, tea, soap, a sponge, and a short spice rack. Nothing gourmet. Nothing missing.",
    },
    {
      title: "A real desk",
      detail: "Task lamp, outlet, and a chair you can sit in for a workday. Wifi is meant to clear 300 Mbps.",
    },
    {
      title: "Same check-in",
      detail: "Self check-in before 3pm. The lock instructions read the same way at every door.",
    },
    {
      title: "Shared space & patios",
      detail:
        "The Jackson Ave units share the lovely shaded garden patio and lantern walkway next to Jackson Market; every other home has its own patio or garden.",
    },
    {
      title: "Quiet hours",
      detail: "10pm to 8am, written on the brand page so guests see the rule before they book.",
    },
    {
      title: "Neighborhood card",
      detail:
        "The same printed Culver City card: starting with Jackson Market next door for morning coffee and sandwiches, plus where not to bother parking.",
    },
    {
      title: "One host",
      detail: "Tony answers for the collection. A problem at one home is a brand problem, not a mystery listing.",
    },
  ],
};

export function jacksonCommonsHomes(): Listing[] {
  return listingsByBrand(JACKSON_COMMONS_ID).sort((a, b) => b.rating - a.rating);
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
    author: "Priya S.",
    date: "October 2026",
    rating: 5,
    text: "We stayed at Fig & Fern this fall and The Orchard House last spring. Both sit right next to Jackson Market — morning coffee in the shared garden patio, plus the exact same linens and check-in note.",
    home: "Fig & Fern Cottage",
  },
  {
    id: "r2",
    author: "Marcus L.",
    date: "September 2026",
    rating: 5,
    text: "I booked The Citrus Loft because the card said Jackson Commons. I already trusted the cottage by the market. The loft is a different building and the same stay.",
    home: "The Citrus Loft",
  },
  {
    id: "r3",
    author: "Helen K.",
    date: "August 2026",
    rating: 5,
    text: "Lantern Court is tiny. The standard is not. Walking through the vine-covered breezeway to Jackson Market and sitting in the shared patio made the studio feel twice as big.",
    home: "Lantern Court Studio",
  },
  {
    id: "r4",
    author: "Andre W.",
    date: "July 2026",
    rating: 4,
    text: "Willow Walk fit our family. The combined rating made me less nervous about a townhouse we had never seen. Individual reviews were still right there.",
    home: "Willow Walk Townhouse",
  },
  {
    id: "r5",
    author: "Sofia A.",
    date: "June 2026",
    rating: 5,
    text: "Garden Suite at Haynes feels like a different house and the same host. The neighborhood card sent us straight to Jackson Market for sandwiches and the back patio.",
    home: "Garden Suite at Haynes",
  },
  {
    id: "r6",
    author: "Ben C.",
    date: "May 2026",
    rating: 5,
    text: "I would not have tried a second Culver City address from a stranger. I tried a second address from Jackson Commons. That is the whole product.",
    home: "The Orchard House",
  },
];
