export function BrandMark({ className = "h-12 w-12 text-lg" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-2xl bg-brand font-serif text-white ${className}`}
      aria-hidden="true"
    >
      Cg
    </span>
  );
}
