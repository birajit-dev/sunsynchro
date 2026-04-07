import dynamic from "next/dynamic";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import StartupRecognition from "./components/StartupRecognition";
import LocalSEO from "./components/LocalSEO";

// Lazy load heavy components below the fold
const WhyWe = dynamic(() => import("./components/WhyWe"), {
  loading: () => <div className="min-h-[400px]" />,
});
const SolutionsCards = dynamic(() => import("./components/SolutionsCards"), {
  loading: () => <div className="min-h-[400px]" />,
});
const MapEmbed = dynamic(() => import("./components/MapEmbed"), {
  loading: () => <div className="min-h-[400px]" />,
});
const LogoCarousel = dynamic(() => import("./components/LogoCarousel"), {
  loading: () => <div className="min-h-[300px]" />,
});
const BlogPreview = dynamic(() => import("./components/BlogPreview"), {
  loading: () => <div className="min-h-[600px]" />,
});
const ContactCTA = dynamic(() => import("./components/ContactCTA"), {
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSlider />
      {/* <CounterStats /> */}
      <AboutSection />
      <StartupRecognition />
      <LocalSEO />
      <WhyWe />
      <SolutionsCards />
      <MapEmbed />
      {/* <Gallery /> */}
      <LogoCarousel />
      <BlogPreview />
      <ContactCTA />
    </div>
  );
}
