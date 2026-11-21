"use client";

import { useState } from "react";

export function ReserveButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-rausch py-3.5 text-base font-semibold text-white"
      >
        Reserve
      </button>
      <p className="mt-2 text-center text-xs text-muted">You will not be charged. This is a preview.</p>
      {open ? (
        <div className="mt-4 rounded-2xl bg-[#f7f7f7] p-4 text-sm leading-6">
          <p className="font-semibold">Preview only</p>
          <p className="mt-1 text-muted">
            Concept mockup, not affiliated with Airbnb. No request is sent and no payment is taken.
          </p>
          <button type="button" onClick={() => setOpen(false)} className="mt-3 font-semibold underline">
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
