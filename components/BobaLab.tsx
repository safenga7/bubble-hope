"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, ShoppingBag } from "lucide-react";
import { ICE_STEPS, SWEETNESS_STEPS, TEA_BASES, TOPPINGS } from "@/lib/data";
import { useStore } from "@/lib/store";
import CupPreview from "./CupPreview";
import StepSlider from "./StepSlider";
import StickyCartBar from "./StickyCartBar";

const DEFAULTS = { base: "taro", sweet: 50, ice: 2, toppings: ["cream"] as string[] };

export default function BobaLab() {
  const { addItem, t } = useStore();
  const [baseId, setBaseId] = useState(DEFAULTS.base);
  const [sweet, setSweet] = useState(DEFAULTS.sweet);
  const [ice, setIce] = useState(DEFAULTS.ice);
  const [picked, setPicked] = useState<string[]>(DEFAULTS.toppings);
  const [added, setAdded] = useState(false);

  const base = TEA_BASES.find((b) => b.id === baseId)!;
  const toppings = useMemo(() => TOPPINGS.filter((t) => picked.includes(t.id)), [picked]);
  const price = base.price + toppings.reduce((s, t) => s + t.price, 0);
  const sweetLabel = SWEETNESS_STEPS.find((s) => s.value === sweet)!.label;
  const iceLabel = ICE_STEPS.find((s) => s.value === ice)!.label;

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const reset = () => { setBaseId(DEFAULTS.base); setSweet(DEFAULTS.sweet); setIce(DEFAULTS.ice); setPicked(DEFAULTS.toppings); };

  const addToBag = () => {
    const detail = `${sweetLabel} sweet · ${iceLabel} ice${toppings.length ? ` · ${toppings.map((t) => t.name).join(", ")}` : ""}`;
    addItem({ id: `custom-${base.id}-${sweet}-${ice}-${[...picked].sort().join("+")}`, name: `Custom ${base.name}`, detail, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section id="boba-lab" aria-labelledby="lab-title" className="scroll-mt-28 rounded-5xl border border-white/80 bg-white/60 p-5 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-amber">{t("bobaLab")}</p>
          <h1 id="lab-title" className="font-display text-3xl font-extrabold sm:text-4xl">{t("craftTitle")}</h1>
        </div>
        <button onClick={reset} className="btn-ghost !px-4 !py-2 text-sm"><RotateCcw size={14} /> {t("resetBtn")}</button>
      </div>

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_minmax(220px,300px)]">
        <div className="space-y-7">
          {/* Step 1 */}
          <fieldset>
            <legend className="mb-3 font-display text-lg font-bold">{t("chooseBase")}</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup">
              {TEA_BASES.map((b) => {
                const on = b.id === baseId;
                return (
                  <button key={b.id} role="radio" aria-checked={on} onClick={() => setBaseId(b.id)}
                    className={`relative rounded-3xl border-2 p-3 text-center transition-colors ${on ? "border-amber bg-white shadow-card" : "border-transparent bg-porcelain-100 hover:bg-white"}`}>
                    {on && <span className="absolute end-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-amber text-white"><Check size={12} /></span>}
                    <span className="mx-auto block h-12 w-12 rounded-2xl" style={{ background: `linear-gradient(135deg, ${b.tint}, ${b.swatch})` }} />
                    <span className="mt-2 block text-xs font-bold leading-tight">{b.name}</span>
                    <span className="text-[11px] text-amber-deep/60">{b.price} EGP</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Step 2 */}
          <div>
            <h2 className="mb-3 font-display text-lg font-bold">{t("sweetnessIce")}</h2>
            <div className="space-y-4 rounded-3xl bg-porcelain-100 p-4">
              <StepSlider label={t("sweetnessLabel")} steps={SWEETNESS_STEPS} value={sweet} onChange={setSweet} accent="#9E5D2A" />
              <StepSlider label={t("iceLabel")} steps={ICE_STEPS} value={ice} onChange={setIce} accent="#6BA8C9" />
            </div>
          </div>

          {/* Step 3 */}
          <fieldset>
            <legend className="mb-3 font-display text-lg font-bold">{t("addToppings")}</legend>
            <div className="flex flex-wrap gap-2.5">
              {TOPPINGS.map((t) => {
                const on = picked.includes(t.id);
                return (
                  <motion.button key={t.id} type="button" aria-pressed={on} onClick={() => toggle(t.id)} whileTap={{ scale: 0.93 }}
                    className={`flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors ${on ? "border-amber bg-amber text-white" : "border-amber-deep/15 bg-white hover:border-amber/50"}`}>
                    {on && <Check size={14} />} {t.name} <span className={on ? "text-white/80" : "text-amber-deep/55"}>+{t.price}</span>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Live preview */}
        <div className="flex flex-col items-center gap-4 md:sticky md:top-28 md:self-start">
          <div className="grid w-full place-items-center rounded-4xl p-4" style={{ background: `linear-gradient(160deg, ${base.tint}, #FAF8F5)` }}>
            <div className="h-80 w-full"><CupPreview base={base} toppings={toppings} sweetness={sweet} ice={ice} /></div>
          </div>
          <p className="text-center text-sm text-amber-deep/70">{t("cupUpdates")}</p>
          <button onClick={addToBag} className="btn-primary w-full !bg-matcha hover:!bg-matcha/85" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={added ? "ok" : "add"} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="flex items-center gap-2">
                {added ? <><Check size={18} /> {t("addedToBag")}</> : <><ShoppingBag size={18} /> {t("addToBag")} — <motion.span key={price} initial={{ scale: 1.25 }} animate={{ scale: 1 }}>{price} EGP</motion.span></>}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <StickyCartBar />
    </section>
  );
}
