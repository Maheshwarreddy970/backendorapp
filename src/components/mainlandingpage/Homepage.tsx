import React from 'react'




export default function Homepage({ content  }: any) {
  const { badge, heading, subheading, cta, watermark } = content

  return (
    <div className="h-[60vh] text-white w-full p-2 md:h-screen">
      <div className="text-white relative m-0 h-full w-full overflow-hidden rounded-3xl bg-black">
        {/* Theme tokens derived from --color-primary — change the one variable, everything below follows */}
        <style>{`
          .theme-scope {
            --glow-strong: var(--color-primary);
            --glow-mid: color-mix(in srgb, var(--color-primary) 75%, white 25%);
            --glow-soft: color-mix(in srgb, var(--color-primary) 55%, white 45%);
            --glow-dim: color-mix(in srgb, var(--color-primary) 70%, black 30%);
          }
        `}</style>

        <div className="absolute inset-0 h-full w-full theme-scope">
          <div
            className="absolute -bottom-75 left-1/2 flex h-full w-full -translate-x-1/2 justify-center"
            style={{ opacity: 1 }}
          >
            <div className="w-fit">
              <svg
                width={1951}
                height={1806}
                viewBox="0 0 1951 1806"
                fill="none"
                overflow="visible"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 1 }}
              >
                <path
                  d="M975.5 255C1402.88 255 1749 569.029 1749 956C1749 1342.97 1402.88 1657 975.5 1657C548.119 1657 202 1342.97 202 956C202 569.029 548.119 255 975.5 255Z"
                  stroke="url(#paint0_linear_2693_2731)"
                  strokeWidth={4}
                />
                <path
                  opacity="0.4"
                  d="M975.5 253.5C1403.57 253.5 1750.5 568.065 1750.5 956C1750.5 1343.93 1403.57 1658.5 975.5 1658.5C547.432 1658.5 200.5 1343.93 200.5 956C200.5 568.065 547.432 253.5 975.5 253.5Z"
                  stroke="url(#paint1_linear_2693_2731)"
                />
                <g style={{ filter: "blur(12px)", mixBlendMode: "plus-lighter" }}>
                  <path
                    d="M975.5 255C1402.88 255 1749 569.029 1749 956C1749 1342.97 1402.88 1657 975.5 1657C548.119 1657 202 1342.97 202 956C202 569.029 548.119 255 975.5 255Z"
                    stroke="url(#paint2_linear_2693_2731)"
                    strokeWidth={4}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(30px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                    stroke="url(#paint3_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(30px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                    stroke="url(#paint4_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(40px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                    stroke="url(#paint5_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(50px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 255C1398.3 255 1739 565.452 1739 946C1739 1326.55 1398.3 1637 975.5 1637C552.695 1637 212 1326.55 212 946C212 565.452 552.695 255 975.5 255Z"
                    stroke="url(#paint6_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(50px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 212C1398.3 212 1739 522.452 1739 903C1739 1283.55 1398.3 1594 975.5 1594C552.695 1594 212 1283.55 212 903C212 522.452 552.695 212 975.5 212Z"
                    stroke="url(#paint7_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <g
                  opacity="0.4"
                  style={{ filter: "blur(100px)", mixBlendMode: "plus-lighter" }}
                >
                  <path
                    d="M975.5 212C1398.3 212 1739 522.452 1739 903C1739 1283.55 1398.3 1594 975.5 1594C552.695 1594 212 1283.55 212 903C212 522.452 552.695 212 975.5 212Z"
                    stroke="url(#paint8_linear_2693_2731)"
                    strokeWidth={24}
                  />
                </g>
                <defs>
                  <linearGradient id="paint0_linear_2693_2731" x1={976} y1="108.5" x2={976} y2="313.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-strong)" />
                    <stop offset={1} stopColor="var(--glow-strong)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint1_linear_2693_2731" x1={976} y1="108.5" x2={976} y2={582} gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-strong)" />
                    <stop offset={1} stopColor="var(--glow-strong)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint2_linear_2693_2731" x1="975.5" y1={253} x2={976} y2={392} gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-strong)" />
                    <stop offset={1} stopColor="var(--glow-strong)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint3_linear_2693_2731" x1="975.5" y1={243} x2={976} y2="468.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-strong)" />
                    <stop offset={1} stopColor="var(--glow-strong)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint4_linear_2693_2731" x1="975.5" y1={243} x2={976} y2="328.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-strong)" />
                    <stop offset={1} stopColor="var(--glow-strong)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint5_linear_2693_2731" x1="975.5" y1={243} x2={976} y2={334} gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-mid)" />
                    <stop offset={1} stopColor="var(--glow-mid)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint6_linear_2693_2731" x1="975.5" y1={243} x2={976} y2={361} gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-mid)" />
                    <stop offset={1} stopColor="var(--glow-mid)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint7_linear_2693_2731" x1="975.5" y1={200} x2={976} y2="336.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--glow-mid)" />
                    <stop offset={1} stopColor="var(--glow-mid)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="paint8_linear_2693_2731" x1="975.5" y1={200} x2={976} y2="780.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset={1} stopColor="white" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div
            className="absolute -bottom-10 left-1/2 z-0 flex h-full w-full -translate-x-1/2 justify-center"
            style={{ opacity: 1 }}
          >
            <div className="w-fit">
              <img src="/dots.png" width="822" height="158" className="animate-pulse" alt="" />
            </div>
          </div>

          <div
            className="absolute bottom-0 left-1/2 z-5 flex h-full w-full -translate-x-1/2 justify-center"
            style={{ opacity: "0.4" }}
          >
            <div className="w-fit">
              <svg width={1424} height={651} viewBox="0 0 1424 651" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_2693_2600)" style={{ mixBlendMode: "plus-lighter" }}>
                  <path
                    d="M611.5 51L495 -188H959L849.5 51H611.5Z"
                    fill="var(--glow-strong)"
                    fillOpacity="0.1"
                  />
                </g>
                <g filter="url(#filter1_f_2693_2600)" style={{ mixBlendMode: "plus-lighter" }}>
                  <path
                    d="M611.5 219L495 -188H959L849.5 219H611.5Z"
                    fill="var(--glow-soft)"
                  />
                </g>
                <g filter="url(#filter2_f_2693_2600)" style={{ mixBlendMode: "plus-lighter" }}>
                  <path
                    d="M656.49 43L568 -219H829L768.219 43H656.49Z"
                    fill="var(--glow-mid)"
                    fillOpacity="0.8"
                  />
                </g>
                <defs>
                  <filter id="filter0_f_2693_2600" x={-105} y={-788} width={1664} height={1439} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation={300} result="effect1_foregroundBlur_2693_2600" />
                  </filter>
                  <filter id="filter1_f_2693_2600" x={95} y={-588} width={1264} height={1207} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation={200} result="effect1_foregroundBlur_2693_2600" />
                  </filter>
                  <filter id="filter2_f_2693_2600" x={408} y={-379} width={581} height={582} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation={80} result="effect1_foregroundBlur_2693_2600" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div
          data-slot="container"
          className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-12 relative z-10 flex h-full flex-col justify-between"
        >
          <div className="pt-32 md:pt-42 lg:pt-75">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit rounded-full bg-neutral-900 p-1 shadow-lg shadow-black"
              href={badge.url}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="rounded-full bg-neutral-950 px-2 py-1 text-[10px] sm:text-xs">
                  {badge.label}
                </div>
                <div className="text-white rounded-full pr-2 text-[10px] sm:text-xs">
                  {badge.subtext}
                </div>
              </div>
            </a>

            <div className="mt-6 flex flex-col items-start gap-6 md:mt-10 lg:flex-row lg:gap-10">
              <h1 className="text-white -tracking-xl text-3xl font-semibold text-balance sm:text-4xl md:text-5xl lg:text-7xl">
                {heading}
              </h1>
              <div className="lg:max-w-md">
                <h2 className="text-sm font-medium text-balance text-neutral-300 sm:text-base lg:text-lg">
                  {subheading}
                </h2>
                <button className="group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2 pr-4 pl-11 tracking-tight mt-6 md:mt-8">
                  <div
                    data-slot="button-box"
                    className="bg-primary absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-400 ease-out group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180 group-hover:transform"
                  >
                    <div className="flex flex-col gap-px group-hover:hidden">
                      <div className="flex gap-px">
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      </div>
                      <div className="flex gap-px">
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      </div>
                      <div className="flex gap-px">
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                      </div>
                      <div className="flex gap-px">
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      </div>
                      <div className="flex gap-px">
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white duration-200 ease-linear" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                        <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25" />
                      </div>
                    </div>
                    <img
                      alt={cta.avatar.alt}
                      loading="lazy"
                      width={32}
                      height={32}
                      decoding="async"
                      className="hidden rotate-180 rounded-[5px] blur-sm transition-all duration-400 ease-out group-hover:block group-hover:blur-none"
                      style={{ color: "transparent" }}
                      srcSet={cta.avatar.srcSet}
                      src={cta.avatar.src}
                    />
                  </div>
                  <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
                  <span className="inline-block text-white transition-transform duration-400 group-hover:-translate-x-8">
                    {cta.label}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-18 sm:h-48 md:h-72">
            <p className="from-white/10 -tracking-xl to-heading/0 bg-linear-to-r bg-clip-text text-transparent absolute -top-10 left-1/2 -translate-x-1/2 text-center text-[100px] font-semibold sm:text-[6rem] md:-top-6 md:mt-10 md:text-[160px] lg:-top-18 lg:text-[300px]">
              {watermark}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}