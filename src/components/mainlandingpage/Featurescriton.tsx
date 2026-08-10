import React from "react";
import UpdatesCard from "./UpdatesCard";
import SeoCard from "./SeoCard";
import HostingCard from "./HostingCard";
import ComponentsCard from "./ComponentsCard";
import FeatureCard from "./ServiceCard";

export default function Featurescriton({ cardContent }: any) {
  return (
    <section
      id="features"
      className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-20 overflow-hidden pt-20"
    >
      <div
        data-slot="container"
        className="mx-auto relative flex w-full flex-col gap-10 py-16 sm:py-24 md:py-32"
      >
        {/* Background Decorative Heading (Matches your 'Work' section style) */}
        <h2 className="pointer-events-none absolute -top-4  z-0 overflow-hidden bg-gradient-to-b from-[#8C8879] to-transparent bg-clip-text text-6xl font-medium tracking-tighter text-transparent opacity-25 md:-top-6 md:text-8xl lg:-top-12 lg:text-[10rem]">
          Features
        </h2>

        {/* New Foreground Heading & Subtitle replacing "Replace Your Outdated Website" */}
        <div className="relative z-10 ">
          <h3 className="text-heading max-w-3xl text-left text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            High-Converting <br className="hidden md:block" /> Pet Care Websites
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Designed to perfection, NexPetCare helps you turn website visitors into fully booked appointments through our expert mobile-first web services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="relative z-10 grid grid-cols-19 gap-3 pt-6">
          {/* Pass cardContent prop directly to FeatureCard */}
          <FeatureCard content={cardContent} />

          <div className="col-span-19 grid grid-cols-1 gap-3 md:grid-cols-2 lg:col-span-13 lg:grid-cols-5 [--box-min-height:314px]">
            <UpdatesCard />
            <HostingCard />
            <SeoCard />
            <ComponentsCard />
          </div>
        </div>
      </div>
    </section>
  );
}