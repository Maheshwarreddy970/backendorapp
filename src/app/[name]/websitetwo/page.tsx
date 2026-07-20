import { notFound } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";

// Imported from landingpagetwo
import Navbar from "@/components/landingpagetwo/Navbar";
import HeroSection from "@/components/landingpagetwo/home";
import Introduction from "@/components/landingpagetwo/Introduction";
import WhyChooseUs from "@/components/landingpagetwo/WhyChooseUs";
import WhyUsSection from "@/components/landingpagetwo/WhyUsSection";
import { ServicesSection } from "@/components/landingpagetwo/ServicesSection";
import AboutSection from "@/components/landingpagetwo/AboutSection";
import HowItWorksSection from "@/components/landingpagetwo/HowItWorksSection";
import TestimonialsSection from "@/components/landingpagetwo/TestimonialsSection";
import GallerySection from "@/components/landingpagetwo/Gallary";
import FAQSection from "@/components/landingpagetwo/faq";
import ContactSection from "@/components/landingpagetwo/ContactSection";
import Footer from "@/components/landingpagetwo/Footer";

export default async function WebsiteTwo({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;
  const dbData = await getWebsiteData(name);
  if (!dbData || !dbData.websiteOneData) {
    notFound();
  }

  const data = dbData.websiteOneData;
console.log(data.contact);
  return (
    <main>
      {/* Notice Navbar and Footer are brought in here directly */}
      <Navbar data={data.navbar} />
      <HeroSection data={data.hero} />
      <Introduction data={data.introduction} />
      <WhyChooseUs data={data.whyChooseUs} />
      <WhyUsSection />
       <ServicesSection data={data.services} />
      <AboutSection data={data.about} />
      <HowItWorksSection data={data.howItWorks} />
      <TestimonialsSection data={data.testimonials} />
      <GallerySection />
      <FAQSection data={data.faq} />
      <ContactSection data={data.contact} />
      <Footer data={data.footer} logo={data.navbar.logo} />
    </main>
  );
}