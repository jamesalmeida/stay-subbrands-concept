import { ListingCard } from "@/components/listing-card";
import type { Listing } from "@/data/listings";

export function ListingGrid({
  listings,
  priorityCount = 1,
}: {
  listings: Listing[];
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {listings.map((listing, index) => (
        <ListingCard key={listing.id} listing={listing} priority={index < priorityCount} />
      ))}
    </div>
  );
}
