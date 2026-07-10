import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Grab the raw body text and paystack signature header
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      console.error(
        "🚨 [Aurelian Webhook Vault] Rejected: Missing security signature header.",
      );
      return NextResponse.json(
        { message: "Missing signature" },
        { status: 401 },
      );
    }

    // 2. CRITICAL SENIOR FIX: Sign using the SECRET KEY, not the PUBLIC KEY
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error(
        "🚨 [Aurelian Webhook Vault] Runtime Configuration Error: PAYSTACK_SECRET_KEY is undefined.",
      );
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 },
      );
    }

    // Verify authenticity
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(rawBody)
      .digest("hex");

    // Timing-safe comparison can prevent structural timing attacks
    if (hash !== signature) {
      console.error(
        "🚨 [Aurelian Webhook Vault] Threat Detected: Signature mismatch. Body hash does not match signature header.",
      );
      return NextResponse.json(
        { message: "Invalid signature structural check failed" },
        { status: 400 },
      );
    }

    // 3. Parse verified JSON payload
    const body = JSON.parse(rawBody);
    const eventType = body.event;
    const eventData = body.data;

    console.log(
      `\n============== 📥 AURELIAN INBOUND LEDGER: ${eventType.toUpperCase()} ==============`,
    );

    // 4. Handle structural routing based on events
    switch (eventType) {
      case "charge.success":
        console.log("✅ [PAYMENT VERIFIED]");
        console.log(
          `   └─ Ref / ID:    ${eventData.reference} / ${eventData.id}`,
        );
        console.log(
          `   └─ Asset Value: ${(eventData.amount / 100).toFixed(2)} ${eventData.currency}`,
        );
        console.log(`   └─ Depositor:   ${eventData.customer.email}`);
        console.log(`   └─ Channel:     ${eventData.channel || "card"}`);
        // TODO: Later invoke Mongoose User.findOneAndUpdate() to adjust net assets here
        break;

      case "charge.failed":
        console.log("❌ [PAYMENT REJECTED]");
        console.log(`   └─ Ref:         ${eventData.reference}`);
        console.log(`   └─ Client:      ${eventData.customer.email}`);
        console.log(
          `   └─ Reason:      ${eventData.gateway_response || "Insufficient funds"}`,
        );
        break;

      case "transfer.success":
        console.log("💸 [OUTBOUND CAPITAL RELEASED]");
        console.log(`   └─ Transfer Code: ${eventData.transfer_code}`);
        console.log(
          `   └─ Dispensed:     ${(eventData.amount / 100).toFixed(2)}`,
        );
        break;

      default:
        console.log(`ℹ️ [UNHANDLED SUBSYSTEM EVENT]: ${eventType}`);
        console.log(
          "   └─ Data Stream Payload:",
          JSON.stringify(eventData, null, 2),
        );
        break;
    }

    console.log(
      "===================================================================\n",
    );

    // 5. Always acknowledge with 200 OK within Paystack's timeout rules
    return NextResponse.json(
      { status: "acknowledged", received: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "🚨 [Aurelian Webhook Vault] General Subsystem Processing Failure:",
      error,
    );
    return NextResponse.json(
      { message: "Internal server protocol error" },
      { status: 500 },
    );
  }
}
