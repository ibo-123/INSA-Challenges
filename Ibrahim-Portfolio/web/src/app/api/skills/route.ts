import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find();
    return NextResponse.json({ success: true, data: skills });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const { name, icon, level, category } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Skill name is required" },
        { status: 400 }
      );
    }

    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return NextResponse.json(
        { success: false, message: "Skill already exists" },
        { status: 400 }
      );
    }

    const skill = await Skill.create({
      name,
      icon: icon || null,
      level,
      category,
    });

    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
