import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "@/app/components/work/ProjectDetail";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.name} — Dostin Santana | Logic Code Spot`,
    description: project.description,
  };
}

export default async function WorkSlugPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <ProjectDetail project={project} />
      <Footer />
    </>
  );
}
