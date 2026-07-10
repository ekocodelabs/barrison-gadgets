import connectToDatabase from "@/config/database";
import Products from "@/models/Products";

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
