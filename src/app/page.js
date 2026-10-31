import ScrollHero from "@/components/ScrollHero";
import ServicesShowcase from "@/components/ServicesShowcase";
import Gallery from "@/components/Gallery";
import Reels from "@/components/Reels";
import SurpriseSpotlight from "@/components/SurpriseSpotlight";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

// Single-page site: homepage sections appear in the same order as navbar:
// Home -> Services -> Gallery -> About Us -> Contact
export default function Home() {
  return (
    <>
      <ScrollHero />
      <ServicesShowcase />
      <Gallery />
      <Reels />
      <SurpriseSpotlight />
      <About />
      <WhyUs />
      <Process />
      <Testimonials />
      <ContactSection />
    </>
  );
}
