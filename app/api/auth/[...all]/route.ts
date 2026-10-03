import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";
import { rateLimit } from "@/app/(auth)/sign-up/rate-limit";

const { POST: handleAuthPost, GET } = toNextJsHandler(auth);

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  if (pathname.includes("/sign-in") || pathname.includes("/sign-up")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const limited = rateLimit(`auth:${ip}`);
    if (!limited.ok) {
      return NextResponse.json({ message: limited.message }, { status: 429 });
    }
  }
  return handleAuthPost(request);
}

export { GET };
