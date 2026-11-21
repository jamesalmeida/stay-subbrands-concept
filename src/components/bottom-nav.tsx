"use client";

import { useWishlist } from "@/components/wishlist";
import { Compass, Heart, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Explore", icon: Compass, match: (path: string) => path === "/" || path.startsWith("/search") || path.startsWith("/listing") || path.startsWith("/brand") },
  { href: "/wishlists", label: "Wishlists", icon: Heart, match: (path: string) => path.startsWith("/wishlists") },
  { href: "/login", label: "Log in", icon: UserRound, match: (path: string) => path.startsWith("/login") },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  const { ids } = useWishlist();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#ebebeb] bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-[62px] grid-cols-3">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={tab.label === "Wishlists" && ids.length > 0 && active ? "fill-ink" : undefined}
                />
                {tab.label}
                {tab.label === "Wishlists" && ids.length > 0 ? (
                  <span className="absolute right-[30%] top-2 grid h-4 min-w-4 place-items-center rounded-full bg-rausch px-1 text-[10px] font-bold text-white">
                    {ids.length}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
