import React from "react";
import { ArrowDownRight, FolderGit2, Layers } from "lucide-react";

const CORE_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Redux Toolkit",
  "PostgreSQL",
  "Prisma",
  "Webflow",
];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
      <div className="max-w-3xl space-y-6">
        {/* Availability Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Open to Remote Engineering & Freelance Projects</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.12] dark:text-zinc-50">
          Building fast, scalable web applications with React, Next.js &amp;
          TypeScript.
        </h1>

        {/* Concise Positioning Summary */}
        <p className="text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
          Frontend engineer with{" "}
          <strong className="font-semibold text-zinc-900 dark:text-zinc-200">
            6 years of production experience
          </strong>{" "}
          crafting accessible UI systems, SaaS workflows, and e-commerce
          storefronts from architecture to deployment.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-transform hover:scale-[1.01] hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Layers className="h-4 w-4" />
            <span>Explore Live Projects</span>
            <ArrowDownRight className="h-4 w-4" />
          </a>

          <a
            href="https://github.com/raviroyit/raviroyit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Monorepo Source</span>
          </a>
        </div>

        {/* Core Tech Stack Strip */}
        <div id="stack" className="pt-4">
          <span className="mb-2.5 block text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Core Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {CORE_SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
