import { ListingGrid } from "@/components/listing-grid";
import { categories, categoryLabel } from "@/data/categories";
import { listingsForCategory } from "@/data/listings";
import { firstParam } from "@/lib/search";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <HomeResults searchParams={searchParams} />
    </Suspense>
  );
}

async function HomeResults({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = firstParam(params.category) || "homes";
  const category = categories.some((item) => item.id === requested) ? requested : "homes";
  const listings = listingsForCategory(category);
  const label = categoryLabel(category);

  return (
    <div className="mx-auto w-full max-w-[1760px] px-5 py-6 md:px-10 md:py-8">
      <h1 className="sr-only">
        {category === "homes" ? "Homes around Los Angeles" : `${label} stays`}
      </h1>
      {listings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl font-semibold">No sample stays in {label} yet</p>
          <p className="mx-auto mt-2 max-w-md text-muted">
            This catalog is a Los Angeles set built for the Culver Gardens pitch. Try Gardens,
            Beachfront, or all homes.
          </p>
          <Link href="/" className="mt-5 inline-block font-semibold underline">
            Browse all homes
          </Link>
        </div>
      ) : (
        <ListingGrid listings={listings} priorityCount={2} />
      )}
    </div>
  );
}
