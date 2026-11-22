import { JACKSON_COMMONS_ID } from "@/data/brand";
import { listings, type Listing } from "@/data/listings";

export const SAMPLE_CITIES = [
  "Culver City",
  "Santa Monica",
  "Venice",
  "Silver Lake",
  "Los Feliz",
  "Pasadena",
  "Malibu",
  "Echo Park",
  "Los Angeles",
];

export function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function searchListings(where: string): Listing[] {
  const query = where.trim().toLowerCase();
  if (query.length < 2) return [];
  return listings.filter((listing) => {
    const brand =
      listing.brandId === JACKSON_COMMONS_ID ? "jackson commons jackson market" : "";
    const haystack = [
      listing.city,
      listing.neighborhood,
      listing.title,
      listing.propertyType,
      listing.metro,
      listing.host,
      brand,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function shouldShowJacksonCommons(where: string, results: Listing[]): boolean {
  const hasBrand = results.some((listing) => listing.brandId === JACKSON_COMMONS_ID);
  if (!hasBrand || results.length === 0) return false;
  const normalized = where.trim().toLowerCase();
  if (
    normalized.includes("culver") ||
    normalized.includes("jackson") ||
    normalized.includes("fawaz")
  ) {
    return true;
  }
  return results.every((listing) => listing.city === "Culver City");
}

export function orderResults(where: string, results: Listing[]): Listing[] {
  const normalized = where.trim().toLowerCase();
  const pinBrand =
    normalized.includes("culver") ||
    normalized.includes("jackson") ||
    normalized.includes("fawaz");
  return [...results].sort((a, b) => {
    if (pinBrand) {
      const brandA = a.brandId === JACKSON_COMMONS_ID ? 1 : 0;
      const brandB = b.brandId === JACKSON_COMMONS_ID ? 1 : 0;
      if (brandA !== brandB) return brandB - brandA;
    }
    return b.rating - a.rating;
  });
}

export function resultsHeading(where: string, results: Listing[]): string {
  const query = where.trim();
  if (!query) return "Search stays";
  if (query.toLowerCase() === "los angeles") return "Homes around Los Angeles";
  const cities = [...new Set(results.map((listing) => listing.city))];
  if (results.length > 0 && cities.length === 1) return `Homes in ${cities[0]}`;
  return `Stays matching “${query}”`;
}
