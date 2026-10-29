import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations & Branches",
  description: "Find Bubble Hope branches across Cairo and Giza. Get directions, operating hours and explore franchise or Barista Academy opportunities.",
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
