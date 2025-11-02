import HeroSection from "../components/home/HeroSection";
import Testimonials from "../components/home/Testimonials";
import WhoAndWhy from "../components/home/WhoAndWhy";
import CTA from "../components/home/CTA";
import HomeFeatures from "../components/home/HomeFeatures";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HomeFeatures />
      <WhoAndWhy />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Home;
