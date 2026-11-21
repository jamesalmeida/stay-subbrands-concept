"use client";

import { ListingGrid } from "@/components/listing-grid";
import type { Listing } from "@/data/listings";
import { CULVER_GARDENS_ID } from "@/data/brand";
import { useMemo, useState } from "react";

export function ResultsExplorer({ listings }: { listings: Listing[] }) {
  const [brandOnly, setBrandOnly] = useState(false);
  const [under250, setUnder250] = useState(false);
  const hasBrand = listings.some((listing) => listing.brandId === CULVER_GARDENS_ID);

  const shown = useMemo(
    () =>
      listings.filter((listing) => {
        if (brandOnly && listing.brandId !== CULVER_GARDENS_ID) return false;
        if (under250 && listing.price > 250) return false;
        return true;
      }),
    [listings, brandOnly, under250],
  );

  return (
    <div>
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        <FilterChip
          active={!brandOnly && !under250}
          onClick={() => {
            setBrandOnly(false);
            setUnder250(false);
          }}
        >
          All stays
        </FilterChip>
        {hasBrand ? (
          <FilterChip active={brandOnly} onClick={() => setBrandOnly((value) => !value)}>
            Culver Gardens
          </FilterChip>
        ) : null}
        <FilterChip active={under250} onClick={() => setUnder250((value) => !value)}>
          Under $250
        </FilterChip>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-2xl bg-[#f7f7f7] px-5 py-10 text-center text-sm">
          No sample stays match those filters. Clear them to see the list again.
        </p>
      ) : (
        <ListingGrid listings={shown} priorityCount={1} />
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
        active ? "border-ink bg-ink text-white" : "border-[#dddddd] bg-white text-ink"
      }`}
    >
      {children}
    </button>
  );
}
