import { BrandMark } from "@/components/brand-mark";
import { jacksonCommons, jacksonCommonsHomes, jacksonCommonsStats } from "@/data/brand";
import { formatRating } from "@/lib/format";
import { Award, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SubBrandBanner() {
  const homes = jacksonCommonsHomes();
  const stats = jacksonCommonsStats(homes);

  return (
    <section className="overflow-hidden rounded-[28px] border border-brand/15 bg-cream">
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-8 md:p-7">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-12 w-12 text-lg" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-clay">
                Host sub-brand
              </p>
              <h2 className="font-serif text-[1.7rem] leading-none text-brand">{jacksonCommons.name}</h2>
            </div>
          </div>
          <p className="mt-3 text-base font-medium text-brand">{jacksonCommons.tagline}</p>
          <p className="mt-1 text-sm text-[#3d3d3d]">
            Hosted by {jacksonCommons.host} · Superhost · {jacksonCommons.yearsHosting} years hosting
            · Shared garden patio at Jackson Market
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white px-3 py-1 font-semibold text-ink">
              {stats.homes} homes
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-ink">
              <Star size={13} className="fill-ink" aria-hidden="true" />
              {formatRating(stats.rating)} combined · {stats.reviews} reviews
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 font-semibold text-white">
              <Award size={14} aria-hidden="true" />
              Superhost collection
            </span>
          </div>
          <Link
            href="/brand/jackson-commons"
            className="mt-4 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            View the collection
          </Link>
        </div>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:grid md:grid-cols-3 md:overflow-visible">
          {homes.slice(0, 6).map((home) => (
            <Link
              key={home.id}
              href={`/listing/${home.id}`}
              className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl md:aspect-square md:h-auto md:w-auto"
            >
              <Image
                src={home.images[0] ?? "/photos/jackson-market-patio.jpg"}
                alt={home.title}
                fill
                sizes="120px"
                className="object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
