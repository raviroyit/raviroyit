"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Clock,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const QUICK_MENU_LINKS = [
  { label: "All Dishes", slug: "all" },
  { label: "Dum Biryani", slug: "dum-biryani" },
  { label: "Charcoal Starters", slug: "starters" },
  { label: "Royal Curries", slug: "curries" },
  { label: "Tandoor Breads", slug: "tandoor-breads" },
  { label: "Shahi Desserts", slug: "desserts" },
];

const PAYMENT_METHODS = [
  { label: "UPI / QR", icon: Smartphone },
  { label: "Visa", icon: CreditCard },
  { label: "Mastercard", icon: CreditCard },
  { label: "RuPay", icon: CreditCard },
  { label: "Cash on Delivery", icon: Wallet },
];

interface FooterProps {
  currentYear?: number;
}
export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(), // Client browser snapshot
    () => 2026, // Server prerender snapshot
  );

  const handleQuickFilter = (slug: string) => {
    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });

    const menuSection = document.getElementById("menu-section");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-20 w-full border-t border-border/80 bg-card/80 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Identity */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <UtensilsCrossed className="h-4 w-4" />
              </span>
              <div>
                <span className="block font-serif text-lg font-bold tracking-tight text-foreground">
                  Zaffran Kitchen
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Royal Dum & Tandoor
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Slow-sealed clay handi biryanis, charcoal kebabs, and rich North
              Indian gravies prepared fresh to order in Patna.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>100% Tamper-Proof Hygienic Packaging</span>
            </div>
          </div>

          {/* Column 2: Quick Menu Categories */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-foreground">
              Explore Menu
            </h3>
            <ul className="space-y-2">
              {QUICK_MENU_LINKS.map((link) => (
                <li key={link.slug}>
                  <button
                    type="button"
                    onClick={() => handleQuickFilter(link.slug)}
                    className="text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:underline sm:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patna Flagship Kitchen & Hours */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-foreground">
              Patna Kitchen
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Boring Road Crossing, Near Anandpuri, Patna 800001</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>Daily: 11:30 AM – 11:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span className="tabular-nums">+91 612 254 8890</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Accepted Payment Methods */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-foreground">
              We Accept
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Instant online checkout or pay at your doorstep.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {PAYMENT_METHODS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & FSSAI Strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {currentYear} Zaffran Kitchen. All rights reserved.</p>
          <p className="tabular-nums">
            FSSAI Lic. No. 10426000192837 • Prices inclusive of applicable taxes
          </p>
        </div>
      </div>
    </footer>
  );
}
