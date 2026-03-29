import Hero from "@/components/hero";
import HomeProgramsPreview from "@/components/home-programs-preview";
import WhyChooseUs from "@/components/why-choose-us";
import HowItWorks from "@/components/how-it-works";
import Certificates from "@/components/certificates";
import Testimonials from "@/components/testimonials";
import AboutUniversity from "@/components/about-university";
import CEOSection from "@/components/ceo-section";
import ContactSection from "@/components/contact-section";
import FAQSection from "@/components/faq-section";
import ScrollAnimations from "@/components/scroll-animations";

export default function Home() {
  return (
    <ScrollAnimations>
      <main>
        <Hero />
        <HomeProgramsPreview />
        <AboutUniversity />
        <CEOSection />
        <WhyChooseUs />
        <HowItWorks />
        <Certificates />
        <Testimonials />
        <FAQSection />
        <ContactSection />
      </main>
    </ScrollAnimations>
  );
}
