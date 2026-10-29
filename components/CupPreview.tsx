"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TeaBase, Topping } from "@/lib/data";

type Props = { base: TeaBase; toppings: Topping[]; sweetness: number; ice: number };

const PEARLS = [[78, 252], [96, 258], [114, 252], [132, 258], [88, 240], [106, 244], [124, 240], [98, 228], [116, 230]];
const ICE = [[70, 120, 20], [118, 108, 22], [92, 158, 19], [128, 168, 18], [76, 200, 17], [112, 205, 20]];

export default function CupPreview({ base, toppings, sweetness, ice }: Props) {
  const has = (k: Topping["kind"]) => toppings.find((t) => t.kind === k);
  const pearl = has("pearl"), pop = has("pop"), jelly = has("jelly"), cloud = has("cloud"), cube = has("cube");
  const sweetOpacity = 0.55 + (sweetness / 100) * 0.4;

  return (
    <svg viewBox="0 0 200 320" className="mx-auto h-full max-h-[420px] w-full drop-shadow-xl" role="img"
      aria-label={`${base.name} with ${toppings.length ? toppings.map((t) => t.name).join(", ") : "no toppings"}`}>
      <defs>
        <clipPath id="cup"><path d="M42 82 L158 82 L142 288 Q141 296 133 296 L67 296 Q59 296 58 288 Z" /></clipPath>
        <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".35" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>

      {/* straw */}
      <motion.rect x="104" y="6" width="12" height="100" rx="6" fill="#E9B8A0" animate={{ rotate: 8 }} style={{ originX: "110px", originY: "100px" }} />
      {/* lid */}
      <rect x="36" y="64" width="128" height="22" rx="11" fill="#fff" stroke="#EBE3D8" strokeWidth="2" />
      <path d="M48 64 Q100 26 152 64 Z" fill="#fff" fillOpacity=".7" stroke="#EBE3D8" strokeWidth="2" />

      <g clipPath="url(#cup)">
        <rect x="30" y="82" width="140" height="220" fill="#fff" fillOpacity=".5" />
        <motion.rect x="30" y="104" width="140" height="200" animate={{ fill: base.color, opacity: sweetOpacity }} transition={{ duration: 0.5 }} />
        <motion.ellipse cx="100" cy="104" rx="64" ry="7" animate={{ fill: base.tint }} transition={{ duration: 0.5 }} />

        <AnimatePresence>
          {cloud && (
            <motion.g key="cloud" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
              <path d="M44 90 Q60 70 78 88 Q96 66 118 88 Q138 72 156 90 L156 112 Q138 120 118 112 Q96 124 78 112 Q60 120 44 112 Z" fill="#fff" />
            </motion.g>
          )}
        </AnimatePresence>

        {ice > 0 && ICE.slice(0, ice * 2).map(([x, y, s], i) => (
          <motion.rect key={`ice-${i}`} x={x} y={y} width={s} height={s} rx="5" fill="#fff" fillOpacity=".38" stroke="#fff" strokeOpacity=".7"
            initial={{ scale: 0 }} animate={{ scale: 1, rotate: i * 14 }} transition={{ type: "spring", stiffness: 300, damping: 16, delay: i * 0.04 }} />
        ))}

        <AnimatePresence>
          {cube && [[70, 176], [128, 140], [96, 192]].map(([x, y], i) => (
            <motion.rect key={`cube-${i}`} x={x} y={y} width="16" height="16" rx="4" fill={cube.color} stroke="#9CC794" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} />
          ))}
          {jelly && [[84, 226], [122, 222], [104, 270]].map(([x, y], i) => (
            <motion.rect key={`jelly-${i}`} x={x} y={y} width="14" height="14" rx="4" fill={jelly.color} stroke="#E8CFD5" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} />
          ))}
          {pop && [[72, 236], [128, 246], [100, 214], [84, 266], [118, 272]].map(([x, y], i) => (
            <motion.circle key={`pop-${i}`} cx={x} cy={y} r="7" fill={pop.color} fillOpacity=".9" stroke="#fff" strokeOpacity=".6" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} />
          ))}
          {pearl && PEARLS.map(([x, y], i) => (
            <motion.circle key={`pearl-${i}`} cx={x} cy={y + 20} r="8" fill={pearl.color}
              initial={{ cy: 80, opacity: 0 }} animate={{ cy: y + 20, opacity: 1 }} exit={{ opacity: 0, cy: 80 }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: i * 0.03 }} />
          ))}
        </AnimatePresence>
        <rect x="42" y="82" width="116" height="214" fill="url(#shine)" />
      </g>
      <path d="M42 82 L158 82 L142 288 Q141 296 133 296 L67 296 Q59 296 58 288 Z" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="3" />
    </svg>
  );
}
