import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne();

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const existing = await Profile.findOne();

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Profile already exists" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const profile = await Profile.create(body);

    return NextResponse.json({ success: true, data: profile }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) return unauthorized();

  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      title,
      bio,
      profileImage,
      problemsSolved,
      university,
      email,
      socialLinks,
    } = body;

    const profile = await Profile.findOne();

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    if (name !== undefined) profile.name = name;
    if (title !== undefined) profile.title = title;
    if (bio !== undefined) profile.bio = bio;
    if (profileImage !== undefined) profile.profileImage = profileImage;
    if (problemsSolved !== undefined) profile.problemsSolved = problemsSolved;
    if (university !== undefined) profile.university = university;
    if (email !== undefined) profile.email = email;

    if (socialLinks) {
      const current =
        typeof profile.socialLinks?.toObject === "function"
          ? profile.socialLinks.toObject()
          : profile.socialLinks || {};
      profile.socialLinks = { ...current, ...socialLinks };
    }

    await profile.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
