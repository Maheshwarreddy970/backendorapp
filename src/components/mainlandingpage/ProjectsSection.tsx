import React from "react";

const templates = [
  { website: "https://nexpetcareone.netlify.app/", logoUrl: "template/oneimg.webp", tag: "Minimal" },
  { website: "https://nexpetcarenine.netlify.app/", logoUrl: "template/nineimg.webp", tag: "Editorial" },
  { website: "https://nexpetcarefour.netlify.app/", logoUrl: "template/fourimg.webp", tag: "Editorial" },
  { website: "https://nexpetcaretwelve.netlify.app/", logoUrl: "template/twelveimg.webp", tag: "Warm" },
  { website: "https://nexpetcaretwo.netlify.app/", logoUrl: "template/twoimg.webp", tag: "Warm" },
  { website: "https://nexpetcareten.netlify.app/", logoUrl: "template/tenimg.webp", tag: "Playful" },
  { website: "https://nexpetcareseven.netlify.app/", logoUrl: "template/sevenimg.webp", tag: "Warm" },
  { website: "https://nexpetcarefive.netlify.app/", logoUrl: "template/fiveimg.webp", tag: "Playful" },
  { website: "https://nexpetcaresix.netlify.app/", logoUrl: "template/siximg.webp", tag: "Minimal" },
  { website: "https://nexpetcarethree.netlify.app/", logoUrl: "template/threeimg.webp", tag: "Bold" },
  { website: "https://nexpetcareeight.netlify.app/", logoUrl: "template/eightimg.webp", tag: "Bold" }, // Fixed missing slash in original URL
  { website: "https://nexpetcareeleven.netlify.app/", logoUrl: "template/elevenimg.webp", tag: "Minimal" },
];

export default function TemplatesSection() {
  return (
    <section className="w-full">
      <div
        data-slot="container"
        className="mx-auto relative flex w-full max-w-7xl flex-col gap-20 overflow-hidden px-4 pt-40 pb-20 sm:px-6 md:pt-65 md:pb-30 lg:px-8 lg:pt-80 lg:pb-30"
      >
        <div>
          <h2 className="from-[#8C8879] to-transparent bg-gradient-to-b bg-clip-text text-transparent absolute top-20 overflow-hidden opacity-25 -tracking-xl text-6xl font-medium md:top-30 md:text-8xl lg:top-50 lg:text-[10rem]">
            Templates
          </h2>
        </div>
        
        {/* Updated structure: A clean, uniform grid ensuring all preview images are clearly visible */}
        <div className="z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <a
              key={index}
              href={template.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Image with subtle zoom on hover (no text overlays blocking it) */}
              <img
                alt={`${template.tag} Template Preview`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                src={template.logoUrl}
              />
              
              {/* Optional: Small static badge to show the 'tag' without blocking the image */}
              <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm backdrop-blur-md">
                {template.tag}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}