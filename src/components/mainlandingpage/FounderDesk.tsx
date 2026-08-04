// components/FounderDesk.tsx
import React from "react";

export const FOUNDER_DATA = {
  title: "The Founder’s Desk",
  image: {
    alt: "Maheshwar's Desk",
    src: "/me.jpg",
    width: 1200,
    height: 1200,
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/maheshwarr-reddy-713927258/",
    youtube: "https://www.youtube.com/@Nexpetcare", 
  },
  content: {
    greeting: "Hi, ",
    name: "I'm Maheshwar.",
    paragraph1: " I build technology exclusively for the pet boarding and grooming industry. While people call me a software engineer, I prefer to call myself a digital growth partner for pet businesses :)",
    paragraph2: "I started NexPetCare because I saw too many amazing groomers, kennels, and spas losing clients due to outdated, non-mobile-friendly websites and expensive monthly agency fees.",
    paragraph3Start: "We build systems that give you full ownership of your digital storefront. I also post relevant tech tips ",
    twitterLink: "https://www.youtube.com/@Nexpetcare",
    twitterLinkText: "on my YouTube channel",
    paragraph3End: " to help pet business owners scale.",
  },
};
export default function FounderDesk() {
  const { title, image, socialLinks, content } = FOUNDER_DATA;

  return (
    <section className="bg-natural-black text-white relative w-full overflow-hidden bg-black">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative h-full w-full">
          <div className="absolute top-71 -left-140 h-125.5 w-122 rounded-full bg-white/10 blur-[214px]" />
          <div className="absolute top-0 -left-40 h-293 w-180 rounded-full bg-[#27251F] blur-[287px]" />
          <div className="absolute top-0 -right-100 h-293.75 w-180 rounded-full bg-[#27251F] blur-[287px]" />
          <div className="absolute top-10 right-52 h-141 w-197 bg-[linear-gradient(to_right,#181816_1px,transparent_1px),linear-gradient(to_bottom,#181816_1px,transparent_1px)] bg-[size:44px_44px] mask-[radial-gradient(circle,black_10%,transparent_100%)]" />
        </div>
      </div>

      <div
        data-slot="container"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 flex w-full flex-col gap-12 pt-20 pb-30 lg:gap-16"
      >
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl font-medium tracking-tight text-white">
          {title}
        </h2>

        {/* Content Grid */}
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">

          {/* Left: Image */}
          <div className="relative lg:col-span-2">
            <img
              alt={image.alt}
              loading="lazy"
              width={image.width}
              height={image.height}
              className="w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
              src={image.src}
            />
          </div>

          {/* Right: Text & Socials */}
          <div className="flex h-full w-full flex-col justify-center gap-8 lg:col-span-3">

            {/* Social Icons (Aligned left on mobile, right on desktop) */}
            <div className="flex justify-start lg:justify-end">
              <div className="flex items-center gap-6">
               
                <a target="_blank" rel="noreferrer" href={socialLinks.linkedin} className="group">
                  <svg className="size-5 text-neutral-500 transition-colors group-hover:text-white" viewBox="0 0 256 256">
                    <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="currentColor" />
                  </svg>
                </a>
                <a target="_blank" rel="noreferrer" href={socialLinks.youtube} className="group text-neutral-500 fill-neutral-500 transition-colors hover:text-white hover:fill-white">
                  <svg className=" " width="32px" height="32px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><defs><style></style></defs><title></title><path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z"/></svg>
                </a>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-neutral-300">
              <p>
                {content.greeting}
                <span className="font-semibold text-white">{content.name}</span>
                {content.paragraph1}
              </p>

              <p>
                {content.paragraph2}
                <br /><br />
                {content.paragraph3Start}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                  href={content.twitterLink}
                >
                  {content.twitterLinkText}
                </a>
                {content.paragraph3End}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}