"use client";

import React from "react";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  url: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Why .env and .env.local Files Are Crucial in Modern Development Projects",
    subtitle: "Separating secrets, ensuring flexibility",
    description: "Explore what .env and .env.local files are, why they matter, and best practices for safe and scalable configuration management.",
    date: "2025-08-03",
    tags: ["react", "webdev", "dotenv", "beginners"],
    image: "env_envlocal.webp",
    url: "https://dev.to/nk2552003/why-env-and-envlocal-files-are-crucial-in-modern-development-projects-3jop",
  },
  {
    id: 2,
    title: "How to Make Your First Open Source Contribution – The Easy Way!",
    subtitle: "Beginner-friendly guide to open source",
    description: "A step-by-step walkthrough—set up Git/SSH, fork, clone, branch, commit, push, and submit your very first pull request.",
    date: "2025-07-31",
    tags: ["github", "git", "beginners", "devops"],
    image: "OSC.webp",
    url: "https://dev.to/nk2552003/how-to-make-your-first-open-source-contribution-the-easy-way-48pl",
  },
  {
    id: 3,
    title: "Introducing MindRoute: Your Personalized AI Learning Roadmap Generator",
    subtitle: "AI-powered learning paths",
    description: "Meet MindRoute—an AI-driven platform that creates interactive, personalized learning roadmaps tailored to your tech goals.",
    date: "2025-07-30",
    tags: ["webdev", "ai", "documentation", "nextjs"],
    image: "mindroute.webp",
    url: "https://dev.to/nk2552003/introducing-mindroute-your-personalized-ai-learning-roadmap-generator-kp",
  },
];


export default function ArticlesShowcase() {
  return (
      <div className="px-4 md:px-22 pb-12">
        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border-[0.5px] border-teal-400/30 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Article Image */}
              <div className="h-48 w-full overflow-hidden rounded-xl border-b border-teal-400/30">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Article Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-2">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} />{" "}
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-3">
                  {article.subtitle}
                </p>

                <p className="text-gray-600 dark:text-gray-300 flex-1 mb-4">
                  {article.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Link
                  href={article.url}
                  className="flex items-center justify-end gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline pr-2"
                  target="_blank"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
