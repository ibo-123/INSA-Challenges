import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { normalizeExternalUrl, normalizeImagePath } from "@/lib/urls";
import Project from "@/models/Project";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      description,
      image,
      technologies,
      live,
      github,
      featured,
    } = body;

    if (
      name === undefined &&
      description === undefined &&
      image === undefined &&
      technologies === undefined &&
      live === undefined &&
      github === undefined &&
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

    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (image !== undefined) update.image = normalizeImagePath(image);
    if (technologies !== undefined) update.technologies = technologies;
    if (live !== undefined) update.live = normalizeExternalUrl(live);
    if (github !== undefined) update.github = normalizeExternalUrl(github);
    if (featured !== undefined) update.featured = featured;

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: update },
      { returnDocument: "after", runValidators: true }
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
