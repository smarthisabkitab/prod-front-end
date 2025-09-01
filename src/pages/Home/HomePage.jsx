import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import StatsBanner from "../../components/home/StatsBanner";
import FeatureCards from "../../components/home/FeatureCards";
import SecuritySection from "../../components/home/SecuritySection";
import Testimonial from "../../components/home/Testimonial"
import DownloadAppSection from "../../components/home/DownloadAppSection";
import Footer from "../../components/home/Footer";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Navbar />
        <Hero />
        <StatsBanner />
        <FeatureCards />
        <SecuritySection />
        <Testimonial />
        <DownloadAppSection />
        
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
