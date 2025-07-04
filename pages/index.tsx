import Carousel from "@/components/Carousel";
import Layout from "@/components/Layout";
import MiningCarousel from "@/components/MiningCarousel";
import ServicesCarousel from "@/components/servicesCarousel";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { HeroProps } from "@/components/HeroCarousel";
import SeoMeta from "@/components/SEO";
import HeroMobile from "@/components/MobileHero";
import dynamic from "next/dynamic";

const DynamicHeroCarousel = dynamic<HeroProps>(
  () => import("../components/HeroCarousel").then((mod) => mod.default),
  {
    ssr: true, // Ensure server-side rendering for LCP
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundColor: "#1a1a1a",
        }}
        aria-label="Loading hero section"
      >
        {/* Minimal, non-layout-shifting placeholder */}
      </div>
    ),
  }
);

// Animation component for h1 elements
const AnimatedH1: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.h1>
  );
};

// Animation wrapper for a section with staggered children
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.section>
  );
};

const Index = () => {
  const pageTitle = "Home";
  const pageDescription =
    "Reimagining the minerals sector through expert consulting, digital tools, and practical solutions. Learn more about our integrated, real-world approach.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";
  return (
    <Layout>
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        ogImage={pageImage}
        ogImageAlt={imageAlt}
        siteName="Sound Mining"
      />
      <div id="home-hero">
        <DynamicHeroCarousel
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/special4.webp"
          foregroundImage="/updatedImages/HeroFont1.webp"
          title="An independent consultancy to the minerals industry."
          content={[
            {
              subtitle: "Sound Mining provides sound solutions across the",
              description:
                "full spectrum of scientific, engineering, financial, and corporate consulting services.",
            },
            {
              subtitle: "We support clients throughout",
              description: "every stage of the mining lifecycle.",
            },
          ]}
          textPosition="top-left"
          textAlign="left"
          carouselEnabled={true}
          parallaxStrength={20}
        />
        <HeroMobile
          title="An independent consultancy to the minerals industry."
          subtitle="Sound Mining provides sound solutions across the full spectrum of scientific, engineering, financial, and corporate consulting services."
          description="We support clients throughout every stage of the mining lifecycle."
          backgroundImage="/newImages/Hero1Mobile.webp"
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>
      <section className="mining-design-carousel">
        <MiningCarousel />
        <div className="boulder-outside" />
      </section>
      <AnimatedSection className="services-carousel">
        <AnimatedH1>Services and Offerings</AnimatedH1>
        <ServicesCarousel />
      </AnimatedSection>
      <AnimatedStatsSection />
    </Layout>
  );
};

export default Index;
