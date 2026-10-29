import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids Area & Parties",
  description: "Book a kids birthday party or explore our soft-play zone, creative workshops and kid-friendly treats at Bubble Hope.",
};

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
