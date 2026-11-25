import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    authenticated: isAdminRequest(req),
  });
}
