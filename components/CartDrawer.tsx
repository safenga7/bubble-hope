"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, AlertTriangle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartDrawer() {
  const { cartOpen, closeCart, items, total, changeQty, removeItem, clear, lang, t } = useStore();
  const off = lang === "ar" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-amber-deep/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} />
          <motion.aside role="dialog" aria-modal="true" aria-label={t("yourBag")}
            className="fixed inset-y-0 end-0 z-[60] flex w-full max-w-md flex-col bg-porcelain shadow-card"
            initial={{ x: off }} animate={{ x: 0 }} exit={{ x: off }} transition={{ type: "spring", stiffness: 320, damping: 34 }}>
            <header className="flex items-center justify-between border-b border-amber-deep/10 p-5">
              <h2 className="font-display text-2xl font-extrabold">{t("yourBag")}</h2>
              <button onClick={closeCart} aria-label={t("closeMenu")} className="grid h-11 w-11 place-items-center rounded-full bg-amber-soft/60"><X size={20} /></button>
            </header>

            {items.length === 0 ? (
              <div className="grid flex-1 place-items-center p-8 text-center">
                <div>
                  <ShoppingBag size={40} className="mx-auto text-amber/50" />
                  <p className="mt-3 font-semibold">{t("emptyBag")}</p>
                  <p className="text-sm text-amber-deep/70">{t("emptyBagSub")}</p>
                </div>
              </div>
            ) : (
              <ul className="flex-1 space-y-3 overflow-y-auto p-5">
                {items.map((i) => (
                  <li key={i.id} className="rounded-2xl bg-white p-4 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold">{i.name}</p>
                        {i.detail && <p className="text-xs text-amber-deep/65">{i.detail}</p>}
                      </div>
                      <button onClick={() => removeItem(i.id)} aria-label={`Remove ${i.name}`} className="text-amber-deep/50 hover:text-mango"><Trash2 size={16} /></button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full bg-porcelain-100 p-1">
                        <button onClick={() => changeQty(i.id, -1)} aria-label="Decrease" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"><Minus size={14} /></button>
                        <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                        <button onClick={() => changeQty(i.id, 1)} aria-label="Increase" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white"><Plus size={14} /></button>
                      </div>
                      <p className="font-bold">{i.price * i.qty} EGP</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <footer className="space-y-3 border-t border-amber-deep/10 p-5">
                <div className="flex items-center gap-2 rounded-xl bg-mango/10 px-3 py-2 text-xs text-amber-deep/80">
                  <AlertTriangle size={14} className="shrink-0 text-mango" />
                  {t("demoNotice")}
                </div>
                <div className="flex items-center justify-between text-lg font-bold"><span>{t("total")}</span><span>{total} EGP</span></div>
                <button className="btn-primary w-full" onClick={() => { alert(t("checkoutMsg")); clear(); closeCart(); }}>
                  {t("checkout")}
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
