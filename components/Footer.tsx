"use client";

import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin, Clock, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Footer() {
  const { t } = useStore();
  return (
    <footer className="mt-12 bg-amber-deep text-porcelain">
      {/* Demo disclaimer banner */}
      <div className="border-b border-white/10 bg-amber-deep/95">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-3 text-center text-xs text-porcelain/70 sm:px-6">
          <AlertTriangle size={14} className="shrink-0 text-mango" />
          {t("disclaimerFull")}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl font-extrabold leading-none">Bubble<br /><span className="text-taro">Hope</span></p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-porcelain/75">{t("footerTag")}</p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Instagram size={18} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Facebook size={18} /></a>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2.5 text-sm font-medium">
            <li><Link href="/menu" className="hover:text-taro">{t("menu")}</Link></li>
            <li><Link href="/menu#boba-lab" className="hover:text-taro">{t("lab")}</Link></li>
            <li><Link href="/kids" className="hover:text-taro">{t("kids")}</Link></li>
            <li><Link href="/locations" className="hover:text-taro">{t("locations")}</Link></li>
          </ul>
        </nav>

        <ul className="space-y-3 text-sm text-porcelain/80">
          <li className="flex items-start gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0" /> {t("branchHadayekAddr")}</li>
          <li className="flex items-start gap-2.5"><Clock size={16} className="mt-0.5 shrink-0" /> {t("branchHadayekHours")}</li>
          <li className="flex items-start gap-2.5"><Phone size={16} className="mt-0.5 shrink-0" /> <span dir="ltr">+20 XXX XXX XXXX</span></li>
        </ul>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-porcelain/60">
        <p>© {new Date().getFullYear()} Bubble Hope. {t("rights")}</p>
        <p className="mt-1 text-porcelain/40">{t("footerDisclaimer")}</p>
      </div>
    </footer>
  );
}
