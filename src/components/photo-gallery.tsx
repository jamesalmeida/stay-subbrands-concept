"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function PhotoGallery({
  title,
  city,
  images,
}: {
  title: string;
  city: string;
  images: string[];
}) {
  const [index, setIndex] = useState(0);
  const photo = images[index] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-neutral-100 sm:aspect-[16/10]">
        {photo ? (
          <Image
            src={photo}
            alt={`${title} in ${city}, photo ${index + 1} of ${images.length}`}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        ) : null}
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setIndex((current) => (current - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setIndex((current) => (current + 1) % images.length)}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white shadow"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, dot) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${dot + 1}`}
              onClick={() => setIndex(dot)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl ${
                dot === index ? "ring-2 ring-ink" : "opacity-80"
              }`}
            >
              <Image src={src} alt={`${title}, thumbnail ${dot + 1}`} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
