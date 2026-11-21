"use client";

import { SAMPLE_CITIES } from "@/lib/search";
import { Minus, Plus, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type SearchSheetProps = {
  open: boolean;
  onClose: () => void;
  where: string;
  setWhere: (value: string) => void;
  checkin: string;
  setCheckin: (value: string) => void;
  checkout: string;
  setCheckout: (value: string) => void;
  adults: number;
  setAdults: (value: number) => void;
  childrenCount: number;
  setChildrenCount: (value: number) => void;
  infants: number;
  setInfants: (value: number) => void;
  onSearch: (overrideWhere?: string) => void;
};

export function SearchSheet({
  open,
  onClose,
  where,
  setWhere,
  checkin,
  setCheckin,
  checkout,
  setCheckout,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  infants,
  setInfants,
  onSearch,
}: SearchSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const query = where.trim().toLowerCase();
  const suggestions = SAMPLE_CITIES.filter((city) => city.toLowerCase().includes(query));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search stays"
      className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-neutral-100"
        >
          <X size={20} />
        </button>
        <p className="text-sm font-semibold">Stays</p>
        <span className="w-10" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <label className="block rounded-3xl border border-[#dddddd] p-5 shadow-sm">
          <span className="text-2xl font-semibold">Where</span>
          <input
            ref={inputRef}
            value={where}
            onChange={(event) => setWhere(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSearch();
            }}
            placeholder="Search destinations"
            autoComplete="off"
            className="mt-3 w-full rounded-xl bg-[#f7f7f7] px-4 py-4 text-base outline-none placeholder:text-muted"
          />
        </label>
        <div className="mt-4">
          <p className="px-1 text-sm font-semibold">
            {query ? "Matching destinations" : "Suggested destinations"}
          </p>
          <ul className="mt-2">
            {(suggestions.length > 0 ? suggestions : SAMPLE_CITIES).map((city) => (
              <li key={city}>
                <button
                  type="button"
                  onClick={() => onSearch(city)}
                  className="flex w-full items-center gap-4 rounded-2xl px-1 py-3 text-left hover:bg-neutral-50"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#f2f2f2]">
                    <Search size={18} />
                  </span>
                  <span>
                    <span className="block font-semibold">{city}</span>
                    <span className="block text-sm text-muted">Los Angeles area · sample stays</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 rounded-3xl border border-[#dddddd] p-5">
          <p className="text-lg font-semibold">When</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="font-semibold">Check in</span>
              <input
                type="date"
                value={checkin}
                onChange={(event) => {
                  const value = event.target.value;
                  setCheckin(value);
                  if (checkout && value && checkout < value) setCheckout("");
                }}
                className="mt-2 w-full rounded-xl border border-[#dddddd] px-3 py-3"
              />
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Check out</span>
              <input
                type="date"
                value={checkout}
                min={checkin || undefined}
                onChange={(event) => setCheckout(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#dddddd] px-3 py-3"
              />
            </label>
          </div>
        </div>
        <div className="mt-4 rounded-3xl border border-[#dddddd] px-5">
          <p className="pt-5 text-lg font-semibold">Who</p>
          <Stepper label="Adults" caption="Ages 13 or above" value={adults} onChange={setAdults} />
          <Stepper
            label="Children"
            caption="Ages 2–12"
            value={childrenCount}
            onChange={setChildrenCount}
          />
          <Stepper label="Infants" caption="Under 2" value={infants} onChange={setInfants} />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex items-center justify-between border-t border-[#ebebeb] bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => {
            setWhere("");
            setCheckin("");
            setCheckout("");
            setAdults(0);
            setChildrenCount(0);
            setInfants(0);
          }}
          className="text-sm font-semibold underline"
        >
          Clear all
        </button>
        <button
          type="button"
          onClick={() => onSearch()}
          className="inline-flex items-center gap-2 rounded-xl bg-rausch px-6 py-3.5 text-base font-semibold text-white"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>,
    document.body,
  );
}

function Stepper({
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
    <div className="flex items-center justify-between border-b border-[#ebebeb] py-4 last:border-b-0">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted">{caption}</p>
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
        <span className="w-5 text-center text-sm">{value}</span>
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
