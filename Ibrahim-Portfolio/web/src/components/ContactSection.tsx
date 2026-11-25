import Reveal from "@/components/Reveal";
import type { Profile } from "@/types/portfolio";

const contactMeta = [
  { key: "github" as const, label: "GitHub", icon: "fa-brands fa-github" },
  { key: "linkedin" as const, label: "LinkedIn", icon: "fa-brands fa-linkedin" },
  {
    key: "codeforces" as const,
    label: "Codeforces",
    icon: "fa-solid fa-code",
  },
  {
    key: "leetcode" as const,
    label: "LeetCode",
    icon: "fa-solid fa-laptop-code",
  },
];

export default function ContactSection({ profile }: { profile: Profile }) {
  const links = contactMeta
    .map((item) => ({
      ...item,
      href: profile.socialLinks?.[item.key] || "",
    }))
    .filter((item) => item.href);

  return (
    <section id="contact" className="section-pad relative overflow-hidden border-t border-[var(--line)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(14,124,123,0.08),transparent_40%,rgba(201,150,26,0.07)_100%)]" />

      <div className="relative mx-auto w-[min(1140px,92%)]">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="section-title">Let&apos;s build something next</h2>
              <p className="section-lead">
                Open to collaborations, internships, and product roles. Send a
                note — I reply quickly.
              </p>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex w-fit items-center gap-3 bg-[var(--ink)] px-6 py-4 text-sm font-bold tracking-wide text-[var(--paper)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-deep)]"
            >
              <i className="fa-solid fa-envelope" aria-hidden />
              {profile.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between border border-[var(--line)] bg-white/75 px-5 py-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_16px_40px_rgba(12,18,24,0.08)]"
                >
                  <i
                    className={`${link.icon} text-2xl text-[var(--accent)] transition-transform group-hover:scale-110`}
                    aria-hidden
                  />
                  <div className="mt-8">
                    <p className="font-semibold text-[var(--ink)]">{link.label}</p>
                    <p className="mt-1 text-sm text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                      Visit →
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
