import { WishlistsView } from "@/components/wishlists-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlists",
};

export default function WishlistsPage() {
  return (
    <div className="mx-auto w-full max-w-[1760px] px-5 py-6 md:px-10 md:py-8">
      <h1 className="text-[26px] font-semibold md:text-[32px]">Wishlists</h1>
      <p className="mt-1 text-sm text-muted">Saved on this device. Nothing is sent to a server.</p>
      <div className="mt-6">
        <WishlistsView />
      </div>
    </div>
  );
}
