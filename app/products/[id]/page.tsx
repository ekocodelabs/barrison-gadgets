import { Footer } from "@/myComponents/Footer";
import { Navbar } from "@/myComponents/Navbar";
import ProductDetailsPage from "@/myComponents/ProductDetailsPage";
import React from "react";

interface PageProps {
  params: { id: string };
}

export default function ProductDetails({ params }: PageProps) {
  const paramsPromise = Promise.resolve(params);

  return (
    <>
      <Navbar isLoggedIn={true} cartCount={5} favIconCount={9} />
      <ProductDetailsPage params={paramsPromise} />
      <Footer />
    </>
  );
}
