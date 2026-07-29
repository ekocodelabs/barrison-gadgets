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

/**
 * UTILITY STRUCT: Stub to map the user back to an internal account profile node.
 * Replace with your dynamic session extraction tool (e.g., const session = await auth()).
 */
const mockGetActiveUserObjectId = () => "65f8c3e41b2c3d4e5f6a7b8c";

export async function POST(request: Request) {
  try {
    // 1. Establish absolute connection to the database
    await connectToDatabase();

    // 2. Safely parse incoming payload inputs from the execution thread
    const body = await request.json();
    const {
      customerEmail,
      phoneNumber,
      shippingAddress,
      totalPrice,
      paymentMethod,
      orderItems,
    } = body;

    // 3. Robust validation layer: Ensure no required data streams are missing or corrupt
    if (
      !customerEmail ||
      !phoneNumber ||
      !shippingAddress ||
      !totalPrice ||
      !paymentMethod ||
      !orderItems
    ) {
      return NextResponse.json(
        {
          error:
            "Validation Fault // Missing required transactional logistics coordinates.",
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return NextResponse.json(
        {
          error:
            "Validation Fault // Order item array matrix cannot be null or empty.",
        },
        { status: 400 },
      );
    }

    // Double check to verify this handler isn't processing mixed runtime actions
    if (paymentMethod !== "delivery") {
      return NextResponse.json(
        {
          error:
            "Protocol Error // This dedicated terminal endpoint strictly compiles Cash on Delivery payloads.",
        },
        { status: 422 },
      );
    }

    const userId = mockGetActiveUserObjectId();

    // 4. Assemble the structural data profile to match your schema definition perfectly
    const structuredOrderPayload = {
      customerEmail: customerEmail.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      shippingAddress: {
        street: shippingAddress.street?.trim(),
        city: shippingAddress.city?.trim(),
        state: shippingAddress.state?.trim(),
        postalCode: shippingAddress.postalCode?.trim(),
      },
      orderItems: orderItems.map((item: any) => ({
        productId: String(item.productId),
        title: item.title?.trim(),
        quantity: Number(item.quantity),
        price: Number(item.price), // Snaps unit baseline values directly into record memory
      })),
      paymentMethod: "delivery",
      totalPrice: Number(totalPrice),
      status: "Pending", // Initial pipeline operational milestone state

      // Explicitly setting empty variables for delivery workflows ensures indices don't trip
      paystackPaymentDetails: {
        totalPrice: Number(totalPrice),
        paystackReference: undefined,
        isPaid: false,
      },
    };

    // 5. Commit record to MongoDB database
    const savedOrderInstance = await Order.create(structuredOrderPayload);

    // 6. Cleanup Automation: Wipe out active client cart products array allocations upon confirmation

    await Cart.findOneAndDelete({ email: customerEmail });

    // 7. Dispatch success execution state trace payload back to client interface
    return NextResponse.json(
      {
        success: true,
        message:
          "Cash on delivery transaction authorized and safely deployed to logistics queue.",
        orderId: savedOrderInstance._id,
        trackingStatus: savedOrderInstance.status,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(
      "Critical error inside cash-on-delivery processing loop:",
      error,
    );

    // Safety net for runtime validation errors or schema shape mismatch exceptions
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Schema Validation Error", details: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Internal Server Processing Error // Failed to commit database ledger transaction.",
      },
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
      customerEmail: userContext.email,
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
