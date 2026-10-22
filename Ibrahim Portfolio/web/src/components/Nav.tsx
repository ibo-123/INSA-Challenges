"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#profile", label: "Profile" },
  { href: "#jobs", label: "Jobs" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] shadow-[0_8px_30px_rgba(12,18,24,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-[min(1140px,92%)] items-center justify-between py-4 md:py-5">
        <a
          href="#home"
          className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight transition-colors ${
            onHero ? "text-white" : "text-[var(--ink)]"
          }`}
        >
          IK
          <span className={onHero ? "text-[var(--sand-soft)]" : "text-[var(--accent)]"}>
            .
          </span>
        </a>

        <button
          type="button"
          className="relative z-10 flex h-11 w-11 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-5 transition-all ${
              open
                ? "rotate-45 bg-[var(--ink)]"
                : onHero
                  ? "bg-white -translate-y-1.5"
                  : "bg-[var(--ink)] -translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 transition-all ${
              open
                ? "opacity-0"
                : onHero
                  ? "bg-white"
                  : "bg-[var(--ink)]"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 transition-all ${
              open
                ? "-rotate-45 bg-[var(--ink)]"
                : onHero
                  ? "bg-white translate-y-1.5"
                  : "bg-[var(--ink)] translate-y-1.5"
            }`}
          />
        </button>

        <ul
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-1 border-b border-[var(--line)] bg-[var(--paper)] px-[4%] py-5 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-9 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm font-medium tracking-[0.04em] transition-colors md:py-0 ${
                  open || scrolled
                    ? "text-[var(--muted)] hover:text-[var(--ink)]"
                    : "text-white/75 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
