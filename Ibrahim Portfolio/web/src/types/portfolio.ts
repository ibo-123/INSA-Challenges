export type SocialLinks = {
  github?: string;
  linkedin?: string;
  codeforces?: string;
  leetcode?: string;
};

export type Profile = {
  _id?: string;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  problemsSolved: number;
  university: string;
  email: string;
  socialLinks: SocialLinks;
};

export type Skill = {
  _id?: string;
  name: string;
  icon?: string | null;
  category?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

export type Project = {
  _id?: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  live: string;
  github: string;
  featured?: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};
