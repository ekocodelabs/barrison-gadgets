import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";

const normalizeFavoriteIds = (input: any): string[] => {
  if (!Array.isArray(input)) return [];
  return input.flatMap((item) => {
    if (Array.isArray(item)) return item.map(String);
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed.replace(/'/g, '"'));
          if (Array.isArray(parsed)) return parsed.map(String);
        } catch {
          // fall through to return raw string
        }
      }
      return [trimmed];
    }
    return [String(item)];
  });
};

//fetch the logged-in users favorite product ids

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    //find user by email and select only array of favorite product ids
    const user = await User.findOne({ email: session?.user?.email })
      .select("favoriteProducts")
      .lean<{ favoriteProducts: any[] }>();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { favoriteProducts: normalizeFavoriteIds(user.favoriteProducts) },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Favorite products retrieval processing failure:", error);
    return NextResponse.json(
      { error: "Internal data execution loop mutation failure" },
      { status: 500 },
    );
  }
}

//add or remove a product from the logged-in users favorite products array
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();

    const { productId } = await request.json();
    const pid = String(productId);

    const email = session?.user?.email;

    //find the users current favorite products array
    const user = await User.findOne({ email }).select("favoriteProducts");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const normalizedFavorites = normalizeFavoriteIds(user.favoriteProducts);
    const isAlreadyFavorite = normalizedFavorites.includes(pid);
    const newFavorites = isAlreadyFavorite
      ? normalizedFavorites.filter((id) => id !== pid)
      : [...normalizedFavorites, pid];

    //save the updated user document directly to the collection to avoid stale schema casting
    await User.collection.updateOne(
      { email },
      { $set: { favoriteProducts: newFavorites } },
    );

    return NextResponse.json(
      {
        message: "Favorite products updated successfully",
        favoriteProducts: newFavorites,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Favorite products update processing failure:", error);
    return NextResponse.json(
      { error: "Internal data execution loop mutation failure" },
      { status: 500 },
    );
  }
}
