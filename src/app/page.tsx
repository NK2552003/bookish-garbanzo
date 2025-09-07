"use client";

import { useEffect, useState, useRef } from "react";
import SplashScreen from "../components/SplashScreen";
import GridLayout from "@/components/AdditionalActivity";
import ProjectsCP from "@/components/codepen";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
import ScrollIndicator from "@/components/scrollindicator";
import { motion } from "framer-motion";
import {
  HeroCard,
  PortfolioCard,
  AboutCard,
  GridCard,
  TimelineCard,
  ProjectsCard,
  CodepenCard,
  ContactCard,
} from "@/components/popup/cards";
import Skill3dScroll from "@/components/3d_components/skill-3d";
import About3DScroll from "@/components/3d_components/about-3d";
import Qualification3dScroll from "@/components/3d_components/qualification-3d";
import ProjectShowcase from "@/components/projects/projectShowcase";
import { FloatingNav } from "@/components/floatingNav";
import Signature from "@/components/signature";

const SectionWrapper = ({
  id,
  children,
  card,
  index,
  setVisibleSections,
  setCurrentSection,
  isAppReady,
}: {
  id: string;
  children: React.ReactNode;
  card?: React.ReactNode;
  index: number;
  setVisibleSections: React.Dispatch<React.SetStateAction<Set<number>>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  isAppReady: boolean;
}) => {
  const [inView, setInView] = useState(index === 0);
  const [hasBeenInView, setHasBeenInView] = useState(index === 0);
  const ref = useRef<HTMLElement | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAppReady) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setHasBeenInView(true);

          setVisibleSections((prev) => {
            if (prev.has(index)) return prev;
            return new Set(prev).add(index);
          });

          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setCurrentSection(index);
          }, 100);
        } else {
          setInView(false);
        }
      },
      {
        threshold: isMobile ? 0.1 : 0.5,
        rootMargin: isMobile ? "0px 0px -20% 0px" : "0px",
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [index, setVisibleSections, setCurrentSection, isAppReady]);

  return (
    <section id={id} ref={ref} className="snap-start snap-always relative">
      <div
        className={`transition-opacity duration-500 ${
          inView ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {hasBeenInView && children}
      </div>

      {card && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-5 right-8 md:right-18 z-40 px-2 md:py-3 w-[200px] md:w-[250px] max-w-md text-teal-500"
        >
          {card}
        </motion.div>
      )}
    </section>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set([0])
  );
  const [currentSection, setCurrentSection] = useState(0);
  const [isAppReady, setIsAppReady] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [vh, setVh] = useState("100vh");

  useEffect(() => {
    const updateVh = () => {
      const newVh = window.innerHeight * 0.01;
      setVh(`${newVh * 100}px`);
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    window.addEventListener("orientationchange", updateVh);
    return () => {
      window.removeEventListener("resize", updateVh);
      window.removeEventListener("orientationchange", updateVh);
    };
  }, []);

  const sectionBackgrounds = [
    "#031412", // Hero
    "#111111", // About
    "#100C08", // Portfolio
    "#03171a", // Timeline
    "#131313", // Grid
    "#04191c", // Projects
    "#011610", // ProjectsCP
    "#031412", // Contact
  ];

  const sections = [
    {
      id: "hero",
      content: (
        <div>
          {" "}
          {showSignature && <Signature />} <HeroSection />
        </div>
      ),
      card: <HeroCard />,
    },
    { id: "about", content: <About3DScroll />, card: <AboutCard /> },
    { id: "skills", content: <Skill3dScroll />, card: <PortfolioCard /> },
    {
      id: "qualifications",
      content: <Qualification3dScroll />,
      card: <TimelineCard />,
    },
    { id: "photography", content: <GridLayout />, card: <GridCard /> },
    {
      id: "projects",
      content: (
        <div className="min-h-[100vh]">
          <ProjectShowcase />
        </div>
      ),
      card: <ProjectsCard />,
    },
    { id: "codepens", content: <ProjectsCP />, card: <CodepenCard /> },
    { id: "contact", content: <ContactSection />, card: <ContactCard /> },
  ];

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setShowBanner(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  useEffect(() => {
    if (!isLoading) {
      setBackgroundReady(true);
      const readyTimer = setTimeout(() => {
        setIsAppReady(true);
        setShowSignature(true);
      }, 300);
      return () => clearTimeout(readyTimer);
    }
  }, [isLoading]);

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 backdrop-blur-3xl bg-teal-600/20 border border-teal-400/40 text-white text-center py-2 z-50 rounded-xl flex justify-center px-4 text-[12px]">
          Scroll Slowly to See 3D Animation
        </div>
      )}
      {isLoading ? (
        <SplashScreen onLoaded={() => setIsLoading(false)} />
      ) : (
        <>
          <ScrollIndicator
            totalBars={60}
            scrollContainerId="scroll-container"
          />
          <FloatingNav />
          <main>
            {backgroundReady && (
              <div className="fixed inset-0 z-0">
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    backgroundColor: sectionBackgrounds[currentSection],
                    transition: isAppReady
                      ? "background-color 800ms ease-out"
                      : "none",
                    willChange: "background-color",
                  }}
                >
                  <div className="absolute inset-0 z-0 grid-bg pointer-events-none will-change-transform"></div>
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, ${sectionBackgrounds[currentSection]}00, ${sectionBackgrounds[currentSection]}20)`,
                      transition: isAppReady
                        ? "background 800ms ease-out"
                        : "none",
                      willChange: "background",
                    }}
                  />
                </div>
              </div>
            )}

            <div
              id="scroll-container"
              className="relative z-10 overflow-y-scroll scroll-smooth snap-y snap-mandatory"
              style={{
                height: vh,
              }}
            >
              {sections.map((section, index) => (
                <SectionWrapper
                  key={section.id}
                  id={section.id}
                  card={section.card}
                  index={index}
                  setVisibleSections={setVisibleSections}
                  setCurrentSection={setCurrentSection}
                  isAppReady={isAppReady}
                >
                  {section.content}
                </SectionWrapper>
              ))}

              <section id="footer" className="snap-start snap-always relative">
                <Footer />
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}
