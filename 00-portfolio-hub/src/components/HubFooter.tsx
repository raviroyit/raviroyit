import React from "react";

export function HubFooter() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-400">
        <p>
          © 2026 Ravi Roy. Built with Next.js, TypeScript &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/raviroyit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub (@raviroyit)
          </a>
          <a
            href="https://github.com/raviroyit/raviroyit"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Portfolio Monorepo
          </a>
        </div>
      </div>
    </footer>
  );
}
