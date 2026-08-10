import React from "react";
import UpdatesCard from "./UpdatesCard";
import SeoCard from "./SeoCard";
import HostingCard from "./HostingCard";
import ComponentsCard from "./ComponentsCard";
import FeatureCard from "./ServiceCard";

export default function Featurescriton({ heading, cardContent }:any) {
  return (
    <div
      id="features"
      data-slot="container"
      className="max-w-container mx-auto w-full px-4 sm:px-6 lg:px-20 flex flex-col gap-15 py-4"
    >
      <h2 className="text-heading text-left text-4xl font-semibold tracking-tight md:text-5xl">
        {heading}
      </h2>
      <div className="grid grid-cols-19 gap-3">
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
  );
}