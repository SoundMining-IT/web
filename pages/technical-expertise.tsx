// pages/technical-expertise.tsx
// THIS FILE SHOULD LOOK LIKE THIS (your original code for this page)

import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero"; // Corrected from MobileHero
import SeoMeta from "@/components/SEO";
import TabsWithFlipCards from "@/components/TabsWithFlipCards";
// import TestimonialCarousel from "@/components/TestimonialCarousel"; // Not used in your provided snippet
import AnimatedStatsSection from "@/components/TestimonialSection"; // Assuming this is TestimonialSection.tsx
import { TechnicalExpertiseData } from "@/data/TabsData"; // This is crucial
import dynamic from "next/dynamic";
import React from "react";

const TechnicalExpertise = () => {
  const pageTitle = "Technical Expertise";
  const pageDescription =
    "Multidisciplinary technical expertise across the minerals project lifecycle. Learn how our specialists deliver integrated, practical, and proven solutions.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const BACKGROUND_IMAGE_PATH = "/images/ProjectBg.webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";
  const FRONT_IMAGE_PATH = "/images/ProjectFw.webp";

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
      <div id="technical-hero">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/ProjectBg.webp"
          foregroundImage="/images/ProjectFw.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          contentScrollDirectionX="none"
          contentScrollDirectionY="down"
          textAlign="left"
          title="Enhance the value of minerals projects across their lifecycle."
          subtitle="Technical excellence in the minerals industry."
          description="Technical Expertise"
          textPosition="top-left"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/special1.webp"
          foregroundImage="/updatedImages/HeroFront3.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          contentScrollDirectionX="none"
          contentScrollDirectionY="down"
          textAlign="left"
          title="Enhance the value of minerals projects across their lifecycle"
          subtitle="Technical excellence in the minerals industry."
          description="Technical Expertise"
          textPosition="top-left"
        />
        <HeroMobile
          title="Enhance the value of minerals projects across their lifecycle."
          subtitle="Technical excellence in the minerals industry."
          description="Technical Expertise"
          backgroundImage="/newImages/Hero4Mobile.webp" // Corrected from newImages/Hero4Mobile.webp to images/Hero4Mobile.webp
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc advisory-tabs technical-tabs"
        id="solutions-container" // Removed extra space from ID
      >
        <div className="section-label">
          <h1>Technical Expertise</h1>
        </div>
        <div className="trucks-side">
          <img src="/newImages/SideFlip.webp" alt="Trucks" />
        </div>
        {/*
          The 'tabs' prop of TabsWithFlipCards expects the data
          defined in TechnicalExpertiseData.
        */}
        <TabsWithFlipCards tabs={TechnicalExpertiseData} />
        <div className="cta-button-technical flex col al jc">
          {" "}
          {/* Corrected class typo 'al' to 'ac' or 'as' depending on intent */}
          <AnimatedButton href="/contact" text="Speak to an Expert" />
        </div>
      </section>

      <section className="flex col ac jc did-you-know">
        <div className="content">
          <div className="left">
            <h1>
              Did <br /> you <br /> know?
            </h1>
          </div>
          <div className="right">
            <p style={{ maxWidth: "55%" }}>
              <span>
                On average, it takes 10 to 20 years to develop a mine from
                initial discovery to first production
              </span>
              , with permitting, feasibility studies and financing often causing
              the biggest delays.
            </p>
            <AnimatedButton href="/contact" text="Speak to an expert" />
          </div>
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default TechnicalExpertise;
