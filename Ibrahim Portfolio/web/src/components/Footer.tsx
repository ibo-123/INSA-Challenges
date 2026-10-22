export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto flex w-[min(1140px,92%)] flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold">
            IK<span className="text-[var(--sand)]">.</span>
          </p>
          <p className="mt-1 text-sm text-white/50">
            Full-stack developer · Competitive programmer
          </p>
        </div>
        <p className="text-sm text-white/45">
          © {new Date().getFullYear()} Ibrahim Kedir · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
