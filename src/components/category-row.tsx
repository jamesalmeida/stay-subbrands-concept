import { categories } from "@/data/categories";
import Link from "next/link";

export function CategoryRow({ active }: { active: string }) {
  return (
    <div className="border-b border-[#ebebeb]">
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 md:px-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const selected = active === category.id;
          return (
            <Link
              key={category.id}
              href={category.id === "homes" ? "/" : `/?category=${category.id}`}
              aria-current={selected ? "true" : undefined}
              className={`flex shrink-0 flex-col items-center gap-2 border-b-2 px-3 pb-3 pt-4 text-xs transition-colors ${
                selected
                  ? "border-ink font-semibold text-ink"
                  : "border-transparent font-medium text-muted hover:border-[#bbbbbb] hover:text-ink"
              }`}
            >
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              <span className="whitespace-nowrap">{category.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
