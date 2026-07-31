"typescript";

import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database"; // Adjust path to your database connector
import User from "@/models/User"; // Adjust path to your User model
import { scryptSync, randomBytes } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().trim().min(2).max(50),
    lastName: z.string().trim().min(2).max(50),
    email: z.string().trim().email(),
    password: z.string().min(8).max(128),
  })
  .strict();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const registerRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "5 m"),
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
      await registerRateLimit.limit(ip);

    console.log(
      `RATE-LIMIT IP: ${ip} |Success: ${success} | Remaining Requests: ${remaining}/${limit}`,
    );

    if (!success) {
      console.log(`BLOCKED IP: ${ip} has exceeded rate limit`);
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait 5 minutes." },
        { status: 429 },
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Invalid registration payload.",
          details: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, password } = parsedBody.data;

    // 1. Check for existing user records
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Credentials already registered to another portfolio." },
        { status: 409 }, // 409 Conflict is semantic for existing data
      );
    }

    // 2. Secure authentication strings
    const securedPassword = hashPassword(password);

    // 3. Construct premium investment asset profile ledger matrix structure
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: securedPassword,
    });

    // Return success payload containing context (Never send the password string back)
    return NextResponse.json(
      {
        message: "High-end account established successfully.",
        userId: newUser._id,
      },
      { status: 201 }, // 201 Created status code
    );
  } catch (error) {
    console.error("Database Transaction Error:", error);
    return NextResponse.json(
      { error: "Internal server infrastructure processing exception." },
      { status: 500 },
    );
  }
}
