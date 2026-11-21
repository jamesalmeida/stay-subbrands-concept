import { ResultsExplorer } from "@/components/results-explorer";
import { ResultsSkeleton } from "@/components/skeletons";
import { SubBrandBanner } from "@/components/subbrand-banner";
import { formatStayRange, guestSummary } from "@/lib/format";
import {
  firstParam,
  orderResults,
  resultsHeading,
  searchListings,
  shouldShowCulverGardens,
  SAMPLE_CITIES,
} from "@/lib/search";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ where?: string | string[] }>;
}): Promise<Metadata> {
  const where = firstParam((await searchParams).where);
  return {
    title: where ? resultsHeading(where, searchListings(where)) : "Search",
  };
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const where = firstParam(params.where);
  const checkin = firstParam(params.checkin);
  const checkout = firstParam(params.checkout);
  const adults = Number(firstParam(params.adults) || 0);
  const children = Number(firstParam(params.children) || 0);
  const infants = Number(firstParam(params.infants) || 0);
  const matches = searchListings(where);
  const results = orderResults(where, matches);
  const heading = resultsHeading(where, results);
  const showBrand = shouldShowCulverGardens(where, results);
  const range = formatStayRange(checkin, checkout);
  const guests = guestSummary(adults, children, infants);
  const summary = [range, guests].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto w-full max-w-[1760px] px-5 py-5 md:px-10 md:py-8">
      <h1 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[32px]">
        {matches.length > 0 ? heading : where ? `No stays for “${where.trim()}”` : "Where to?"}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {matches.length > 0
          ? `${matches.length} sample stay${matches.length === 1 ? "" : "s"}${summary ? ` · ${summary}` : ""}`
          : "Sample cities around Los Angeles. Culver City is where the sub-brand lives."}
      </p>

      {matches.length === 0 ? (
        <div className="py-10">
          <p className="max-w-xl text-[15px] leading-6">
            {where.trim()
              ? "Nothing in this demo catalog matches that search. Try a neighborhood, or open Culver City to see Culver Gardens."
              : "Type a destination. “Culver City” brings up the host collection."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SAMPLE_CITIES.map((city) => (
              <Link
                key={city}
                href={`/search?where=${encodeURIComponent(city)}`}
                className="rounded-full border border-[#dddddd] px-4 py-2 text-sm font-semibold hover:border-ink"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5">
          {showBrand ? (
            <div className="mb-6">
              <SubBrandBanner />
            </div>
          ) : null}
          <ResultsExplorer listings={results} />
        </div>
      )}
    </div>
  );
}
