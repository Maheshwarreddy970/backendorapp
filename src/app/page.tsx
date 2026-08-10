import ComparisonTable from "@/components/mainlandingpage/ComparisonTable";
import FaqSection from "@/components/mainlandingpage/FaqSection";
import Featurescriton from "@/components/mainlandingpage/Featurescriton";
import Footer from "@/components/mainlandingpage/Footer";
import FounderDesk from "@/components/mainlandingpage/FounderDesk";
import Homepage from "@/components/mainlandingpage/Homepage";
import FeatureGridDemo from "@/components/mainlandingpage/moreftures";
import Pricing from "@/components/mainlandingpage/Pricing";
import ProjectsSection from "@/components/mainlandingpage/ProjectsSection";

// Defined as JS constants instead of external JSON imports
export const homepageData = {
  badge: {
    label: "NexPetCare Tech",
    subtext: "Digital Storefronts for Pet Care",
    url: "https://nexpetcare.online/",
  },
  heading: "The best design & development agency for pet businesses.",
  subheading: "We design and build lightning-fast websites that drive bookings for groomers, kennels, and pet spas. No monthly hosting fees. Just results.",
  cta: {
    label: "Chat with Maheshwar",
    avatar: {
      src: "/_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY",
      srcSet: "/_next/image?url=%2Fme.jpg&w=32&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 1x, /_next/image?url=%2Fme.jpg&w=64&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 2x",
      alt: "Maheshwar Avatar",
    },
  },
  watermark: "NexPetCare",
};
export const featureSectionData = {
  heading: "Replace Your Outdated Website",
  card: {
    title: "Custom Design & Development",
    description:
      "Designed to perfection, NexPetCare helps you turn website visitors into fully booked appointments through our expert mobile-first web services.",
    buttonText: "View pricing",
    buttonUrl: "#pricing",
    previewImageUrl: "",
  },
};

export default function Home() {
  return (
    <section className="flex max-w-screen overflow-x-hidden flex-col items-center justify-center">
      <Homepage content={homepageData} />
      <ComparisonTable />
      <ProjectsSection />
      <Featurescriton
        heading={featureSectionData.heading}
        cardContent={featureSectionData.card}
      />
      <FeatureGridDemo></FeatureGridDemo>
      <Pricing />
      <FounderDesk />
      <FaqSection />
      <Footer />
    </section>
  );
}