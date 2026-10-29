"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Phone, Wifi, Car, Baby, TreePine, Truck,
  Navigation, GraduationCap, Building2, Check, ChevronRight, Star,
  Compass, Copy, CheckCheck, ExternalLink, Sparkles
} from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { IMAGES } from "@/lib/images";
import { useStore, type DictKey } from "@/lib/store";

const rise = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

type BranchId = "hadayek" | "sheikh" | "heliopolis";

interface Branch {
  id: BranchId;
  nameKey: DictKey;
  addrKey: DictKey;
  hoursKey: DictKey;
  noteKey: DictKey;
  transitKey: DictKey;
  amenities: DictKey[];
  image: string;
  accent: string;
  mapQuery: string;
  tag: string;
}

const BRANCHES: Branch[] = [
  {
    id: "hadayek",
    nameKey: "branchHadayek",
    addrKey: "branchHadayekAddr",
    hoursKey: "branchHadayekHours",
    noteKey: "branchHadayekNote",
    transitKey: "districtTransitHadayek",
    amenities: ["amenityWifi", "amenityParking", "amenityKids", "amenityOutdoor", "amenityDelivery"],
    image: IMAGES.storeFront,
    accent: "#C7A9E5",
    mapQuery: "Hadayek+Al-Ahram+Giza+Egypt",
    tag: "Flagship Hub",
  },
  {
    id: "sheikh",
    nameKey: "branchSheikh",
    addrKey: "branchSheikhAddr",
    hoursKey: "branchSheikhHours",
    noteKey: "branchSheikhNote",
    transitKey: "districtTransitSheikh",
    amenities: ["amenityWifi", "amenityParking", "amenityDelivery"],
    image: IMAGES.cafeInterior,
    accent: "#4E8752",
    mapQuery: "Sheikh+Zayed+City+Giza+Egypt",
    tag: "Mall Avenue",
  },
  {
    id: "heliopolis",
    nameKey: "branchHeliopolis",
    addrKey: "branchHeliopAddr",
    hoursKey: "branchHeliopHours",
    noteKey: "branchHeliopNote",
    transitKey: "districtTransitHeliop",
    amenities: ["amenityWifi", "amenityOutdoor", "amenityDelivery"],
    image: IMAGES.cafeCozy,
    accent: "#FF7A59",
    mapQuery: "Korba+Heliopolis+Cairo+Egypt",
    tag: "Heritage Avenue",
  },
];

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  amenityWifi: Wifi,
  amenityParking: Car,
  amenityKids: Baby,
  amenityOutdoor: TreePine,
  amenityDelivery: Truck,
};

