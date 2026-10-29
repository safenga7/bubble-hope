"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Flame, Plus, Check, SlidersHorizontal } from "lucide-react";
import { MENU_ITEMS, type MenuItem } from "@/lib/data";
import { useStore } from "@/lib/store";
import SafeImage from "./SafeImage";

function Card({ item }: { item: MenuItem }) {
  const { addItem, t } = useStore();
  const [done, setDone] = useState(false);
  const onAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price });
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  };
  return (
    <motion.article layout className="flex flex-col rounded-4xl p-3 shadow-card" style={{ background: item.accent + "66" }}>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white/60">
        <SafeImage src={item.image} alt={item.name} sizes="(min-width:1024px) 220px, 45vw" fallback={item.accent} />
        {item.badge && (
          <span className={`chip absolute start-2 top-2 ${item.badge.tone === "mango" ? "bg-mango text-white" : "bg-matcha text-white"}`}>{item.badge.label}</span>
        )}
        <span className="chip absolute end-2 top-2 bg-white/90"><Star size={12} className="fill-mango text-mango" /> {item.rating}</span>
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <h3 className="font-display text-base font-bold leading-tight">{item.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-amber-deep/65"><Flame size={12} /> {item.kcal} kcal</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-bold">{item.price} EGP</span>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={onAdd} aria-live="polite"
          className={`mt-3 flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white transition-colors ${done ? "bg-matcha" : "bg-amber hover:bg-amber-deep"}`}>
          {done ? <><Check size={15} /> {t("addedBtn")}</> : <><Plus size={15} /> {t("addBtn")}</>}
        </motion.button>
      </div>
    </motion.article>
  );
}

export default function MenuGrid() {
  const { t } = useStore();
  return (
    <section aria-labelledby="fav-title" className="rounded-5xl border border-white/80 bg-white/60 p-5 shadow-card sm:p-8">
      <div className="flex items-center justify-between">
        <h2 id="fav-title" className="font-display text-2xl font-extrabold">{t("popularBrews")}</h2>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-porcelain-100" aria-hidden><SlidersHorizontal size={16} /></span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {MENU_ITEMS.map((i) => <Card key={i.id} item={i} />)}
      </div>
    </section>
  );
}
