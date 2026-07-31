import connectToDatabase from "@/config/database";
import Products from "@/models/Products";
import { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Products.find({});
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch designs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// --- NEW POST METHOD ---
export async function POST(request: Request) {
  try {
    // 1. Establish database baseline connection
    await connectToDatabase();

    // 2. Parse the structural request payload from the execution thread
    const body = await request.json();
    const { title, description, price, image, category, inStock } = body;

    // 3. Validation Layer: Prevent corrupted or incomplete uploads
    if (!title || !description || price === undefined || !image || !category) {
      return new Response(
        JSON.stringify({
          error: "Validation Fault // Missing required core product fields.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Enforce strict category checks matching your storefront typography rules
    const allowedCategories = [
      "appliances",
      "electronics",
      "fashion",
      "phones & tablets",
      "computing",
    ];
    if (!allowedCategories.includes(category)) {
      return new Response(
        JSON.stringify({
          error: `Validation Fault // Category must match: ${allowedCategories.join(", ")}`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Structural ID Optimization: Generate an auto-incrementing-style dynamic numerical ID
    // Reads your previous numeric ID requirement so your client-side filters function perfectly
    const totalCount = await Products.countDocuments({});
    const assignedNumericId = 101 + totalCount; // Starts cleanly at baseline index 101

    // 5. Build and compile the document configuration mapping payload
    const productPayload = {
      id: assignedNumericId,
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      image: image.trim(), // File string path targeting your /public directory structure
      category: category,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
    };

    // 6. Commit product model directly to MongoDB
    const newProduct = await Products.create(productPayload);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Hardware asset registered and compiled successfully.",
        product: newProduct,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("Critical error in product generation pipeline:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error // Failed to write product data asset.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id")?.trim();

    if (!productId) {
      return new Response(
        JSON.stringify({ error: "Validation Fault // Missing product id." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const numericId = Number(productId);
    const isNumericId =
      !Number.isNaN(numericId) && String(numericId) === productId;
    const isObjectId = Types.ObjectId.isValid(productId);

    const product = (await Products.findOne({
      $or: [
        ...(isNumericId ? [{ id: numericId }] : []),
        ...(isObjectId ? [{ _id: new Types.ObjectId(productId) }] : []),
        { _id: productId },
      ],
    }).lean()) as { image?: string } | null;

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (product.image) {
      try {
        const publicIdMatch = product.image.match(
          /upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/,
        );
        const publicId = publicIdMatch?.[1];

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary image deletion failed:", cloudinaryError);
      }
    }

    await Products.deleteOne({
      $or: [
        ...(isNumericId ? [{ id: numericId }] : []),
        ...(isObjectId ? [{ _id: new Types.ObjectId(productId) }] : []),
        { _id: productId },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product deleted successfully.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error("Critical error in product deletion pipeline:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error // Failed to delete product data asset.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
