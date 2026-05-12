"use client";

import Image from "next/image";

const ROW_A = [1, 3, 5, 7, 9, 11, 13];
const ROW_B = [2, 4, 6, 8, 10, 12, 14];

function PhotoCard({ n }: { n: number }) {
  return (
    <div className="relative flex-shrink-0 w-40 sm:w-48 bg-white p-1.5 pb-8 mx-2 shadow-sm">
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <Image
          src={`/images/photo${n}.jpeg`}
          alt=""
          fill
          className="object-cover"
          sizes="192px"
        />
      </div>
    </div>
  );
}

export function PhotoStrip() {
  return (
    <section
      className="py-16 bg-surface overflow-hidden group"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* Row 1 — forward */}
      <div className="flex mb-3">
        <div className="flex shrink-0 animate-marquee-fwd group-hover:[animation-play-state:paused]">
          {[...ROW_A, ...ROW_A].map((n, i) => (
            <PhotoCard key={i} n={n} />
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="flex">
        <div className="flex shrink-0 animate-marquee-rev group-hover:[animation-play-state:paused]">
          {[...ROW_B, ...ROW_B].map((n, i) => (
            <PhotoCard key={i} n={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
