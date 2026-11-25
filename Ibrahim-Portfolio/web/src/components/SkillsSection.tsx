import Reveal from "@/components/Reveal";
import type { Skill } from "@/types/portfolio";

const levelWidth: Record<string, string> = {
  Beginner: "35%",
  Intermediate: "58%",
  Advanced: "78%",
  Expert: "94%",
};

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-pad">
      <div className="mx-auto w-[min(1140px,92%)]">
        <Reveal>
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">Tools in daily rotation</h2>
          <p className="section-lead">
            Languages and frameworks I use to turn ideas into reliable software.
          </p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {Object.entries(grouped).map(([category, items], groupIndex) => (
            <Reveal key={category} delay={groupIndex * 70}>
              <div>
                <h3 className="mb-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {category}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((skill) => (
                    <li
                      key={skill._id || skill.name}
                      className="group border border-[var(--line)] bg-white/80 px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_14px_36px_rgba(12,18,24,0.07)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {skill.icon ? (
                            <i
                              className={`${skill.icon} text-2xl text-[var(--accent)] transition-transform group-hover:scale-110`}
                              aria-hidden
                            />
                          ) : (
                            <span className="flex h-9 w-9 items-center justify-center bg-[var(--wash)] font-[family-name:var(--font-display)] text-sm font-bold text-[var(--accent)]">
                              {skill.name.slice(0, 1)}
                            </span>
                          )}
                          <div>
                            <p className="font-semibold text-[var(--ink)]">
                              {skill.name}
                            </p>
                            {skill.level && (
                              <p className="text-xs text-[var(--muted)]">
                                {skill.level}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="skill-meter mt-4">
                        <span
                          style={{
                            width: levelWidth[skill.level || "Intermediate"],
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
