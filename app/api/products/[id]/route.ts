import connectToDatabase from "@/config/database";
import { NextResponse } from "next/server";
import Product from "@/models/Products";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase();

    const resolvedParams = await params;
    const productId = resolvedParams.id;

    let product = null;

    if (productId.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(productId);
    } else {
      product = await Product.findOne({ id: Number(productId) });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product node not located in system ledger" },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Single product pipeline error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during data synchronization" },
      { status: 500 },
    );
  }
}
