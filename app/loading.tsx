export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-soft border-t-amber" />
        <p className="mt-4 font-display text-lg font-bold text-amber-deep/60">Brewing...</p>
      </div>
    </div>
  );
}
