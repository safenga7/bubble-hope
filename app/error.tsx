"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client error in production monitoring
    console.error("Bubble Hope runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="glass max-w-md rounded-5xl p-8 text-center shadow-card">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-mango-soft text-mango">
          <span className="font-display text-3xl font-extrabold">!</span>
        </div>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-amber-deep">
          Something Bubbled Over
        </h1>
        <p className="mt-2 text-sm text-amber-deep/70">
          An unexpected error occurred while loading this view. You can retry or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="btn-primary !px-5 !py-2.5 text-sm">
            <RotateCcw size={16} /> Try Again
          </button>
          <Link href="/" className="btn-ghost !px-5 !py-2.5 text-sm">
            <Home size={16} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
