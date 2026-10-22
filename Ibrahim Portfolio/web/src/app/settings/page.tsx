"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Profile, Project, Skill } from "@/types/portfolio";
import { normalizeExternalUrl, normalizeImagePath } from "@/lib/urls";

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

const emptySkillForm = {
  name: "",
  icon: "",
  category: "Programming",
  level: "Intermediate",
};

const emptyProjectForm = {
  name: "",
  description: "",
  image: "",
  technologies: "",
  live: "",
  github: "",
  featured: false,
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

  const [skillForm, setSkillForm] = useState(emptySkillForm);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const skillFormRef = useRef<HTMLElement>(null);
  const projectFormRef = useRef<HTMLElement>(null);

  const loadAll = useCallback(async () => {
    const [pRes, sRes, jRes] = await Promise.all([
      fetch("/api/profile"),
      fetch("/api/skills"),
      fetch("/api/projects"),
    ]);

    const pJson = await pRes.json();
    const sJson = await sRes.json();
    const jJson = await jRes.json();

    if (pJson.success && pJson.data) {
      setProfile({
        ...pJson.data,
        _id: pJson.data._id ? String(pJson.data._id) : undefined,
      });
    }
    if (sJson.success) {
      setSkills(
        (sJson.data || []).map((skill: Skill) => ({
          ...skill,
          _id: skill._id ? String(skill._id) : undefined,
        }))
      );
    }
    if (jJson.success) {
      setProjects(
        (jJson.data || []).map((project: Project) => ({
          ...project,
          _id: project._id ? String(project._id) : undefined,
        }))
      );
    }
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

  function handleUnauthorized(res: Response) {
    if (res.status === 401) {
      setAuthenticated(false);
      setStatus("Session expired. Please log in again.");
      return true;
    }
    return false;
  }

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
    setEditingSkillId(null);
    setEditingProjectId(null);
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const result = await res.json();
    if (handleUnauthorized(res)) return;
    setStatus(
      result.message || (result.success ? "Profile updated" : "Update failed")
    );
  }

  function startEditSkill(skill: Skill) {
    const id = skill._id ? String(skill._id) : "";
    if (!id) {
      setStatus("Cannot edit this skill: missing id");
      return;
    }
    setEditingSkillId(id);
    setSkillForm({
      name: skill.name || "",
      icon: skill.icon || "",
      category: skill.category || "Programming",
      level: skill.level || "Intermediate",
    });
    setStatus(`Editing skill: ${skill.name}`);
    requestAnimationFrame(() => {
      skillFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function cancelEditSkill() {
    setEditingSkillId(null);
    setSkillForm(emptySkillForm);
    setStatus("");
  }

  async function saveSkill(e: FormEvent) {
    e.preventDefault();

    const res = editingSkillId
      ? await fetch(`/api/skills/${editingSkillId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillForm),
        })
      : await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(skillForm),
        });

    const result = await res.json();
    if (handleUnauthorized(res)) return;

    if (!res.ok || !result.success) {
      setStatus(result.message || "Skill save failed");
      return;
    }

    setStatus(editingSkillId ? "Skill updated" : "Skill added");
    setEditingSkillId(null);
    setSkillForm(emptySkillForm);
    await loadAll();
  }

  async function deleteSkill(id?: string) {
    if (!id) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (handleUnauthorized(res)) return;
    if (editingSkillId === id) cancelEditSkill();
    setStatus("Skill deleted");
    await loadAll();
  }

  function startEditProject(project: Project) {
    const id = project._id ? String(project._id) : "";
    if (!id) {
      setStatus("Cannot edit this job: missing id");
      return;
    }
    setEditingProjectId(id);
    setProjectForm({
      name: project.name || "",
      description: project.description || "",
      image: project.image || "",
      technologies: (project.technologies || []).join(", "),
      live: project.live || "",
      github: project.github || "",
      featured: Boolean(project.featured),
    });
    setStatus(`Editing job: ${project.name}`);
    requestAnimationFrame(() => {
      projectFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function cancelEditProject() {
    setEditingProjectId(null);
    setProjectForm(emptyProjectForm);
    setStatus("");
  }

  async function saveProject(e: FormEvent) {
    e.preventDefault();

    const payload = {
      name: projectForm.name.trim(),
      description: projectForm.description.trim(),
      image: normalizeImagePath(projectForm.image.trim()),
      technologies: projectForm.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live: normalizeExternalUrl(projectForm.live.trim()),
      github: normalizeExternalUrl(projectForm.github.trim()),
      featured: Boolean(projectForm.featured),
    };

    const res = editingProjectId
      ? await fetch(`/api/projects/${editingProjectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    const result = await res.json().catch(() => ({}));
    if (handleUnauthorized(res)) return;

    if (!res.ok || !result.success) {
      setStatus(result.message || `Job save failed (${res.status})`);
      return;
    }

    setStatus(editingProjectId ? "Job updated successfully" : "Job added");
    setEditingProjectId(null);
    setProjectForm(emptyProjectForm);
    await loadAll();
  }

  async function deleteProject(id?: string) {
    if (!id) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (handleUnauthorized(res)) return;
    if (editingProjectId === id) cancelEditProject();
    setStatus("Job deleted");
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

        <section className="settings-card" ref={skillFormRef} id="skill-form">
          <h2>{editingSkillId ? "Edit Skill" : "Skills"}</h2>
          <form onSubmit={saveSkill}>
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
            <div className="settings-actions">
              <button type="submit">
                {editingSkillId ? "Save Skill Changes" : "Add Skill"}
              </button>
              {editingSkillId && (
                <button
                  type="button"
                  className="settings-btn-secondary"
                  onClick={cancelEditSkill}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="mt-4">
            {skills.map((skill) => (
              <div
                key={skill._id || skill.name}
                className={`settings-item ${
                  editingSkillId === skill._id ? "is-editing" : ""
                }`}
              >
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <p className="text-sm text-[var(--muted)]">
                    {skill.level} · {skill.category}
                  </p>
                </div>
                <div className="settings-item-actions">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => startEditSkill(skill)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteSkill(skill._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card" ref={projectFormRef} id="job-form">
          <h2>{editingProjectId ? "Edit Job" : "Jobs / Projects"}</h2>
          <form onSubmit={saveProject}>
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
            <div className="settings-actions">
              <button type="submit">
                {editingProjectId ? "Save Job Changes" : "Add Job"}
              </button>
              {editingProjectId && (
                <button
                  type="button"
                  className="settings-btn-secondary"
                  onClick={cancelEditProject}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="mt-4">
            {projects.map((project) => (
              <div
                key={project._id || project.name}
                className={`settings-item ${
                  editingProjectId === project._id ? "is-editing" : ""
                }`}
              >
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-[var(--muted)] line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="settings-item-actions">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => startEditProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
