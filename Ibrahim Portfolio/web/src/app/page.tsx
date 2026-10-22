import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JobsSection from "@/components/JobsSection";
import Nav from "@/components/Nav";
import ProfileSection from "@/components/ProfileSection";
import SkillsSection from "@/components/SkillsSection";
import { getPortfolioData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, skills, projects } = await getPortfolioData();

  return (
    <>
      <Nav />
      <main>
        <Hero profile={profile} />
        <ProfileSection profile={profile} projectCount={projects.length} />
        <JobsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </>
  );
}
