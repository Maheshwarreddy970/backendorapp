import React from "react";

export const componentsCardData = {
  componentsCard: {
    title: "Lightning-Fast Mobile Layouts",
    bgImages: [
      {
        src: "/svg-image-19.svg",
        alt: "Background Path 1",
        width: 201,
        height: 166,
        positionClass: "absolute bottom-6.5 left-0"
      },
      {
        src: "/svg-image-20.svg",
        alt: "Background Path 2",
        width: 303,
        height: 124,
        positionClass: "absolute top-1 left-0"
      },
      {
        src: "/svg-image-21.svg",
        alt: "Background Path 3",
        width: 167,
        height: 56,
        positionClass: "absolute right-0.5 bottom-1"
      }
    ]
  },
};

export default function ComponentsCard() {
  const { title, bgImages } = componentsCardData.componentsCard;

  return (
    <div className="col-span-1 min-h-[var(--box-min-height)] overflow-hidden rounded-2xl border border-gray-300 bg-white shadow lg:col-span-2">
      <div className="relative p-4">
        <div className="absolute inset-0">
          <div className="relative ml-4 h-[314px] w-[336px] scale-110 overflow-hidden mask-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(0,0,0,1)_50%)]">
            
            {/* Render dynamic background SVG images */}
            {bgImages.map((img) => (
              <div key={img.src} className={img.positionClass}>
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="pointer-events-none"
                />
              </div>
            ))}

            <div className="absolute -bottom-48 left-12 -translate-x-full -translate-y-full">
              <div className="absolute -top-3 right-8 h-3 w-1.5 bg-[#EEEEEE]" />
              <div className="relative size-28 rounded-3xl bg-white/50 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]" />
            </div>

            {/* Central Animated Node */}
            <div
              className="absolute bottom-16 right-3"
              style={{ animation: "float-box 4s ease-in-out infinite" }}
            >
              <div className="absolute -inset-3">
                {/* Left Vertical Flowing Dots */}
                <div
                  className="absolute top-1/2 h-20 w-3 -translate-y-1/2"
                  style={{ animation: "flow-vertical 1.5s linear infinite" }}
                >
                  {[0, 17, 34, 51, 68].map((top) => (
                    <div key={top} className="absolute left-0 h-1.5 w-3 bg-[#EEEEEE]" style={{ top: `${top}px` }} />
                  ))}
                </div>

                {/* Right Vertical Flowing Dots */}
                <div
                  className="absolute right-0 top-1/2 h-20 w-3 -translate-y-1/2"
                  style={{ animation: "flow-vertical 1.5s linear infinite 0.75s" }}
                >
                  {[0, 17, 34, 51, 68].map((top) => (
                    <div key={top} className="absolute right-0 h-1.5 w-3 bg-[#EEEEEE]" style={{ top: `${top}px` }} />
                  ))}
                </div>

                {/* Top Horizontal Flowing Dots */}
                <div
                  className="absolute left-1/2 flex h-3 w-20 -translate-x-1/2 items-center gap-3"
                  style={{ animation: "flow-horizontal 1.5s linear infinite 0.3s" }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-3 w-1.5 self-stretch bg-[#EEEEEE]" />
                  ))}
                </div>

                {/* Bottom Horizontal Flowing Dots */}
                <div
                  className="absolute bottom-0 left-1/2 flex h-3 w-20 -translate-x-1/2 items-center gap-3"
                  style={{ animation: "flow-horizontal 1.5s linear infinite 1.05s" }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-3 w-1.5 self-stretch bg-[#EEEEEE]" />
                  ))}
                </div>
              </div>

              {/* Glowing Orange Box */}
              <div className="relative size-28 overflow-hidden rounded-3xl bg-[var(--color-primary)] shadow-[0px_3.2px_9.6px_0px_rgba(0,0,0,0.12)]">
                <div className="absolute left-[26.80px] top-[-25.60px] size-16 rounded-full bg-orange-200 blur-[48px]" />
                <div className="absolute left-[-47.20px] top-[82.38px] h-32 w-5 origin-top-left rotate-[-59.09deg] rounded-full bg-orange-200 blur-[48px]" />
                <div className="absolute left-[113.80px] top-[-35.30px] h-16 w-14 rounded-full bg-white blur-[48px]" />
                <div className="absolute left-[63.20px] top-[45.60px] h-44 w-36 rounded-full bg-orange-200/60 blur-[160px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-lg font-medium leading-6 tracking-tight text-black">
          {title}
        </div>
      </div>
    </div>
  );
}