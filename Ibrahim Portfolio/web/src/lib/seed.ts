import type { Profile, Project, Skill } from "@/types/portfolio";

export const fallbackProfile: Profile = {
  name: "Ibrahim Kedir",
  title: "MERN Stack Programmer",
  bio: "Software Engineering student at ASTU passionate about Competitive Programming and Full Stack Development.",
  profileImage: "/ibo.png",
  problemsSolved: 800,
  university: "Adama Science and Technology University",
  email: "ibrahimkediramdela2211@gmail.com",
  socialLinks: {
    github: "https://github.com/ibo-123",
    linkedin: "",
    codeforces: "",
    leetcode: "https://leetcode.com/u/ibro_man",
  },
};

export const fallbackSkills: Skill[] = [
  { name: "JavaScript", icon: "devicon-javascript-plain", category: "Programming", level: "Advanced" },
  { name: "React", icon: "devicon-react-original", category: "Frontend", level: "Advanced" },
  { name: "Node.js", icon: "devicon-nodejs-plain", category: "Backend", level: "Intermediate" },
  { name: "MongoDB", icon: "devicon-mongodb-plain", category: "Database", level: "Intermediate" },
  { name: "Next.js", icon: "devicon-nextjs-plain", category: "Frontend", level: "Intermediate" },
  { name: "C++", icon: "devicon-cplusplus-plain", category: "Programming", level: "Advanced" },
];

export const fallbackProjects: Project[] = [
  {
    name: "Code Track",
    description:
      "A practice tracker for competitive programming progress, problems solved, and study streaks.",
    image: "/codetrack.png",
    technologies: ["React", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
    featured: true,
  },
  {
    name: "Local Skill",
    description:
      "A platform connecting people with local skills and services in their community.",
    image: "/localskill.png",
    technologies: ["MERN", "Express", "MongoDB"],
    live: "#",
    github: "#",
    featured: true,
  },
];
