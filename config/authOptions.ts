import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { SessionStrategy } from "next-auth";
import connectToDatabase from "./database";
import User from "@/models/User";
import { scryptSync } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
});

function getClientIp(req: any) {
  const forwarded =
    req?.headers?.get?.("x-forwarded-for") ??
    req?.headers?.["x-forwarded-for"] ??
    "";
  const firstForwarded = forwarded.split(",")[0]?.trim();

  return (
    firstForwarded ||
    req?.headers?.get?.("x-real-ip") ||
    req?.headers?.["x-real-ip"] ||
    "127.0.0.1"
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const ip = getClientIp(req);
        const { success, limit, remaining, reset } =
          await loginRateLimit.limit(ip);
        console.log(
          `RATE-LIMIT IP: ${ip} |Success: ${success} | Remaining Requests: ${remaining}/${limit}`,
        );

        if (!success) {
          console.log(`BLOCKED IP: ${ip} has exceeded rate limit`);
          throw new Error("Too many login attempts. Please try again shortly.");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const [salt, hashedPassword] = user.password.split(":");
        const hashToVerify = scryptSync(
          credentials.password,
          salt,
          64,
        ).toString("hex");

        if (hashToVerify !== hashedPassword) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
