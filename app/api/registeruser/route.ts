"typescript";

import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database"; // Adjust path to your database connector
import User from "@/models/User"; // Adjust path to your User model
import { scryptSync, randomBytes } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 3. Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: securedPassword,
    });

    //send maill
    await resend.emails.send({
      from: "Barrison Gadgets <onboarding@resend.dev>", // Replace with your custom verified domain in production (e.g., concierge@barrison.com)
      to: [email],
      subject: "BARRISON // Identity Provisioning Authorized",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #000000; padding: 40px; border-top: 6px solid #e11d48; max-width: 600px; margin: 0 auto; border-left: 1px solid #f4f4f5; border-right: 1px solid #f4f4f5; border-bottom: 1px solid #f4f4f5;">
          <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; margin-bottom: 4px;">
            BARRISON<span style="color: #e11d48;">.</span>
          </h1>
          <p style="font-size: 10px; font-weight: bold; letter-spacing: 0.3em; color: #a1a1aa; text-transform: uppercase; margin-top: 0; margin-bottom: 30px;">
            System Security Node Authorized
          </p>
          
          <h2 style="font-size: 18px; font-weight: 800; text-transform: uppercase; margin-bottom: 16px;">
            Welcome, Operator ${firstName.toUpperCase()}
          </h2>
          
          <p style="font-size: 14px; font-weight: 300; line-height: 1.6; color: #4b5563; margin-bottom: 24px;">
            Your account credentials have been successfully compiled and recorded into the Barrison Gadgets master database cluster. Your network terminal is now fully operational.
          </p>
          
          <div style="margin-bottom: 32px; padding: 20px; background-color: #f9fafb; border: 1px solid #f3f4f6;">
            <p style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px 0; color: #1f2937;">
              Provisioned Vector Settings:
            </p>
            <p style="font-size: 12px; font-family: monospace; color: #4b5563; margin: 0;">
              Node ID: [ Registered Mail: ${email} ]
            </p>
          </div>

          <p style="font-size: 14px; font-weight: 300; line-height: 1.6; color: #4b5563; margin-bottom: 32px;">
            Log into your dashboard matrix to manage active computing configurations, save favorite items to your watchlist, or execute premium hardware deployments.
          </p>
          
          <div style="text-align: center; border-top: 1px solid #f4f4f5; pt-24; margin-top: 40px; padding-top: 20px;">
            <p style="font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #a1a1aa; text-transform: uppercase; margin: 0;">
              [ DO NOT REPLY // SECURE AUTOMATION ROUTE KEY ]
            </p>
          </div>
        </div>
      `,
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
