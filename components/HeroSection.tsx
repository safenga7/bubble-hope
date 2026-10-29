"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Leaf, MapPin } from "lucide-react";
import SafeImage from "./SafeImage";
import { IMAGES } from "@/lib/images";
import { useStore } from "@/lib/store";

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export default function HeroSection() {
  const { t } = useStore();

  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
      {/* Ambient liquid shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-32 top-10 h-96 w-96 rounded-full bg-taro/30 blur-3xl" />
        <div className="absolute -end-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-matcha/15 blur-3xl" />
        <div className="absolute bottom-0 end-0 h-72 w-[32rem] rounded-[50%] bg-amber/20 blur-3xl" />
        <div className="absolute start-1/3 top-0 h-64 w-64 rounded-full bg-mango/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}
          className="relative grid items-center gap-6 lg:grid-cols-[1fr_minmax(300px,420px)_1fr]">

          <motion.h1 variants={rise} className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl lg:text-end">
            <span className="sr-only">{t("heroA")} {t("heroB")}</span>
            <span aria-hidden="true">{t("heroA")}</span>
          </motion.h1>

          {/* Cup showcase */}
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="relative order-last mx-auto w-full max-w-sm lg:order-none">
            <div className="animate-float relative aspect-[3/4] overflow-hidden rounded-[3rem] border-4 border-white/80 bg-amber-soft shadow-card">
              <SafeImage src={IMAGES.heroCup} alt="Brown sugar boba tea with tiger-striped caramel drips" priority sizes="(min-width:1024px) 420px, 90vw" fallback="#E9D3BC" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-amber-deep/35 via-transparent to-transparent" />
            </div>

            {/* Brown sugar drips */}
            <div aria-hidden className="absolute inset-x-10 -top-1 flex justify-between">
              {[22, 34, 16, 40, 26].map((h, i) => (
                <span key={i} style={{ height: h, animationDelay: `${i * 0.35}s` }}
                  className="animate-drip w-2.5 origin-top rounded-b-full bg-amber-deep/80" />
              ))}
            </div>

            <span aria-hidden className="animate-float-slow absolute -start-6 top-12 h-9 w-9 rounded-full bg-mango shadow-pop" />
            <span aria-hidden className="animate-float absolute -end-5 top-1/2 h-6 w-6 rounded-full bg-matcha shadow-card" />
            <span aria-hidden className="animate-float-slow absolute -end-8 bottom-24 h-12 w-12 rounded-full bg-taro shadow-card" />

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}
              className="glass absolute -start-4 bottom-10 flex items-center gap-3 rounded-2xl p-2.5 pe-4 sm:-start-16">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-amber-soft">
                <SafeImage src={IMAGES.brownSugar} alt="" sizes="44px" />
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs font-bold text-amber"><Star size={12} fill="currentColor" /> 4.9 {t("bestSeller")}</p>
                <p className="text-sm font-bold">Brown Sugar Boba</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
              className="glass absolute -end-4 top-24 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-end-20">
              <Leaf size={18} className="text-matcha" />
              <p className="text-sm font-bold">{t("freshMilk")}</p>
            </motion.div>
          </motion.div>

          <motion.h1 aria-hidden variants={rise} className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {t("heroB")}
          </motion.h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-7 text-center">
          <p className="text-lg leading-relaxed text-amber-deep/80">{t("heroSub")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="btn-primary">{t("explore")}</Link>
            <Link href="/menu#boba-lab" className="btn-ghost">{t("build")}</Link>
          </div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <MapPin size={16} className="text-mango" /> {t("nowBrewing")} {t("city")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
