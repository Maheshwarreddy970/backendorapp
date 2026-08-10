import React from "react";

export default function FeatureCard({ content }: any) {
  const { title, description, buttonText, buttonUrl, previewImageUrl } = content;

  return (
    <div className="bg-natural-black border shadow relative col-span-19 grid overflow-hidden rounded-2xl p-4 lg:col-span-6">
      {/* CSS Keyframes */}
      <style>{`
        @keyframes float-window {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.85; transform: scale3d(1, 1, 1) rotate(45deg); }
          50% { opacity: 0.35; transform: scale3d(1.18, 1.18, 1) rotate(45deg); }
        }
        @keyframes scan-bob {
          0%, 100% { transform: translate3d(0, 0, 0) scale3d(1, 1, 1); }
          50% { transform: translate3d(0, 6px, 0) scale3d(1.02, 0.98, 1); }
        }
        @keyframes skeleton-fade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>

      <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        <div className="w-full flex-1 h-85">
          {/* Background Glow Pulse */}
          <svg
            className="absolute bottom-0 -left-40 z-40 rotate-45 fill-white/80 blur-3xl will-change-transform"
            width="100%"
            height="100%"
            style={{ animation: "glow-pulse 6s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
          >
            <ellipse cx="50%" cy="50%" rx={100} ry={60} />
          </svg>

          <div
            className="bg-offwhite relative z-40 h-full overflow-hidden rounded-lg"
            style={{ opacity: 1, transform: "none" }}
          >
            {/* Floating Window UI Mockup */}
            <div
              className="absolute inset-x-0 -bottom-4 mx-auto flex h-full w-[90%] flex-col rounded-lg bg-[#E6E6E6] p-2 will-change-transform"
              style={{ animation: "float-window 5s cubic-bezier(0.45, 0, 0.55, 1) infinite" }}
            >
              {/* Window Controls Header */}
              <div className="relative flex">
                <div className="flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-[#FF5F57]" />
                  <div className="size-1.5 rounded-full bg-[#FFBD2E]" />
                  <div className="size-1.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="absolute inset-x-0 mx-auto h-2 w-32 rounded-full bg-white" />
              </div>

              {/* Window Content */}
              <div className="mt-3 flex w-full flex-1 flex-col rounded-lg bg-white">
                <div className="flex">
                  <div className="flex w-full items-center justify-between px-1.5 py-1">
                    <div className="size-2 rounded-full bg-[#D9D9D9]" />
                    <div className="flex items-center gap-1">
                      <div className="h-1 w-3 rounded-full bg-[#E6E6E6]" />
                      <div className="h-1 w-3 rounded-full bg-[#E6E6E6]" />
                      <div className="h-1 w-3 rounded-full bg-[#E6E6E6]" />
                      <div className="ml-1 h-1.5 w-4 rounded-sm bg-[#D9D9D9]" />
                    </div>
                  </div>
                </div>

                {/* Skeleton UI Elements */}
                <div className="flex flex-1 flex-col items-center justify-center px-2 py-3">
                  <div
                    className="h-2 rounded-full bg-[#D9D9D9]"
                    style={{
                      width: 128,
                      animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                  />
                  <div
                    className="mt-1.5 h-1 rounded-full bg-[#E6E6E6]"
                    style={{
                      width: 96,
                      animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s",
                    }}
                  />
                  <div className="mt-2 flex items-center gap-1">
                    <div
                      className="h-2 w-8 rounded-sm bg-[#D9D9D9]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s",
                      }}
                    />
                    <div
                      className="h-2 w-8 rounded-sm bg-[#E6E6E6]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.6s",
                      }}
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <div
                      className="size-3 rounded-full bg-[#E6E6E6]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.1s",
                      }}
                    />
                    <div
                      className="size-3 rounded-full bg-[#E6E6E6]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s",
                      }}
                    />
                    <div
                      className="size-3 rounded-full bg-[#E6E6E6]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.3s",
                      }}
                    />
                    <div
                      className="size-3 rounded-full bg-[#E6E6E6]"
                      style={{
                        animation: "skeleton-fade 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s",
                      }}
                    />
                  </div>

                  {/* Bobbing Scanner Area */}
                  <div
                    className="mt-3 flex h-full w-3/4 items-center justify-center rounded-sm bg-gray-100 overflow-hidden will-change-transform"
                    style={{
                      animation: "scan-bob 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
                    }}
                  >
                    {previewImageUrl ? (
                      <img
                        src={previewImageUrl}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tabler-icon tabler-icon-photo-scan size-6 text-neutral-400"
                      >
                        <path d="M15 8h.01" />
                        <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
                        <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
                        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute right-0 bottom-0 h-80 w-full mask-t-from-20% mask-b-from-90% mask-l-from-50%"
            style={{ opacity: "0.2" }}
          >
            <div className="pointer-events-none select-none absolute inset-0 w-full">
              <canvas
                className="block h-full w-full"
                width={852}
                height={640}
                style={{ width: "426.312px", height: 320 }}
              />
            </div>
          </div>
        </div>

        {/* Text Details & Interactive Action Button */}
        <div className="mt-4 flex flex-col gap-6 px-4 py-4 z-10">
          <div className="relative">
            <h2 className="text-base font-medium text-white">{title}</h2>
            <p className="mt-4 text-base text-neutral-400">{description}</p>
          </div>
          <div>
            <a
              href={buttonUrl || "#"}
              className="group relative flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2 pr-4 pl-11 tracking-tight my-4 transition-all duration-300 hover:border-white/40"
            >
              <div
                data-slot="button-box"
                className="bg-[var(--color-primary)] absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] transition-all duration-500 ease-out group-hover:left-[calc(100%-2.3rem)] group-hover:rotate-180 group-hover:transform"
              >
                <div className="flex flex-col gap-px">
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
              </div>
              <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-500 ease-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]" />
              <span className="inline-block text-white transition-transform duration-500 group-hover:-translate-x-8">
                {buttonText}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}