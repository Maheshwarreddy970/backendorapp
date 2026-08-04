"use client";

import * as React from "react";
import { DottedMap } from "./dotted-map";
import { HOSTING_CARD_DATA, MyMarker } from "./carddata";

export default function HostingCard() {
  const id = React.useId();

  return (
    <div className="bg-natural-black relative col-span-1 min-h-[var(--box-min-height)] overflow-hidden rounded-2xl lg:col-span-3">
      <div className="relative h-full min-h-[400px]">
        <h2 className="relative z-50 p-4 text-base font-medium text-white">
          {HOSTING_CARD_DATA.heading}
        </h2>
        
        <div className="absolute inset-0 w-full overflow-hidden bg-neutral-950 mask-t-from-50% mask-radial-from-90%">
          <div className="absolute inset-0 flex items-center justify-center [&>svg]:fill-white">
            <DottedMap<MyMarker>
              markers={HOSTING_CARD_DATA.markers as MyMarker[]}
              dotColor="#ffffff"
              renderMarkerOverlay={({ marker, x, y, r, index }) => {
                const { countryCode, label } = marker.overlay;
                const href = `https://flagcdn.com/w80/${countryCode}.webp`;

                const clipId = `${id}-flag-clip-${index}`.replace(/:/g, "-");
                const imgR = r * 0.75;
                const fontSize = r * 0.9;
                const pillH = r * 1.5;
                const pillW = label.length * (fontSize * 0.62) + r * 1.4;
                const pillX = x + r + r * 0.6;
                const pillY = y - pillH / 2;

                return (
                  <g key={index} style={{ pointerEvents: "none" }}>
                    <circle cx={x} cy={y} r={imgR} fill="rgba(255,255,255,0.2)">
                      <animate
                        attributeName="r"
                        values={`${imgR}; ${imgR * 4}`}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1; 0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <clipPath id={clipId}>
                      <circle cx={x} cy={y} r={imgR} />
                    </clipPath>

                    <circle cx={x} cy={y} r={imgR + 0.5} fill="#404040" />

                    <image
                      href={href}
                      x={x - imgR}
                      y={y - imgR}
                      width={imgR * 2}
                      height={imgR * 2}
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#${clipId})`}
                    />

                    <rect
                      x={pillX}
                      y={pillY}
                      width={pillW}
                      height={pillH}
                      rx={pillH / 2}
                      fill="rgba(0,0,0,0.65)"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth={0.5}
                    />
                    
                    <text
                      x={pillX + r * 0.7}
                      y={y + fontSize * 0.35}
                      fontSize={fontSize}
                      fill="white"
                    >
                      {label}
                    </text>
                  </g>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}