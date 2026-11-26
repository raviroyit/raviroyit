"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, FolderGit2, Sparkles } from "lucide-react";
import { PORTFOLIO_PROJECTS, type ProjectCategory } from "@/data/projects";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Frontend UI",
  "Full-Stack & SaaS",
  "Client & Webflow",
];

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(
          (project) => project.category === activeCategory,
        );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-6xl border-t border-zinc-200/80 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 dark:border-zinc-800/80"
    >
      {/* Section Header + Category Filter Pills */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            id="projects-heading"
            className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50"
          >
            Selected Work &amp; Live Demos
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Production builds, full-stack SaaS prototypes, and client
            deployments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                  isSelected
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Project Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700"
          >
            <div className="space-y-4">
              {/* Category Badge & Featured Pill */}
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    <Sparkles className="h-3 w-3" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {project.description}
              </p>

              {/* Key Engineering Highlights */}
              <ul className="space-y-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Tech Stack + Action Links */}
            <div className="mt-6 space-y-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <FolderGit2 className="h-3.5 w-3.5" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