function InquiryForm({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  const { t } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };
  return (
    <div className="rounded-4xl border border-white/80 bg-white/60 p-6 shadow-card sm:p-8">
      <h3 className="font-display text-xl font-bold" style={{ color: accent }}>{title}</h3>
      <p className="mt-2 text-sm text-amber-deep/70">{subtitle}</p>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="py-8 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-matcha-soft">
              <Check size={28} className="text-matcha" />
            </div>
            <p className="font-semibold">{t("formSuccess")}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold">{t("formName")}</label>
                <input type="text" required className="form-input" placeholder="..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold">{t("formEmail")}</label>
                <input type="email" required className="form-input" placeholder="..." />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">{t("formPhone")}</label>
              <input type="tel" className="form-input" dir="ltr" placeholder="+20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">{t("formMessage")}</label>
              <textarea rows={3} required className="form-input resize-none" placeholder="..." />
            </div>
            <button type="submit" className="btn-primary w-full" style={{ backgroundColor: accent }}>
              {t("formSubmit")}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LocationsPage() {
  const { t } = useStore();
  const [activeBranch, setActiveBranch] = useState<BranchId>("hadayek");
  const [copied, setCopied] = useState(false);
  const branch = BRANCHES.find(b => b.id === activeBranch)!;

  const copyAddress = () => {
    navigator.clipboard?.writeText(t(branch.addrKey));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-20 pt-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -start-32 top-10 h-96 w-96 rounded-full bg-matcha/20 blur-3xl" />
          <div className="absolute -end-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-taro/15 blur-3xl" />
        </div>
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}
          className="mx-auto max-w-7xl text-center">
          <motion.div variants={rise} className="inline-flex items-center gap-2 rounded-full bg-matcha-soft px-4 py-2 text-sm font-semibold text-matcha">
            <MapPin size={16} /> {t("locations")}
          </motion.div>
          <motion.h1 variants={rise} className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {t("locationsTitle")}
          </motion.h1>
          <motion.p variants={rise} className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-amber-deep/80">
            {t("locationsSub")}
          </motion.p>
        </motion.div>
      </section>

      {/* Branch Selector & Detail */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {BRANCHES.map(b => {
            const active = b.id === activeBranch;
            return (
              <button key={b.id} onClick={() => { setActiveBranch(b.id); setCopied(false); }}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "text-white shadow-pop"
                    : "border border-amber-deep/15 bg-white/60 hover:bg-white"
                }`}
                style={active ? { backgroundColor: b.accent } : undefined}>
                <MapPin size={16} /> {t(b.nameKey)}
              </button>
            );
          })}
        </div>

        {/* Branch Card */}
        <AnimatePresence mode="wait">
          <motion.div key={branch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="mt-10 grid gap-6 lg:grid-cols-2">
            
            {/* Left: Image + Polished District Arrival Experience Card */}
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-4xl shadow-card">
                <SafeImage src={branch.image} alt={t(branch.nameKey)} sizes="(min-width:1024px) 50vw, 100vw"
                  fallback={branch.accent} />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 start-4 flex items-center gap-2">
                  <span className="glass rounded-full px-4 py-2 text-sm font-bold">{t(branch.nameKey)}</span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-amber-deep shadow-sm">
                    {branch.tag}
                  </span>
                </div>
              </div>

              {/* Polished District Navigation & Arrival Card */}
              <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-deep">
                    <Compass size={18} className="text-amber" />
                    <h3 className="font-display font-bold">{t("districtGuideTitle")}</h3>
                  </div>
                  <span className="rounded-full bg-porcelain-100 px-3 py-1 text-xs font-semibold text-amber-deep/60">
                    {t(branch.nameKey)}
                  </span>
                </div>
                
                <p className="mt-3 text-sm leading-relaxed text-amber-deep/75">
                  {t(branch.transitKey)}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${branch.mapQuery}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-deep">
                    <ExternalLink size={13} /> {t("getDirections")}
                  </a>
                  <button onClick={copyAddress}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-deep/15 bg-porcelain-100 px-4 py-2 text-xs font-semibold text-amber-deep transition-colors hover:bg-white">
                    {copied ? (
                      <><CheckCheck size={13} className="text-matcha" /> {t("copied")}</>
                    ) : (
                      <><Copy size={13} /> {t("copyDistrict")}</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Branch Info */}
            <div className="space-y-5">
              <div className="rounded-4xl border border-white/80 bg-white/60 p-6 shadow-card sm:p-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-extrabold">{t(branch.nameKey)}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-soft/60 px-3 py-1 text-xs font-bold text-amber">
                    <Sparkles size={12} /> Concept
                  </span>
                </div>
                <p className="mt-1 text-sm text-amber-deep/60">{t(branch.noteKey)}</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-taro-soft text-taro-deep">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-deep/60">{t("locations")}</p>
                      <p className="font-semibold">{t(branch.addrKey)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-matcha-soft text-matcha">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-deep/60">{t("hoursTitle")}</p>
                      <p className="font-semibold">{t(branch.hoursKey)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-mango-soft text-mango">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-deep/60">{t("call")}</p>
                      <p className="font-semibold text-amber-deep/75">{t("branchPhone")}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-amber-deep/60">{t("branchAmenities")}</p>
                  <div className="flex flex-wrap gap-2">
                    {branch.amenities.map(a => {
                      const Icon = AMENITY_ICONS[a] || Star;
                      return (
                        <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-porcelain-100 px-3 py-1.5 text-xs font-semibold">
                          <Icon size={14} className="text-amber" /> {t(a)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${branch.mapQuery}`}
                    target="_blank" rel="noopener noreferrer" className="btn-primary text-sm" style={{ backgroundColor: branch.accent }}>
                    <Navigation size={16} /> {t("getDirections")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* All Branches Quick List */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <motion.button key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              onClick={() => { setActiveBranch(b.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`group flex items-center gap-4 rounded-3xl border p-4 text-start transition-all ${
                b.id === activeBranch ? "border-amber bg-white shadow-card" : "border-white/80 bg-white/60 hover:bg-white hover:shadow-card"
              }`}>
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: b.accent + "20", color: b.accent }}>
                <MapPin size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{t(b.nameKey)}</p>
                <p className="truncate text-xs text-amber-deep/60">{t(b.hoursKey)}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-amber-deep/30 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Barista Academy + Franchise */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Barista Academy */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative mb-6 aspect-[16/8] overflow-hidden rounded-4xl shadow-card">
              <SafeImage src={IMAGES.baristaWork} alt="Barista Academy" sizes="(min-width:1024px) 50vw, 100vw" fallback="#E9D3BC" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4">
                <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
                  <GraduationCap size={16} className="text-amber" /> {t("baristaTitle")}
                </span>
              </div>
            </div>
            <InquiryForm title={t("baristaTitle")} subtitle={t("baristaSub")} accent="#9E5D2A" />
          </motion.div>

          {/* Franchise */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
            <div className="relative mb-6 aspect-[16/8] overflow-hidden rounded-4xl shadow-card">
              <SafeImage src={IMAGES.cafeInterior} alt="Franchise opportunity" sizes="(min-width:1024px) 50vw, 100vw" fallback="#DCEBDD" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4">
                <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
                  <Building2 size={16} className="text-matcha" /> {t("franchiseTitle")}
                </span>
              </div>
            </div>
            <InquiryForm title={t("franchiseTitle")} subtitle={t("franchiseSub")} accent="#4E8752" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
