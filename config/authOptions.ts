import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { SessionStrategy } from "next-auth";
import connectToDatabase from "./database";
import User from "@/models/User";
import { scryptSync } from "crypto";
import { checkRateLimit } from "./rateLimit";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
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
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const normalizedEmail = email.toLowerCase();

        const ip = getClientIp(req);
        if (!(await checkRateLimit(ip, 5, "1 m"))) {
          throw new Error("Too many login attempts. Please try again shortly.");
        }

        await connectToDatabase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
          return null;
        }

        const [salt, hashedPassword] = user.password.split(":");
        const hashToVerify = scryptSync(password, salt, 64).toString("hex");

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
