export function money(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating: number): string {
  return rating.toFixed(2);
}

export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatStayRange(checkin: string, checkout: string): string {
  if (checkin && checkout) return `${formatIsoDate(checkin)} – ${formatIsoDate(checkout)}`;
  if (checkin) return `From ${formatIsoDate(checkin)}`;
  if (checkout) return `Until ${formatIsoDate(checkout)}`;
  return "";
}

export function guestSummary(adults: number, children: number, infants: number): string {
  const guests = adults + children;
  if (guests <= 0 && infants <= 0) return "";
  const parts: string[] = [];
  if (guests > 0) parts.push(`${guests} guest${guests === 1 ? "" : "s"}`);
  if (infants > 0) parts.push(`${infants} infant${infants === 1 ? "" : "s"}`);
  return parts.join(", ");
}
