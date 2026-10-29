"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin, Clock, Info, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { t } = useStore();
  return (
    <footer className="mt-16 bg-amber-deep text-porcelain">
      {/* Portfolio concept disclaimer banner */}
      <div className="border-b border-white/10 bg-amber-deep/95">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 text-center text-xs text-porcelain/75 sm:px-6">
          <Info size={14} className="shrink-0 text-mango" />
          <span>{t("disclaimerFull")}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl font-extrabold leading-none">
            Bubble<br /><span className="text-taro">Hope</span>
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-taro">
            <Sparkles size={12} /> {t("portfolioDisclaimer")}
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-porcelain/75">
            {t("footerTag")}
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram (Demo Link)"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook (Demo Link)"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-porcelain/60">Explore</p>
          <ul className="mt-3 space-y-2.5 text-sm font-medium">
            <li><Link href="/menu" className="transition-colors hover:text-taro">{t("menu")}</Link></li>
            <li><Link href="/menu#boba-lab" className="transition-colors hover:text-taro">{t("lab")}</Link></li>
            <li><Link href="/kids" className="transition-colors hover:text-taro">{t("kids")}</Link></li>
            <li><Link href="/locations" className="transition-colors hover:text-taro">{t("locations")}</Link></li>
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-porcelain/60">Concept Hub</p>
          <ul className="mt-3 space-y-3 text-sm text-porcelain/80">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-mango" />
              <span>{t("footerAddr")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-matcha" />
              <span>{t("footerHours")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Info size={16} className="mt-0.5 shrink-0 text-taro" />
              <span>{t("footerPhone")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-porcelain/60">
        <p>© {new Date().getFullYear()} Bubble Hope. {t("rights")}</p>
        <p className="mt-1 text-porcelain/40">{t("footerDisclaimer")}</p>
      </div>
    </footer>
  );
}
