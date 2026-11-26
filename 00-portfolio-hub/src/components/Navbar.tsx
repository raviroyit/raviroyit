"use client";

import React from "react";
import { Code2, ExternalLink } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-zinc-900 transition-opacity hover:opacity-85 dark:text-zinc-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <Code2 className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight sm:text-base">
              Ravi Roy
            </span>
            <span className="block text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Frontend & Full-Stack Engineer
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-5"
        >
          <a
            href="#projects"
            className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 sm:inline-block dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Projects
          </a>
          <a
            href="#stack"
            className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 sm:inline-block dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Tech Stack
          </a>
          <a
            href="https://github.com/raviroyit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
