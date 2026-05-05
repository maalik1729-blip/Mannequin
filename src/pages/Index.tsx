import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Categories from "@/components/site/Categories";
import Products from "@/components/site/Products";
import About from "@/components/site/About";
import Enquiry from "@/components/site/Enquiry";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useLenis, useReveal } from "@/hooks/useLenis";

const Index = () => {
  useLenis();
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <About />
      <Enquiry />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
