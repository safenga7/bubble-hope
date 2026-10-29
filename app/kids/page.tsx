"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Palette, IceCreamCone, Shield, Star, Check, Sparkles, Heart, Users, Calendar, Info } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { IMAGES } from "@/lib/images";
import { useStore } from "@/lib/store";

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

const PACKAGES = [
  { id: "basic", priceKey: 150, color: "#C7A9E5", icon: Sparkles },
  { id: "premium", priceKey: 220, color: "#FF7A59", icon: Star },
  { id: "ultimate", priceKey: 350, color: "#4E8752", icon: PartyPopper },
] as const;

type PackageId = "basic" | "premium" | "ultimate";

function PackageNameKey(id: PackageId): "packageBasic" | "packagePremium" | "packageUltimate" {
  return id === "basic" ? "packageBasic" : id === "premium" ? "packagePremium" : "packageUltimate";
}
function PackageDescKey(id: PackageId): "packageBasicDesc" | "packagePremiumDesc" | "packageUltimateDesc" {
  return id === "basic" ? "packageBasicDesc" : id === "premium" ? "packagePremiumDesc" : "packageUltimateDesc";
}

export default function KidsPage() {
  const { t } = useStore();
  const [selectedPkg, setSelectedPkg] = useState<PackageId | "">("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="pb-20 pt-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -start-32 top-10 h-96 w-96 rounded-full bg-taro/25 blur-3xl" />
          <div className="absolute -end-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-mango/15 blur-3xl" />
          <div className="absolute bottom-0 start-1/3 h-72 w-72 rounded-full bg-matcha/15 blur-3xl" />
        </div>

        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-7xl text-center">
          <motion.div variants={rise} className="inline-flex items-center gap-2 rounded-full bg-taro-soft px-4 py-2 text-sm font-semibold text-taro-deep">
            <PartyPopper size={16} /> {t("kids")}
          </motion.div>
          <motion.h1 variants={rise} className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t("kidsHeroTitle")}
          </motion.h1>
          <motion.p variants={rise} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-amber-deep/80">
            {t("kidsHeroSub")}
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#packages" className="btn-primary !bg-taro hover:!bg-taro-deep">{t("kidsExplore")}</a>
            <a href="#booking" className="btn-ghost">{t("kidsBook")}</a>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: t("kidsPlayTitle"), desc: t("kidsPlayDesc"), img: IMAGES.kidsPlay, color: "taro" },
            { icon: Palette, title: t("kidsArtTitle"), desc: t("kidsArtDesc"), img: IMAGES.kidsArt, color: "matcha" },
            { icon: IceCreamCone, title: t("kidsTreatsTitle"), desc: t("kidsTreatsDesc"), img: IMAGES.kidsTreats, color: "mango" },
          ].map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="group overflow-hidden rounded-4xl border border-white/80 bg-white/60 shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <SafeImage src={feat.img} alt={feat.title} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  fallback={feat.color === "taro" ? "#EADFF6" : feat.color === "matcha" ? "#DCEBDD" : "#FFE3DA"} />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/30 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                  feat.color === "taro" ? "bg-taro-soft text-taro-deep" :
                  feat.color === "matcha" ? "bg-matcha-soft text-matcha" :
                  "bg-mango-soft text-mango"}`}>
                  <feat.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-bold">{feat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-amber-deep/70">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Banner */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-col items-center gap-4 rounded-4xl bg-matcha-soft p-6 text-center sm:flex-row sm:text-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-matcha text-white">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-matcha">{t("safetyTitle")}</h3>
            <p className="mt-1 text-sm text-amber-deep/70">{t("safetySub")}</p>
          </div>
        </motion.div>
      </section>

      {/* Party Packages */}
      <section id="packages" className="mx-auto mt-20 max-w-7xl scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t("kidsPartyTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-amber-deep/70 sm:text-base">{t("kidsPartySub")}</p>
          <span className="mt-2 inline-block rounded-full bg-porcelain-200 px-3 py-1 text-xs font-semibold text-amber-deep/60">
            {t("packageConceptNote")}
          </span>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const nameKey = PackageNameKey(pkg.id);
            const descKey = PackageDescKey(pkg.id);
            const Icon = pkg.icon;
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className={`relative overflow-hidden rounded-4xl border-2 p-6 shadow-card transition-colors sm:p-8 ${
                  pkg.id === "premium" ? "border-mango bg-gradient-to-b from-mango/5 to-white/60" : "border-white/80 bg-white/60"
                }`}>
                {pkg.id === "premium" && (
                  <span className="absolute end-4 top-4 rounded-full bg-mango px-3 py-1 text-xs font-bold text-white">
                    {t("bestSeller")}
                  </span>
                )}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: pkg.color + "20", color: pkg.color }}>
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold">{t(nameKey)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-amber-deep/70">{t(descKey)}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-sm text-amber-deep/60">{t("packageFrom")}</span>
                  <span className="font-display text-3xl font-extrabold" style={{ color: pkg.color }}>{pkg.priceKey}</span>
                  <span className="text-sm text-amber-deep/60">{t("packageEgp")}</span>
                </div>
                <p className="text-xs text-amber-deep/50">{t("packagePerChild")}</p>
                <button
                  onClick={() => { setSelectedPkg(pkg.id); document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-primary mt-6 w-full"
                  style={{ backgroundColor: pkg.color }}>
                  {t("packageBook")}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Hero Party Image */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative aspect-[21/9] overflow-hidden rounded-4xl shadow-card">
          <SafeImage src={IMAGES.kidsParty} alt="Kids birthday party at Bubble Hope" sizes="100vw" fallback="#FFE3DA" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/50 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
            <p className="font-display text-2xl font-extrabold sm:text-3xl">{t("kidsPartyTitle")}</p>
            <p className="mt-2 max-w-lg text-sm text-white/80">{t("kidsPartySub")}</p>
          </div>
        </motion.div>
      </section>

      {/* Sample Community Feedback / Testimonials */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display text-3xl font-extrabold">{t("testimonialsTitle")}</motion.h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-amber-deep/65">{t("testimonialsSub")}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {([
            { text: t("testimonial1"), author: t("testimonial1Author"), color: "#C7A9E5" },
            { text: t("testimonial2"), author: t("testimonial2Author"), color: "#4E8752" },
            { text: t("testimonial3"), author: t("testimonial3Author"), color: "#FF7A59" },
          ]).map((test, i) => (
            <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="relative rounded-4xl border border-white/80 bg-white/60 p-6 shadow-card">
              <span className="absolute end-4 top-4 rounded-full bg-porcelain-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-deep/50">
                {t("testimonialTag")}
              </span>
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-mango text-mango" />)}
              </div>
              <p className="text-sm leading-relaxed text-amber-deep/80">&ldquo;{test.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(135deg, ${test.color}40, ${test.color})` }} />
                <div>
                  <p className="text-sm font-bold">{test.author}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => <Heart key={j} size={10} className="fill-mango/40 text-mango/40" />)}
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="mx-auto mt-20 max-w-3xl scroll-mt-28 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-5xl border border-white/80 bg-white/60 p-6 shadow-card sm:p-10">
          <div className="mb-6 text-center">
            <Calendar size={32} className="mx-auto text-taro" />
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{t("bookingTitle")}</h2>
            <p className="mt-1 text-xs text-amber-deep/60">{t("bookingSub")}</p>
          </div>

          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="py-12 text-center">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-matcha-soft">
                  <Check size={32} className="text-matcha" />
                </div>
                <p className="font-display text-xl font-bold">{t("bookingSuccess")}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleBooking} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingName")}</label>
                    <input type="text" required className="form-input" placeholder="..." />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingEmail")}</label>
                    <input type="email" required className="form-input" placeholder="..." />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingPhone")}</label>
                    <input type="tel" required className="form-input" dir="ltr" placeholder="+20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingDate")}</label>
                    <input type="date" required className="form-input" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingPackage")}</label>
                    <select value={selectedPkg} onChange={e => setSelectedPkg(e.target.value as PackageId | "")} required className="form-input">
                      <option value="">{t("selectPackage")}</option>
                      {PACKAGES.map(p => (
                        <option key={p.id} value={p.id}>{t(PackageNameKey(p.id))}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">{t("bookingGuests")}</label>
                    <input type="number" min={8} max={50} required className="form-input" placeholder="8" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">{t("bookingNotes")}</label>
                  <textarea rows={3} className="form-input resize-none" placeholder="..." />
                </div>
                <button type="submit" className="btn-primary w-full !bg-taro hover:!bg-taro-deep">
                  {t("bookingSubmit")}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
