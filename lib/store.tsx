"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
export type CartItem = { id: string; name: string; detail?: string; price: number; qty: number };

const DICT = {
  en: {
    // Nav
    menu: "Menu", lab: "Boba Lab", kids: "Kids Area", catering: "Catering", locations: "Locations",
    order: "Order Online", bag: "Bag", openMenu: "Open menu", closeMenu: "Close menu",
    // Hero
    heroA: "Sip Pure Joy,", heroB: "Pop Every Moment",
    heroSub: "Fresh milk, organic matcha and slow-cooked brown sugar pearls, made to order in Cairo and Giza.",
    explore: "Explore Menu", build: "Build Your Own Boba",
    nowBrewing: "Concept Hub in", city: "Hadayek Al-Ahram, Giza",
    bestSeller: "Best Seller", freshMilk: "Fresh Milk & Organic Matcha",
    // Footer
    footerTag: "Bubble tea concept, artisan waffles & family play hub. Conceptual portfolio design.",
    rights: "All rights reserved.",
    footerDisclaimer: "Unofficial portfolio concept — not affiliated with or endorsed by any real business.",
    footerPhone: "Portfolio Demo (Non-commercial)",
    footerHours: "24/7 Flagship Concept",
    footerAddr: "Hadayek Al-Ahram District, Giza",
    // Boba Lab
    bobaLab: "Boba Lab", craftTitle: "Craft Your Custom Boba", resetBtn: "Reset",
    chooseBase: "1. Choose Your Base", sweetnessIce: "2. Sweetness & Ice",
    sweetnessLabel: "Sweetness Level", iceLabel: "Ice Level",
    addToppings: "3. Add Toppings", cupUpdates: "Your cup updates as you choose.",
    addToBag: "Add Custom Brew to Bag", addedToBag: "Added to bag",
    conceptPricing: "Concept pricing for demonstration",
    // Menu
    popularBrews: "Popular House Brews", addBtn: "Add to Bag", addedBtn: "Added",
    // Cart
    yourBag: "Your Boba Bag", emptyBag: "Your bag is empty",
    emptyBagSub: "Build a custom brew or add a house favourite.",
    total: "Total", checkout: "Simulate Checkout (Demo)",
    checkoutMsg: "Demo order simulated! In a live app, this would process payment. No real orders are submitted.",
    viewBag: "View Bag & Checkout",
    itemSuffix: "item", itemsSuffix: "items",
    demoNotice: "Portfolio Demo — simulated orders only, no payment taken.",
    checkoutSuccessTitle: "Demo Order Simulated!",
    checkoutSuccessDesc: "Thank you for testing the Bubble Hope ordering flow. In a commercial deployment, this step routes to the payment gateway. No real charge occurred.",
    continueShopping: "Done & Reset Bag",
    // Kids page
    kidsHeroTitle: "A Magical World for Little Ones",
    kidsHeroSub: "Soft-play zones, creative workshops and bubble tea parties — a family-centered concept designed for play and celebration.",
    kidsExplore: "Explore Packages", kidsBook: "Book a Party",
    kidsPlayTitle: "Play & Discover", kidsPlayDesc: "A concept soft-play area with ball pits, slides, and sensory zones designed for ages 1–10 with child-safe equipment specifications.",
    kidsArtTitle: "Creative Corner", kidsArtDesc: "Arts & crafts, face painting and boba-themed workshops keep little hands busy while parents relax nearby.",
    kidsTreatsTitle: "Kid-Friendly Treats", kidsTreatsDesc: "Fruit-based boba, mini waffles and healthy snack boxes designed with kids in mind — less sugar, more smiles.",
    kidsPartyTitle: "Birthday Parties & Events",
    kidsPartySub: "Concept celebration packages with private play zones, decorations, party hosting, and custom treats.",
    packageBasic: "Bubble Fun", packageBasicDesc: "2-hour play access, 8 kid drinks, basic decorations, party host",
    packagePremium: "Boba Blast", packagePremiumDesc: "3-hour play access, 12 kid drinks, themed decorations, party host, face painting",
    packageUltimate: "Pop Star Party", packageUltimateDesc: "4-hour exclusive access, 20 kid drinks, premium decorations, party host, arts & crafts, boba workshop",
    packageFrom: "From", packageEgp: "EGP", packageBook: "Select Package (Demo)",
    packagePerChild: "per child estimate (min 8)",
    packageConceptNote: "Concept package estimates (Demo Only)",
    testimonialsTitle: "Sample Community Feedback (Demo Showcase)",
    testimonialsSub: "Illustrative reviews created for portfolio & UI design presentation.",
    testimonialTag: "Sample Review",
    testimonial1: "My daughter's birthday party was absolutely magical. The staff went above and beyond!",
    testimonial1Author: "Sara M., Cairo (Sample Persona)",
    testimonial2: "The kids area is so clean and safe. We visit every weekend and the children never want to leave.",
    testimonial2Author: "Ahmed K., Giza (Sample Persona)",
    testimonial3: "Best kids birthday venue in Cairo. The boba workshop was a huge hit with the older kids!",
    testimonial3Author: "Nadia R., 6th October (Sample Persona)",
    bookingTitle: "Book a Party or Visit",
    bookingSub: "Interactive demo form — test the reservation flow without submitting real data.",
    bookingName: "Parent's Name", bookingEmail: "Email Address", bookingPhone: "Phone Number",
    bookingDate: "Preferred Date", bookingPackage: "Package", bookingGuests: "Number of Children",
    bookingNotes: "Special Requests", bookingSubmit: "Submit Demo Request",
    bookingSuccess: "🎉 Demo booking request submitted! In a live app, this would email a confirmation.",
    selectPackage: "Select a package",
    safetyTitle: "Safety Standards (Concept Design)",
    safetySub: "Concept specifications: CCTV monitoring, certified soft play, first-aid trained hosts & allergen-aware prep (Illustrative Demo).",
    // Locations page
    locationsTitle: "Explore Concept Branches",
    locationsSub: "Three concept locations across Greater Cairo, each designed with distinct neighborhood character.",
    hoursTitle: "Operating Hours",
    branchHadayek: "Hadayek Al-Ahram",
    branchHadayekAddr: "Hadayek Al-Ahram District, Giza (Concept Location)",
    branchHadayekHours: "Concept Hours: Open 24/7",
    branchHadayekNote: "Flagship concept with family kids area & Boba Lab",
    branchSheikh: "Sheikh Zayed",
    branchSheikhAddr: "Mall Avenue Area, Sheikh Zayed (Concept Location)",
    branchSheikhHours: "Concept Hours: 10:00 AM – 1:00 AM",
    branchSheikhNote: "Boutique mall concept with relaxed indoor seating",
    branchHeliopolis: "Heliopolis",
    branchHeliopAddr: "Korba District, Heliopolis, Cairo (Concept Location)",
    branchHeliopHours: "Concept Hours: 11:00 AM – 12:00 AM",
    branchHeliopNote: "Heritage streetfront concept in the heart of Korba",
    branchPhone: "Portfolio Demo (No Live Phone)",
    getDirections: "Explore District on Google Maps ↗",
    call: "Contact",
    branchAmenities: "Featured Amenities",
    amenityWifi: "High-Speed Wi-Fi", amenityParking: "Parking Available", amenityKids: "Kids Area",
    amenityOutdoor: "Outdoor Patio", amenityDelivery: "Local Delivery",
    districtGuideTitle: "District & Neighborhood Guide",
    districtTransitHadayek: "Convenient access via Ring Road and Al-Wahat Road, near the Giza Pyramids plateau.",
    districtTransitSheikh: "Central location in Sheikh Zayed with quick access to 26th of July Corridor.",
    districtTransitHeliop: "Walkable historic boulevard setting in Korba, steps from the Metro station.",
    baristaTitle: "Barista Academy",
    baristaSub: "Learn the art of bubble tea from our master baristas. Group and individual workshops available.",
    baristaInquire: "Inquire About Workshops",
    franchiseTitle: "Franchise Opportunities",
    franchiseSub: "Interested in bringing Bubble Hope to your city? We're expanding across Egypt and the MENA region.",
    franchiseInquire: "Franchise Inquiry",
    formName: "Full Name", formEmail: "Email", formPhone: "Phone",
    formMessage: "Message", formSubmit: "Submit Demo Inquiry",
    formSuccess: "🎉 Demo inquiry submitted! In a live app, our team would reach out within 24 hours.",
    mapPlaceholder: "Interactive District Overview",
    viewOnMap: "View Area on Google Maps",
    copyDistrict: "Copy District Address",
    copied: "Copied to Clipboard!",
    // Shared
    learnMore: "Learn More",
    portfolioDisclaimer: "Unofficial Portfolio Concept",
    disclaimerFull: "This is a portfolio demo project. It is not affiliated with or endorsed by any real business. All data, prices, and locations are illustrative concept material.",
  },
  ar: {
    // Nav
    menu: "المنيو", lab: "معمل البوبا", kids: "منطقة الأطفال", catering: "التموين", locations: "الفروع",
    order: "اطلب أونلاين", bag: "الحقيبة", openMenu: "افتح القائمة", closeMenu: "اغلق القائمة",
    // Hero
    heroA: "اشرب البهجة الصافية،", heroB: "وفرقع كل لحظة",
    heroSub: "حليب طازج وماتشا عضوي ولؤلؤ سكر بني مطبوخ ببطء، يُحضَّر عند الطلب في القاهرة والجيزة.",
    explore: "استكشف المنيو", build: "صمّم البوبا بنفسك",
    nowBrewing: "مقر الفكرة التجريبية في", city: "حدائق الأهرام، الجيزة",
    bestSeller: "الأكثر مبيعًا", freshMilk: "حليب طازج وماتشا عضوي",
    // Footer
    footerTag: "فكرة بابل تي، وافل ومنطقة لعب عائلية. تصميم محفظة مفاهيمي.",
    rights: "جميع الحقوق محفوظة.",
    footerDisclaimer: "مشروع محفظة تجريبي مستقل — غير معتمد أو مرتبط بأي نشاط تجاري حقيقي.",
    footerPhone: "عرض محفظة تجريبي (غير تجاري)",
    footerHours: "نموذج تشغيلي ٢٤/٧",
    footerAddr: "منطقة حدائق الأهرام، الجيزة",
    // Boba Lab
    bobaLab: "معمل البوبا", craftTitle: "صمّم البوبا الخاصة بك", resetBtn: "إعادة تعيين",
    chooseBase: "١. اختر القاعدة", sweetnessIce: "٢. الحلاوة والثلج",
    sweetnessLabel: "مستوى الحلاوة", iceLabel: "مستوى الثلج",
    addToppings: "٣. أضف الإضافات", cupUpdates: "يتم تحديث الكوب أثناء اختيارك.",
    addToBag: "أضف البوبا المخصصة للحقيبة", addedToBag: "تمت الإضافة",
    conceptPricing: "أسعار تجريبية لأغراض العرض",
    // Menu
    popularBrews: "المشروبات المنزلية الشائعة", addBtn: "أضف للحقيبة", addedBtn: "تمت الإضافة",
    // Cart
    yourBag: "حقيبة البوبا", emptyBag: "حقيبتك فارغة",
    emptyBagSub: "صمّم مشروبًا مخصصًا أو أضف المفضل لديك.",
    total: "المجموع", checkout: "محاكاة الدفع (تجريبي)",
    checkoutMsg: "تم محاكاة الطلب بنجاح! في التطبيق الحقيقي سيتم معالجة الدفع. لا يتم إرسال طلبات حقيقية.",
    viewBag: "عرض الحقيبة والدفع",
    itemSuffix: "عنصر", itemsSuffix: "عناصر",
    demoNotice: "عرض تجريبي للمحفظة — طلبات محاكاة فقط دون دفع حقيقي.",
    checkoutSuccessTitle: "تمت محاكاة الطلب بنجاح!",
    checkoutSuccessDesc: "شكرًا لتجربة مسار طلب بابل هوب التجريبي. في التطبيق التجاري، سيتم التوجيه لبوابة الدفع. لم يتم خصم أي مبالغ حقيقية.",
    continueShopping: "تم وإعادة تعيين الحقيبة",
    // Kids page
    kidsHeroTitle: "عالم سحري للصغار",
    kidsHeroSub: "مناطق لعب ناعمة وورش عمل إبداعية وحفلات بابل تي — مفهوم عائلي مصمم للعب والاحتفال.",
    kidsExplore: "استكشف الباقات", kidsBook: "احجز حفلة",
    kidsPlayTitle: "العب واكتشف", kidsPlayDesc: "منطقة لعب ناعمة تجريبية مع حفر كرات وزلاقات ومناطق حسية مصممة للأعمار من ١ إلى ١٠ بمواصفات آمنة للأطفال.",
    kidsArtTitle: "ركن الإبداع", kidsArtDesc: "فنون وحرف يدوية ورسم على الوجه وورش عمل بابل تي تشغل الأيدي الصغيرة بينما يستريح الآباء.",
    kidsTreatsTitle: "مأكولات صديقة للأطفال", kidsTreatsDesc: "بوبا بالفواكه وميني وافل وعلب وجبات صحية مصممة للأطفال — سكر أقل، ابتسامات أكثر.",
    kidsPartyTitle: "حفلات أعياد الميلاد والمناسبات",
    kidsPartySub: "باقات احتفال تجريبية مع مناطق لعب خاصة وديكورات واستضافة حفلات وحلويات مخصصة.",
    packageBasic: "بابل فن", packageBasicDesc: "ساعتان لعب، ٨ مشروبات أطفال، ديكورات أساسية، مضيف حفلة",
    packagePremium: "بوبا بلاست", packagePremiumDesc: "٣ ساعات لعب، ١٢ مشروب أطفال، ديكورات مميزة، مضيف حفلة، رسم على الوجه",
    packageUltimate: "حفلة بوب ستار", packageUltimateDesc: "٤ ساعات حصرية، ٢٠ مشروب أطفال، ديكورات فاخرة، مضيف حفلة، فنون وحرف، ورشة بوبا",
    packageFrom: "من", packageEgp: "ج.م", packageBook: "اختر الباقة (تجريبي)",
    packagePerChild: "تقدير لكل طفل (الحد الأدنى ٨)",
    packageConceptNote: "تقديرات باقات تجريبية (للعرض فقط)",
    testimonialsTitle: "نماذج لآراء المجتمع (عرض تجريبي)",
    testimonialsSub: "آراء نموذجية توضيحية تم إنشاؤها لتقديم وتصميم واجهة المستخدم.",
    testimonialTag: "رأي نموذجي",
    testimonial1: "كانت حفلة عيد ميلاد ابنتي ساحرة. الفريق بذل مجهودًا رائعًا!",
    testimonial1Author: "سارة م.، القاهرة (شخصية نموذجية)",
    testimonial2: "منطقة الأطفال نظيفة وآمنة جدًا. نزورها كل أسبوع والأطفال لا يريدون المغادرة.",
    testimonial2Author: "أحمد ك.، الجيزة (شخصية نموذجية)",
    testimonial3: "أفضل مكان لحفلات أعياد الميلاد في القاهرة. ورشة البوبا أعجبت الأطفال الأكبر سنًا كثيرًا!",
    testimonial3Author: "نادية ر.، ٦ أكتوبر (شخصية نموذجية)",
    bookingTitle: "احجز حفلة أو زيارة",
    bookingSub: "نموذج حجز تجريبي تفاعلي — جرّب مسار الحجز دون إرسال بيانات حقيقية.",
    bookingName: "اسم ولي الأمر", bookingEmail: "البريد الإلكتروني", bookingPhone: "رقم الهاتف",
    bookingDate: "التاريخ المفضل", bookingPackage: "الباقة", bookingGuests: "عدد الأطفال",
    bookingNotes: "طلبات خاصة", bookingSubmit: "إرسال الطلب التجريبي",
    bookingSuccess: "🎉 تم إرسال طلب الحجز التجريبي! في التطبيق الحقيقي، ستصلك رسالة تأكيد.",
    selectPackage: "اختر باقة",
    safetyTitle: "معايير السلامة (فكرة التصميم)",
    safetySub: "مواصفات الفكرة: مراقبة بالكاميرات، مناطق لعب ناعمة معتمدة، مضيفون مدربون ومطبخ واعٍ بالحساسية (عرض توضيحي).",
    // Locations page
    locationsTitle: "استكشف الفروع التجريبية",
    locationsSub: "ثلاثة مواقع تجريبية في القاهرة الكبرى، مصممة بطابع وأجواء مميزة لكل حي.",
    hoursTitle: "ساعات العمل",
    branchHadayek: "حدائق الأهرام",
    branchHadayekAddr: "منطقة حدائق الأهرام، الجيزة (موقع تجريبي)",
    branchHadayekHours: "مواعيد تجريبية: مفتوح ٢٤/٧",
    branchHadayekNote: "الفرع الرئيسي التجريبي مع منطقة أطفال عائلية ومعمل بوبا",
    branchSheikh: "الشيخ زايد",
    branchSheikhAddr: "منطقة مول أفينيو، الشيخ زايد (موقع تجريبي)",
    branchSheikhHours: "مواعيد تجريبية: ١٠:٠٠ ص – ١:٠٠ ص",
    branchSheikhNote: "فرع تجريبي في المول مع جلسات داخلية هادئة",
    branchHeliopolis: "مصر الجديدة",
    branchHeliopAddr: "حي الكوربة، مصر الجديدة، القاهرة (موقع تجريبي)",
    branchHeliopHours: "مواعيد تجريبية: ١١:٠٠ ص – ١٢:٠٠ ص",
    branchHeliopNote: "فرع تجريبي في شارع تراثي بقلب الكوربة",
    branchPhone: "عرض تجريبي (لا يوجد هاتف نشط)",
    getDirections: "استكشف الحي على خرائط Google ↗",
    call: "الاتصال",
    branchAmenities: "المرافق المميزة",
    amenityWifi: "واي فاي سريع", amenityParking: "مواقف متوفرة", amenityKids: "منطقة أطفال",
    amenityOutdoor: "جلسات خارجية", amenityDelivery: "توصيل محلي",
    districtGuideTitle: "دليل الوصول والحي",
    districtTransitHadayek: "وصول سهل عبر الطريق الدائري وطريق الواحات، بالقرب من هضبة أهرامات الجيزة.",
    districtTransitSheikh: "موقع مركزي في الشيخ زايد مع وصول سريع عبر محور ٢٦ يوليو.",
    districtTransitHeliop: "موقع تاريخي مناسب للمشاة في الكوربة، على بُعد خطوات من محطة المترو.",
    baristaTitle: "أكاديمية الباريستا",
    baristaSub: "تعلم فن البابل تي من باريستا محترفين. ورش عمل فردية وجماعية متاحة.",
    baristaInquire: "استفسر عن الورش",
    franchiseTitle: "فرص الامتياز التجاري",
    franchiseSub: "مهتم بإحضار بابل هوب لمدينتك؟ نتوسع في مصر ومنطقة الشرق الأوسط وشمال أفريقيا.",
    franchiseInquire: "استفسار عن الامتياز",
    formName: "الاسم الكامل", formEmail: "البريد الإلكتروني", formPhone: "الهاتف",
    formMessage: "الرسالة", formSubmit: "إرسال الاستفسار التجريبي",
    formSuccess: "🎉 تم إرسال الاستفسار التجريبي! في التطبيق الحقيقي، سيتواصل الفريق خلال ٢٤ ساعة.",
    mapPlaceholder: "نظرة عامة على الحي التفاعلي",
    viewOnMap: "عرض الحي على خرائط Google",
    copyDistrict: "نسخ عنوان الحي",
    copied: "تم النسخ إلى الحافظة!",
    // Shared
    learnMore: "اعرف المزيد",
    portfolioDisclaimer: "مشروع محفظة غير رسمي",
    disclaimerFull: "هذا مشروع محفظة تجريبي. غير مرتبط أو معتمد من أي نشاط تجاري حقيقي. جميع البيانات والأسعار والمواقع هي مواد تجريبية ومفاهيمية للعرض فقط.",
  },
} as const;
export type DictKey = keyof (typeof DICT)["en"];

