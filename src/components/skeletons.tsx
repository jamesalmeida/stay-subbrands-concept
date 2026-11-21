export function ResultsSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1760px] px-5 py-6 md:px-10">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-neutral-200" />
      <div className="mt-5 h-40 animate-pulse rounded-[28px] bg-neutral-200" />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}>
            <div className="aspect-square animate-pulse rounded-[20px] bg-neutral-200" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
