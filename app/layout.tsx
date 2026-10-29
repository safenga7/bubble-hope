import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const plexAr = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-plex-ar", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Bubble Hope | Premium Bubble Tea & Kids Area — Portfolio Demo",
    template: "%s | Bubble Hope",
  },
  description: "Portfolio demo: Build your own boba, explore the menu, book kids parties, and find branches. Unofficial concept by a developer showcase.",
  keywords: ["bubble tea", "boba", "kids area", "Cairo", "Giza", "portfolio", "demo", "Next.js"],
  authors: [{ name: "Portfolio Demo" }],
  openGraph: {
    title: "Bubble Hope — Premium Bubble Tea (Portfolio Demo)",
    description: "A showcase portfolio project: custom boba builder, kids party booking, and branch finder. Built with Next.js, Tailwind CSS & Framer Motion.",
    type: "website",
    locale: "en_US",
    siteName: "Bubble Hope (Demo)",
  },
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${jakarta.variable} ${outfit.variable} ${cairo.variable} ${plexAr.variable}`}>
      <body className="min-h-screen bg-porcelain font-sans text-amber-deep">
        <StoreProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
