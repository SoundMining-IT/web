// components/Hero.tsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export interface HeroProps {
  backgroundImage?: string;
  middleImage?: string;
  foregroundImage?: string;
  title: string;
  subtitle?: string;
  description?: string;
  textPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  textAlign?: "left" | "right" | "center"; // For text alignment WITHIN the content block
  slideDirection?: "left" | "right" | "up" | "down";
  parallaxStrength?: number;
  titleParallaxFactor?: number;
  contentParallaxFactor?: number;
  middleImageParallaxFactor?: number;
  contentScrollDirectionY?: "up" | "down" | "none";
  contentScrollDirectionX?: "left" | "right" | "none";
}

const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  middleImage,
  foregroundImage,
  title,
  subtitle,
  description,
  textPosition = "center",
  textAlign = "center", // This will be applied to the .content-inner div
  slideDirection = "left",
  parallaxStrength = 10,
  titleParallaxFactor = 0.5,
  contentParallaxFactor = 0.4,
  middleImageParallaxFactor = 0.3,
  contentScrollDirectionY = "down",
  contentScrollDirectionX = "none",
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollY: windowScrollY } = useScroll();

  const scrollDirectionMultiplierY =
    contentScrollDirectionY === "up"
      ? -1
      : contentScrollDirectionY === "down"
      ? 1
      : 0;
  const scrollDirectionMultiplierX =
    contentScrollDirectionX === "left"
      ? -1
      : contentScrollDirectionX === "right"
      ? 1
      : 0;

  const effectiveTitleFactor = titleParallaxFactor;
  const effectiveContentFactor = contentParallaxFactor;

  const titleScrollY = useTransform(
    windowScrollY,
    (latest) => latest * effectiveTitleFactor * scrollDirectionMultiplierY
  );
  const titleScrollX = useTransform(
    windowScrollY,
    (latest) => latest * effectiveTitleFactor * scrollDirectionMultiplierX
  );
  const contentScrollY = useTransform(
    windowScrollY,
    (latest) => latest * effectiveContentFactor * scrollDirectionMultiplierY
  );
  const contentScrollX = useTransform(
    windowScrollY,
    (latest) => latest * effectiveContentFactor * scrollDirectionMultiplierX
  );
  const middleImageScrollY = useTransform(
    windowScrollY,
    (latest) => latest * middleImageParallaxFactor * scrollDirectionMultiplierY
  );

  const middleOffsetX = useMemo(() => {
    if (!ref.current) return 0;
    const maxX = ref.current.offsetWidth;
    const midX = maxX / 2;
    return (mouseX - midX) * (parallaxStrength / (midX * 8));
  }, [mouseX, parallaxStrength]);

  const middleOffsetY = useMemo(() => {
    if (!ref.current) return 0;
    const maxY = ref.current.offsetHeight;
    const midY = maxY / 2;
    return (mouseY - midY) * (parallaxStrength / (midY * 8));
  }, [mouseY, parallaxStrength]);

  const foregroundOffsetX = useMemo(() => {
    if (!ref.current) return 0;
    const maxX = ref.current.offsetWidth;
    const midX = maxX / 2;
    return (mouseX - midX) * (parallaxStrength / (midX * 4));
  }, [mouseX, parallaxStrength]);

  const foregroundOffsetY = useMemo(() => {
    if (!ref.current) return 0;
    const maxY = ref.current.offsetHeight;
    const midY = maxY / 2;
    return (mouseY - midY) * (parallaxStrength / (midY * 4));
  }, [mouseY, parallaxStrength]);

  const getSlideVariants = (direction: string) => {
    const slideDistance = 50;
    switch (direction) {
      case "left":
        return {
          hidden: { x: -slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "right":
        return {
          hidden: { x: slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case "up":
        return {
          hidden: { y: -slideDistance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "down":
        return {
          hidden: { y: slideDistance, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      default:
        return {
          hidden: { x: -slideDistance, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
    }
  };
  const slideVariants = getSlideVariants(slideDirection);
  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: slideVariants.hidden,
    visible: {
      ...slideVariants.visible,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      // The main section's classes are for general targeting or overrides,
      // but the specific text positioning is now directly on the .content div's style.
      // The text-${textAlign} is for the inner text block.
      className={`hero section-wrapper desktop`} // Removed ${textPosition} as it's handled inline
      ref={ref}
      style={{
        position: "relative",
        minHeight: "600px",
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    >
      {backgroundImage && (
        <motion.div
          className="hero-background-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            priority={true} // PERFORMANCE
            quality={85}
          />
        </motion.div>
      )}

      {middleImage && (
        <motion.div
          className="hero-middle-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            mixBlendMode: "color-dodge",
            willChange: "transform",
            translateX: middleOffsetX,
            translateY: middleOffsetY,
            y: middleImageScrollY,
            overflow: "hidden",
          }}
        >
          <Image
            src={middleImage}
            alt="Hero middle layer decoration"
            fill
            style={{ objectFit: "cover" }}
            priority={true} // PERFORMANCE
            quality={85}
          />
        </motion.div>
      )}

      {/* Layer 3: Content (Text) - RESTORING ORIGINAL INLINE STYLE LOGIC FOR POSITIONING */}
      <motion.div
        className="content"
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex", // Use flex for alignment
          flexDirection: "column",

          // THIS IS THE CRITICAL PART FOR TEXT POSITIONING - MATCHING YOUR ORIGINAL
          justifyContent: textPosition.includes("top")
            ? "flex-start"
            : textPosition.includes("bottom")
            ? "flex-end"
            : "center",
          alignItems: textPosition.includes("left")
            ? "flex-start"
            : textPosition.includes("right")
            ? "flex-end"
            : "center",
        }}
      >
        <div
          // The text-${textAlign} class is applied here to control text alignment (left, center, right)
          // for the title, subtitle, description within this block.
          className={`content-inner text-${textAlign}`}
          style={{ maxWidth: "800px", padding: "2rem" }}
        >
          <motion.h1
            className="title"
            variants={item}
            style={{ x: titleScrollX, y: titleScrollY }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.h2
              className="subtitle"
              variants={item}
              style={{ x: contentScrollX, y: contentScrollY }}
            >
              {subtitle}
            </motion.h2>
          )}
          {description && (
            <motion.p
              className="description"
              variants={item}
              style={{ x: contentScrollX, y: contentScrollY }}
            >
              {description}
            </motion.p>
          )}
          {/* <motion.div className="bottom-arch" variants={item} /> */}
        </div>
      </motion.div>

      {foregroundImage && (
        <motion.div
          className="hero-foreground-image"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 4,
            mixBlendMode: "normal",
            pointerEvents: "none",
            willChange: "transform",
            translateX: foregroundOffsetX,
            translateY: foregroundOffsetY,
            overflow: "hidden",
          }}
        >
          <Image
            src={foregroundImage}
            alt="Hero foreground element"
            fill
            style={{ objectFit: "cover" }}
            priority={true} // PERFORMANCE
            quality={85}
          />
        </motion.div>
      )}

      <style jsx>{`
        /* These styles control the text-alignment within the content-inner block */
        .content-inner.text-left {
          text-align: left;
        }
        .content-inner.text-right {
          text-align: right;
        }
        .content-inner.text-center {
          text-align: center;
        }

        /* Styles for the text elements themselves */
        .title,
        .subtitle,
        .description {
          color: white;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
          margin-bottom: 0.5em;
        }
        .title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: bold;
        }
        .subtitle {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
        }
        .description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          line-height: 1.6;
        }

        .bottom-arch {
          /* Your styles */
        }
      `}</style>
    </section>
  );
};

export default Hero;
