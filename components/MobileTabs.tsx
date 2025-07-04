// ResponsiveTabsComponent.tsx
import React, { useState, useEffect, Suspense, TouchEvent } from "react";
import dynamic from "next/dynamic";

// Import the original component and its types
import StandardTabsComponent, {
  TabsProps,
  TabContentData,
} from "./StandardTabComponent";

// --- Helper Hook for Responsive Rendering ---
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// --- Dynamic Import for the Content ---
const DynamicStandardTabContent = dynamic<TabContentData>(
  () => import("./StandardTabContent"), // Ensure this path is correct
  {
    loading: () => (
      <p style={{ textAlign: "center", padding: "20px" }}>Loading section...</p>
    ),
    ssr: false,
  }
);

// --- The NEW Responsive Component ---
const ResponsiveTabsComponent: React.FC<TabsProps> = (props) => {
  const { tabs, tabContents } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e: TouchEvent) =>
    setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e: TouchEvent) =>
    setTouchEndX(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === 0 || touchEndX === 0) return;
    const minSwipeDistance = 50;
    if (touchStartX - touchEndX > minSwipeDistance) {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      setActiveIndex((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (!isMobile) {
    return <StandardTabsComponent {...props} />;
  }

  // --- MOBILE CAROUSEL RENDER (with Layout Fixes) ---
  return (
    <>
      <div className="phone-carousel-container">
        <div
          className="carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {tabs.map((tabName, index) => (
              <div className="carousel-slide" key={index}>
                <Suspense fallback={<p>Please wait...</p>}>
                  <DynamicStandardTabContent {...tabContents[tabName]} />
                </Suspense>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-navigation">
          {tabs.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* --- MOBILE-ONLY STYLES --- */
        .phone-carousel-container {
          width: 100%;
          padding: 20px 0;
        }

        .carousel-viewport {
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.4s ease-in-out;
        }

        /* --- THE FIX IS HERE --- */
        .carousel-slide {
          flex: 0 0 100%;
          width: 100%;
          /* This ensures padding is included in the element's total width */
          box-sizing: border-box;
          /* Add generous horizontal padding to prevent text from touching the edges */
          padding: 0 24px;
        }

        /* Apply text-align and word-wrapping to all text elements within a slide */
        .carousel-slide :global(div),
        .carousel-slide :global(h2),
        .carousel-slide :global(p) {
          text-align: center !important; /* Force center alignment */
          /* Ensure long words can wrap and not overflow */
          overflow-wrap: break-word;
          word-wrap: break-word;
        }
        /* --- END OF FIX --- */

        /* --- Styling for Content Inside the Slide --- */
        .carousel-slide :global(h2) {
          color: #990033; /* Maroon */
          font-weight: 700;
          text-transform: uppercase;
          font-size: 1.5rem;
          margin-bottom: 25px;
        }

        .carousel-slide :global(img) {
          display: block;
          margin: 0 auto 30px auto;
          max-width: 120px;
          height: auto;
        }

        .carousel-slide :global(p.strong-text) {
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.4;
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        .carousel-slide :global(p) {
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
          max-width: 500px;
          margin: 0 auto 15px auto;
        }

        /* --- Carousel Navigation Styling --- */
        .carousel-navigation {
          display: flex;
          justify-content: center;
          padding-top: 30px;
        }

        .carousel-dot {
          height: 12px;
          width: 12px;
          background-color: #ccc;
          border-radius: 50%;
          border: none;
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background-color: #990033;
        }
      `}</style>
    </>
  );
};

export default ResponsiveTabsComponent;
