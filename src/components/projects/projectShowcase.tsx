"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Codepen } from "lucide-react";
import ArticlesShowcase from "./articlesShowcase";

const showcaseData = [
  {
    number: 1,
    label: "Web Development Tool",
    title: "GLB2CODE CONVERTER",
    subtitle: "Pending",
    description: "Upload a GLB, get a full code in any language!",
    technologies: ["Next.js", "Typescript", "Tailwindcss", "GLB 3D models", "Three.js"],
    links: [
      { label: "GitHub", url: "https://github.com/NK2552003/glb2code" },
    ],
    videoUrl: "./Project_Assets/Videos/glb2code.mp4",
    image: "./Project_Assets/Images/glb2code.png"
  },
  {
    number: 2,
    label: "AI/ML, Web Development",
    title: "AI Roadmap Generator",
    subtitle: "Completed",
    description: " The AI Roadmap Generator, designed to help learners, educators, and developers visualize and plan AI journeys like never before.",
    technologies: ["Next.js", "Typescript", "Supabase", "Tailwindcss", "Inngest", "Github Models", "Ui/UX", "Custom Algo", "ReactFlow"],
    links: [
      { label: "GitHub", url: "https://github.com/NK2552003/MINDROUTE_DOCUMENTATION" },
    ],
    videoUrl: "./Project_Assets/Videos/roadmap.mp4",
    image: "./Project_Assets/Images/roadmap.png"
  },
  {
    number: 3,
    label: "AI/ML Web Development",
    title: "Tattva - Learning platform",
    subtitle: "Working on it",
    description: "The one stop learning platform for everything!",
    technologies: ["Next.js", "Typescript", "Supabase", "Tailwindcss", "Inngest", "Github Models", "Ui/UX", "Custom Algo", "ReactFlow"],
    links: [
    ],
    videoUrl: "./Project_Assets/Videos/tattva.mp4",
    image: "./Project_Assets/Images/tattva.png"
  },
  {
    number: 4,
    label: "Web Development",
    title: "Blog WebSite",
    subtitle: "FrontEnd Completed",
    description: "An app that is helpful for students to share their story or news, articles or any synopsis with students in college",
    technologies: ["Next.js", "Typescript", "Tailwindcss"],
    links: [
      { label: "Github", url: "https://github.com/vineet358/project" },
    ],
    videoUrl: "./Project_Assets/Videos/blog.mp4",
    image: "./Project_Assets/Images/blog.png"
  },
  {
    number: 5,
    label: "AI/ML",
    title: "Hand Gesture Detector",
    subtitle: "Completed",
    description: "With MediaPipe and OpenCV, I built a system that lets you control your computer using simple hand gestures. No mouse, no keyboard—just pure hand wizardry!",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://nk2552003.github.io/Civic_Link/" },
      { label: "GitHub", url: "https://github.com/NK2552003/Civic_Link" },
      { label: "CodePen", url: "https://nk2552003.github.io/Civic_Link/" }
    ],
    videoUrl: "./Project_Assets/Videos/handGesture.mp4",
    image: "./Project_Assets/Images/handgesture.png"
  },
  {
    number: 6,
    label: "Web Development",
    title: "BlissCamp",
    subtitle: "Completed",
    description: "A responsive tourism website designed to help travelers discover destinations, plan trips, and explore local experiences. Features include intuitive navigation, location highlights, and an aesthetically pleasing UI for a seamless browsing experience.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://nk2552003.github.io/BlissCampIndia/" },
      { label: "GitHub", url: "https://github.com/NK2552003/BlissCampIndia" },
      { label: "CodePen", url: "https://github.com/NK2552003/BlissCampIndia" }
    ],
    videoUrl: "./Project_Assets/Videos/1.mp4",
    image: "./Project_Assets/Images/1.png"
  },
  {
    number: 7,
    label: "App Development",
    title: "HostelEase",
    subtitle: "Working on it",
    description: "A hostel management mobile app designed to streamline communication between hostel residents and wardens. Features include maintenance requests, announcements, room allocation tracking, and a clean, user-friendly interface for quick access to essential services.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://github.com/NK2552003/Hostel_Management_App" },
      { label: "GitHub", url: "https://github.com/NK2552003/Hostel_Management_App" },
      { label: "CodePen", url: "https://github.com/NK2552003/Hostel_Management_App" }
    ],
    videoUrl: "./Project_Assets/Videos/6.mp4",
    image: "./Project_Assets/Images/6.png"
  },
  {
    number: 8,
    label: "Web Development",
    title: "Portfolio",
    subtitle: "Completed",
    description: "A custom personal portfolio website built for a colleague, showcasing their professional profile, projects, and skills. Designed with responsive layouts and optimized for fast loading, providing an elegant digital resume experience.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://rohit-s-portfolio.netlify.app/" },
      { label: "GitHub", url: "https://github.com/NK2552003/Rohit-s_Portfolio" },
      { label: "CodePen", url: "https://github.com/NK2552003/Rohit-s_Portfolio" }
    ],
    videoUrl: "./Project_Assets/Videos/7.mp4",
    image: "./Project_Assets/Images/7.png"
  },
  {
    number: 9,
    label: "App Development",
    title: "Satranj",
    subtitle: "Completed",
    description: "A mobile chess game inspired by the ancient Indian game of Chaturanga, built using Flutter. Includes simple yet engaging gameplay mechanics, smooth animations, and an accessible design suitable for players of all ages.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://github.com/NK2552003/Satranj-Chess-_Game" },
      { label: "GitHub", url: "https://github.com/NK2552003/Satranj-Chess-_Game" },
      { label: "CodePen", url: "https://github.com/NK2552003/Satranj-Chess-_Game" }
    ],
    videoUrl: "./Project_Assets/Videos/8.mp4",
    image: "./Project_Assets/Images/8.png"
  },
  {
    number: 10,
    label: "Web Development",
    title: "Civic Link",
    subtitle: "Completed",
    description: "A community-focused platform that enables citizens to report local issues, request civic services, and connect with community representatives. Built with a collaborative design approach to encourage transparency and social engagement.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://nk2552003.github.io/Civic_Link/" },
      { label: "GitHub", url: "https://github.com/NK2552003/Civic_Link" },
      { label: "CodePen", url: "https://nk2552003.github.io/Civic_Link/" }
    ],
    videoUrl: "./Project_Assets/Videos/10.mp4",
    image: "./Project_Assets/Images/10.png"
  },
  {
    number: 11,
    label: "App Development",
    title: "FreshMart",
    subtitle: "Working on it",
    description: "A modern grocery shopping app designed for convenience and speed. Users can browse products, create shopping lists, and place orders with real-time inventory updates, offering a complete one-stop shopping experience.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://github.com/NK2552003/FreshMart" },
      { label: "GitHub", url: "https://github.com/NK2552003/FreshMart" },
      { label: "CodePen", url: "https://github.com/NK2552003/FreshMart" }
    ],
    videoUrl: "./Project_Assets/Videos/v_1.mp4",
    image: "./Project_Assets/Images/11.png"
  },
  {
    number: 12,
    label: "App Development",
    title: "Gemini_Chat",
    subtitle: "Completed",
    description: "A chat application integrating Gemini AI to provide intelligent and context-aware responses. Supports conversational interaction, quick replies, and a simple interface for seamless AI-assisted communication.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://github.com/NK2552003/Gemini_Chat_AI" },
      { label: "GitHub", url: "https://github.com/NK2552003/Gemini_Chat_AI" },
      { label: "CodePen", url: "https://github.com/NK2552003/Gemini_Chat_AI" }
    ],
    videoUrl: "./Project_Assets/Videos/v_1.mp4",
    image: "./Project_Assets/Images/13.png"
  },
  {
    number: 13,
    label: "App Development",
    title: "Dhayana",
    subtitle: "Completed",
    description: "A productivity app for task tracking and management, enabling users to record, organize, and monitor pending tasks. Designed with minimal UI and intuitive controls to encourage consistent use for better time management.",
    technologies: [],
    links: [
      { label: "Live Demo", url: "https://github.com/NK2552003/Flutter_ToDo" },
      { label: "GitHub", url: "https://github.com/NK2552003/Flutter_ToDo" },
      { label: "CodePen", url: "https://github.com/NK2552003/Flutter_ToDo" }
    ],
    videoUrl: "./Project_Assets/Videos/v_1.mp4",
    image: "./Project_Assets/Images/14.png"
  }
];

