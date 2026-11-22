"use client";

import { CategoryRow } from "@/components/category-row";
import { SearchSheet } from "@/components/search-sheet";
import { formatStayRange, guestSummary } from "@/lib/format";
import { SAMPLE_CITIES } from "@/lib/search";
import { Globe, Menu, Minus, Plus, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const whereParam = params.get("where") ?? "";
  const checkinParam = params.get("checkin") ?? "";
  const checkoutParam = params.get("checkout") ?? "";
  const adultsParam = Number(params.get("adults") || 0);
  const childrenParam = Number(params.get("children") || 0);
  const infantsParam = Number(params.get("infants") || 0);
  const category = params.get("category") || "homes";

  const [where, setWhere] = useState(whereParam);
  const [checkin, setCheckin] = useState(checkinParam);
  const [checkout, setCheckout] = useState(checkoutParam);
  const [adults, setAdults] = useState(adultsParam);
  const [childrenCount, setChildrenCount] = useState(childrenParam);
  const [infants, setInfants] = useState(infantsParam);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [globeOpen, setGlobeOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [whereOpen, setWhereOpen] = useState(false);
  const searchKey = `${whereParam}|${checkinParam}|${checkoutParam}|${adultsParam}|${childrenParam}|${infantsParam}`;
  const [syncedKey, setSyncedKey] = useState(searchKey);
  const [trackedPath, setTrackedPath] = useState(pathname);

  if (searchKey !== syncedKey) {
    setSyncedKey(searchKey);
    setWhere(whereParam);
    setCheckin(checkinParam);
    setCheckout(checkoutParam);
    setAdults(adultsParam);
    setChildrenCount(childrenParam);
    setInfants(infantsParam);
  }

  if (trackedPath !== pathname) {
    setTrackedPath(pathname);
    setMenuOpen(false);
    setGlobeOpen(false);
    setWhoOpen(false);
    setWhereOpen(false);
    setSheetOpen(false);
  }

  function search(overrideWhere?: string) {
    const destination = (overrideWhere ?? where).trim();
    const next = new URLSearchParams();
    if (destination) next.set("where", destination);
    if (checkin) next.set("checkin", checkin);
    if (checkout) next.set("checkout", checkout);
    if (adults) next.set("adults", String(adults));
    if (childrenCount) next.set("children", String(childrenCount));
    if (infants) next.set("infants", String(infants));
    setSheetOpen(false);
    setWhereOpen(false);
    setWhoOpen(false);
    const qs = next.toString();
    router.push(qs ? `/search?${qs}` : "/search");
  }

  const committedRange = formatStayRange(checkinParam, checkoutParam);
  const committedGuests = guestSummary(adultsParam, childrenParam, infantsParam);
  const pillTitle = whereParam || "Where to?";
  const pillSubtitle = [
    whereParam ? null : "Anywhere",
    committedRange || "Any week",
    committedGuests || "Add guests",
  ]
    .filter(Boolean)
    .join(" · ");
  const guestLabel = guestSummary(adults, childrenCount, infants) || "Add guests";
  const whereSuggestions = SAMPLE_CITIES.filter((city) =>
    city.toLowerCase().includes(where.trim().toLowerCase()),
  );

  return (
    <div className="relative bg-white">
      <div className="flex items-center justify-between px-5 pt-2 md:hidden">
        <Wordmark />
        <div className="flex items-center gap-1">
          <GlobeButton open={globeOpen} setOpen={setGlobeOpen} setMenuOpen={setMenuOpen} />
          <MenuButton open={menuOpen} setOpen={setMenuOpen} setGlobeOpen={setGlobeOpen} />
        </div>
      </div>
      <div className="px-5 pb-3 pt-3 md:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full items-center gap-1 rounded-full border border-[#ebebeb] bg-white py-2 pl-2 pr-5 text-left shadow-[0_3px_16px_rgba(0,0,0,0.12)]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center">
            <Search size={18} strokeWidth={2.6} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold">{pillTitle}</span>
            <span className="block truncate text-[13px] text-muted">{pillSubtitle}</span>
          </span>
        </button>
      </div>

      <div className="hidden items-center gap-4 px-8 py-4 md:grid md:grid-cols-[1fr_minmax(0,850px)_1fr]">
        <Wordmark />
        <form
          className="relative z-40"
          onSubmit={(event) => {
            event.preventDefault();
            search();
          }}
        >
          <div className="flex h-[66px] items-center rounded-full border border-[#dddddd] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)]">
            <label className="relative min-w-0 flex-1 rounded-full py-2 pl-8 pr-3 hover:bg-neutral-100">
              <span className="block text-xs font-bold">Where</span>
              <input
                value={where}
                onChange={(event) => {
                  setWhere(event.target.value);
                  setWhereOpen(true);
                }}
                onFocus={() => setWhereOpen(true)}
                placeholder="Search destinations"
                autoComplete="off"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </label>
            <span className="h-8 w-px bg-[#dddddd]" />
            <label className="w-[132px] rounded-full px-4 py-2 hover:bg-neutral-100">
              <span className="block text-xs font-bold">Check in</span>
              <input
                type="date"
                value={checkin}
                onChange={(event) => {
                  const value = event.target.value;
                  setCheckin(value);
                  if (checkout && value && checkout < value) setCheckout("");
                }}
                className="w-full bg-transparent text-sm text-muted outline-none"
              />
            </label>
            <span className="h-8 w-px bg-[#dddddd]" />
            <label className="w-[132px] rounded-full px-4 py-2 hover:bg-neutral-100">
              <span className="block text-xs font-bold">Check out</span>
              <input
                type="date"
                value={checkout}
                min={checkin || undefined}
                onChange={(event) => setCheckout(event.target.value)}
                className="w-full bg-transparent text-sm text-muted outline-none"
              />
            </label>
            <span className="h-8 w-px bg-[#dddddd]" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setWhoOpen((open) => !open)}
                className="w-[130px] rounded-full px-4 py-2 text-left hover:bg-neutral-100"
              >
                <span className="block text-xs font-bold">Who</span>
                <span className={`block truncate text-sm ${guestLabel === "Add guests" ? "text-muted" : "text-ink"}`}>
                  {guestLabel}
                </span>
              </button>
              {whoOpen ? (
                <div className="absolute right-0 top-16 z-50 w-80 rounded-3xl border border-[#ebebeb] bg-white p-5 shadow-xl">
                  <WhoRow label="Adults" caption="Ages 13 or above" value={adults} onChange={setAdults} />
                  <WhoRow
                    label="Children"
                    caption="Ages 2–12"
                    value={childrenCount}
                    onChange={setChildrenCount}
                  />
                  <WhoRow label="Infants" caption="Under 2" value={infants} onChange={setInfants} />
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="mr-2 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rausch text-white"
            >
              <Search size={18} strokeWidth={2.5} />
            </button>
          </div>
          {whereOpen ? (
            <div className="absolute left-0 top-[74px] z-50 w-[360px] rounded-3xl border border-[#ebebeb] bg-white p-4 shadow-xl">
              <p className="px-2 pb-2 text-xs font-bold text-muted">Suggested destinations</p>
              {(whereSuggestions.length > 0 ? whereSuggestions : SAMPLE_CITIES).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => search(city)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left hover:bg-neutral-100"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f2f2f2]">
                    <Search size={16} />
                  </span>
                  <span className="font-semibold">{city}</span>
                </button>
              ))}
            </div>
          ) : null}
        </form>
        <div className="flex items-center justify-end gap-1">
          <Link
            href="/brand/jackson-commons"
            className="hidden rounded-full px-4 py-3 text-sm font-semibold hover:bg-neutral-100 xl:inline"
          >
            Host a collection
          </Link>
          <GlobeButton open={globeOpen} setOpen={setGlobeOpen} setMenuOpen={setMenuOpen} />
          <MenuButton open={menuOpen} setOpen={setMenuOpen} setGlobeOpen={setGlobeOpen} />
        </div>
      </div>

      {pathname === "/" ? <CategoryRow active={category} /> : <div className="border-b border-[#ebebeb]" />}

      {(menuOpen || globeOpen || whoOpen || whereOpen) && (
        <button
          type="button"
          aria-label="Dismiss menu"
          className="fixed inset-0 z-30 cursor-default"
          onClick={() => {
            setMenuOpen(false);
            setGlobeOpen(false);
            setWhoOpen(false);
            setWhereOpen(false);
          }}
        />
      )}

      <SearchSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        where={where}
        setWhere={setWhere}
        checkin={checkin}
        setCheckin={setCheckin}
        checkout={checkout}
        setCheckout={setCheckout}
        adults={adults}
        setAdults={setAdults}
        childrenCount={childrenCount}
        setChildrenCount={setChildrenCount}
        infants={infants}
        setInfants={setInfants}
        onSearch={search}
      />
    </div>
  );
}

