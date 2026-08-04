import React from "react";

export const seoCardData = {
  seoCard: {
    title: "Get found on Google",
    bgSvg: "/svg-image-14.svg",
    searchBar: {
      googleLogo: "/svg-image-15.svg",
      searchQuery: "Best pet groomer near me",
      micIcon: "/svg-image-16.svg"
    },
    searchResult: {
      brandLogo: "/svg-image-17.svg",
      brandName: "YourPetSpa.com",
      breadcrumbs: ["www.yourpetspa.com", "services", "grooming"],
      heading: "Premium Dog Grooming & Pet Care Services"
    }
  },
};

export default function SeoCard() {
  const { title, bgSvg, searchBar, searchResult } = seoCardData.seoCard;

  return (
    <div className="col-span-1 max-h-[var(--box-min-height)] min-h-[var(--box-min-height)] overflow-hidden rounded-2xl border border-gray-300 bg-white p-4 shadow lg:col-span-3">
      <div className="relative flex h-full flex-col gap-10">
        {/* Background Layer */}
        <div className="absolute inset-0 right-0 top-0 h-full w-full">
          <img
            className="ml-20 h-full w-full"
            src={'/logohome.jpg'}
            alt="Background Path"
          />
        </div>

        {/* Card Header */}
        <div className="z-10 justify-start text-lg font-medium leading-6 text-black">
          {title}
        </div>

        <div className="z-10 flex flex-col gap-2">
          {/* Mock Search Bar */}
          <div className="shadow-card-md flex w-96 flex-col items-start justify-start gap-4 rounded-full bg-white py-3.5 shadow-sm ring-1 ring-black/5">
            <div className="inline-flex items-center justify-start self-stretch px-4">
              <div className="flex flex-1 items-center justify-between">
                <div className="relative flex items-center justify-start gap-3">
                  <img
                    src={searchBar.googleLogo}
                    alt="Google"
                    className="size-4"
                  />
                  <div className="relative flex items-center">
                    <div className="text-muted-foreground overflow-hidden text-sm font-normal leading-4 text-neutral-500 whitespace-nowrap" style={{ width: "30.4ch" }}>
                      {searchBar.searchQuery}
                    </div>
                  </div>
                </div>

                <img
                  src={searchBar.micIcon}
                  alt="Mic"
                  className="size-4"
                />
              </div>
            </div>
          </div>

          {/* Mock Search Results */}
          <div 
            className="relative h-[calc(var(--box-min-height)-100px)] w-96"
            style={{
              maskImage: "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%)",
              WebkitMaskImage: "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%)"
            }}
          >
            <div className="relative h-full">
              {/* Stacked background card overlays */}
              <div className="shadow-card-md absolute left-1/2 top-[4.125rem] h-24 w-72 -translate-x-1/2 rounded-xl bg-white px-2.5 py-3 shadow-sm ring-1 ring-black/5" />
              <div className="shadow-card-md absolute left-1/2 top-9 h-28 w-80 -translate-x-1/2 rounded-2xl bg-white px-2.5 py-3 shadow-sm ring-1 ring-black/5" />

              {/* Main Result Card */}
              <div className="shadow-card-md absolute left-0 top-0 inline-flex w-96 flex-col items-start justify-center gap-3 rounded-2xl border border-black/5 bg-white px-3 py-3.5 shadow-md">
                <div className="inline-flex items-center justify-start gap-3">
                  <div className="overflow-hidden">
                    <img
                      src={searchResult.brandLogo}
                      alt={searchResult.brandName}
                      className="size-8"
                    />
                  </div>
                  <div className="inline-flex flex-col items-start justify-center gap-1">
                    <div className="justify-start text-center text-sm font-normal leading-4 text-zinc-800">
                      {searchResult.brandName}
                    </div>
                    {/* Breadcrumbs */}
                    <div className="inline-flex items-center justify-start gap-1">
                      {searchResult.breadcrumbs.map((crumb: any, idx: number) => (
                        <React.Fragment key={crumb}>
                          <div className="justify-start text-center text-xs font-normal leading-3 text-neutral-400">
                            {crumb}
                          </div>
                          {idx < searchResult.breadcrumbs.length - 1 && (
                            <svg
                              width={4}
                              height={7}
                              viewBox="0 0 4 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.375 6.375L3.375 3.375L0.375 0.375"
                                stroke="#A9A9A8"
                                strokeWidth="0.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="justify-start text-center text-sm font-normal leading-4 text-zinc-800">
                  {searchResult.heading}
                </div>

                {/* Skeleton Loader Lines */}
                <div className="flex flex-col items-start justify-start gap-1.5">
                  <div className="h-2.5 rounded-[99px] bg-zinc-100" style={{ width: 320 }} />
                  <div className="h-2.5 rounded-[99px] bg-zinc-100" style={{ width: 192 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}