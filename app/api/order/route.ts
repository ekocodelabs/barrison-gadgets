import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Products";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Cart from "@/models/Cart";
import { z } from "zod";

const createOrderSchema = z
  .object({
    customerEmail: z.string().trim().email(),
    phoneNumber: z.string().trim().min(7).max(20),
    shippingAddress: z
      .object({
        street: z.string().trim().min(2),
        city: z.string().trim().min(2),
        state: z.string().trim().min(2),
        postalCode: z.string().trim().min(3).max(20),
      })
      .strict(),
    totalPrice: z.number().nonnegative(),
    paymentMethod: z.literal("delivery"),
    orderItems: z
      .array(
        z.object({
          productId: z.string().trim().min(1),
          title: z.string().trim().min(1),
          quantity: z.number().int().positive(),
          price: z.number().nonnegative(),
        }),
      )
      .min(1),
  })
  .strict();
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * UTILITY METHOD: Simulates retrieving the active logged-in user context.
 * Swap this with your actual authentication token framework (e.g., NextAuth / iron-session).
 */

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const orderRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "2 m"),
});

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
    // Resolve client IP from common headers (Request has no .ip property)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      (forwarded && forwarded.split(",")[0].trim()) ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    //check limit
    const { success, limit, remaining, reset } = await orderRateLimit.limit(ip);

    console.log(
      `RATE-LIMIT IP: ${ip} |Success: ${success} | Remaining Requests: ${remaining}/${limit}`,
    );

    if (!success) {
      console.log(`BLOCKED IP: ${ip} has exceeded rate limit`);
      return NextResponse.json(
        { error: "Too many registration attempts. Please wait 2 minutes." },
        { status: 429 },
      );
    }

    // 1. Establish absolute connection to the database
    await connectToDatabase();

    const body = await request.json();
    const parsedBody = createOrderSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Validation Fault // Invalid order payload.",
          details: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const {
      customerEmail,
      phoneNumber,
      shippingAddress,
      totalPrice,
      paymentMethod,
      orderItems,
    } = parsedBody.data;

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
