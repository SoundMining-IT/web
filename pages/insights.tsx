import CaseStudiesDemo from "@/components/CaseStudiesGrid";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import SeoMeta from "@/components/SEO";
import dynamic from "next/dynamic";
import React from "react";

const insights = () => {
  const pageTitle = "Insights";
  const pageDescription =
    "Explore real-world case studies and project insights from across the resource sector. Learn how our team solves complex challenges through practical experience.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const BACKGROUND_IMAGE_PATH =
    "/images/view-heavy-machinery-used-construction-industry-2.webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";
  const FRONT_IMAGE_PATH = "";

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
      <div id="insights-hero-container">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/view-heavy-machinery-used-construction-industry-2.webp"
          // foregroundImage="/images/view-heavy-machinery-used-construction-industry-1.png"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Insights And Resources"
          subtitle="Gain Insights from real-world examples of how we've driven success accross projects."
          textPosition="top-left"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack7.webp"
          // foregroundImage="/images/view-heavy-machinery-used-construction-industry-1.png"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Insights And Resources"
          subtitle="Gain Insights from real-world examples of how we've driven success accross projects."
          textPosition="top-left"
        />
        <HeroMobile
          title="Insights And Resources"
          subtitle="Gain Insights from real-world examples of how we've driven success accross projects."
          backgroundImage="/newImages/Hero8Mobile.webp"
        />
        <div className="case-studies flex col ac jc">
          <div className="case-studies-content-wrapper">
            <h1>Case Studies</h1>
            <CaseStudiesDemo />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default insights;
