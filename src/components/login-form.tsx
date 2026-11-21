"use client";

import { useState } from "react";

export function LoginForm() {
  const [notice, setNotice] = useState("");

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice("Preview only. No account was created and nothing was stored.");
      }}
    >
      <label className="block text-sm font-semibold">
        Email
        <input
          type="email"
          name="email"
          autoComplete="username"
          required
          placeholder="you@example.com"
          className="mt-1 w-full rounded-xl border border-[#dddddd] px-4 py-3 font-normal outline-none focus:border-ink"
        />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className="mt-1 w-full rounded-xl border border-[#dddddd] px-4 py-3 font-normal outline-none focus:border-ink"
        />
      </label>
      <button type="submit" className="w-full rounded-xl bg-rausch py-3.5 font-semibold text-white">
        Continue
      </button>
      {notice ? <p className="rounded-xl bg-[#f7f7f7] px-4 py-3 text-sm">{notice}</p> : null}
    </form>
  );
}
