import { connectDB } from "@/lib/db";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
} from "@/lib/seed";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import type { Profile as ProfileType, Project as ProjectType, Skill as SkillType } from "@/types/portfolio";

function normalizeImage(src?: string) {
  if (!src) return "/ibo.png";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `/${src}`;
}

export async function getPortfolioData(): Promise<{
  profile: ProfileType;
  skills: SkillType[];
  projects: ProjectType[];
}> {
  try {
    await connectDB();

    const [profileDoc, skillsDocs, projectsDocs] = await Promise.all([
      Profile.findOne().lean(),
      Skill.find().lean(),
      Project.find().sort({ featured: -1, createdAt: -1 }).lean(),
    ]);

    const profile = profileDoc
      ? ({
          ...profileDoc,
          _id: String(profileDoc._id),
          profileImage: normalizeImage(profileDoc.profileImage),
        } as ProfileType)
      : fallbackProfile;

    const skills = (skillsDocs.length ? skillsDocs : fallbackSkills).map(
      (s) =>
        ({
          ...s,
          _id: s._id ? String(s._id) : undefined,
        }) as SkillType
    );

    const projects = (projectsDocs.length ? projectsDocs : fallbackProjects).map(
      (p) =>
        ({
          ...p,
          _id: p._id ? String(p._id) : undefined,
          image: normalizeImage(p.image),
        }) as ProjectType
    );

    return { profile, skills, projects };
  } catch {
    return {
      profile: fallbackProfile,
      skills: fallbackSkills,
      projects: fallbackProjects,
    };
  }
}
