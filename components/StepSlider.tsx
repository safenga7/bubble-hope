"use client";

import { motion } from "framer-motion";

type Step = { value: number; label: string };
type Props = { label: string; steps: Step[]; value: number; onChange: (v: number) => void; accent?: string };

/** Spring-animated discrete slider. A transparent native range input handles keyboard + touch + a11y. */
export default function StepSlider({ label, steps, value, onChange, accent = "#9E5D2A" }: Props) {
  const idx = Math.max(0, steps.findIndex((s) => s.value === value));
  const pct = (idx / (steps.length - 1)) * 100;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="rounded-full bg-amber-soft/70 px-3 py-0.5 text-xs font-bold">{steps[idx].label}</span>
      </div>
      <div className="relative h-11">
        <div className="absolute inset-x-3 top-1/2 h-2 -translate-y-1/2 rounded-full bg-amber-deep/10" />
        <motion.div className="absolute start-3 top-1/2 h-2 -translate-y-1/2 rounded-full"
          style={{ background: accent }} animate={{ width: `calc((100% - 1.5rem) * ${pct / 100})` }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }} />
        {steps.map((s, i) => (
          <span key={s.value} aria-hidden className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-deep/30"
            style={{ left: `calc(0.75rem + (100% - 1.5rem) * ${i / (steps.length - 1)})` }} />
        ))}
        <motion.div aria-hidden className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white shadow-card"
          style={{ background: accent }} animate={{ left: `calc(0.75rem + (100% - 1.5rem) * ${pct / 100})` }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }} whileTap={{ scale: 1.2 }} />
        <input type="range" className="range-ghost" min={0} max={steps.length - 1} step={1} value={idx}
          aria-label={label} aria-valuetext={steps[idx].label}
          onChange={(e) => onChange(steps[Number(e.target.value)].value)} />
      </div>
    </div>
  );
}
