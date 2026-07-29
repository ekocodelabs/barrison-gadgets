import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const customReference = `PSP-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // 1. SENIOR FIX: Extract the host origin dynamically from request headers
    // This will correctly return "http://localhost:3000" or "https://ngrok-free.app"
    const origin = request.headers.get("origin") || "http://localhost:3000";

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
    if (paymentMethod !== "online") {
      return NextResponse.json(
        {
          error:
            "Protocol Error // This dedicated terminal endpoint strictly compiles Cash on Delivery payloads.",
        },
        { status: 422 },
      );
    }

    // 4. Call Paystack first, then save the order on successful initialization.
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        {
          error: "Server configuration error: PAYSTACK_SECRET_KEY is missing.",
        },
        { status: 500 },
      );
    }

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email: customerEmail,
          amount: Number(totalPrice) * 100, // Paystack expects amount in kobo
          callback_url: `${origin}/products`,
          reference: customReference,
        }),
      },
    );

    const paystackData = await paystackResponse.json();

    if (!paystackResponse.ok) {
      return NextResponse.json(
        {
          error: paystackData.message || "Failed to initialize payment",
          details: paystackData,
        },
        { status: paystackResponse.status || 500 },
      );
    }

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
        price: Number(item.price),
      })),
      paymentMethod: "online",
      totalPrice: Number(totalPrice),
      status: "Pending",
      paystackPaymentDetails: {
        totalPrice: Number(totalPrice),
        paystackReference: paystackData.data?.reference,
        isPaid: false,
      },
    };

    const savedOrderInstance = await Order.create(structuredOrderPayload);

    return NextResponse.json({
      success: true,
      orderId: savedOrderInstance._id,
      paystack: paystackData,
    });
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { error: `Failed to initialize payment ${error}` },
      { status: 500 },
    );
  }
}
