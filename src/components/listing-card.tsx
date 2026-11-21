"use client";

import { formatRating, money } from "@/lib/format";
import type { Listing } from "@/data/listings";
import { useWishlist } from "@/components/wishlist";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function ListingCard({
  listing,
  priority = false,
}: {
  listing: Listing;
  priority?: boolean;
}) {
  const photos = listing.images;
  const [index, setIndex] = useState(0);
  const { has, toggle } = useWishlist();
  const saved = has(listing.id);
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
  const photo = photos[index] ?? photos[0];

  function step(direction: -1 | 1) {
    setIndex((current) => (current + direction + photos.length) % photos.length);
  }

  return (
    <article
      className="group relative"
      onTouchStart={(event) => {
        touchX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchX.current == null) return;
        const endX = event.changedTouches[0]?.clientX ?? touchX.current;
        const delta = endX - touchX.current;
        if (Math.abs(delta) > 40) {
          swiped.current = true;
          step(delta < 0 ? 1 : -1);
        }
        touchX.current = null;
      }}
    >
      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-neutral-100">
        {photo ? (
          <Image
            src={photo}
            alt={`${listing.title} in ${listing.city}, photo ${index + 1} of ${photos.length}`}
            fill
            priority={priority && index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute left-3 top-3 z-20 flex max-w-[75%] flex-col items-start gap-1.5">
          {listing.brandId ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm">
              Part of Culver Gardens
            </span>
          ) : null}
          {listing.guestFavorite ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
              Guest favorite
            </span>
          ) : null}
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${listing.title} from wishlists` : `Save ${listing.title}`}
          onClick={() => toggle(listing.id)}
          className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center"
        >
          <Heart
            size={26}
            strokeWidth={1.75}
            className={saved ? "fill-rausch text-rausch" : "fill-black/45 text-white"}
          />
        </button>
        {photos.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/95 text-ink shadow-sm md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/95 text-ink shadow-sm md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={16} />
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5">
              {photos.map((src, dot) => (
                <span
                  key={src}
                  className={`h-1.5 w-1.5 rounded-full ${dot === index ? "bg-white" : "bg-white/55"}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-[15px] font-semibold leading-5">
            <Link
              href={`/listing/${listing.id}`}
              className="after:absolute after:inset-0 after:z-10"
              onClick={(event) => {
                if (swiped.current) {
                  event.preventDefault();
                  swiped.current = false;
                }
              }}
            >
              {listing.title}
            </Link>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star size={14} className="fill-ink text-ink" aria-hidden="true" />
            <span>{formatRating(listing.rating)}</span>
          </span>
        </div>
        <p className="mt-0.5 truncate text-[15px] text-muted">
          {listing.neighborhood}, {listing.city}
        </p>
        <p className="text-[15px] text-muted">{listing.dates}</p>
        <p className="mt-1.5 text-[15px]">
          <span className="font-semibold">{money(listing.price)}</span>{" "}
          <span className="text-ink">night</span>
        </p>
      </div>
    </article>
  );
}