const iconForLink = (label: string) => {
  switch (label.toLowerCase()) {
    case "github":
      return <Github size={18} />;
    case "live demo":
      return <ExternalLink size={18} />;
    case "codepen":
      return <Codepen size={18} />;
    default:
      return <ExternalLink size={18} />;
  }
};

export default function ProjectShowcase() {
  const [activeId, setActiveId] = useState<number>(showcaseData[0].number);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveId((prevId) => {
        const currentIndex = showcaseData.findIndex((p) => p.number === prevId);
        const nextIndex = (currentIndex + 1) % showcaseData.length;
        return showcaseData[nextIndex].number;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center w-full text-white pt-26">
      <div
        className="flex md:flex-row flex-col items-stretch w-[90%] md:h-[500px] h-auto overflow-hidden"
      >
        {showcaseData.map((project) => {
          const isActive = project.number === activeId;
          return (
            <div
              key={project.number}
              onClick={() => setActiveId(project.number)}
              onMouseEnter={() => {
                setPaused(true);
                if (videoRefs.current[project.number]) {
                  videoRefs.current[project.number]!.play();
                }
              }}
              onMouseLeave={() => {
                setPaused(false);
                if (videoRefs.current[project.number]) {
                  videoRefs.current[project.number]!.pause();
                  videoRefs.current[project.number]!.currentTime = 0;
                }
              }}
              className={`relative cursor-pointer flex-shrink-0 m-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.05,0.61,0.41,0.95)] border-[0.5px] border-teal-400/30
    ${isActive
                  ? "md:flex-grow-[20] flex-grow rounded-3xl md:h-auto h-[300px]"
                  : "md:flex-grow flex-grow rounded-2xl md:h-auto h-[50px] grayscale"
                }`}
              style={{
                backgroundColor: "#000",
                minHeight: "unset",
              }}
            >
              {/* Background Video */}
              <video
                ref={(el) => {
                  videoRefs.current[project.number] = el;
                }}
                src={project.videoUrl}
                poster={project.image}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${!isActive ? "blur-sm scale-105" : ""
                  }`}
              />


              {/* Shadow overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity ${isActive ? "opacity-100" : "opacity-60"
                  }`}
              />

              {/* Show label only if active */}
              {isActive && (
                <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                  <span className="px-3 py-1 text-xs font-semibold bg-white/80 text-black rounded-full">
                    {project.label}
                  </span>
                </div>
              )}

              {/* Text Content */}
              {isActive ? (
                <div className="absolute bottom-5 left-5 p-4 z-10">
                  <div className="font-bold text-lg">{project.title}</div>
                  <div className="text-sm">{project.subtitle}</div>
                  <p className="mt-3 text-sm opacity-90 max-w-xs line-clamp-2 md:line-clamp-4">
                    {project.description}
                  </p>
                  {project.technologies.length > 0 && (
                    <div className="hidden flex-wrap gap-2 mt-2 md:flex">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.links.length > 0 && (
                    <div className="flex gap-3 mt-3 flex-wrap">
                      {project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-sm hover:underline"
                        >
                          {iconForLink(link.label)}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center z-10">
                  <div className="hidden md:block transform rotate-90 font-bold tracking-widest whitespace-nowrap">
                    {project.title}
                  </div>
                  <div className="md:hidden block font-bold tracking-widest whitespace-nowrap">
                    {project.title}
                  </div>
                </div>

              )}
            </div>
          );
        })}
      </div>
    </div>
    <ArticlesShowcase/>
    </div>
  );
}
