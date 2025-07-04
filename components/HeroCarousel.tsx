// components/HeroCarousel.tsx
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Interface for individual slide content
export interface SlideContent {
  subtitle?: string;
  description?: string;
}

export interface HeroProps {
  backgroundImage?: string;
  foregroundImage?: string;
  middleImage?: string;
  title: string;
  content?: string | string[] | SlideContent | SlideContent[];
  textPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  textAlign?: "left" | "right" | "center";
  slideDirection?: "left" | "right" | "up" | "down";
  carouselEnabled?: boolean;
  carouselInterval?: number;
  parallaxStrength?: number;
  titleParallaxFactor?: number;
  contentParallaxFactor?: number;
  middleImageParallaxFactor?: number;
}

const HeroCarousel: React.FC<HeroProps> = ({
  backgroundImage,
  foregroundImage,
  middleImage,
  title,
  content,
  textPosition = "center",
  textAlign = "center",
  slideDirection = "left",
  carouselEnabled = false,
  carouselInterval = 5000,
  parallaxStrength = 10,
  titleParallaxFactor = 0.5,
  contentParallaxFactor = 0.5,
  middleImageParallaxFactor = 0.5,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const { scrollY } = useScroll();

  const titleScrollY = useTransform(
    scrollY,
    (latest) => latest * titleParallaxFactor
  );
  const contentScrollY = useTransform(
    scrollY,
    (latest) => latest * contentParallaxFactor
  );
  const middleImageScrollY = useTransform(
    scrollY,
    (latest) => latest * middleImageParallaxFactor
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const processedContent: SlideContent[] = useMemo(() => {
    if (!content) return [{}];
    if (typeof content === "string") return [{ subtitle: content }];
    if (Array.isArray(content) && typeof content[0] === "string")
      return (content as string[]).map((subtitle) => ({ subtitle }));
    if (!Array.isArray(content) && typeof content === "object")
      return [content as SlideContent];
    return content as SlideContent[];
  }, [content]);

  const totalSlides = processedContent.length;

  useEffect(() => {
    if (!carouselEnabled || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, carouselInterval);
    return () => clearInterval(interval);
  }, [carouselEnabled, carouselInterval, totalSlides]);

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
  const currentContentData = carouselEnabled
    ? processedContent[currentSlide]
    : processedContent[0];
  const handleDotClick = (index: number) => setCurrentSlide(index);
  const effectiveTextAlign = carouselEnabled ? "left" : textAlign;

  return (
    <section
      className={`hero desktop ${textPosition} ${
        carouselEnabled ? "carousel-mode" : ""
      } section-wrapper`}
      ref={ref}
      style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}
    >
      {backgroundImage && (
        <motion.div
          className="background-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            priority={true} // CRITICAL: Preloads the background image
          />
        </motion.div>
      )}

      {middleImage && (
        <motion.div
          className="middle-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            mixBlendMode: "color-dodge",
            translateX: middleOffsetX,
            translateY: middleOffsetY,
            y: middleImageScrollY,
            willChange: "transform",
          }}
        >
          <Image
            src={middleImage}
            alt="Hero middle layer"
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            priority={true} // CRITICAL: Preloads the middle image
          />
        </motion.div>
      )}

      {foregroundImage && (
        <motion.div
          className="foreground-image-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 99,
            mixBlendMode: "normal",
            translateX: foregroundOffsetX,
            translateY: foregroundOffsetY,
            willChange: "transform",
          }}
        >
          <Image
            src={foregroundImage}
            alt="Hero foreground layer"
            fill
            style={{ objectFit: "cover" }}
            quality={85}
            priority={true} // CRITICAL: Preloads the foreground image
          />
        </motion.div>
      )}

      <motion.div
        className={`content text-${effectiveTextAlign}`}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ position: "relative", zIndex: 3 }}
      >
        <motion.h1
          className="title"
          variants={item}
          style={{ y: titleScrollY }}
        >
          {title}
        </motion.h1>
        <div className="car-area">
          {currentContentData.subtitle && (
            <motion.h2
              className="subtitle"
              variants={item}
              key={`subtitle-${currentSlide}`}
              style={{ y: contentScrollY, whiteSpace: "nowrap" }}
            >
              {currentContentData.subtitle}
            </motion.h2>
          )}
          {currentContentData.description && (
            <motion.p
              className="description"
              variants={item}
              key={`description-${currentSlide}`}
              style={{ y: contentScrollY }}
            >
              {currentContentData.description}
            </motion.p>
          )}
        </div>

        {carouselEnabled && totalSlides > 1 && (
          <motion.div
            className="carousel-dots"
            variants={item}
            style={{ y: contentScrollY }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </motion.div>
        )}
        <motion.div className="bottom-arch" variants={item} />
      </motion.div>

      <style jsx>{`
        .hero {
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden; /* Important to contain absolutely positioned children */
          background-color: #111; /* Fallback bg if images are slow/fail */
        }
        .hero.top-left .content {
          align-items: flex-start;
          justify-content: flex-start;
        }
        .hero.top-right .content {
          align-items: flex-end;
          justify-content: flex-start;
        }
        .hero.bottom-left .content {
          align-items: flex-start;
          justify-content: flex-end;
        }
        .hero.bottom-right .content {
          align-items: flex-end;
          justify-content: flex-end;
        }
        .hero.center .content {
          align-items: center;
          justify-content: center;
        }
        .content {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          max-width: 800px;
        }
        .text-left {
          text-align: left;
        }
        .text-right {
          text-align: right;
        }
        .text-center {
          text-align: center;
        }
        .carousel-mode .text-right,
        .carousel-mode .text-center {
          text-align: left;
        }
        .carousel-dots {
          display: flex;
          justify-content: flex-start;
          margin-top: 1rem;
        }
        .dot {
          height: 20px;
          width: 20px;
          margin: 0 5px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .dot:first-child {
          margin-left: 0;
        }
        .dot.active {
          background-color: var(
            --color2
          ); /* Consider using var(--color2) if defined */
        }
        .title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 0.5rem;
          color: white;
          font-weight: bold;
        }
        .subtitle {
          font-size: clamp(1.2rem, 3vw, 1.75rem);
          margin-bottom: 0.75rem;
          color: #e0e0e0;
        }
        .description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #cccccc;
          line-height: 1.6;
        }
        .bottom-arch {
          /* Define if it's a visual element */
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
