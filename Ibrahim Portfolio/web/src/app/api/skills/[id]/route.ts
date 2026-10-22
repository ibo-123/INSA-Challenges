import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const { id } = await params;
    const { name, icon, level, category } = await req.json();

    if (!name && !icon && !level && category === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide at least one field to update.",
        },
        { status: 400 }
      );
    }

    if (name) {
      const existingSkill = await Skill.findOne({ name });
      if (existingSkill && existingSkill._id.toString() !== id) {
        return NextResponse.json(
          { success: false, message: "Skill already exists." },
          { status: 400 }
        );
      }
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined && { name }),
        ...(icon !== undefined && { icon }),
        ...(level !== undefined && { level }),
        ...(category !== undefined && { category }),
      },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return NextResponse.json(
        { success: false, message: "Skill not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill });
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
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: "Skill not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
