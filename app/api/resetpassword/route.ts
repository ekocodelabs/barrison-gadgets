"typescript";
// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database"; // Adjust path to your database connector
import User from "@/models/User"; // Adjust path to your User model
import { scryptSync, randomBytes } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    email: z.string().trim().email(),
    newPassword: z.string().min(8).max(128),
  })
  .strict();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const passwordRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(2, "15 m"),
});

// Helper to hash passwords without external dependencies
function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

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
      await passwordRateLimit.limit(ip);

    console.log(
      `RATE-LIMIT IP: ${ip} |Success: ${success} | Remaining Requests: ${remaining}/${limit}`,
    );

    if (!success) {
      console.log(`BLOCKED IP: ${ip} has exceeded rate limit`);
      return NextResponse.json(
        { error: "Too many password reset attempts. Please wait 15 minutes." },
        { status: 429 },
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const parsedBody = resetPasswordSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid password reset payload.",
          details: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, newPassword } = parsedBody.data;

    // 2. Locate the asset profile by normalized email address
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User profile with the provided credentials does not exist." },
        { status: 404 }, // 404 Not Found is highly explicit here
      );
    }

    // 3. Hash the new credentials securely
    const securedPassword = hashPassword(newPassword);

    // 4. Update the profile record securely within the collection matrix
    await User.updateOne(
      { email: email.toLowerCase() },
      { $set: { password: securedPassword } },
    );

    return NextResponse.json(
      { message: "Secured portfolio credentials updated successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Database Transaction Error:", error);
    return NextResponse.json(
      { error: "Internal cryptography ledger processing exception." },
      { status: 500 },
    );
  }
}
