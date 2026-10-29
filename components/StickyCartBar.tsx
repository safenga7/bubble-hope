"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";

export default function StickyCartBar() {
  const { count, total, openCart, t } = useStore();
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-3 bottom-4 z-30 mx-auto max-w-2xl">
          <div className="glass flex items-center justify-between gap-3 rounded-full py-2 ps-6 pe-2">
            <p className="flex items-center gap-2 text-sm font-bold sm:text-base">
              <ShoppingBag size={18} className="text-amber" />
              {t("yourBag")} ({count} {count === 1 ? t("itemSuffix") : t("itemsSuffix")}) <span className="text-amber">— {total} EGP</span>
            </p>
            <button onClick={openCart} className="rounded-full bg-amber px-5 py-3 text-sm font-semibold text-white shadow-pop hover:bg-amber-deep">
              {t("viewBag")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
