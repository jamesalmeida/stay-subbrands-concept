import { BottomNav } from "@/components/bottom-nav";
import { ConceptBanner, SiteFooter } from "@/components/site-footer";
import { Header, HeaderFallback } from "@/components/header";
import { WishlistProvider } from "@/components/wishlist";
import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "airbnb",
    template: "%s · airbnb",
  },
  description:
    "Concept mockup of host sub-brands inside a vacation-rental marketplace. Not affiliated with Airbnb.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-ink">
        <WishlistProvider>
          <div className="sticky top-0 z-40 bg-white">
            <ConceptBanner />
            <Suspense fallback={<HeaderFallback />}>
              <Header />
            </Suspense>
          </div>
          <main className="pb-24 md:pb-0">
            {children}
            <SiteFooter />
          </main>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </WishlistProvider>
      </body>
    </html>
  );
}
