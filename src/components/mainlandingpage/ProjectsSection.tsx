'use client'

import React, { useState } from "react";

// Static array of 10 before/after image pairs
const works = [
  { id: 1, before: "/beforeafter/1.avif", after: "/beforeafter/1a.avif" },
  { id: 2, before: "/beforeafter/2.avif", after: "/beforeafter/2a.avif" },
  { id: 3, before: "/beforeafter/3.avif", after: "/beforeafter/3a.avif" },
  { id: 4, before: "/beforeafter/4.avif", after: "/beforeafter/4a.avif" },
  { id: 5, before: "/beforeafter/5.avif", after: "/beforeafter/5a.avif" },
  { id: 6, before: "/beforeafter/6.avif", after: "/beforeafter/6a.avif" },
  { id: 7, before: "/beforeafter/7.avif", after: "/beforeafter/7a.avif" },
  { id: 8, before: "/beforeafter/8.avif", after: "/beforeafter/8a.avif" },
  { id: 9, before: "/beforeafter/9.avif", after: "/beforeafter/9a.avif" },
  { id: 10, before: "/beforeafter/10.avif", after: "/beforeafter/10a.avif" },
];

// Reusable Image Comparison Component
const ImageComparisonSlider = ({ before, after }: any) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (event: any) => {
    setSliderPosition(event.target.value);
  };

  return (
    <div className="group relative block aspect-[20/9] overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl">
      {/* After Image (Background) */}
      <img
        alt="After redesign"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
        src={before}
      />

      {/* Before Image (Foreground, clipped based on slider position) */}
      <img
        alt="Before redesign"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top"
        src={after}
        
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      />

      {/* Custom Slider Line & Thumb */}
      <div
        className="pointer-events-none absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          {/* Left/Right Arrow SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L5.25 12l3-3m7.5 6l3-3-3-3"
            />
          </svg>
        </div>
      </div>

      {/* Invisible Range Input for Interaction */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />

    </div>
  );
};

export default function WorkSection() {
  return (
    <section className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-20">
      <div
        data-slot="container"
        className="mx-auto relative flex w-full flex-col gap-20 overflow-hidden px-4 pt-40 pb-20 sm:px-6 md:pt-65 md:pb-30 lg:px-8 lg:pb-30"
      >
        <div>
          <h2 className="from-[#8C8879] to-transparent bg-gradient-to-b bg-clip-text text-transparent absolute top-20 overflow-hidden opacity-25 -tracking-xl text-6xl font-medium md:top-30 md:text-8xl lg:top-50 lg:text-[10rem]">
            Work
          </h2>
        </div>

        {/* Updated structure: 1 column on small screens, 2 columns on large screens */}
        <div className="z-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {works.map((work) => (
            <ImageComparisonSlider
              key={work.id}
              before={work.before}
              after={work.after}
            />
          ))}
        </div>
      </div>
    </section>
  );
}