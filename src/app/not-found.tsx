import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20 text-center">
      <h1 className="text-3xl font-semibold">That page is not in this mockup</h1>
      <p className="mt-3 text-muted">
        Try the homepage, Culver City search, or the Jackson Commons collection.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">
          Explore
        </Link>
        <Link
          href="/brand/jackson-commons"
          className="rounded-full border border-[#dddddd] px-5 py-2.5 text-sm font-semibold"
        >
          Jackson Commons
        </Link>
      </div>
    </div>
  );
}
