"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  categoryFilter: string;
  promoCode?: string;
  accentGradient: string;
  dishEmoji: string;
  dishCaption: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "royal-biryani",
    eyebrow: "Weekend Feast Special",
    title: "Experience the Royal Dum Feast",
    description:
      "Slow-cooked aged basmati layered with saffron, caramelized onions, and tender spiced cuts—sealed in a traditional clay handi.",
    ctaLabel: "Order Dum Biryani",
    categoryFilter: "dum-biryani",
    promoCode: "ROYAL25",
    accentGradient:
      "from-[#F5EDE3] via-[#FAF8F5] to-[#F3E5D8] dark:from-[#1E1A18] dark:via-[#181B21] dark:to-[#231B16]",
    dishEmoji: "🍲",
    dishCaption: "Hyderabadi Dum Handi • Serves 2–3",
  },
  {
    id: "tandoor-platter",
    eyebrow: "Fresh From Clay Oven",
    title: "Smoky Charcoal Tandoor Platters",
    description:
      "Chargrilled Paneer Tikka Lababdar, Malai Chaap, and Garlic Naan brushed with cultured white butter straight off the skewers.",
    ctaLabel: "Explore Tandoor",
    categoryFilter: "starters",
    promoCode: "TANDOOR15",
    accentGradient:
      "from-[#F6ECE4] via-[#FAF8F5] to-[#EFE4D8] dark:from-[#1D1917] dark:via-[#181B21] dark:to-[#211C18]",
    dishEmoji: "🔥",
    dishCaption: "Paneer Tikka & Garlic Naan Combo",
  },
  {
    id: "shahi-thali",
    eyebrow: "Chef's Signature",
    title: "24-Hour Slow-Simmered Dal Makhani",
    description:
      "Whole black urad lentils simmered overnight over low embers with ginger, Kashmiri chilli, and hand-churned makkhan.",
    ctaLabel: "Browse Curries",
    categoryFilter: "curries",
    accentGradient:
      "from-[#F4ECE2] via-[#FAF8F5] to-[#ECE2D5] dark:from-[#1B1918] dark:via-[#181B21] dark:to-[#1F1C1A]",
    dishEmoji: "🥘",
    dishCaption: "Signature Dal Makhani & Laccha Paratha",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const totalSlides = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // WCAG Support Left/Right arrow keys when focus is inside the banner

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  //   Copy promocode
  const handleCopyPromo = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => {
        setCopiedCode((prev) => (prev === code ? null : prev));
      }, 2000);
    } catch {
      // Fallback if clipboard permissions are blocked
      setCopiedCode(code);
    }
  };

  //   autoplay every 5 seconds unless hovered or focused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, handleNext, currentIndex]);

  return (
    <section
      aria-label="Featured promotions"
      aria-roledescription="carousel"
      className="mx-auto max-w-7xl sm:px-6 lg:px-8"
    >
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${activeSlide.accentGradient} p-6 shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-10 lg:p-12`}
      >
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left Content Column (7 cols on desktop) */}
          <div className="space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge
                variant="secondary"
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {activeSlide.eyebrow}
              </Badge>

              {activeSlide.promoCode && (
                <span className="rounded-full border border-dashed border-primary/40 bg-card/80 px-3 py-0.5 text-xs font-medium text-muted-foreground">
                  Use code{" "}
                  <strong className="font-semibold text-foreground">
                    {activeSlide.promoCode}
                  </strong>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {activeSlide.title}
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {activeSlide.description}
            </p>

            <div className="pt-1">
              <Button
                size="lg"
                className="rounded-full px-6 font-semibold shadow-sm"
              >
                {activeSlide.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Visual Showcase Column (5 cols on desktop) */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-md flex-col items-center justify-center rounded-2xl border bg-card/80 p-6 text-center shadow-md backdrop-blur-sm">
              <span
                className="text-7xl drop-shadow-sm sm:text-8xl"
                role="img"
                aria-label={activeSlide.dishCaption}
              >
                {activeSlide.dishEmoji}
              </span>
              <span className="mt-4 rounded-full border bg-background/90 px-3.5 py-1 text-xs font-medium text-foreground shadow-xs">
                {activeSlide.dishCaption}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Controls: Slide Dots + Prev/Next Arrows */}
        <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4">
          {/* Progress Indicator Dots */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Choose a promotional slide"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "w-7 bg-primary"
                      : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              );
            })}
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next slide"
              className="h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
