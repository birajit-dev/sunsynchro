import HeroSlider from "./components/HeroSlider";
import CounterStats from "./components/CounterStats";
import AboutSection from "./components/AboutSection";
import SolutionsCards from "./components/SolutionsCards";
import MapEmbed from "./components/MapEmbed";
import Gallery from "./components/Gallery";
import LogoCarousel from "./components/LogoCarousel";
import BlogPreview from "./components/BlogPreview";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <HeroSlider />
      <CounterStats />
      <AboutSection />
      <SolutionsCards />
      <MapEmbed />
      <Gallery />
      <LogoCarousel />
      <BlogPreview />
      <ContactCTA />
    </div>
  );
}
