import { BrandMark } from "@/components/brand-mark";
import { ListingGrid } from "@/components/listing-grid";
import {
  brandReviews,
  jacksonCommons,
  jacksonCommonsHomes,
  jacksonCommonsStats,
} from "@/data/brand";
import { formatRating } from "@/lib/format";
import { Award, Check, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jackson Commons",
  description:
    "Fictional host sub-brand: six Culver City homes, several right next to Jackson Market with a shared garden space, one standard, one combined reputation.",
};

export default function JacksonCommonsPage() {
  const homes = jacksonCommonsHomes();
  const stats = jacksonCommonsStats(homes);

  return (
    <article>
      <section className="relative h-[62vh] min-h-[420px] max-h-[640px]">
        <Image
          src={jacksonCommons.hero}
          alt={jacksonCommons.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white md:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">Host sub-brand</p>
          <h1 className="mt-2 font-serif text-5xl leading-none md:text-7xl">{jacksonCommons.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">{jacksonCommons.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <section className="relative z-10 -mt-8 rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">The idea, at a glance</p>
          <p className="mt-2 max-w-3xl text-xl font-semibold leading-snug md:text-2xl">
            {jacksonCommons.pitch}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <BrandMark />
            <div>
              <p className="font-semibold">{jacksonCommons.host}</p>
              <p className="text-sm text-muted">
                Hosting since {jacksonCommons.hostSince} · Superhost since {jacksonCommons.superhostSince}
              </p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-cream px-2 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Homes</dt>
              <dd className="mt-1 text-2xl font-semibold text-brand">{stats.homes}</dd>
            </div>
            <div className="rounded-2xl bg-cream px-2 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Combined</dt>
              <dd className="mt-1 flex items-center justify-center gap-1 text-2xl font-semibold text-brand">
                <Star size={16} className="fill-brand" aria-hidden="true" />
                {formatRating(stats.rating)}
              </dd>
            </div>
            <div className="rounded-2xl bg-cream px-2 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Reviews</dt>
              <dd className="mt-1 text-2xl font-semibold text-brand">{stats.reviews}</dd>
            </div>
          </dl>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-white">
            <Award size={16} aria-hidden="true" />
            Superhost collection
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl text-brand">The brand story</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-7 text-[#333]">
            {jacksonCommons.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[28px] border border-[#ece7df] bg-cream/60 p-5 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">
                Shared neighborhood space
              </p>
              <h2 className="mt-1 font-serif text-3xl text-brand">Right next to Jackson Market</h2>
            </div>
            <a
              href={jacksonCommons.marketMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand underline underline-offset-2"
            >
              <MapPin size={15} aria-hidden="true" />
              4065 Jackson Ave on Google Maps
            </a>
          </div>
          <p className="mt-3 max-w-3xl text-[15px] leading-6 text-[#3d3d3d]">
            A number of Jackson Commons units sit right beside Jackson Market &amp; Deli, sharing a
            lovely outdoor space out back — a vine-covered lantern walkway and shaded patio that
            lights up in the evening. Step next door for morning coffee, deli sandwiches, or groceries,
            then bring them straight out to the garden tables.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {jacksonCommons.sharedSpacePhotos.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl bg-white shadow-xs">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm leading-5 text-[#444]">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl text-brand">The standard, on every home</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Guests should know the promise before they pick a door. Hosts publish it once.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {jacksonCommons.standards.map((item) => (
              <li key={item.title} className="rounded-2xl border border-[#ece7df] bg-cream/60 p-4">
                <p className="flex items-start gap-2 font-semibold">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                  {item.title}
                </p>
                <p className="mt-1 pl-7 text-sm leading-6 text-[#444]">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-3xl text-brand">What guests say about the collection</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Reviews stay on each home. They also roll up here, so the brand earns trust as a group.
            These quotes are fictional.
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {brandReviews.map((review) => (
              <li key={review.id} className="rounded-2xl border border-[#ebebeb] p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{review.author}</p>
                  <span className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-ink" aria-hidden="true" />
                    {review.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6">{review.text}</p>
                <p className="mt-3 text-xs text-muted">
                  {review.home} · {review.date}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl text-brand">The homes</h2>
            <Link
              href="/search?where=Culver%20City"
              className="shrink-0 text-sm font-semibold underline"
            >
              See them in Culver City search
            </Link>
          </div>
          <div className="mt-6">
            <ListingGrid listings={homes} priorityCount={0} />
          </div>
        </section>

        <section className="mt-14 rounded-[28px] bg-[#1c4534] px-5 py-8 text-white md:px-8 md:py-10">
          <h2 className="font-serif text-3xl">Why sub-brands?</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            Search already shows one card per home. A sub-brand is the missing layer for a host who
            runs several of them to the same standard.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="text-lg font-semibold">For guests</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-white/90">
                <li>A badge on the card — “Part of Jackson Commons” — so a trusted stay is recognizable in a long list.</li>
                <li>One page for the standard, the host, and every home, before anyone commits to a single door.</li>
                <li>A combined rating, with each home’s own reviews still attached to that home.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <h3 className="text-lg font-semibold">For hosts</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-white/90">
                <li>A name inside the marketplace. Guests do not have to leave to understand the portfolio.</li>
                <li>Cross-discovery: someone who loved one home is shown the rest of the collection.</li>
                <li>Professional hosts with a handful of similar homes can look like hospitality, not a pile of unrelated listings.</li>
              </ul>
            </div>
          </div>
          <ol className="mt-8 grid gap-3 text-sm md:grid-cols-3">
            <li className="rounded-2xl bg-black/20 p-4">
              <span className="font-semibold">1. Search Culver City.</span>
              <span className="mt-1 block text-white/80">The collection leads the results.</span>
            </li>
            <li className="rounded-2xl bg-black/20 p-4">
              <span className="font-semibold">2. Read the brand.</span>
              <span className="mt-1 block text-white/80">Standard, host, and combined reviews.</span>
            </li>
            <li className="rounded-2xl bg-black/20 p-4">
              <span className="font-semibold">3. Book a home.</span>
              <span className="mt-1 block text-white/80">Each listing keeps its own price and page.</span>
            </li>
          </ol>
        </section>
      </div>
    </article>
  );
}
