import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import User from "@/models/User";
import Product from "@/models/Products";
import Cart from "@/models/Cart";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";

// --- 1. RETRIEVE USER CART ARRAY ---
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();

    // Locate the user profile document matching the authenticated email
    const user = (await User.findOne({
      email: session?.user?.email,
    }).lean()) as { email: string } | null;
    if (!user) {
      return NextResponse.json(
        { error: "User profile trace not located" },
        { status: 404 },
      );
    }

    const cart = await Cart.findOne({ userEmail: user.email })
      .populate("items.productId")
      .lean();

    return NextResponse.json({ success: true, cart }, { status: 200 });
  } catch (error: any) {
    console.error("Cart retrieval processing failure:", error);
    return NextResponse.json(
      { error: "Internal ledger synchronization fault" },
      { status: 500 },
    );
  }
}

// --- 2. ADD / UPDATE CART ITEM QUANTITIES ---
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();
    const { productId, quantity = 1 } = await request.json();

    //find users cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userEmail: session?.user?.email });
    if (!cart) {
      cart = new Cart({ userEmail: session?.user?.email, items: [] });
    }

    //check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: { productId: { toString: () => any } }) =>
        item.productId.toString() === productId,
    );

    if (existingItemIndex > -1) {
      //update quantity if product exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      //add new product to cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return NextResponse.json(
      { message: "Cart updated successfully", cart },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Cart modification processing failure:", error);
    return NextResponse.json(
      { error: "Internal data execution loop mutation failure" },
      { status: 500 },
    );
  }
}

// --- 3. UPDATE CART ITEM ---

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();
    const { productId, quantity } = await request.json();
    const email = session?.user?.email;

    let cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (quantity <= 0) {
      // Remove item if quantity is zero or less
      cart.items = cart.items.filter(
        (item: { productId: { toString: () => any } }) =>
          item.productId.toString() !== productId,
      );
    } else {
      // Update quantity if item exists
      const existingItemIndex = cart.items.findIndex(
        (item: { productId: { toString: () => any } }) =>
          item.productId.toString() === productId,
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = quantity;
      }
    }

    await cart.save();

    return NextResponse.json(
      { message: "Cart updated successfully", cart },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Cart item update processing failure:", error);
    return NextResponse.json(
      { error: "Internal data execution loop mutation failure" },
      { status: 500 },
    );
  }
}
