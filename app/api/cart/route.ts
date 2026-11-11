import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import Cart from "@/models/Cart";
import Product from "@/models/Products";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";

const getProductStock = (product: any) => {
  const stock = Number(product?.stock ?? (product?.inStock === false ? 0 : 10));
  return Number.isFinite(stock) ? stock : 0;
};

const findProductByReference = async (productId: string) => {
  const directMatch = await Product.findById(productId).lean();
  if (directMatch) return directMatch;

  const numericId = Number(productId);
  if (!Number.isNaN(numericId)) {
    return Product.findOne({ id: numericId }).lean();
  }

  return null;
};

// --- 1. RETRIEVE USER CART ARRAY ---
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();

    const cart = await Cart.findOne({ userEmail: email })
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
    const email = session?.user?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();
    const { productId, quantity = 1 } = await request.json();
    const requestedQuantity = Number(quantity);

    if (
      !productId ||
      !Number.isFinite(requestedQuantity) ||
      requestedQuantity <= 0
    ) {
      return NextResponse.json(
        { error: "A valid product and quantity are required." },
        { status: 400 },
      );
    }

    const product = await findProductByReference(String(productId));
    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    }

    const availableStock = getProductStock(product);
    if (availableStock <= 0) {
      return NextResponse.json(
        { error: "This item is currently out of stock." },
        { status: 400 },
      );
    }

    //find users cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      cart = new Cart({ userEmail: email, items: [] });
    }

    //check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: { productId: { toString: () => any } }) =>
        item.productId.toString() === String(productId),
    );

    const currentQuantityInCart =
      existingItemIndex > -1 ? cart.items[existingItemIndex].quantity : 0;
    const nextTotalQuantity = currentQuantityInCart + requestedQuantity;

    if (nextTotalQuantity > availableStock) {
      return NextResponse.json(
        {
          error: `Only ${availableStock} units are available for this product.`,
        },
        { status: 400 },
      );
    }

    if (existingItemIndex > -1) {
      //update quantity if product exists
      cart.items[existingItemIndex].quantity = nextTotalQuantity;
    } else {
      //add new product to cart
      cart.items.push({ productId, quantity: requestedQuantity });
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
    const email = session?.user?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();
    const { productId, quantity } = await request.json();
    const requestedQuantity = Number(quantity);

    let cart = await Cart.findOne({ userEmail: email });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (requestedQuantity <= 0) {
      // Remove item if quantity is zero or less
      cart.items = cart.items.filter(
        (item: { productId: { toString: () => any } }) =>
          item.productId.toString() !== String(productId),
      );
    } else {
      const product = await findProductByReference(String(productId));
      if (!product) {
        return NextResponse.json(
          { error: "Product not found." },
          { status: 404 },
        );
      }

      const availableStock = getProductStock(product);
      if (requestedQuantity > availableStock) {
        return NextResponse.json(
          {
            error: `Only ${availableStock} units are available for this product.`,
          },
          { status: 400 },
        );
      }

      // Update quantity if item exists
      const existingItemIndex = cart.items.findIndex(
        (item: { productId: { toString: () => any } }) =>
          item.productId.toString() === String(productId),
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity = requestedQuantity;
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
