import Carousel from "@/components/Carousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { CorporateAdvisorytabs } from "@/data/TabsData";
import React, { useEffect } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import AnimatedStatsSection from "@/components/TestimonialSection";
import StandardTabsComponent from "@/components/StandardTabComponent";
import { CorporateAdvisoryTabData } from "@/data/CorporateAdvisoryData";
import SeoMeta from "@/components/SEO";
import HeroMobile from "@/components/MobileHero";
import dynamic from "next/dynamic";
import ResponsiveTabsComponent from "@/components/MobileTabs";

const CorporateAdvisory = () => {
  const pageTitle = "Corporate Advisory";
  const pageDescription =
    "Independent technical reviews, valuations, and due diligence for the minerals industry. Get started with strategic advisory that drives confident decisions.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const BACKGROUND_IMAGE_PATH =
    "/images/industrial-landscape-with-red-stone-crusher-machine-gravel-quarry-1.webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";
  const FRONT_IMAGE_PATH =
    "/images/industrial-landscape-with-red-stone-crusher-machine-gravel-quarry.webp";

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
      <div id="corporate-advisory-hero-container">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/industrial-landscape-with-red-stone-crusher-machine-gravel-quarry-1.webp"
          foregroundImage="/images/industrial-landscape-with-red-stone-crusher-machine-gravel-quarry.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Make your next minerals investment with confidence"
          subtitle="Independent corporate advisory for the financing and development of minerals assets."
          description="Corporate Advisory"
          textPosition="top-left"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack9.webp"
          foregroundImage="/updatedImages/HeroBack11.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Make your next minerals investment with confidence"
          subtitle="Independent corporate advisory for the financing and development of minerals assets."
          description="Corporate Advisory"
          textPosition="top-left"
        />
        <HeroMobile
          title="Make your next minerals investment with confidence"
          subtitle="Independent corporate advisory for the financing and development of minerals assets."
          description="Corporate Advisory"
          backgroundImage="/newImages/Hero3Mobile.webp"
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc advisory-tabs"
        id="solutions-container"
      >
        <div className="section-label" style={{ paddingBottom: "50px" }}>
          <h1>Advisory Services</h1>
        </div>
        <div className="corp-tabs">
          <StandardTabsComponent
            tabs={CorporateAdvisorytabs}
            tabContents={CorporateAdvisoryTabData}
          />
          {/* <ResponsiveTabsComponent
            tabs={CorporateAdvisorytabs}
            tabContents={CorporateAdvisoryTabData}
          /> */}
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default CorporateAdvisory;
