"typescript";
// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database"; // Adjust path to your database connector
import User from "@/models/User"; // Adjust path to your User model
import { scryptSync, randomBytes } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    //send mail message
    await resend.emails.send({
      from: "Barrison Gadgets <onboarding@resend.dev>", // Replace with your custom verified domain in production (e.g., concierge@barrison.com)
      to: [email],
      subject: "BARRISON // Security Passkey Matrix Updated",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; color: #000000; padding: 40px; border-top: 6px solid #e11d48; max-width: 600px; margin: 0 auto; border-left: 1px solid #f4f4f5; border-right: 1px solid #f4f4f5; border-bottom: 1px solid #f4f4f5;">
      
      {/* Brand Identity Header Block */}
      <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.05em; margin-bottom: 4px;">
        BARRISON<span style="color: #e11d48;">.</span>
      </h1>
      <p style="font-size: 10px; font-weight: bold; letter-spacing: 0.3em; color: #a1a1aa; text-transform: uppercase; margin-top: 0; margin-bottom: 30px;">
        Security Protocol Lifecycle Node
      </p>
      
      {/* Dynamic Security Event Notification Header */}
      <h2 style="font-size: 18px; font-weight: 800; text-transform: uppercase; margin-bottom: 16px;">
        Passkey Mutation Confirmed
      </h2>
      
      <p style="font-size: 14px; font-weight: 300; line-height: 1.6; color: #4b5563; margin-bottom: 24px;">
        This transmission confirms that the security passkey sequence assigned to your hardware network node user profile has been successfully reset and written to the master system cluster ledger.
      </p>
      
      {/* Security Context Metrics Reference Box */}
      <div style="margin-bottom: 32px; padding: 20px; background-color: #f9fafb; border: 1px solid #f3f4f6;">
        <p style="font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px 0; color: #1f2937;">
          Security Trace Metadata:
        </p>
        <p style="font-size: 12px; font-family: monospace; color: #4b5563; margin: 0 0 4px 0;">
          Target Account: [ ${email} ]
        </p>
        <p style="font-size: 12px; font-family: monospace; color: #4b5563; margin: 0 0 4px 0;">
          Status Event: [ SUCCESSFUL_RESET // ENCRYPTED ]
        </p>
        <p style="font-size: 12px; font-family: monospace; color: #e11d48; margin: 0; font-weight: bold;">
          Timestamp Flag: [ ${new Date().toUTCString()} ]
        </p>
      </div>

      {/* Critical Defense Advisory Warning Block */}
      <div style="margin-bottom: 32px; padding: 16px; border-left: 3px solid #e11d48; background-color: #fff5f5; font-size: 13px; font-weight: 300; color: #1f2937; line-height: 1.5;">
        <strong style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; display: block; margin-bottom: 4px; color: #e11d48;">
          System Alert Boundary Check:
        </strong>
        If you did not authorize this access variable change configuration yourself, your terminal node might be experiencing unauthorized external targeting. Contact our cybersecurity response team immediately at <a href="mailto:concierge@barrison.com" style="color: #e11d48; font-weight: bold; text-decoration: none;">concierge@barrison.com</a> to freeze your hardware assets pipeline.
      </div>

      <p style="font-size: 14px; font-weight: 300; line-height: 1.6; color: #4b5563; margin-bottom: 32px;">
        If this mutation was initiated by you, please return to the authentication portal using your newly established secret passkey credentials to resume system deployment controls.
      </p>
      
      {/* Sub-Footer Operations Automation Marker Tag */}
      <div style="text-align: center; border-top: 1px solid #f4f4f5; margin-top: 40px; padding-top: 20px;">
        <p style="font-size: 10px; font-family: monospace; letter-spacing: 0.2em; color: #a1a1aa; text-transform: uppercase; margin: 0;">
          [ SYSTEM TRIGGERED // BROADCAST SECURE LOCK PROTOCOL ]
        </p>
      </div>
    </div>
  `,
    });

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
