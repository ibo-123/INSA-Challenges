"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Profile } from "@/types/portfolio";

export default function Hero({ profile }: { profile: Profile }) {
  const [typed, setTyped] = useState("");
  const firstName = profile.name.split(" ")[0] || profile.name;
  const lastName = profile.name.split(" ").slice(1).join(" ");

  useEffect(() => {
    const title = profile.title || "";
    let i = 0;
    setTyped("");
    const id = window.setInterval(() => {
      i += 1;
      setTyped(title.slice(0, i));
      if (i >= title.length) window.clearInterval(id);
    }, 48);
    return () => window.clearInterval(id);
  }, [profile.title]);

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={profile.profileImage || "/ibo.png"}
          alt=""
          fill
          priority
          className="animate-ken object-cover object-[68%_20%] md:object-[72%_16%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,10,14,0.97)_0%,rgba(7,10,14,0.9)_34%,rgba(7,10,14,0.55)_58%,rgba(7,10,14,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,10,14,0.82)_0%,transparent_42%)]" />
        <div className="hero-mesh absolute inset-0 opacity-70" />
        <div className="hero-grain absolute inset-0" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-[min(1140px,92%)] flex-col justify-end pb-20 pt-28 md:justify-center md:pb-28">
        <div className="max-w-3xl">
          <p className="animate-fade-up mb-5 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-[var(--sand-soft)]">
            Portfolio · Full Stack
          </p>

          <h1 className="animate-fade-up font-[family-name:var(--font-display)] text-[clamp(3.4rem,11vw,7.8rem)] font-bold leading-[0.88] tracking-[-0.04em] text-white delay-100">
            <span className="block">{firstName}</span>
            {lastName ? (
              <span className="mt-1 block text-white/92">{lastName}</span>
            ) : null}
          </h1>

          <h2 className="animate-fade-up mt-6 min-h-[1.45em] font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.6vw,1.85rem)] font-medium tracking-tight text-[var(--sand-soft)] delay-200">
            {typed}
            <span className="ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.1em] animate-blink bg-[var(--sand-soft)] align-baseline" />
          </h2>

          <p className="animate-fade-up mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/72 delay-300 md:text-lg">
            {profile.bio}
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 delay-450">
            <a
              href="#jobs"
              className="bg-[var(--sand)] px-7 py-3.5 text-sm font-bold tracking-wide text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:bg-[var(--sand-soft)]"
            >
              View Jobs
            </a>
            <a
              href="#contact"
              className="border border-white/45 px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>

        <a
          href="#profile"
          className="animate-fade-up absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/55 delay-600 md:flex"
          aria-label="Scroll to profile"
        >
          <span>Scroll</span>
          <span className="animate-float h-8 w-px bg-gradient-to-b from-white/70 to-transparent" />
        </a>
      </div>
    </section>
  );
}
