"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { src: string; alt: string; className?: string; sizes?: string; priority?: boolean; fallback?: string };

/** next/image with a graceful gradient fallback if a remote URL ever 404s. */
export default function SafeImage({ src, alt, className = "", sizes = "100vw", priority, fallback = "#E9D3BC" }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="img" aria-label={alt} className={`absolute inset-0 ${className}`}
      style={{ background: `linear-gradient(135deg, ${fallback}, #FAF8F5)` }} />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} onError={() => setFailed(true)} />;
}