function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="airbnb home, concept mockup"
      className="text-[1.65rem] font-extrabold leading-none tracking-[-0.05em] text-rausch"
    >
      airbnb
    </Link>
  );
}

function GlobeButton({
  open,
  setOpen,
  setMenuOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <div className="relative z-40">
      <button
        type="button"
        aria-label="Language and currency"
        aria-expanded={open}
        onClick={() => {
          setMenuOpen(false);
          setOpen(!open);
        }}
        className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
      >
        <Globe size={18} />
      </button>
      {open ? (
        <div className="absolute right-0 top-11 z-50 w-56 rounded-2xl border border-[#ebebeb] bg-white p-4 text-sm shadow-xl">
          <p className="font-semibold">English (US)</p>
          <p className="mt-1 text-muted">$ USD</p>
          <p className="mt-3 text-xs text-muted">Preview only. This mockup does not translate.</p>
        </div>
      ) : null}
    </div>
  );
}

function MenuButton({
  open,
  setOpen,
  setGlobeOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setGlobeOpen: (open: boolean) => void;
}) {
  return (
    <div className="relative z-40">
      <button
        type="button"
        aria-label="Main menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          setGlobeOpen(false);
          setOpen(!open);
        }}
        className="flex h-10 items-center gap-2 rounded-full border border-[#dddddd] py-1 pl-3 pr-1 hover:shadow-md"
      >
        <Menu size={16} />
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#717171] text-white">
          <UserRound size={16} />
        </span>
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-[#ebebeb] bg-white py-2 shadow-xl"
        >
          <MenuLink href="/login">Log in</MenuLink>
          <MenuLink href="/wishlists">Wishlists</MenuLink>
          <MenuLink href="/brand/jackson-commons">Jackson Commons collection</MenuLink>
          <p className="px-4 py-3 text-xs text-muted">Concept mockup. No account is created.</p>
        </div>
      ) : null}
    </div>
  );
}

function MenuLink({ href, children }: { href: "/login" | "/wishlists" | "/brand/jackson-commons"; children: string }) {
  return (
    <Link href={href} role="menuitem" className="block px-4 py-3 text-sm font-semibold hover:bg-neutral-50">
      {children}
    </Link>
  );
}

function WhoRow({
  label,
  caption,
  value,
  onChange,
}: {
  label: string;
  caption: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#ebebeb] py-3 last:border-b-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted">{caption}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
        >
          <Minus size={14} />
        </button>
        <span className="w-4 text-center text-sm">{value}</span>
        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= 16}
          onClick={() => onChange(Math.min(16, value + 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-[#b0b0b0] disabled:opacity-30"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

export function HeaderFallback() {
  return <div className="h-[168px] border-b border-[#ebebeb] bg-white md:h-[92px]" />;
}
