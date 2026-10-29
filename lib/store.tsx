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
    nowBrewing: "Now brewing in", city: "Hadayek Al-Ahram, Giza",
    bestSeller: "Best Seller", freshMilk: "Fresh Milk & Organic Matcha",
    // Footer
    footerTag: "Bubble tea, waffles and a playground for little ones. Open 24/7 at selected branches.",
    rights: "All rights reserved.",
    footerDisclaimer: "Unofficial portfolio concept — not affiliated with any real business.",
    // Boba Lab
    bobaLab: "Boba Lab", craftTitle: "Craft Your Custom Boba", resetBtn: "Reset",
    chooseBase: "1. Choose Your Base", sweetnessIce: "2. Sweetness & Ice",
    sweetnessLabel: "Sweetness Level", iceLabel: "Ice Level",
    addToppings: "3. Add Toppings", cupUpdates: "Your cup updates as you choose.",
    addToBag: "Add Custom Brew to Bag", addedToBag: "Added to bag",
    // Menu
    popularBrews: "Popular House Brews", addBtn: "Add to Bag", addedBtn: "Added",
    // Cart
    yourBag: "Your Boba Bag", emptyBag: "Your bag is empty",
    emptyBagSub: "Build a custom brew or add a house favourite.",
    total: "Total", checkout: "Checkout (Demo)",
    checkoutMsg: "🎉 Demo order placed! In a real app, this would process your payment.",
    viewBag: "View Bag & Checkout",
    itemSuffix: "item", itemsSuffix: "items",
    demoNotice: "This is a demo — no real orders are placed.",
    // Kids page
    kidsHeroTitle: "A Magical World for Little Ones",
    kidsHeroSub: "Soft-play zones, creative workshops and bubble tea parties — all in a safe, fun environment.",
    kidsExplore: "Explore Packages", kidsBook: "Book a Party",
    kidsPlayTitle: "Play & Discover", kidsPlayDesc: "Our soft-play area features ball pits, slides, climbing walls and sensory zones — all designed for ages 1–10 with safety-certified equipment.",
    kidsArtTitle: "Creative Corner", kidsArtDesc: "Arts & crafts, face painting and boba-themed workshops keep little hands busy while parents relax nearby.",
    kidsTreatsTitle: "Kid-Friendly Treats", kidsTreatsDesc: "Fruit-based boba, mini waffles and healthy snack boxes designed with kids in mind — less sugar, more smiles.",
    kidsPartyTitle: "Birthday Parties & Events",
    kidsPartySub: "Make their birthday unforgettable with a private Bubble Hope party — decorations, treats and a dedicated party host included.",
    packageBasic: "Bubble Fun", packageBasicDesc: "2-hour play access, 8 kid drinks, basic decorations, party host",
    packagePremium: "Boba Blast", packagePremiumDesc: "3-hour play access, 12 kid drinks, themed decorations, party host, face painting",
    packageUltimate: "Pop Star Party", packageUltimateDesc: "4-hour exclusive access, 20 kid drinks, premium decorations, party host, arts & crafts, boba workshop",
    packageFrom: "From", packageEgp: "EGP", packageBook: "Book This Package",
    packagePerChild: "per child (min 8)",
    testimonialsTitle: "What Parents Say",
    testimonial1: "My daughter's birthday party was absolutely magical. The staff went above and beyond!",
    testimonial1Author: "Sara M., Cairo",
    testimonial2: "The kids area is so clean and safe. We visit every weekend and the children never want to leave.",
    testimonial2Author: "Ahmed K., Giza",
    testimonial3: "Best kids birthday venue in Cairo. The boba workshop was a huge hit with the older kids!",
    testimonial3Author: "Nadia R., 6th October",
    bookingTitle: "Book a Party or Visit",
    bookingName: "Parent's Name", bookingEmail: "Email Address", bookingPhone: "Phone Number",
    bookingDate: "Preferred Date", bookingPackage: "Package", bookingGuests: "Number of Children",
    bookingNotes: "Special Requests", bookingSubmit: "Submit Booking Request (Demo)",
    bookingSuccess: "🎉 Demo booking submitted! In a real app, you would receive a confirmation email.",
    selectPackage: "Select a package",
    safetyTitle: "Safety First",
    safetySub: "CCTV monitored · Certified play equipment · First-aid trained staff · Allergen-aware kitchen",
    // Locations page
    locationsTitle: "Find a Branch Near You",
    locationsSub: "Three cozy branches across Greater Cairo, each with its own personality.",
    hoursTitle: "Operating Hours",
    branchHadayek: "Hadayek Al-Ahram",
    branchHadayekAddr: "Street 123, Hadayek Al-Ahram, Giza",
    branchHadayekHours: "Open 24/7",
    branchHadayekNote: "Our flagship branch with kids area & Boba Lab",
    branchSheikh: "Sheikh Zayed",
    branchSheikhAddr: "Mall Avenue, Sheikh Zayed City",
    branchSheikhHours: "10:00 AM – 1:00 AM",
    branchSheikhNote: "Located in Mall Avenue with indoor seating",
    branchHeliopolis: "Heliopolis",
    branchHeliopAddr: "Korba, Heliopolis, Cairo",
    branchHeliopHours: "11:00 AM – 12:00 AM",
    branchHeliopNote: "Our newest branch in the heart of Korba",
    getDirections: "Get Directions (Demo)",
    call: "Call",
    branchAmenities: "Amenities",
    amenityWifi: "Free Wi-Fi", amenityParking: "Parking", amenityKids: "Kids Area",
    amenityOutdoor: "Outdoor Seating", amenityDelivery: "Delivery",
    baristaTitle: "Barista Academy",
    baristaSub: "Learn the art of bubble tea from our master baristas. Group and individual workshops available.",
    baristaInquire: "Inquire About Workshops",
    franchiseTitle: "Franchise Opportunities",
    franchiseSub: "Interested in bringing Bubble Hope to your city? We're expanding across Egypt and the MENA region.",
    franchiseInquire: "Franchise Inquiry",
    formName: "Full Name", formEmail: "Email", formPhone: "Phone",
    formMessage: "Message", formSubmit: "Submit Inquiry (Demo)",
    formSuccess: "🎉 Demo inquiry submitted! In a real app, our team would reach out within 24 hours.",
    mapPlaceholder: "Interactive map would appear here in production",
    viewOnMap: "View on Map",
    // Shared
    learnMore: "Learn More",
    portfolioDisclaimer: "Unofficial Portfolio Concept",
    disclaimerFull: "This is a portfolio demo project. It is not affiliated with any real business. All data, prices, and content are fictional.",
  },
  ar: {
    // Nav
    menu: "المنيو", lab: "معمل البوبا", kids: "منطقة الأطفال", catering: "التموين", locations: "الفروع",
    order: "اطلب أونلاين", bag: "الحقيبة", openMenu: "افتح القائمة", closeMenu: "اغلق القائمة",
    // Hero
    heroA: "اشرب البهجة الصافية،", heroB: "وفرقع كل لحظة",
    heroSub: "حليب طازج وماتشا عضوي ولؤلؤ سكر بني مطبوخ ببطء، يُحضَّر عند الطلب في القاهرة والجيزة.",
    explore: "استكشف المنيو", build: "صمّم البوبا بنفسك",
    nowBrewing: "نحضّر الآن في", city: "حدائق الأهرام، الجيزة",
    bestSeller: "الأكثر مبيعًا", freshMilk: "حليب طازج وماتشا عضوي",
    // Footer
    footerTag: "بابل تي ووافل ومنطقة لعب للصغار. مفتوح 24/7 في فروع مختارة.",
    rights: "جميع الحقوق محفوظة.",
    footerDisclaimer: "مشروع محفظة تجريبي — غير مرتبط بأي نشاط تجاري حقيقي.",
    // Boba Lab
    bobaLab: "معمل البوبا", craftTitle: "صمّم البوبا الخاصة بك", resetBtn: "إعادة تعيين",
    chooseBase: "١. اختر القاعدة", sweetnessIce: "٢. الحلاوة والثلج",
    sweetnessLabel: "مستوى الحلاوة", iceLabel: "مستوى الثلج",
    addToppings: "٣. أضف الإضافات", cupUpdates: "يتم تحديث الكوب أثناء اختيارك.",
    addToBag: "أضف البوبا المخصصة للحقيبة", addedToBag: "تمت الإضافة",
    // Menu
    popularBrews: "المشروبات المنزلية الشائعة", addBtn: "أضف للحقيبة", addedBtn: "تمت الإضافة",
    // Cart
    yourBag: "حقيبة البوبا", emptyBag: "حقيبتك فارغة",
    emptyBagSub: "صمّم مشروبًا مخصصًا أو أضف المفضل لديك.",
    total: "المجموع", checkout: "الدفع (تجريبي)",
    checkoutMsg: "🎉 طلب تجريبي! في التطبيق الحقيقي، سيتم معالجة الدفع.",
    viewBag: "عرض الحقيبة والدفع",
    itemSuffix: "عنصر", itemsSuffix: "عناصر",
    demoNotice: "هذا عرض تجريبي — لا يتم تقديم طلبات حقيقية.",
    // Kids page
    kidsHeroTitle: "عالم سحري للصغار",
    kidsHeroSub: "مناطق لعب ناعمة وورش عمل إبداعية وحفلات بابل تي — كل ذلك في بيئة آمنة وممتعة.",
    kidsExplore: "استكشف الباقات", kidsBook: "احجز حفلة",
    kidsPlayTitle: "العب واكتشف", kidsPlayDesc: "تضم منطقة اللعب الناعمة حفر كرات وزلاقات وجدران تسلق ومناطق حسية — مصممة للأعمار من ١ إلى ١٠ بمعدات معتمدة السلامة.",
    kidsArtTitle: "ركن الإبداع", kidsArtDesc: "فنون وحرف يدوية ورسم على الوجه وورش عمل بابل تي تشغل الأيدي الصغيرة بينما يستريح الآباء.",
    kidsTreatsTitle: "مأكولات صديقة للأطفال", kidsTreatsDesc: "بوبا بالفواكه وميني وافل وعلب وجبات صحية مصممة للأطفال — سكر أقل، ابتسامات أكثر.",
    kidsPartyTitle: "حفلات أعياد الميلاد والمناسبات",
    kidsPartySub: "اجعل عيد ميلادهم لا يُنسى مع حفلة خاصة في بابل هوب — تشمل الديكورات والمأكولات ومضيف حفلة مخصص.",
    packageBasic: "بابل فن", packageBasicDesc: "ساعتان لعب، ٨ مشروبات أطفال، ديكورات أساسية، مضيف حفلة",
    packagePremium: "بوبا بلاست", packagePremiumDesc: "٣ ساعات لعب، ١٢ مشروب أطفال، ديكورات مميزة، مضيف حفلة، رسم على الوجه",
    packageUltimate: "حفلة بوب ستار", packageUltimateDesc: "٤ ساعات حصرية، ٢٠ مشروب أطفال، ديكورات فاخرة، مضيف حفلة، فنون وحرف، ورشة بوبا",
    packageFrom: "من", packageEgp: "ج.م", packageBook: "احجز هذه الباقة",
    packagePerChild: "لكل طفل (الحد الأدنى ٨)",
    testimonialsTitle: "آراء الآباء",
    testimonial1: "كانت حفلة عيد ميلاد ابنتي ساحرة. الفريق بذل مجهودًا رائعًا!",
    testimonial1Author: "سارة م.، القاهرة",
    testimonial2: "منطقة الأطفال نظيفة وآمنة جدًا. نزورها كل أسبوع والأطفال لا يريدون المغادرة.",
    testimonial2Author: "أحمد ك.، الجيزة",
    testimonial3: "أفضل مكان لحفلات أعياد الميلاد في القاهرة. ورشة البوبا أعجبت الأطفال الأكبر سنًا كثيرًا!",
    testimonial3Author: "نادية ر.، ٦ أكتوبر",
    bookingTitle: "احجز حفلة أو زيارة",
    bookingName: "اسم ولي الأمر", bookingEmail: "البريد الإلكتروني", bookingPhone: "رقم الهاتف",
    bookingDate: "التاريخ المفضل", bookingPackage: "الباقة", bookingGuests: "عدد الأطفال",
    bookingNotes: "طلبات خاصة", bookingSubmit: "إرسال طلب الحجز (تجريبي)",
    bookingSuccess: "🎉 تم إرسال الحجز التجريبي! في التطبيق الحقيقي، ستصلك رسالة تأكيد.",
    selectPackage: "اختر باقة",
    safetyTitle: "السلامة أولاً",
    safetySub: "مراقبة بالكاميرات · معدات لعب معتمدة · طاقم مدرّب على الإسعافات · مطبخ واعٍ بالحساسية",
    // Locations page
    locationsTitle: "ابحث عن فرع بالقرب منك",
    locationsSub: "ثلاثة فروع مريحة في القاهرة الكبرى، كل منها بشخصيته الخاصة.",
    hoursTitle: "ساعات العمل",
    branchHadayek: "حدائق الأهرام",
    branchHadayekAddr: "شارع ١٢٣، حدائق الأهرام، الجيزة",
    branchHadayekHours: "مفتوح ٢٤/٧",
    branchHadayekNote: "فرعنا الرئيسي مع منطقة أطفال ومعمل بوبا",
    branchSheikh: "الشيخ زايد",
    branchSheikhAddr: "مول أفينيو، مدينة الشيخ زايد",
    branchSheikhHours: "١٠:٠٠ ص – ١:٠٠ ص",
    branchSheikhNote: "في مول أفينيو مع جلسات داخلية",
    branchHeliopolis: "مصر الجديدة",
    branchHeliopAddr: "الكوربة، مصر الجديدة، القاهرة",
    branchHeliopHours: "١١:٠٠ ص – ١٢:٠٠ ص",
    branchHeliopNote: "أحدث فروعنا في قلب الكوربة",
    getDirections: "احصل على الاتجاهات (تجريبي)",
    call: "اتصل",
    branchAmenities: "المرافق",
    amenityWifi: "واي فاي مجاني", amenityParking: "مواقف سيارات", amenityKids: "منطقة أطفال",
    amenityOutdoor: "جلسات خارجية", amenityDelivery: "توصيل",
    baristaTitle: "أكاديمية الباريستا",
    baristaSub: "تعلم فن البابل تي من باريستا محترفين. ورش عمل فردية وجماعية متاحة.",
    baristaInquire: "استفسر عن الورش",
    franchiseTitle: "فرص الامتياز التجاري",
    franchiseSub: "مهتم بإحضار بابل هوب لمدينتك؟ نتوسع في مصر ومنطقة الشرق الأوسط وشمال أفريقيا.",
    franchiseInquire: "استفسار عن الامتياز",
    formName: "الاسم الكامل", formEmail: "البريد الإلكتروني", formPhone: "الهاتف",
    formMessage: "الرسالة", formSubmit: "إرسال الاستفسار (تجريبي)",
    formSuccess: "🎉 تم إرسال الاستفسار التجريبي! في التطبيق الحقيقي، سيتواصل فريقنا خلال ٢٤ ساعة.",
    mapPlaceholder: "ستظهر الخريطة التفاعلية هنا في الإنتاج",
    viewOnMap: "عرض على الخريطة",
    // Shared
    learnMore: "اعرف المزيد",
    portfolioDisclaimer: "مشروع محفظة غير رسمي",
    disclaimerFull: "هذا مشروع محفظة تجريبي. غير مرتبط بأي نشاط تجاري حقيقي. جميع البيانات والأسعار والمحتوى وهمية.",
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
