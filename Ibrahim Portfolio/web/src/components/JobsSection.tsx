import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Project } from "@/types/portfolio";

export default function JobsSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="jobs"
      className="section-pad relative border-y border-[var(--line)] bg-[var(--wash)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(14,124,123,0.07),transparent_60%)]" />

      <div className="relative mx-auto w-[min(1140px,92%)]">
        <Reveal>
          <p className="section-kicker">Jobs</p>
          <h2 className="section-title">Selected work & shipped products</h2>
          <p className="section-lead">
            Builds from brief to deploy — interfaces, APIs, and systems that
            solve a concrete job.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {projects.map((job, index) => {
            const flip = index % 2 === 1;
            return (
              <Reveal key={job._id || job.name} delay={index * 60}>
                <article className="group grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <div className={`job-frame ${flip ? "md:order-2" : ""}`}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--ink)] shadow-[0_24px_60px_rgba(12,18,24,0.14)]">
                      <Image
                        src={job.image}
                        alt={job.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      {job.featured && (
                        <span className="absolute left-4 top-4 bg-[var(--sand)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
                          Featured
                        </span>
                      )}
                      <span className="absolute bottom-4 right-4 font-[family-name:var(--font-display)] text-5xl font-bold text-white/25 md:text-6xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className={flip ? "md:order-1" : ""}>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                      Job {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.05] tracking-tight text-[var(--ink)]">
                      {job.name}
                    </h3>
                    <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-[var(--muted)]">
                      {job.description}
                    </p>

                    {job.technologies?.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="border border-[var(--line)] bg-[var(--paper)] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--ink)]"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={job.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--paper)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-deep)]"
                      >
                        Live Demo
                      </a>
                      <a
                        href={job.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}

          {projects.length === 0 && (
            <p className="text-[var(--muted)]">No jobs listed yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
