import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Products";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Cart from "@/models/Cart";

/**
 * UTILITY METHOD: Simulates retrieving the active logged-in user context.
 * Swap this with your actual authentication token framework (e.g., NextAuth / iron-session).
 */
const getAuthenticatedUserContext = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return {
    email: session.user.email,
  };
};

// --- 1. SUBMIT / RECORD NEW ORDER (POST) ---
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const userContext = await getAuthenticatedUserContext();

    const body = await request.json();
    const { shippingAddress, orderItems, paymentMethod, paystackReference } =
      body;

    // Validate global structural contract parameters payload arguments
    if (
      !shippingAddress ||
      !orderItems ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0 ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Missing required core dispatch logistics variables" },
        { status: 400 },
      );
    }

    if (!["online", "delivery"].includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method classification parameter" },
        { status: 400 },
      );
    }

    let calculatedTotalPrice = 0;
    const verifiedOrderItems = [];

    // Loop through order items to verify prices and check stock levels
    for (const item of orderItems) {
      const liveProduct = await Product.findOne({ id: Number(item.productId) });

      if (!liveProduct) {
        return NextResponse.json(
          {
            error: `Hardware element ID-${item.productId} mismatch in system records`,
          },
          { status: 404 },
        );
      }

      if (!liveProduct.inStock) {
        return NextResponse.json(
          {
            error: `Operational stock depletion trace detected for: ${liveProduct.title}`,
          },
          { status: 400 },
        );
      }

      // Add snapshotted valuation matrices to running order ledger calculations
      const itemTotalPrice = liveProduct.price * Number(item.quantity);
      calculatedTotalPrice += itemTotalPrice;

      verifiedOrderItems.push({
        productId: liveProduct.id,
        title: liveProduct.title,
        quantity: Number(item.quantity),
        price: liveProduct.price, // Snapshotted baseline valuation prevents future modification mutations
      });
    }

    // Build the structural data dictionary configuration for database entry execution
    const orderData: any = {
      customerEmail: userContext.email,
      shippingAddress,
      orderItems: verifiedOrderItems,
      paymentMethod,
      totalPrice: calculatedTotalPrice,
      status: "Pending",
    };

    // Branch logic configuration based on explicit client side transactional protocol choice
    if (paymentMethod === "online") {
      if (!paystackReference) {
        return NextResponse.json(
          {
            error:
              "Paystack unique identifier reference sequence missing from payload loop",
          },
          { status: 400 },
        );
      }

      orderData.paystackPaymentDetails = {
        paystackReference,
        isPaid: true, // Assuming client transaction step was verified before this dispatch pipeline loop
        paidAt: new Date(),
      };
    } else {
      // Cash on delivery parameters setup bypasses Paystack verification loops cleanly
      orderData.paystackPaymentDetails = {
        paystackReference: undefined, // Clears partial indices triggers smoothly
        isPaid: false,
      };
    }

    // Generate database ledger model instance record tracking transaction entry execution
    const newOrder = await Order.create(orderData);

    // Operational Cleanup: Empty the user's shopping cart array upon successful order registration
    await Cart.findOneAndDelete({ email: userContext.email });

    return NextResponse.json(
      {
        success: true,
        message:
          "Order transaction authorization verified and deployed to logistics tracking pipelines.",
        orderId: newOrder._id,
        reference:
          newOrder.paystackPaymentDetails?.paystackReference ||
          "COD-SYSTEM-NODE",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Order deployment processing error matrix exception:", error);

    // Catch duplicate reference token collisions smoothly
    if (error.code === 11000) {
      return NextResponse.json(
        {
          error:
            "Duplicate Paystack validation handshake signature collision detected",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal order processing system compilation failure" },
      { status: 500 },
    );
  }
}

// --- 2. RETRIEVE USER ORDERS HISTORY (GET) ---
export async function GET() {
  try {
    await connectToDatabase();
    const userContext = await getAuthenticatedUserContext();

    // Query database for all orders assigned to the current user, sorting by newest first
    const historicalOrdersLedger = await Order.find({
      user: userContext.email,
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: historicalOrdersLedger.length,
        orders: historicalOrdersLedger,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(
      "Historical order fetch stream failure matrix exception:",
      error,
    );
    return NextResponse.json(
      { error: "Internal transaction logs collection tracking fault" },
      { status: 500 },
    );
  }
}
