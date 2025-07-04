import Carousel from "@/components/Carousel";
import ChooseUsCarousel from "@/components/ChooseUsCarousel";
import AnimatedEstablishSection from "@/components/Establish";
import EstablishCarousel from "@/components/EstablishCarousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import MiningCarousel from "@/components/MiningCarousel";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import ServicesCarousel from "@/components/servicesCarousel";
import TeamCarousel from "@/components/TeamCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import Timeline from "@/components/Timeline";
import { motion, useAnimation, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";

// Reusable animated heading component that animates every time it's in view
interface AnimatedHeadingProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const AnimatedHeading = ({ children, style }: AnimatedHeadingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const headingVariants = {
    hidden: { y: 75, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 1,
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={headingVariants}
      style={style}
    >
      {children}
    </motion.h1>
  );
};

const DynamicHero = dynamic<HeroProps>(
  () => import("../components/Hero").then((mod) => mod.default), // Assumes Hero.tsx has `export default Hero;`
  {
    ssr: true, // CRITICAL: Ensure server-side rendering for LCP
    loading: () => (
      // This loading state should ideally not be seen on initial page load
      // due to SSR. It's a fallback.
      <div
        style={{
          minHeight: "600px", // Match your hero's minHeight
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111", // Match hero fallback bg
          color: "white",
        }}
        aria-label="Loading hero..."
      >
        {/* Minimal placeholder, could even be empty or a simple spinner SVG */}
      </div>
    ),
  }
);

const About = () => {
  const pageTitle = "About Us";
  const pageDescription =
    "With decades of experience and global reach, we support the minerals industry through expert consulting and strategy. Find out how we deliver impact.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const BACKGROUND_IMAGE_PATH = "/images/About-New (1).webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";

  return (
    <Layout>
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        ogImage={pageImage}
        ogImageAlt={imageAlt}
        siteName="Sound Mining"
      />
      <div id="about-us-hero-container">
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack2.webp"
          // foregroundImage="/images/hispanic-female-inspector-talking-caucasian-male-land-development-manager.png"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="About Us"
          subtitle="Your global partners in mining excellence."
          textPosition="center"
        />
        <HeroMobile
          title="About Us"
          subtitle="Your global partners in mining excellence."
          backgroundImage="/newImages/Hero2Mobile.webp"
        />
      </div>
      <AnimatedEstablishSection />{" "}
      <section className="wide-screen-carousel" id="wide-screen-carousel-about">
        <EstablishCarousel />
      </section>
      <section className="team-section flex col ac jc">
        <AnimatedHeading style={{ color: "black" }}>
          Meet OUR Team
        </AnimatedHeading>
        <TeamCarousel />
        <div className="timeline-section flex col ac jc">
          <AnimatedHeading>Our Journey in Mining Excellence</AnimatedHeading>
          <Timeline />
        </div>
      </section>
      <section className="global-reach flex col ac jc">
        <AnimatedHeading>Our Global Reach</AnimatedHeading>
        <div className="map">
          <img src="/images/NewMap.svg" alt="World Map" />
        </div>
      </section>
      <section className="choose-us flex col ac jc">
        <AnimatedHeading>Why choose us</AnimatedHeading>
        <ChooseUsCarousel />
      </section>
      <AnimatedStatsSection />
    </Layout>
  );
};

export default About;
