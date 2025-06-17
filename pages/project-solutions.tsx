import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import ProjectTabsComponent from "@/components/ProjectTabComponent";
import SeoMeta from "@/components/SEO";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { ProjectSolutionsTabData } from "@/data/ProjectSolutionData";
import { ProjectSolutionsTabs } from "@/data/TabsData";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const ProjectSolutions = () => {
  const pageTitle = "Technical Expertise";
  const pageDescription =
    "Deliver complex resource projects with confidence. We lead execution through expert planning, integrated controls, and fit-for-purpose teams.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const [currentActiveTab, setCurrentActiveTab] = useState(0);

  const BACKGROUND_IMAGE_PATH = "/images/TechBg.webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";
  const FRONT_IMAGE_PATH = "/images/TechFw.webp";

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
      <div id="project-hero">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/TechBg.webp"
          foregroundImage="/images/TechFw.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Drive Success in your Mining Projects"
          subtitle="Expert project management and execution for the minerals industry."
          description="Project Management and Execution"
          textPosition="top-left"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/special5.webp"
          foregroundImage="/updatedImages/HeroFront4.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          textAlign="left"
          title="Drive Success in your Mining Projects"
          subtitle="Expert project management and execution for the minerals industry."
          description="Project Management and Execution"
          textPosition="top-left"
        />
        <HeroMobile
          title="Drive Success in your Mining Projects"
          subtitle="Expert project management and execution for the minerals industry."
          description="Project Management and Execution"
          backgroundImage="/newImages/Hero5Mobile.webp"
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc advisory-tabs project-tabs"
        id="solutions-container"
      >
        <div className="section-label">
          <h1 style={{ paddingBottom: "50PX" }}>
            Project Management & Execution
          </h1>
        </div>
        {/* <TabsComponent
          items={ProjectSolutionsItems}
          tabContents={ProjectSolutionsTabContents}
          tabs={ProjectSolutionsTabs}
        /> */}

        <ProjectTabsComponent
          tabs={ProjectSolutionsTabs}
          tabContents={ProjectSolutionsTabData}
          activeTab={currentActiveTab} // Pass state
          setActiveTab={setCurrentActiveTab} // Pass setter
        />
        {currentActiveTab === 0 && ( // Show only if the first tab (index 0) is active
          <div className="right-image">
            <img src="/newImages/SideCarousel1.webp" alt="Side Image" />
          </div>
        )}
        <div className="cta-button-projects flex col al jc">
          <AnimatedButton href="/contact" text="Speak to an Expert" />
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default ProjectSolutions;
