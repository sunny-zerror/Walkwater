import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import { createPageMetadata } from "@/lib/seo";
import IndustryVerticals from "@/components/home/IndustryVerticals";
import Leadership from "@/components/home/Leadership";
import Testimonials from "@/components/home/Testimonials";
import Insights from "@/components/home/Insights";
import GlobalPresence from "@/components/home/GlobalPresence";
import Expertise from "@/components/home/Expertise";

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Expertise/>
      <Leadership />
      <IndustryVerticals/>
      <Insights />
      <GlobalPresence />
      <Testimonials />
    </>
  );
};

export default HomePage;

export async function generateMetadata() {
  return createPageMetadata("/");
}
