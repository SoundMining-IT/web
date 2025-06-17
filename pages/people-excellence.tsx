import AnimatedButton from "@/components/AnimatedButton";
import Carousel from "@/components/Carousel";
import Hero, { HeroProps } from "@/components/Hero";
import Layout from "@/components/Layout";
import HeroMobile from "@/components/MobileHero";
import PeopleTabsComponent from "@/components/PeopleExcellenceTabComponent";
import SeoMeta from "@/components/SEO";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AnimatedStatsSection from "@/components/TestimonialSection";
import { PeopleExcellenceTabData } from "@/data/PeopleExcellenceData";
import { PeopleExellenceTabs } from "@/data/TabsData";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

const PeopleExcellence = () => {
  const pageTitle = "People Excellence";
  const pageDescription =
    "Align talent with performance through workforce planning, skills development, and leadership strategies for resource and industrial sectors.";
  const pageImage = "/images/Sound Mining logo.jpg";
  const imageAlt = "Sound Mining Logo";

  const BACKGROUND_IMAGE_PATH =
    "/images/medium-shot-man-with-mask-project-1.webp";
  const MIDDLE_IMAGE_PATH = "/images/HeroCircle.svg";
  const FRONT_IMAGE_PATH = "/images/medium-shot-man-with-mask-project.webp";

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
      <div id="people-hero">
        {/* <Hero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/images/medium-shot-man-with-mask-project-1.webp"
          foregroundImage="/images/medium-shot-man-with-mask-project.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          contentScrollDirectionX="right"
          contentScrollDirectionY="none"
          textAlign="left"
          title="Empowering the Future of Mining"
          subtitle="Customised education and training programmes for industry excellence."
          description="People Excellence"
          textPosition="top-left"
        /> */}
        <DynamicHero
          middleImage="/images/HeroCircle.svg"
          backgroundImage="/updatedImages/HeroBack6.webp"
          foregroundImage="/updatedImages/HeroFront6.webp"
          contentParallaxFactor={0.5}
          middleImageParallaxFactor={0.5}
          parallaxStrength={30}
          contentScrollDirectionX="none"
          contentScrollDirectionY="down"
          textAlign="left"
          title="Empowering the Future of Mining"
          subtitle="Customised education and training programmes for industry excellence."
          description="People Excellence"
          textPosition="top-left"
        />
        <HeroMobile
          title="Empowering the Future of Mining"
          subtitle="Expert guidance on maintaining your social licence, ensuring compliance with environmental and labour laws, and addressing uncertainties."
          description="People Excellence"
          backgroundImage="/newImages/Hero7Mobile.webp"
        />
      </div>
      <section className="wide-screen-carousel">
        <Carousel />
      </section>

      <section
        className="flex col ac jc two-sided-tabs"
        id="solutions-container"
      >
        <div className="left-side"></div>
        <div className="right-side flex col al jc">
          <div className="content flex col al jc">
            <div className="section-label" style={{ paddingBottom: "50px" }}>
              <h1>People Excellence</h1>
            </div>
            {/* <TabsComponent
              tabContents={PeopleExcellenceTabContents}
              tabs={PeopleExellenceTabs}
            /> */}
            <PeopleTabsComponent
              tabs={PeopleExellenceTabs}
              tabContents={PeopleExcellenceTabData}
            />
            <div
              style={{ marginTop: "50px" }}
              className="cta-button flex col al jc"
            >
              <AnimatedButton href="/contact" text="Find out more" />
            </div>
            <div className="rock">
              <img src="/images/Loose rock 6.webp" />{" "}
            </div>
          </div>
        </div>
      </section>

      <AnimatedStatsSection />
    </Layout>
  );
};

export default PeopleExcellence;
