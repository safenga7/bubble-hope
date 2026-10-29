"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag, Languages } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggleLang, count, openCart } = useStore();

  // Close mobile drawer on Escape and lock body scroll
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-6">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full py-2.5 ps-5 pe-2.5" aria-label="Main">
        <Link href="/" className="font-display text-xl font-extrabold leading-none tracking-tight" aria-label="Bubble Hope home">
          <span className="block">Bubble</span>
          <span className="block text-amber">Hope</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href.split("#")[0] && !l.href.includes("#");
            return (
              <li key={l.key}>
                <Link href={l.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-amber-deep text-white" : "hover:bg-amber-soft/60"}`}>
                  {t(l.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label="Switch language"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-amber-soft/60 sm:flex">
            <Languages size={16} /> {lang === "en" ? "AR" : "EN"}
          </button>

          <button onClick={openCart} aria-label={`${t("bag")} (${count})`}
            className="relative grid h-11 w-11 place-items-center rounded-full hover:bg-amber-soft/60">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.4 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-mango px-1 text-[11px] font-bold text-white">
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link href="/menu" className="hidden rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-pop transition-colors hover:bg-amber-deep sm:inline-flex">
            {t("order")}
          </Link>

          <button className="grid h-11 w-11 place-items-center rounded-full bg-amber-deep text-white lg:hidden"
            onClick={() => setOpen(true)} aria-label={t("openMenu")} aria-expanded={open} aria-controls="mobile-nav">
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-amber-deep/40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu"
              className="fixed inset-y-0 end-0 z-50 flex w-[82%] max-w-sm flex-col bg-porcelain p-6 shadow-card"
              initial={{ x: lang === "ar" ? "-100%" : "100%" }} animate={{ x: 0 }} exit={{ x: lang === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold">Bubble <span className="text-amber">Hope</span></span>
                <button onClick={() => setOpen(false)} aria-label={t("closeMenu")} className="grid h-11 w-11 place-items-center rounded-full bg-amber-soft/60">
                  <X size={20} />
                </button>
              </div>
              <ul className="mt-8 space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li key={l.key} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
                    <Link href={l.href} onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 font-display text-2xl font-bold hover:bg-amber-soft/50">
                      {t(l.key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-3">
                <button onClick={toggleLang} className="btn-ghost w-full"><Languages size={18} /> {lang === "en" ? "العربية" : "English"}</button>
                <Link href="/menu" onClick={() => setOpen(false)} className="btn-primary w-full">{t("order")}</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
