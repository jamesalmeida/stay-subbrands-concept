import { BrandMark } from "@/components/brand-mark";
import { PhotoGallery } from "@/components/photo-gallery";
import { ReserveButton } from "@/components/reserve-button";
import { getListing, listings } from "@/data/listings";
import { formatRating, money } from "@/lib/format";
import { Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = getListing(id);
  return { title: listing?.title ?? "Stay" };
}

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <ListingDetail params={params} />
    </Suspense>
  );
}

async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) notFound();

  return (
    <article className="mx-auto w-full max-w-5xl px-5 py-5 md:px-8 md:py-8">
      <PhotoGallery title={listing.title} city={listing.city} images={listing.images} />
      <div className="mt-5 grid gap-8 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight md:text-3xl">{listing.title}</h1>
          <p className="mt-1 text-muted">
            {listing.propertyType} in {listing.neighborhood}, {listing.city}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1 font-semibold">
              <Star size={14} className="fill-ink" aria-hidden="true" />
              {formatRating(listing.rating)}
            </span>
            <span className="text-muted">{listing.reviewCount} reviews</span>
            <span className="text-muted">
              {listing.guests} guests · {listing.bedrooms || "Studio"}{" "}
              {listing.bedrooms === 1 ? "bedroom" : listing.bedrooms > 1 ? "bedrooms" : ""} ·{" "}
              {listing.beds} {listing.beds === 1 ? "bed" : "beds"} · {listing.baths}{" "}
              {listing.baths === 1 ? "bath" : "baths"}
            </span>
          </p>
          {listing.brandId ? (
            <Link
              href="/brand/jackson-commons"
              className="mt-5 flex items-center gap-3 rounded-2xl bg-cream p-4"
            >
              <BrandMark className="h-11 w-11 text-base" />
              <span>
                <span className="block font-semibold text-brand">Part of Jackson Commons</span>
                <span className="block text-sm text-[#444]">
                  One host, several homes — several right next to Jackson Market with a shared
                  garden patio. See the collection.
                </span>
              </span>
            </Link>
          ) : null}
          <p className="mt-6 text-[16px] leading-7">{listing.description}</p>
          <h2 className="mt-8 text-xl font-semibold">What this place offers</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {listing.amenities.map((amenity) => (
              <li key={amenity} className="rounded-xl border border-[#ebebeb] px-3 py-2 text-sm">
                {amenity}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">Hosted by {listing.host}. Fictional listing.</p>
        </div>
        <aside className="rounded-3xl border border-[#ebebeb] p-5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] md:sticky md:top-40">
          <p className="text-xl">
            <span className="font-semibold">{money(listing.price)}</span> night
          </p>
          <p className="mt-1 text-sm text-muted">{listing.dates}</p>
          <p className="mt-3 flex items-center gap-1 text-sm">
            <Star size={14} className="fill-ink" aria-hidden="true" />
            {formatRating(listing.rating)} · {listing.reviewCount} reviews
          </p>
          <ReserveButton />
        </aside>
      </div>
    </article>
  );
}