type Store = {
  lang: Lang; toggleLang: () => void; t: (k: DictKey) => string;
  items: CartItem[]; count: number; total: number;
  addItem: (i: Omit<CartItem, "qty">) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void; clear: () => void;
  cartOpen: boolean; openCart: () => void; closeCart: () => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bh-lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
    try {
      const bag = localStorage.getItem("bh-bag");
      if (bag) setItems(JSON.parse(bag));
    } catch { /* ignore corrupted storage */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("bh-lang", lang);
  }, [lang]);

  useEffect(() => { localStorage.setItem("bh-bag", JSON.stringify(items)); }, [items]);

  const addItem = useCallback((i: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const hit = prev.find((p) => p.id === i.id);
      return hit ? prev.map((p) => (p.id === i.id ? { ...p, qty: p.qty + 1 } : p)) : [...prev, { ...i, qty: 1 }];
    });
  }, []);
  const changeQty = useCallback((id: string, d: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + d } : p)).filter((p) => p.qty > 0));
  }, []);
  const removeItem = useCallback((id: string) => setItems((p) => p.filter((x) => x.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<Store>(() => ({
    lang,
    toggleLang: () => setLang((l) => (l === "en" ? "ar" : "en")),
    t: (k) => DICT[lang][k],
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.price, 0),
    addItem, changeQty, removeItem, clear,
    cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
  }), [lang, items, cartOpen, addItem, changeQty, removeItem, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  return v;
}
