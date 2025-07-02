// StandardTabContent.tsx
import React, { useState, useEffect, useRef } from "react";
import AnimatedButton from "./AnimatedButton"; // MAKE SURE this path is correct
import Image from "next/image";

// Type for the individual sub-items (icons/labels)
type TabItem = {
  inactiveIcon: string;
  activeIcon: string;
  label: string;
};

// Type for the props this component receives (matching the data structure)
type StandardTabContentProps = {
  logoTitle?: string;
  image: string;
  altText: string;
  heading: string;
  p1Strong?: string;
  p1Regular: string;
  subHeading?: string;
  items?: TabItem[];
  extraImage?: string;
  ctaText: string;
  ctaHref: string;
};

const StandardTabContent: React.FC<StandardTabContentProps> = ({
  logoTitle,
  image,
  altText,
  heading,
  p1Strong,
  p1Regular,
  subHeading,
  extraImage,
  items = [],
  ctaText,
  ctaHref,
}) => {
  // activeIconIndex: tracks the "persisted" active item (due to rotation or click)
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  // hoveredIconIndex: tracks the item currently being hovered, or null if none
  const [hoveredIconIndex, setHoveredIconIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (items.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      // We use a local check for isPaused here, as the isPaused state
      // might be updated by hover events between interval fires.
      // The effect's isPaused dependency handles restarting/stopping the timer itself.
      if (!isPaused && hoveredIconIndex === null) {
        // Only advance if not paused AND not currently hovering
        setActiveIconIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, 3000);
  };

  useEffect(() => {
    startRotation();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [items.length, isPaused, hoveredIconIndex]); // Add hoveredIconIndex as dependency to restart timer logic if hover ends

  useEffect(() => {
    setActiveIconIndex(0);
    setHoveredIconIndex(null); // Reset hover state when items change
    setIsPaused(false);
    // The main effect will handle restarting the timer
  }, [items]);

  const handleMouseEnter = (index: number) => {
    setIsPaused(true); // Pause rotation
    setHoveredIconIndex(index); // Set the item being hovered
  };

  const handleMouseLeave = () => {
    setHoveredIconIndex(null); // Clear hovered item
    setIsPaused(false); // Resume rotation
    // The effect watching isPaused will restart the timer
  };

  const handleClick = (index: number) => {
    setActiveIconIndex(index); // Set this as the new persisted active item
    setHoveredIconIndex(index); // Keep it visually active if mouse is still over it
    setIsPaused(true); // Keep paused on click (user intention)
    // To auto-resume after a click, you could add:
    // setTimeout(() => {
    //   if (activeIconIndex === index) { // Only resume if this is still the active clicked item
    //      setIsPaused(false);
    //      setHoveredIconIndex(null); // And clear hover if mouse left
    //   }
    // }, 5000); // Resume after 5s
  };

  // Helper to determine if an item should be visually active
  const isItemVisuallyActive = (index: number): boolean => {
    if (hoveredIconIndex !== null) {
      return index === hoveredIconIndex; // Hovered item takes precedence
    }
    return index === activeIconIndex; // Otherwise, fall back to persisted active item
  };

  return (
    <div className="tab-layout">
      <div className="left-section flex col ac jc">
        {logoTitle && <h2 id="logo-title">{logoTitle}</h2>}
        <img src={image} alt={altText} />
      </div>
      <div className="right-section">
        <div
          className="rs-content"
          style={{
            paddingLeft: "50px",
          }}
        >
          <div className="right-down">
            <h2>
              <strong>{heading}</strong>
            </h2>
            <div className="right-double">
              {p1Strong && (
                <p style={{ paddingBottom: "20px" }}>
                  <strong>{p1Strong}</strong>
                </p>
              )}
              <p>{p1Regular}</p>
            </div>
          </div>
          <h3 style={{ paddingTop: "20px", color: "var(--color3)" }}>
            <strong>{subHeading}</strong>
          </h3>

          {items && items.length > 0 ? (
            <div className="subtabs-container">
              {items.map((subTab, index) => {
                const isActive = isItemVisuallyActive(index);
                return (
                  <div
                    key={`${subTab.label}-${index}`}
                    className={`subtab-item ${isActive ? "active" : ""}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                  >
                    <div className="subtab-content">
                      <div className="icon-container">
                        <Image
                          src={
                            isActive ? subTab.activeIcon : subTab.inactiveIcon
                          }
                          alt={subTab.label}
                          width={24} // Provide appropriate width (e.g., 24px)
                          height={24} // Provide appropriate height (e.g., 24px)
                          className="subtab-icon"
                          layout="responsive"
                          quality={75} // Default, adjust if needed
                        />
                      </div>
                      <span className="subtab-label">{subTab.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : extraImage ? (
            <div className="extra-image-container">
              <img src={extraImage} alt="Valuations Supplementary Visual" />
            </div>
          ) : null}

          <div className="cta-button-container">
            <AnimatedButton text={ctaText} href={ctaHref} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardTabContent;
