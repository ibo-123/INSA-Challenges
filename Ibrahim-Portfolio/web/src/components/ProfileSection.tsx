import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Profile } from "@/types/portfolio";

export default function ProfileSection({
  profile,
  projectCount,
}: {
  profile: Profile;
  projectCount: number;
}) {
  const stats = [
    { label: "Problems solved", value: `${profile.problemsSolved}+` },
    { label: "Shipped jobs", value: `${Math.max(projectCount, 1)}+` },
    { label: "University", value: "ASTU" },
    { label: "Focus", value: "Full Stack" },
  ];

  return (
    <section id="profile" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(14,124,123,0.12),transparent_70%)]" />

      <div className="mx-auto w-[min(1140px,92%)]">
        <Reveal>
          <p className="section-kicker">Profile</p>
          <h2 className="section-title">Craft, competition, and product sense</h2>
          <p className="section-lead">
            Solving{" "}
            <span className="font-semibold text-[var(--ink)]">
              {profile.problemsSolved}+
            </span>{" "}
            problems sharpened how I think — then I ship that thinking as
            full-stack products.
          </p>
        </Reveal>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-16">
          <Reveal delay={80}>
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div className="absolute -inset-3 border border-[var(--accent)]/35" />
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ink)]">
                <Image
                  src={profile.profileImage || "/ibo.png"}
                  alt={profile.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/40 to-transparent p-5 pt-16">
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    {profile.name}
                  </p>
                  <p className="text-sm text-[var(--sand-soft)]">{profile.title}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={120}>
              <div className="space-y-5 text-[1.08rem] leading-[1.75] text-[var(--ink-soft)]">
                <p>{profile.bio}</p>
                <p>
                  Studying Software Engineering at{" "}
                  <strong className="font-semibold text-[var(--ink)]">
                    {profile.university}
                  </strong>
                  , with a focus on full-stack product work and competitive
                  programming.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-[var(--line)] bg-white/70 px-5 py-5 backdrop-blur-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--wash)]"
                  >
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 font-[family-name:var(--font-display)] text-[1.85rem] font-bold tracking-tight text-[var(--ink)] sm:text-[2.1rem]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
