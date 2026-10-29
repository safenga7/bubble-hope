import type { Metadata } from "next";
import BobaLab from "@/components/BobaLab";
import MenuGrid from "@/components/MenuGrid";

export const metadata: Metadata = {
  title: "Boba Lab & Menu",
  description: "Build your own custom boba tea and browse our popular house brews at Bubble Hope.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-40 pt-28 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <BobaLab />
        <MenuGrid />
      </div>
    </div>
  );
}
