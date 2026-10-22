"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Profile, Project, Skill } from "@/types/portfolio";

const emptyProfile: Profile = {
  name: "",
  title: "",
  bio: "",
  profileImage: "",
  problemsSolved: 0,
  university: "",
  email: "",
  socialLinks: { github: "", linkedin: "", codeforces: "", leetcode: "" },
};

export default function SettingsPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState("");

  const [skillForm, setSkillForm] = useState({
    name: "",
    icon: "",
    category: "Programming",
    level: "Intermediate",
  });

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    image: "",
    technologies: "",
    live: "",
    github: "",
    featured: false,
  });

  const loadAll = useCallback(async () => {
    const [pRes, sRes, jRes] = await Promise.all([
      fetch("/api/profile"),
      fetch("/api/skills"),
      fetch("/api/projects"),
    ]);

    const pJson = await pRes.json();
    const sJson = await sRes.json();
    const jJson = await jRes.json();

    if (pJson.success && pJson.data) setProfile(pJson.data);
    if (sJson.success) setSkills(sJson.data || []);
    if (jJson.success) setProjects(jJson.data || []);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        const ok = Boolean(data.authenticated);
        setAuthenticated(ok);
        if (ok) await loadAll();
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    }

    checkAuth().catch(console.error);
  }, [loadAll]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        setLoginError(result.message || "Invalid password");
        return;
      }

      setAuthenticated(true);
      setPassword("");
      await loadAll();
    } catch {
      setLoginError("Login failed. Try again.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setStatus("");
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const result = await res.json();
    if (res.status === 401) {
      setAuthenticated(false);
      setStatus("Session expired. Please log in again.");
      return;
    }
    setStatus(result.message || (result.success ? "Profile updated" : "Update failed"));
  }

  async function addSkill(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skillForm),
    });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    setSkillForm({
      name: "",
      icon: "",
      category: "Programming",
      level: "Intermediate",
    });
    await loadAll();
  }

  async function deleteSkill(id?: string) {
    if (!id) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    await loadAll();
  }

  async function addProject(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...projectForm,
        technologies: projectForm.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    setProjectForm({
      name: "",
      description: "",
      image: "",
      technologies: "",
      live: "",
      github: "",
      featured: false,
    });
    await loadAll();
  }

  async function deleteProject(id?: string) {
    if (!id) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      setAuthenticated(false);
      return;
    }
    await loadAll();
  }

  if (!authChecked) {
    return (
      <div className="settings-shell flex min-h-svh items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Checking access…</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="settings-shell flex min-h-svh items-center justify-center px-4">
        <div className="settings-card w-full max-w-md">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            Owner login
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Settings are private. Enter your admin password to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-2">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {loginError && (
              <p className="mt-3 text-sm text-[#b42318]">{loginError}</p>
            )}
            <button type="submit" disabled={loggingIn}>
              {loggingIn ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-shell">
      <header className="mx-auto flex w-[min(960px,92%)] items-center justify-between gap-4 py-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
          Portfolio Settings
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleLogout}
            className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Log out
          </button>
          <Link
            href="/"
            className="border border-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
          >
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-[min(960px,92%)] space-y-8 pb-16">
        {status && (
          <p className="border border-[var(--accent)] bg-[var(--wash)] px-4 py-3 text-sm text-[var(--accent)]">
            {status}
          </p>
        )}

        <section className="settings-card">
          <h2>Profile</h2>
          <form onSubmit={saveProfile}>
            <label>Name</label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <label>Title</label>
            <input
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
            <label>Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
            <label>Profile Image</label>
            <input
              value={profile.profileImage}
              onChange={(e) =>
                setProfile({ ...profile, profileImage: e.target.value })
              }
            />
            <label>Problems Solved</label>
            <input
              type="number"
              value={profile.problemsSolved}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  problemsSolved: Number(e.target.value),
                })
              }
            />
            <label>University</label>
            <input
              value={profile.university}
              onChange={(e) =>
                setProfile({ ...profile, university: e.target.value })
              }
            />
            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <label>GitHub</label>
            <input
              value={profile.socialLinks?.github || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: { ...profile.socialLinks, github: e.target.value },
                })
              }
            />
            <label>LinkedIn</label>
            <input
              value={profile.socialLinks?.linkedin || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: {
                    ...profile.socialLinks,
                    linkedin: e.target.value,
                  },
                })
              }
            />
            <label>Codeforces</label>
            <input
              value={profile.socialLinks?.codeforces || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: {
                    ...profile.socialLinks,
                    codeforces: e.target.value,
                  },
                })
              }
            />
            <label>LeetCode</label>
            <input
              value={profile.socialLinks?.leetcode || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  socialLinks: {
                    ...profile.socialLinks,
                    leetcode: e.target.value,
                  },
                })
              }
            />
            <button type="submit">Update Profile</button>
          </form>
        </section>

        <section className="settings-card">
          <h2>Skills</h2>
          <form onSubmit={addSkill}>
            <label>Skill Name</label>
            <input
              value={skillForm.name}
              onChange={(e) =>
                setSkillForm({ ...skillForm, name: e.target.value })
              }
              required
            />
            <label>Icon class</label>
            <input
              value={skillForm.icon}
              onChange={(e) =>
                setSkillForm({ ...skillForm, icon: e.target.value })
              }
              placeholder="devicon-react-original"
            />
            <label>Category</label>
            <select
              value={skillForm.category}
              onChange={(e) =>
                setSkillForm({ ...skillForm, category: e.target.value })
              }
            >
              {[
                "Programming",
                "Frontend",
                "Backend",
                "Mobile",
                "Database",
                "Tools",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <label>Level</label>
            <select
              value={skillForm.level}
              onChange={(e) =>
                setSkillForm({ ...skillForm, level: e.target.value })
              }
            >
              {["Beginner", "Intermediate", "Advanced", "Expert"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <button type="submit">Add Skill</button>
          </form>

          <div className="mt-4">
            {skills.map((skill) => (
              <div key={skill._id || skill.name} className="settings-item">
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {skill.level} · {skill.category}
                  </p>
                </div>
                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteSkill(skill._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <h2>Jobs / Projects</h2>
          <form onSubmit={addProject}>
            <label>Job Name</label>
            <input
              value={projectForm.name}
              onChange={(e) =>
                setProjectForm({ ...projectForm, name: e.target.value })
              }
              required
            />
            <label>Image path or URL</label>
            <input
              value={projectForm.image}
              onChange={(e) =>
                setProjectForm({ ...projectForm, image: e.target.value })
              }
              required
            />
            <label>Description</label>
            <textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              required
            />
            <label>Technologies (comma separated)</label>
            <input
              value={projectForm.technologies}
              onChange={(e) =>
                setProjectForm({ ...projectForm, technologies: e.target.value })
              }
            />
            <label>Live Link</label>
            <input
              value={projectForm.live}
              onChange={(e) =>
                setProjectForm({ ...projectForm, live: e.target.value })
              }
              required
            />
            <label>GitHub Link</label>
            <input
              value={projectForm.github}
              onChange={(e) =>
                setProjectForm({ ...projectForm, github: e.target.value })
              }
              required
            />
            <label className="!normal-case !tracking-normal">
              <input
                type="checkbox"
                className="mr-2 w-auto"
                checked={projectForm.featured}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    featured: e.target.checked,
                  })
                }
              />
              Featured job
            </label>
            <button type="submit">Add Job</button>
          </form>

          <div className="mt-4">
            {projects.map((project) => (
              <div key={project._id || project.name} className="settings-item">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteProject(project._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
