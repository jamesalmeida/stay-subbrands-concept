"use client";

import { ListingGrid } from "@/components/listing-grid";
import { useWishlist } from "@/components/wishlist";
import { getListing } from "@/data/listings";
import { Heart } from "lucide-react";
import Link from "next/link";

export function WishlistsView() {
  const { ids } = useWishlist();
  const saved = ids.map((id) => getListing(id)).filter((listing) => listing != null);

  if (saved.length === 0) {
    return (
      <div className="rounded-3xl border border-[#ebebeb] px-6 py-16 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f7f7f7]">
          <Heart size={24} />
        </span>
        <p className="mt-4 text-lg font-semibold">No saved homes yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Tap the heart on a stay. Jackson Commons homes are a good place to start.
        </p>
        <Link
          href="/search?where=Culver%20City"
          className="mt-5 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
        >
          Browse Culver City
        </Link>
      </div>
    );
  }

  return <ListingGrid listings={saved} />;
}
