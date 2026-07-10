import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import User from "@/models/User";
import { authOptions } from "@/config/authOptions";
import { getServerSession } from "next-auth";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    const { email, amount } = await request.json();

    // 1. SENIOR FIX: Extract the host origin dynamically from request headers
    // This will correctly return "http://localhost:3000" or "https://ngrok-free.app"
    const origin = request.headers.get("origin") || "http://localhost:3000";

    //Call Paystack API to create a secure checkout session
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        body: JSON.stringify({
          email,
          amount: parseFloat(amount) * 100, // Paystack expects amount in kobo
          callback_url: `${origin}/products`, // Dynamically appends the working domain path
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to initialize payment");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 },
    );
  }
}
