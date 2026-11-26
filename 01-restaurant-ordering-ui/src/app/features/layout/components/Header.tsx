"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search, X, Sun, Moon, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../cart/context/CartContext";
import { useTheme } from "next-themes";

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}
// Delivery Locations
const DELIVERY_LOCATIONS = [
  { value: "boring-rd", label: "Boring Rd, Patna" },
  { value: "kankarbagh", label: "Kankarbagh, Patna" },
  { value: "bailey-rd", label: "Bailey Rd, Patna" },
  { value: "rajendra-nagar", label: "Rajendra Nagar, Patna" },
] as const;

export function Header() {
  const [selectedLocation, setSelectedLocation] = useState<string>("boring-rd");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  const searchInputRef = useRef<HTMLInputElement>(null);
  // Sync initial theme from localStorage or OS preference

  const { totalCount, openDrawer, profile } = useCart();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLocaleLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //   Debaunce search text

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const currentQuery = params.get("q") ?? "";
      const nextQuery = searchValue.trim();

      if (currentQuery === nextQuery) return;

      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchValue, pathname, router]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Slot: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/zafran-logo.png"
              alt="Logo"
              width={60}
              height={60}
            />
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <UtensilsCrossed className="h-5 w-5" />
            </div> */}
            <div className="leading-tight">
              <span className="block text-base font-bold tracking-tight">
                Zaffran Kitchen
              </span>
              <span className="block text-[11px] font-medium text-muted-foreground">
                Royal Dum & Tandoor
              </span>
            </div>
          </Link>

          {/* Location Selector Dropdown */}

          <Select
            items={DELIVERY_LOCATIONS}
            value={selectedLocation}
            onValueChange={(val) => {
              if (val) setSelectedLocation(val);
            }}
          >
            <SelectTrigger
              aria-label="Select delivery location"
              className="h-9 w-[195px] rounded-full bg-card text-xs font-medium"
            >
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Delivery Area
                </SelectLabel>
                {DELIVERY_LOCATIONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Center Slot: Search Bar */}
        <div className="order-3 w-full md:order-2 md:max-w-md md:flex-1 lg:max-w-lg">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              role="searchbox"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search biryani, paneer, curries..."
              aria-label="Search menu dishes"
              className="rounded-full bg-card pl-10 pr-16 text-sm"
            />
            {searchValue.length > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchValue("")}
                aria-label="Clear search"
                className="absolute right-1.5 h-7 w-7 rounded-full"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <kbd className="pointer-events-none absolute right-3 hidden rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
                Ctrl K
              </kbd>
            )}
          </div>
        </div>

        {/* Right Slot: (We will add Theme Toggle & Cart here in Pieces 4 & 5) */}
        {/* Right Slot: Theme Toggle & Cart */}
        <div className="order-2 flex items-center gap-2.5 md:order-3">
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <Sun className="hidden h-4 w-4 text-amber-400 dark:block" />
            <Moon className="block h-4 w-4 dark:hidden" />
          </button>

          <Button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart with ${totalCount} items`}
            className="rounded-full px-4 font-semibold shadow-sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <Badge
              variant="secondary"
              className="ml-2 h-5 min-w-[20px] justify-center rounded-full bg-white/20 dark:bg-gray-400 px-1.5 text-xs font-bold text-white dark:text-black tabular-nums hover:bg-white/25"
            >
              {totalCount}
            </Badge>
          </Button>

          <Link
            href="/account"
            aria-label="Open user profile and order history"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted sm:text-sm"
          >
            <User className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">
              {profile.name.split(" ")[0] || "Account"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
