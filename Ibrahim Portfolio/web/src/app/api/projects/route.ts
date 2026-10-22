import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const {
      name,
      description,
      image,
      technologies,
      live,
      github,
      featured,
    } = await req.json();

    if (!name || !description || !image || !live || !github) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return NextResponse.json(
        { success: false, message: "Project already exists" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      name,
      description,
      image,
      technologies: technologies || [],
      live,
      github,
      featured: featured || false,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
