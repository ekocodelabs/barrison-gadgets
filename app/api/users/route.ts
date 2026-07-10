import { getServerSession } from "next-auth";
import connectToDatabase from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/config/authOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
