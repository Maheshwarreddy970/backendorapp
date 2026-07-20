import { notFound } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";

// Imported from landingpageone
import Navbar from "@/components/landingpageone/Navbar";
import Homepage from "@/components/landingpageone/Home";
import StatsBanner from "@/components/landingpageone/ReviewSection";
import AboutSection from "@/components/landingpageone/AboutSection";
import ServicesSection from "@/components/landingpageone/ServicesSection";
import ProcessSection from "@/components/landingpageone/ProcessSection";
import ComparisonSection from "@/components/landingpageone/ComparisonSection";
import GallerySection from "@/components/landingpageone/GallerySection";
import ReviewsSection from "@/components/landingpageone/ReviewsSection";
import InsightsSection from "@/components/landingpageone/InsightsSection";
import CTASection from "@/components/landingpageone/CTASection";
import Footer from "@/components/landingpageone/footer";

export default async function WebsiteOne({
  params
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params;
  const dbData = await getWebsiteData(name);

  if (!dbData || !dbData.websiteTwoData) {
    notFound();
  }

  const data = dbData.websiteTwoData;
  console.log(data.footer);
  return (
    <>
      {/* Notice Navbar and Footer are brought in here directly */}
      <Navbar data={data.navbar} />
      <Homepage data={data.hero} />
      <StatsBanner data={data.statsBanner} />
      <AboutSection data={data.about} />
      <ServicesSection data={data.services} />
      <ProcessSection data={data.process} />
      <ComparisonSection data={data.comparison} />
      <GallerySection></GallerySection>
 <ReviewsSection  data={data.reviews} />
      <InsightsSection data={data.insights} />
      <CTASection />
      <Footer data={data.footer} />

    </>
  );
}