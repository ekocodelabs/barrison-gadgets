import React from "react";
import Link from "next/link";
import { Navbar } from "@/myComponents/Navbar";
import ProductsPage from "@/myComponents/ProductsPage";
import { Footer } from "@/myComponents/Footer";

export default function Products() {
  return (
    <div>
      <Navbar isLoggedIn={true} cartCount={5} favIconCount={9} />
      <ProductsPage />
      <Footer />
    </div>
  );
}
