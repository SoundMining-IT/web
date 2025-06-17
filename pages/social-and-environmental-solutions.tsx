import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import TabsWithFlipCards from "@/components/TabsWithFlipCards";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { EnvironmentData } from "@/data/TabsData";
import dynamic from "next/dynamic";
import React from "react";

const SocialAnndEnvironmentalSolutions = () => {
  const pageTitle = "Social and Environmental Solutions";
  const pageDescription =
    "Support responsible development with tailored ESG, environmental, and social solutions. Learn how we help manage risk, impact, and stakeholder outcomes.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

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

  return (
    <Layout>
      <SeoMeta
        title={pageTitle}
        description={pageDescription}
        ogImage={pageImage}
        ogImageAlt={imageAlt}
        siteName="Sound Mining"
      />
      <div id="social-hero">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/environmentBg.webp"
          foregroundImage="/images/environmentFw.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Make Your Mining Operations More Sustainable"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          textPosition="top-left"
          description="Social & Environmental Solutions"
          contentScrollDirectionX="none"
          contentScrollDirectionY="down"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack5.webp"
          foregroundImage="/updatedImages/HeroFront5.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Make Your Mining Operations More Sustainable"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          textPosition="top-left"
          description="Social & Environmental Solutions"
          contentScrollDirectionX="none"
          contentScrollDirectionY="down"
        />
        <HeroMobile
          title="Make Your Mining Operations More Sustainable"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          description="Social & Environmental Solutions"
          backgroundImage="/newImages/Hero6Mobile.webp"
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc advisory-tabs"
        id="solutions-container"
      >
        <div className="section-label">
          <h1>Social and Environmental Solutions</h1>
        </div>
        <TabsWithFlipCards tabs={EnvironmentData} />
        <div className="cta-button flex col al jc env-button">
          <AnimatedButton href="/contact" text="Speak to an Expert" />
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default SocialAnndEnvironmentalSolutions;
