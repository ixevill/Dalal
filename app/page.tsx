import Navbar      from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import GoldDivider  from "@/components/ui/GoldDivider";
import Hero         from "@/components/sections/Hero";
import About        from "@/components/sections/About";
import Services     from "@/components/sections/Services";
import Portfolio    from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Instagram    from "@/components/sections/Instagram";
import Booking      from "@/components/sections/Booking";
import Footer       from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <GoldDivider />
        <About />
        <GoldDivider />
        <Services />
        <GoldDivider />
        <Portfolio />
        <GoldDivider />
        <Testimonials />
        <GoldDivider />
        <Instagram />
        <GoldDivider />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
