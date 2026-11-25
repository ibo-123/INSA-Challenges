import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAdminPassword,
  passwordsMatch,
  sessionCookieOptions,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expected = getAdminPassword();

    if (!expected) {
      return NextResponse.json(
        { success: false, message: "Admin password is not configured" },
        { status: 500 }
      );
    }

    if (typeof password !== "string" || !passwordsMatch(password, expected)) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const res = NextResponse.json({ success: true, message: "Logged in" });
    res.cookies.set(sessionCookieOptions(token));
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
