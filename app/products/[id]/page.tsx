import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import ProductDetailsPage from "@/myComponents/ProductDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <>
      <Navbar />
      <ProductDetailsPage params={resolvedParams} />
      <Footer />
    </>
  );
}
