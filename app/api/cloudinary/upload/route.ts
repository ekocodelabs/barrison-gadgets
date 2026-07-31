import { NextResponse } from "next/server";
import { uploadImage } from "@/config/cloudinary";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const clodinaryRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

export async function POST(request: Request) {
  try {
    // Resolve client IP from common headers (Request has no .ip property)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      (forwarded && forwarded.split(",")[0].trim()) ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    //check limit
    const { success, limit, remaining, reset } =
      await clodinaryRateLimit.limit(ip);

    console.log(
      `RATE-LIMIT IP: ${ip} |Success: ${success} | Remaining Requests: ${remaining}/${limit}`,
    );

    if (!success) {
      console.log(`BLOCKED IP: ${ip} has exceeded rate limit`);
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait 1 minutes." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const base64Data = body?.base64Data;

    if (!base64Data || typeof base64Data !== "string") {
      return NextResponse.json(
        { error: "Missing image data to upload." },
        { status: 400 },
      );
    }

    const result = await uploadImage(base64Data);

    return NextResponse.json(
      {
        success: true,
        url: result.secure_url || result.url,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json(
      {
        error:
          error?.message || "Cloudinary upload failed. Check your env config.",
      },
      { status: 500 },
    );
  }
}
