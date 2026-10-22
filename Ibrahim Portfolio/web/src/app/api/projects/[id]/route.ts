import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const { id } = await params;
    const {
      name,
      description,
      image,
      technologies,
      live,
      github,
      featured,
    } = await req.json();

    if (
      !name &&
      !description &&
      !image &&
      !technologies &&
      !live &&
      !github &&
      featured === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide at least one field to update.",
        },
        { status: 400 }
      );
    }

    if (name) {
      const existingProject = await Project.findOne({ name });
      if (existingProject && existingProject._id.toString() !== id) {
        return NextResponse.json(
          { success: false, message: "Project already exists." },
          { status: 400 }
        );
      }
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(image && { image }),
        ...(technologies && { technologies }),
        ...(live && { live }),
        ...(github && { github }),
        ...(featured !== undefined && { featured }),
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
