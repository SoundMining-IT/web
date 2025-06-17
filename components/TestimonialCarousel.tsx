import { useEffect, useRef, useState } from "react"; // Added useState

const testimonials = [
  {
    text: '"Over the years, Sound Mining have provided valuable technical and investment advice on precious and base metal assets in Africa. Their local insight greatly supported informed investment decisions in the region."',
    name: "Phil Wilson",
    job: "Retired VP Technical",
    company: "FRANCO NEVADA CORPORATION",
    corp: "",
  },
  {
    text: '"Worked closely with lenders and stakeholders to deliver bankable studies, in line with recognised industry policies and guidelines."',
    name: "Beverly Mona",
    job: "Technical Lead",
    company: "MINING INVESTMENTS,",
    corp: "INDUSTRIAL DEVELOPMENT CORPORATION",
  },
  {
    text: '"Sound Mining has been a trusted technical partner to Sedibelo Resources for over a decade, delivering strategic plans, cost-effective designs and reserve sign-offs for both open-pit and underground operations."',
    name: "Aart Broekhuizen",
    job: "Executive",
    company: "Sedibelo Resources Limited",
    corp: "",
  },
  {
    text: '"Highly recommend Sound Mining for their deep expertise and reliable project evaluations. Their insights and innovative thinking consistently drive efficiency and sustainable practices."',
    name: "Rob Ingram",
    job: "Independent advisor",
    company: "JSE",
    corp: "",
  },
  {
    text: '"Their 2024 Competent Person’s Report for Kalagadi confirmed reserves and recommended improvements that boosted production by over 50%. Their diverse skills continue to add value across multiple projects."',
    name: "Rian Strydom",
    job: "Financial Director",
    company: "Kalagadi Manganese",
    corp: "",
  },
  {
    text: '"I\'ve worked with Sound Mining several times and always found them professional and reliable. They define clear strategies and deliver detailed, high-quality outputs while aligning with client expectations."',
    name: "Richard Thomas",
    job: "COO",
    company: "Aris Mining",
    corp: "Canada, South America",
  },
  {
    text: '"I’ve relied on Sound Mining across roles and companies for 20 years. Their experienced team, trusted leadership and consistent delivery make them my go-to partner for technical services."',
    name: "Richard Tayelor",
    job: "Chief Investment Officer",
    company: "Horizon Corporation",
    corp: "London",
  },
  {
    text: '"Sound Mining plays a key role in engineering education, offering our students practical experience and strong mentorship. Their ongoing support helps bridge the gap between theory and industry."',
    name: "Prof Schalk Kok",
    job: "Chair",
    company: "School of Engineering",
    corp: "University of Pretoria",
  },
];

const TestimonialCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmountRef = useRef(0); // To persist scroll amount
  const animationFrameIdRef = useRef<number | null>(null); // To store animation frame ID
  const [isPaused, setIsPaused] = useState(false); // State for pause

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return; // Carousel element not ready yet
    }

    const scroll = () => {
      if (carousel) {
        // Ensure carousel is still valid within the animation frame
        scrollAmountRef.current -= 0.4; // Adjust speed here
        // carousel.scrollWidth is the total width of the duplicated content
        // carousel.scrollWidth / 2 is the width of one set of testimonials
        if (Math.abs(scrollAmountRef.current) >= carousel.scrollWidth / 2) {
          scrollAmountRef.current = 0; // Reset to create seamless loop
        }
        carousel.style.transform = `translateX(${scrollAmountRef.current}px)`;
      }
      // Continue the loop
      animationFrameIdRef.current = requestAnimationFrame(scroll);
    };

    if (!isPaused) {
      // Start or resume animation
      // Ensure we don't have multiple rAF loops running from quick hover changes
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(scroll);
    } else {
      // Pause animation: cancel the current animation frame if it's running
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null; // Clear the ID
      }
    }

    // Cleanup function:
    // This runs when the component unmounts or when `isPaused` changes (before the effect runs again)
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPaused]); // Re-run effect when isPaused changes

  return (
    <div className="testimonial-carousel">
      <div className="wire"></div>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-container" ref={carouselRef}>
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial ${index % 2 === 0 ? "above" : "below"}`}
            >
              <div className="clip"></div>
              <div className="clip"></div>
              <div className="testimonial-content">
                <p className="text">{testimonial.text}</p>
                <div className="bottom-data">
                  <span className="name">{testimonial.name}</span>
                  <span className="job">{testimonial.job}</span>
                  <span className="company">{testimonial.company}</span>
                  <span className="corp">{testimonial.corp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-carousel {
          position: relative;
          width: 100%;
          overflow: visible; /* Changed from hidden to visible based on original */
        }

        .carousel-wrapper {
          position: relative;
          overflow: visible; /* Changed from hidden to visible */
          width: 100%;
          /* cursor: pointer; /* Optional: indicate interactivity */
        }

        .carousel-container {
          display: flex;
          white-space: nowrap;
          /* transition: transform 0.1s linear; /* Can make it smoother but rAF is already smooth */
        }

        .testimonial {
          padding: 20px;
          margin: 10px;
          min-width: 300px; /* Ensure items have a width */
          /* background-color: #f9f9f9; */ /* Example style */
          /* border: 1px solid #eee; */ /* Example style */
          /* box-shadow: 2px 2px 5px rgba(0,0,0,0.1); */ /* Example style */
          position: relative; /* For clip positioning */
        }

        .testimonial-content {
          position: relative; /* If clips are absolutely positioned relative to this */
        }

        .bottom-data {
          position: relative; /* Keep relative positioning */
          bottom: -40px; /* Your original positioning */
          display: flex;
          flex-direction: column;
          align-items: center; /* Center items horizontally */
          text-align: center;
          /* margin-top: 15px; */ /* Add some space above the name */
        }

        .bottom-data span {
          display: block; /* Each on a new line */
          margin-bottom: 5px; /* Space between items */
        }

        .name {
          font-weight: bold;
        }

        .above {
          margin-top: 0; /* Original styling */
        }
        .below {
          margin-top: 40px; /* Original styling */
        }

        /* Clip styles (assuming they are small visual elements) */
        /* .clip { ... your clip styles ... } */
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;
