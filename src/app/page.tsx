import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import ScrollMarquee from "@/components/ScrollMarquee";

export default function Home() {
  return (
    <LenisProvider>
      <Nav />
      <CustomCursor />
      <main id="main-content">
        <Hero />
        <About />
        <Career />
        <Work />
        <ScrollMarquee text="Personal Projects" />
        <Projects />
        <Contact />
      </main>
    </LenisProvider>
  );
}
