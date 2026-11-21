import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#ebebeb] px-5 py-10 text-sm text-muted md:px-10">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-semibold text-ink">Concept mockup, not affiliated with Airbnb.</p>
          <p className="mt-2 max-w-xl">
            Fictional listings, hosts, and reviews. Home photography is stock from Unsplash, used
            under the Unsplash License. No booking is real.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-semibold text-ink">
          <Link href="/" className="underline-offset-2 hover:underline">
            Explore
          </Link>
          <Link href="/search?where=Culver%20City" className="underline-offset-2 hover:underline">
            Culver City
          </Link>
          <Link href="/brand/culver-gardens" className="underline-offset-2 hover:underline">
            Culver Gardens
          </Link>
          <Link href="/wishlists" className="underline-offset-2 hover:underline">
            Wishlists
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function ConceptBanner() {
  return (
    <p className="bg-[#f7f7f7] px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-[#4a4a4a]">
      Concept mockup, not affiliated with Airbnb.
    </p>
  );
}
