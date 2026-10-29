import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold text-amber/20">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Page Not Found</h1>
        <p className="mt-2 text-amber-deep/70">Looks like this boba floated away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/menu" className="btn-ghost">Explore Menu</Link>
        </div>
      </div>
    </div>
  );
}
